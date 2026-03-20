import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { X, Camera, CheckCircle, AlertCircle, Sparkles, Loader } from "lucide-react";
import * as faceDetection from "../../utils/faceDetection";
import api from "../../services/api";

export default function ModalFaceScan({ isOpen, onClose, onSubmit, mode = "verify", employeeId }) {
  const [step, setStep] = useState("prepare");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [capturedImages, setCapturedImages] = useState([]);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [faceAnalysis, setFaceAnalysis] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [autoCaptureActive, setAutoCaptureActive] = useState(false);
  const [captureConfidence, setCaptureConfidence] = useState(0);
  const [saving, setSaving] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [detectionInterval, setDetectionInterval] = useState(null);
  const [stableCounter, setStableCounter] = useState(0);
  const [qualityScore, setQualityScore] = useState(0);
  const [brightnessWarning, setBrightnessWarning] = useState(false);
  const [faceSizeWarning, setFaceSizeWarning] = useState(false);
  const [lastCaptureTime, setLastCaptureTime] = useState(0);
  const [currentPoseMessage, setCurrentPoseMessage] = useState("");
  const [forceCaptureTimer, setForceCaptureTimer] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const requiredPoses = [
    { name: "frontal", label: "Lurus", desc: "Hadap lurus", threshold: 0.35 },
    { name: "smile", label: "Senyum", desc: "Tersenyum", threshold: 0.35 },
    { name: "left_tilt", label: "Kiri", desc: "Miring kiri", threshold: 0.3 },
    { name: "right_tilt", label: "Kanan", desc: "Miring kanan", threshold: 0.3 },
    { name: "look_up", label: "Atas", desc: "Dongak", threshold: 0.3 },
    { name: "look_down", label: "Bawah", desc: "Tunduk", threshold: 0.3 },
    { name: "eyes_closed", label: "Mata", desc: "Tutup mata", threshold: 0.35 },
  ];

  useEffect(() => {
    if (isOpen) {
      loadModels();
      resetState();
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === "scanning" && webcamRef.current && modelsLoaded && cameraReady) {
      startFaceDetection();
    } else {
      cleanupDetection();
    }
    return cleanupDetection;
  }, [step, modelsLoaded, cameraReady, currentPoseIndex]);

  useEffect(() => {
    if (autoCaptureActive && faceAnalysis && cameraReady) {
      validateAndCapture();
    }
  }, [faceAnalysis, autoCaptureActive, cameraReady]);

  useEffect(() => {
    if (step === "scanning" && autoCaptureActive) {
      const timer = setTimeout(() => {
        if (capturedImages.length <= currentPoseIndex) {
          console.log("Force capture by timeout");
          captureImage();
        }
      }, 2500);
      setForceCaptureTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [step, autoCaptureActive, currentPoseIndex]);

  const resetState = () => {
    setStep("prepare");
    setProgress(0);
    setCapturedImages([]);
    setCurrentPoseIndex(0);
    setFaceAnalysis(null);
    setCaptureConfidence(0);
    setSaving(false);
    setCameraReady(false);
    setStableCounter(0);
    setQualityScore(0);
    setBrightnessWarning(false);
    setFaceSizeWarning(false);
    setCurrentPoseMessage("");
    if (forceCaptureTimer) clearTimeout(forceCaptureTimer);
  };

  const cleanupDetection = () => {
    if (detectionInterval) {
      clearInterval(detectionInterval);
      setDetectionInterval(null);
    }
    if (forceCaptureTimer) {
      clearTimeout(forceCaptureTimer);
    }
  };

  const loadModels = async () => {
    setLoadingModels(true);
    try {
      const success = await faceDetection.loadModels();
      setModelsLoaded(success);
      if (!success) {
        setMessage("Gagal memuat model");
      }
    } catch (error) {
      console.error("Error loading models:", error);
      setMessage("Error loading models");
    } finally {
      setLoadingModels(false);
    }
  };

  const startFaceDetection = () => {
    setAutoCaptureActive(true);
    
    const interval = setInterval(async () => {
      if (webcamRef.current?.video?.readyState === 4) {
        try {
          const video = webcamRef.current.video;
          const detections = await faceDetection.detectFace(video);
          
          if (detections?.length > 0) {
            const analysis = faceDetection.analyzePose(detections);
            const quality = analyzeImageQuality(video);
            const faceSize = calculateFaceSize(detections[0], video);
            const brightness = analyzeBrightness(video);
            
            setQualityScore(quality);
            setFaceSizeWarning(faceSize < 0.15);
            setBrightnessWarning(brightness < 20 || brightness > 250);
            
            console.log(`Pose ${requiredPoses[currentPoseIndex].name}:`, {
              confidence: analysis.confidence,
              headTilt: analysis.headTilt,
              isSmiling: analysis.isSmiling,
              isEyesClosed: analysis.isEyesClosed,
              isFrontal: analysis.isFrontal
            });
            
            setFaceAnalysis({ ...analysis, quality, faceSize, brightness });
            drawFaceLandmarks(detections[0]);
            updatePoseMessage(analysis);
          } else {
            setFaceAnalysis({ 
              confidence: 0, 
              message: 'Tidak ada wajah',
              headTilt: 0,
              eyeAngle: 0,
              isSmiling: false,
              isEyesClosed: false,
              isFrontal: false
            });
            setCurrentPoseMessage("Tidak ada wajah");
          }
        } catch (error) {
          console.error("Detection error:", error);
        }
      }
    }, 100);

    setDetectionInterval(interval);
  };

  const updatePoseMessage = (analysis) => {
    const pose = requiredPoses[currentPoseIndex];
    
    if (pose.name === 'left_tilt') {
      if (analysis.headTilt > 2) {
        setCurrentPoseMessage("Miring kiri ✓");
      } else if (analysis.headTilt > 0) {
        setCurrentPoseMessage("Miring ke kiri");
      } else {
        setCurrentPoseMessage("Miring ke kiri");
      }
    } else if (pose.name === 'right_tilt') {
      if (analysis.headTilt < -2) {
        setCurrentPoseMessage("Miring kanan ✓");
      } else if (analysis.headTilt < 0) {
        setCurrentPoseMessage("Miring ke kanan");
      } else {
        setCurrentPoseMessage("Miring ke kanan");
      }
    } else if (pose.name === 'eyes_closed') {
      if (analysis.isEyesClosed) {
        setCurrentPoseMessage("Mata tertutup ✓");
      } else {
        setCurrentPoseMessage("Tutup mata");
      }
    } else if (pose.name === 'smile') {
      if (analysis.isSmiling) {
        setCurrentPoseMessage("Senyum ✓");
      } else {
        setCurrentPoseMessage("Tersenyum");
      }
    } else if (pose.name === 'frontal') {
      if (analysis.isFrontal && Math.abs(analysis.headTilt) < 10) {
        setCurrentPoseMessage("Posisi sempurna ✓");
      } else {
        setCurrentPoseMessage("Hadap lurus");
      }
    } else if (pose.name === 'look_up') {
      setCurrentPoseMessage("Dongak");
    } else if (pose.name === 'look_down') {
      setCurrentPoseMessage("Tunduk");
    } else {
      setCurrentPoseMessage(pose.desc);
    }
  };

  const analyzeImageQuality = (video) => {
    const canvas = document.createElement('canvas');
    canvas.width = 30;
    canvas.height = 30;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 30, 30);
    const data = ctx.getImageData(0, 0, 30, 30).data;
    
    let contrast = 0;
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
      contrast += Math.abs(gray - 128);
    }
    return Math.min(1, contrast / (data.length / 4) / 50);
  };

  const calculateFaceSize = (detection, video) => {
    const box = detection.detection.box;
    return (box.width * box.height) / (video.videoWidth * video.videoHeight);
  };

  const analyzeBrightness = (video) => {
    const canvas = document.createElement('canvas');
    canvas.width = 20;
    canvas.height = 20;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 20, 20);
    const data = ctx.getImageData(0, 0, 20, 20).data;
    
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      sum += data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114;
    }
    return sum / (data.length / 4);
  };

  const validateAndCapture = () => {
    if (!faceAnalysis) return;
    
    const now = Date.now();
    if (now - lastCaptureTime < 300) return;
    
    const pose = requiredPoses[currentPoseIndex];
    let isMatch = false;
    
    if (pose.name === 'left_tilt') {
      isMatch = faceAnalysis.headTilt > 1.5;
    } else if (pose.name === 'right_tilt') {
      isMatch = faceAnalysis.headTilt < -1.5;
    } else if (pose.name === 'eyes_closed') {
      isMatch = faceAnalysis.isEyesClosed;
    } else if (pose.name === 'smile') {
      isMatch = faceAnalysis.isSmiling;
    } else if (pose.name === 'frontal') {
      isMatch = faceAnalysis.isFrontal && Math.abs(faceAnalysis.headTilt) < 12;
    } else {
      isMatch = true; // Untuk look_up, look_down, langsung true
    }
    
    if (isMatch && faceAnalysis.confidence >= pose.threshold && !faceSizeWarning) {
      setStableCounter(prev => prev + 1);
      if (stableCounter >= 0) {
        setLastCaptureTime(now);
        setCaptureConfidence(faceAnalysis.confidence);
        captureImage();
      }
    } else {
      setStableCounter(0);
    }
  };

  const drawFaceLandmarks = (detection) => {
    const canvas = canvasRef.current;
    if (!canvas || !webcamRef.current?.video) return;
    
    const video = webcamRef.current.video;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!detection?.landmarks) return;
    
    const landmarks = detection.landmarks;
    const jawOutline = landmarks.getJawOutline();
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const nose = landmarks.getNose();
    const mouth = landmarks.getMouth();
    
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    jawOutline.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    [...leftEye, ...rightEye, ...nose, ...mouth].forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const startScan = () => {
    setStep("scanning");
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;
    
    const newImages = [...capturedImages, imageSrc];
    setCapturedImages(newImages);
    
    const progressValue = ((currentPoseIndex + 1) / requiredPoses.length) * 100;
    setProgress(progressValue);

    if (mode === "register" && currentPoseIndex + 1 < requiredPoses.length) {
      setCurrentPoseIndex(currentPoseIndex + 1);
      setAutoCaptureActive(true);
      setCaptureConfidence(0);
      setStableCounter(0);
    } else {
      processImages(newImages);
    }
  };

  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([new Uint8Array(byteNumbers)], { type: 'image/jpeg' });
  };

  const processImages = async (images) => {
    setStep("processing");
    setMessage("Menganalisis wajah...");
    setSaving(true);

    const formData = new FormData();
    formData.append("employee_id", employeeId);

    if (mode === "register") {
      requiredPoses.forEach(p => formData.append("poses", p.name));
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("images", base64ToBlob(images[i]), `face_${i}.jpg`);
    }

    try {
      const endpoint = mode === "register" ? "/face/register" : "/face/verify";
      const response = await api.post(endpoint, formData);
      
      setProgress(100);
      const result = response.data;

      if (result.success) {
        setStep("success");
        setMessage(mode === "register" ? "Registrasi berhasil!" : "Verifikasi berhasil!");
        setTimeout(() => {
          onSubmit(result.data);
          onClose();
        }, 1500);
      } else {
        setStep("failed");
        setMessage(result.message || "Gagal");
      }
    } catch (error) {
      console.error("Error:", error);
      setStep("failed");
      setMessage(error.response?.data?.message || "Gagal");
    } finally {
      setSaving(false);
    }
  };

  const retry = () => resetState();

  if (!isOpen) return null;

  const renderScanningOverlay = () => {
    const pose = requiredPoses[currentPoseIndex];
    const hasFace = faceAnalysis?.confidence > 0;
    
    const getStatusColor = () => {
      if (!hasFace) return 'border-red-500';
      if (faceSizeWarning) return 'border-yellow-500';
      if (faceAnalysis.confidence < pose.threshold) return 'border-yellow-500';
      return 'border-green-500';
    };

    const displayConfidence = faceAnalysis?.confidence || 0;

    return (
      <div>
        <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="w-full h-full object-cover"
            onUserMedia={() => setCameraReady(true)}
          />
          
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-72 h-72">
              <div className={`absolute inset-0 border-4 rounded-full ${getStatusColor()}`} />
              <div className="absolute inset-4 border-2 border-white/30 rounded-full" />
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 -translate-x-1/2" />
            </div>
          </div>

          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium">
            {pose.label}
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs">
            {currentPoseMessage || pose.desc}
          </div>

          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-[10px]">
            {Math.round(displayConfidence * 100)}%
          </div>

          <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-[10px]">
            {currentPoseIndex + 1}/{requiredPoses.length}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div>
            <div className="flex justify-between text-[11px] text-gray-600 mb-0.5">
              <span>Kesesuaian</span>
              <span className={displayConfidence >= pose.threshold ? 'text-green-600' : 'text-yellow-600'}>
                {Math.round(displayConfidence * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-[#1C4D8D] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${displayConfidence * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-gray-600 mb-0.5">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-[#1C4D8D] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-3">
      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-3xl shadow-xl border border-gray-200 flex flex-col max-h-[90vh]">
        <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {mode === "register" ? "Registrasi Wajah" : "Verifikasi Wajah"}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {mode === "register" ? "Ambil 7 pose wajah" : "Verifikasi wajah"}
              </p>
            </div>
            <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              disabled={saving}>
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-4">
            {loadingModels && (
              <div className="text-center py-10">
                <Loader size={32} className="animate-spin mx-auto mb-3 text-[#1C4D8D]" />
                <p className="text-xs text-gray-600">Memuat model...</p>
              </div>
            )}

            {!loadingModels && step === "prepare" && (
              <div>
                {mode === "register" && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                      7 Pose Wajah
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {requiredPoses.map((pose, idx) => (
                        <div key={idx} className="flex items-center p-2 rounded-lg border bg-gray-50 border-gray-100">
                          <div className="w-6 h-6 rounded-full bg-[#1C4D8D] flex items-center justify-center mr-2 flex-shrink-0">
                            <span className="text-xs font-bold text-white">{idx + 1}</span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-700">{pose.label}</p>
                            <p className="text-[10px] text-gray-500">{pose.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                      <Sparkles size={12} className="text-gray-500" />
                      Tips
                    </h4>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {[
                      "Wajah dalam lingkaran",
                      "Cahaya cukup",
                      "Foto otomatis",
                      "~1 menit"
                    ].map((tip, i) => (
                      <div key={i} className="flex items-center p-2 hover:bg-gray-50">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                          <CheckCircle size={10} className="text-blue-600" />
                        </div>
                        <span className="text-xs text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!loadingModels && step === "scanning" && renderScanningOverlay()}

            {step === "processing" && (
              <div className="text-center py-10">
                <Loader size={32} className="animate-spin mx-auto mb-3 text-[#1C4D8D]" />
                <p className="text-xs text-gray-600">{message}</p>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 max-w-sm mx-auto">
                  <div className="bg-[#1C4D8D] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{message}</h4>
                <p className="text-xs text-gray-500">Mengalihkan...</p>
              </div>
            )}

            {step === "failed" && (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle size={32} className="text-red-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{message}</h4>
                <p className="text-xs text-gray-500 mb-4">Silakan coba lagi</p>
                <div className="flex justify-center gap-2">
                  <button onClick={retry} className="px-4 py-1.5 bg-[#1C4D8D] text-white rounded-lg hover:bg-[#163a6f] text-xs font-medium">
                    Coba Lagi
                  </button>
                  <button onClick={onClose} className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-xs font-medium">
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <button onClick={onClose} disabled={saving}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
              Tutup
            </button>
            
            {step === "prepare" && (
              <button onClick={startScan} disabled={saving || !modelsLoaded}
                className="px-4 py-2 bg-[#1C4D8D] text-white rounded-lg hover:bg-[#163a6f] text-sm font-medium flex items-center gap-1 disabled:opacity-50">
                <Camera size={16} />
                <span>Mulai Scan</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}