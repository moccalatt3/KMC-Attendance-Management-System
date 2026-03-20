import React from "react";
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  Heart,
  Award,
  Users,
  Hash,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function ModalDetailKaryawan({ isOpen, onClose, karyawan, loading }) {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const getAvatarColor = (nama) => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", 
      "bg-indigo-500", "bg-pink-500", "bg-teal-500", "bg-orange-500"
    ];
    if (!nama) return colors[0];
    const index = nama.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitial = (nama) => {
    return nama?.charAt(0) || "?";
  };

  const getGenderLabel = (gender) => {
    if (gender === "L") return "Laki-laki";
    if (gender === "P") return "Perempuan";
    return "-";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity" 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-4xl shadow-xl border border-gray-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                Detail Karyawan
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Informasi lengkap data karyawan
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Tutup"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-5">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-[#1C4D8D] border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-sm text-gray-600">Memuat data...</span>
              </div>
            ) : karyawan ? (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className={`w-16 h-16 rounded-full ${getAvatarColor(karyawan.full_name)} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                    {getInitial(karyawan.full_name)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{karyawan.full_name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Briefcase size={12} className="mr-1" />
                        {karyawan.position_id || "-"}
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Hash size={12} className="mr-1" />
                        {karyawan.employee_id}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        karyawan.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {karyawan.is_active ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Informasi Pribadi */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Heart size={12} className="text-blue-600" />
                    </div>
                    <h5 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                      Informasi Pribadi
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Nama Lengkap</p>
                      <p className="text-sm font-medium">{karyawan.full_name}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Nama Panggilan</p>
                      <p className="text-sm font-medium">{karyawan.nickname || "-"}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Tempat, Tanggal Lahir</p>
                      <p className="text-sm font-medium">
                        {karyawan.birth_place || "-"}, {formatDate(karyawan.birth_date)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Jenis Kelamin</p>
                      <p className="text-sm font-medium">{getGenderLabel(karyawan.gender)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Agama</p>
                      <p className="text-sm font-medium">{karyawan.religion || "-"}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">NIK</p>
                      <p className="text-sm font-mono font-medium">{karyawan.nik || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Kontak & Alamat */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Mail size={12} className="text-green-600" />
                    </div>
                    <h5 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                      Kontak & Alamat
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 flex items-center">
                        <Mail size={12} className="mr-1" /> Email
                      </p>
                      <p className="text-sm font-medium">{karyawan.email}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 flex items-center">
                        <Phone size={12} className="mr-1" /> No. Handphone
                      </p>
                      <p className="text-sm font-medium">{karyawan.phone || "-"}</p>
                    </div>
                    <div className="md:col-span-2 bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 flex items-center">
                        <MapPin size={12} className="mr-1" /> Alamat
                      </p>
                      <p className="text-sm font-medium">{karyawan.address || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Kepegawaian */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <Briefcase size={12} className="text-purple-600" />
                    </div>
                    <h5 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                      Kepegawaian
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Status Karyawan</p>
                      <p className="text-sm font-medium">{karyawan.employment_status || "-"}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1 flex items-center">
                        <Calendar size={12} className="mr-1" /> Tanggal Bergabung
                      </p>
                      <p className="text-sm font-medium">{formatDate(karyawan.join_date)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Tanggal Habis Kontrak</p>
                      <p className="text-sm font-medium">{formatDate(karyawan.contract_end_date) || "-"}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">ID Departemen</p>
                      <p className="text-sm font-medium">{karyawan.department_id || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Bank & BPJS */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <Award size={12} className="text-amber-600" />
                    </div>
                    <h5 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                      Bank & BPJS
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Nama Bank</p>
                      <p className="text-sm font-medium">{karyawan.bank_name || "-"}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">No. Rekening</p>
                      <p className="text-sm font-mono font-medium">{karyawan.bank_account || "-"}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">BPJS Kesehatan</p>
                      <p className="text-sm font-mono font-medium">{karyawan.bpjs_health_no || "-"}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">BPJS Ketenagakerjaan</p>
                      <p className="text-sm font-mono font-medium">{karyawan.bpjs_employment_no || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <AlertCircle size={20} className="text-red-500 mr-2" />
                <span className="text-sm text-red-600">Data tidak ditemukan</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}