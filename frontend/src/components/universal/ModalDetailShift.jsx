import React from "react";
import {
  X,
  Clock,
  Calendar,
  MapPin,
  Tag,
  CheckCircle,
  XCircle,
  Moon,
  Sun,
  Cloud,
  Briefcase,
  Home
} from "lucide-react";

export default function ModalDetailShift({ isOpen, onClose, shift }) {
  if (!isOpen || !shift) return null;

  const getShiftTypeIcon = (type) => {
    switch(type) {
      case "pagi": return <Sun size={16} className="text-yellow-500" />;
      case "siang": return <Sun size={16} className="text-orange-500" />;
      case "malam": return <Moon size={16} className="text-indigo-500" />;
      case "middle": return <Clock size={16} className="text-purple-500" />;
      case "office": return <Briefcase size={16} className="text-green-500" />;
      case "wfh": return <Home size={16} className="text-teal-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getShiftTypeBadge = (type) => {
    const colors = {
      pagi: "bg-blue-100 text-blue-800",
      siang: "bg-yellow-100 text-yellow-800",
      malam: "bg-indigo-100 text-indigo-800",
      middle: "bg-purple-100 text-purple-800",
      office: "bg-green-100 text-green-800",
      wfh: "bg-teal-100 text-teal-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const formatTime = (time) => {
    if (!time) return "-";
    return time.substring(0, 5);
  };

  const calculateWorkHours = () => {
    if (!shift.check_in_time || !shift.check_out_time || shift.is_wfh) return "-";
    
    const masuk = shift.check_in_time.split(':').map(Number);
    const keluar = shift.check_out_time.split(':').map(Number);
    
    let jam = keluar[0] - masuk[0];
    if (jam < 0) jam += 24;
    
    const menit = keluar[1] - masuk[1];
    const totalJam = jam + menit/60;
    const afterBreak = totalJam - (shift.break_minutes / 60);
    
    return `${afterBreak.toFixed(1)} jam (${totalJam.toFixed(1)} jam - ${shift.break_minutes} menit)`;
  };

  const InfoRow = ({ label, value }) => (
    <div className="flex py-2 border-b border-gray-100">
      <span className="text-xs text-gray-500 w-1/3">{label}</span>
      <span className="text-xs font-medium text-gray-900 w-2/3">{value || "-"}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div 
        className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-2xl shadow-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#1C4D8D]/10 rounded-lg">
                <Clock size={20} className="text-[#1C4D8D]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Detail Shift
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Informasi lengkap shift kerja
                </p>
              </div>
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

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#1C4D8D]/10 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-[#1C4D8D]">{shift.code}</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{shift.name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getShiftTypeBadge(shift.shift_type)}`}>
                    {getShiftTypeIcon(shift.shift_type)}
                    {shift.shift_type}
                  </span>
                  {shift.is_wfh && (
                    <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                      WFH
                    </span>
                  )}
                  {shift.is_overnight && (
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                      Lintas Hari
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
              shift.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {shift.is_active ? 'Aktif' : 'Nonaktif'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                Jam Kerja
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Jam Masuk</span>
                  <span className="text-sm font-medium text-gray-900">{formatTime(shift.check_in_time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Jam Keluar</span>
                  <span className="text-sm font-medium text-gray-900">{formatTime(shift.check_out_time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Istirahat</span>
                  <span className="text-sm font-medium text-gray-900">{shift.break_minutes} menit</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Total Jam Efektif</span>
                  <span className="text-sm font-bold text-[#1C4D8D]">{calculateWorkHours()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Tag size={14} className="text-gray-400" />
                Toleransi & Lembur
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Toleransi Telat</span>
                  <span className="text-sm font-medium text-gray-900">{shift.late_tolerance} menit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Toleransi Pulang Cepat</span>
                  <span className="text-sm font-medium text-gray-900">{shift.early_out_tol} menit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Minimal Lembur</span>
                  <span className="text-sm font-medium text-gray-900">{shift.overtime_min} menit</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              Informasi Sistem
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow label="ID Shift" value={shift.id} />
              <InfoRow label="Dibuat Pada" value={shift.created_at ? new Date(shift.created_at).toLocaleString('id-ID') : '-'} />
              <InfoRow label="Diperbarui Pada" value={shift.updated_at ? new Date(shift.updated_at).toLocaleString('id-ID') : '-'} />
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1C4D8D] text-white rounded-lg hover:bg-[#163a6f] transition-colors font-medium text-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}