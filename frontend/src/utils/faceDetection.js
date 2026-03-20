import * as faceapi from 'face-api.js';

let modelsLoaded = false;

export const loadModels = async () => {
  if (modelsLoaded) return true;
  
  try {
    const modelPath = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
    await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
    modelsLoaded = true;
    console.log('Face-api models loaded successfully');
    return true;
  } catch (error) {
    console.error('Error loading face-api models:', error);
    return false;
  }
};

export const detectFace = async (videoElement) => {
  if (!videoElement) return null;
  
  try {
    const detections = await faceapi
      .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    
    return detections;
  } catch (error) {
    console.error('Error detecting face:', error);
    return null;
  }
};

export const analyzePose = (detections) => {
  if (!detections || detections.length === 0) {
    return { pose: null, confidence: 0, message: 'Tidak ada wajah terdeteksi' };
  }

  const detection = detections[0];
  const landmarks = detection.landmarks;
  const expressions = detection.expressions;
  
  const jawOutline = landmarks.getJawOutline();
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const nose = landmarks.getNose();
  const mouth = landmarks.getMouth();
  
  const leftEyeCenter = getCenterPoint(leftEye);
  const rightEyeCenter = getCenterPoint(rightEye);
  const noseTip = nose[3];
  
  const eyeAngle = calculateAngle(leftEyeCenter, rightEyeCenter);
  const headTilt = Math.abs(eyeAngle);
  
  const eyeDistance = Math.abs(leftEyeCenter.x - rightEyeCenter.x);
  const faceWidth = Math.abs(jawOutline[0].x - jawOutline[16].x);
  const faceSize = faceWidth / eyeDistance;
  
  const isFrontal = headTilt < 10 && faceSize > 1.8 && faceSize < 2.5;
  
  const smileValue = expressions.happy;
  const isSmiling = smileValue > 0.6;
  
  const isLeftTilt = eyeAngle > 15;
  const isRightTilt = eyeAngle < -15;
  
  const eyeOpenness = getEyeOpenness(leftEye, rightEye);
  const isEyesClosed = eyeOpenness < 0.2;
  
  const nosePosition = noseTip.y / faceWidth;
  const isLookingUp = nosePosition < 0.4;
  const isLookingDown = nosePosition > 0.7;
  
  let pose = 'unknown';
  let confidence = 0;
  let message = '';
  
  if (!isFrontal) {
    pose = 'non_frontal';
    confidence = 1 - headTilt / 45;
    message = 'Hadapkan wajah lurus ke kamera';
  } else if (isEyesClosed) {
    pose = 'eyes_closed';
    confidence = eyeOpenness;
    message = 'Buka mata Anda';
  } else if (isSmiling) {
    pose = 'smile';
    confidence = smileValue;
    message = 'Senyum! Sempurna';
  } else if (isLeftTilt) {
    pose = 'left_tilt';
    confidence = Math.min(1, Math.abs(eyeAngle) / 30);
    message = 'Miring ke kiri';
  } else if (isRightTilt) {
    pose = 'right_tilt';
    confidence = Math.min(1, Math.abs(eyeAngle) / 30);
    message = 'Miring ke kanan';
  } else if (isLookingUp) {
    pose = 'look_up';
    confidence = 1 - nosePosition * 1.5;
    message = 'Dongakkan kepala';
  } else if (isLookingDown) {
    pose = 'look_down';
    confidence = (nosePosition - 0.5) * 2;
    message = 'Tundukkan kepala';
  } else {
    pose = 'frontal';
    confidence = 1 - headTilt / 20;
    message = 'Pertahankan posisi';
  }
  
  return {
    pose,
    confidence: Math.max(0, Math.min(1, confidence)),
    message,
    headTilt,
    eyeAngle,
    faceSize,
    expressions,
    isSmiling,
    isEyesClosed,
    isFrontal
  };
};

export const checkPoseMatch = (currentPose, targetPose) => {
  if (targetPose === 'frontal' && currentPose.isFrontal) return true;
  if (targetPose === 'smile' && currentPose.isSmiling && currentPose.isFrontal) return true;
  if (targetPose === 'left_tilt' && currentPose.pose === 'left_tilt') return true;
  if (targetPose === 'right_tilt' && currentPose.pose === 'right_tilt') return true;
  if (targetPose === 'look_up' && currentPose.pose === 'look_up') return true;
  if (targetPose === 'look_down' && currentPose.pose === 'look_down') return true;
  if (targetPose === 'eyes_closed' && currentPose.isEyesClosed) return true;
  return false;
};

export const calculateLiveness = async (videoElement) => {
  const detections = await detectFace(videoElement);
  if (!detections || detections.length === 0) return false;
  
  const expressions = detections[0].expressions;
  const landmarks = detections[0].landmarks;
  
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const eyeOpenness = getEyeOpenness(leftEye, rightEye);
  
  const hasExpression = expressions.happy > 0.3 || expressions.surprised > 0.3;
  const eyesMoving = eyeOpenness > 0.1;
  
  return hasExpression || eyesMoving;
};

const getCenterPoint = (points) => {
  const sum = points.reduce((acc, point) => ({
    x: acc.x + point.x,
    y: acc.y + point.y
  }), { x: 0, y: 0 });
  
  return {
    x: sum.x / points.length,
    y: sum.y / points.length
  };
};

const calculateAngle = (p1, p2) => {
  const deltaY = p2.y - p1.y;
  const deltaX = p2.x - p1.x;
  return Math.atan2(deltaY, deltaX) * 180 / Math.PI;
};

const getEyeOpenness = (leftEye, rightEye) => {
  const leftOpen = Math.abs(leftEye[1].y - leftEye[4].y);
  const rightOpen = Math.abs(rightEye[1].y - rightEye[4].y);
  return (leftOpen + rightOpen) / 2;
};