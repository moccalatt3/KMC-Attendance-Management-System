import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Camera,
  Calendar,
  LogIn,
  LogOut,
  Wifi,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ModalFaceScan from "../../components/universal/ModalFaceScan";

export default function Absensi() {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [wifiStatus, setWifiStatus] = useState("Tersambung");
  const [faceVerified, setFaceVerified] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);
  const [faceMode, setFaceMode] = useState("verify");
  const [shift] = useState({
    kode: "P",
    nama: "Pagi",
    jamMasuk: "07:00",
    jamKeluar: "14:00",
  });

  const officeWifi = {
    ssid: "Klinik-WiFi",
    security: "WPA2",
    strength: "Kuat",
  };

  useEffect(() => {
    if (user?.employee_id) {
      console.log("User employee_id:", user.employee_id);
    }
  }, [user]);

  const handleOpenFaceModal = (mode) => {
    setFaceMode(mode);
    setShowFaceModal(true);
  };

  const handleFaceSuccess = (data) => {
    setFaceVerified(true);
    
    if (faceMode === "verify" && !isCheckedIn) {
      const now = new Date();
      setCheckInTime(
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      );
      setIsCheckedIn(true);
    }
  };

  const handleCheckIn = () => {
    if (wifiStatus === "Tersambung") {
      if (!faceVerified) {
        handleOpenFaceModal("verify");
      } else {
        const now = new Date();
        setCheckInTime(
          now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        );
        setIsCheckedIn(true);
      }
    }
  };

  const handleCheckOut = () => {
    if (wifiStatus === "Tersambung") {
      const now = new Date();
      setCheckOutTime(
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      );
      setIsCheckedIn(false);
    }
  };

  const handleFaceRegistration = () => {
    handleOpenFaceModal("register");
  };

  const canCheckIn = wifiStatus === "Tersambung";
  const canCheckOut = wifiStatus === "Tersambung";

  const summaryCards = [
    {
      title: "SHIFT HARI INI",
      value: `${shift.kode} - ${shift.nama}`,
      change: shift.jamMasuk,
      description: "jam masuk",
      icon: <Calendar size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "JAM MASUK",
      value: shift.jamMasuk,
      change: checkInTime || "--:--",
      description: checkInTime ? "waktu check in" : "belum absen",
      icon: <LogIn size={18} />,
      iconColor: checkInTime ? "text-green-600" : "text-gray-400",
      bgColor: checkInTime ? "bg-green-50" : "bg-gray-50",
    },
    {
      title: "JAM KELUAR",
      value: shift.jamKeluar,
      change: checkOutTime || "--:--",
      description: checkOutTime ? "waktu check out" : "belum pulang",
      icon: <LogOut size={18} />,
      iconColor: checkOutTime ? "text-orange-600" : "text-gray-400",
      bgColor: checkOutTime ? "bg-orange-50" : "bg-gray-50",
    },
    {
      title: "STATUS WAJAH",
      value: faceVerified ? "TERVERIFIKASI" : "BELUM VERIF",
      change: faceVerified ? "✓" : "✗",
      description: "face recognition",
      icon: <Camera size={18} />,
      iconColor: faceVerified ? "text-green-600" : "text-yellow-600",
      bgColor: faceVerified ? "bg-green-50" : "bg-yellow-50",
    },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Absensi Harian</h1>
            <p className="text-sm text-gray-600 mt-1">
              Lakukan check-in dan check-out dengan Face Recognition
            </p>
          </div>
          
          {!faceVerified && (
            <button
              onClick={handleFaceRegistration}
              className="flex items-center space-x-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f]"
            >
              <Camera size={16} />
              <span>Registrasi Wajah</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {card.title}
              </p>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <div className={card.iconColor}>{card.icon}</div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {card.value}
            </h3>
            <div className="flex items-center">
              <div className="flex items-center text-green-600">
                <span className="text-xs font-medium">{card.change}</span>
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {card.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs text-gray-500">Shift {shift.nama}</p>
                <p className="text-base font-semibold text-gray-900">
                  {shift.jamMasuk} - {shift.jamKeluar}
                </p>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${isCheckedIn ? "bg-green-500" : "bg-yellow-500"}`}
              ></div>
              <span className="text-sm text-gray-700">
                {isCheckedIn ? "Sudah Check In" : "Belum Check In"}
              </span>
            </div>
          </div>

          {checkInTime && !checkOutTime && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
              <Clock size={14} className="text-blue-600" />
              <span className="text-xs font-medium text-blue-700">
                Check In: {checkInTime}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <LogIn size={16} className="text-green-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      Check In
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {checkInTime || <span className="text-gray-300">--:--</span>}
                </p>
                {checkInTime && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle size={12} />
                    <span>Check In berhasil</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-100 rounded-lg">
                      <LogOut size={16} className="text-orange-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      Check Out
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {checkOutTime || <span className="text-gray-300">--:--</span>}
                </p>
                {checkOutTime && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle size={12} />
                    <span>Check Out berhasil</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Status WiFi Kantor
                </p>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Wifi size={18} className="text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-green-700">
                        {wifiStatus}
                      </p>
                      <p className="text-xs text-gray-500">{officeWifi.ssid}</p>
                    </div>
                  </div>
                  <CheckCircle size={18} className="text-green-600" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Verifikasi Wajah
                </p>
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  faceVerified ? "bg-green-50" : "bg-yellow-50"
                }`}>
                  <div className="flex items-center gap-2">
                    <Camera size={18} className={faceVerified ? "text-green-600" : "text-yellow-600"} />
                    <div>
                      <p className={`text-sm font-semibold ${
                        faceVerified ? "text-green-700" : "text-yellow-700"
                      }`}>
                        {faceVerified ? "Terverifikasi" : "Belum Verifikasi"}
                      </p>
                    </div>
                  </div>
                  {faceVerified ? (
                    <CheckCircle size={18} className="text-green-600" />
                  ) : (
                    <button
                      onClick={handleFaceRegistration}
                      className="text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                    >
                      Registrasi
                    </button>
                  )}
                </div>
              </div>
            </div>

            {!isCheckedIn ? (
              <button
                onClick={handleCheckIn}
                disabled={!canCheckIn}
                className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 ${
                  canCheckIn
                    ? "bg-[#1C4D8D] text-white hover:bg-[#163a6f]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Camera size={18} />
                <span>
                  {!canCheckIn
                    ? "Tidak Ada WiFi"
                    : !faceVerified
                      ? "Verifikasi Wajah Dulu"
                      : "Check In"}
                </span>
              </button>
            ) : !checkOutTime ? (
              <button
                onClick={handleCheckOut}
                disabled={!canCheckOut}
                className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 ${
                  canCheckOut
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <LogOut size={18} />
                <span>Check Out</span>
              </button>
            ) : (
              <div className="w-full py-3 bg-gray-100 text-gray-500 rounded-xl text-sm font-semibold flex items-center justify-center gap-3">
                <CheckCircle size={18} />
                <span>Selesai</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalFaceScan
        isOpen={showFaceModal}
        onClose={() => setShowFaceModal(false)}
        onSubmit={handleFaceSuccess}
        mode={faceMode}
        employeeId={user?.employee_id}
      />
    </div>
  );
}