import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function ModalShift({ isOpen, onClose, onSubmit, shift, mode }) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    shift_type: "pagi",
    check_in_time: "",
    check_out_time: "",
    break_minutes: 60,
    is_overnight: false,
    is_wfh: false,
    late_tolerance: 15,
    early_out_tol: 15,
    overtime_min: 30,
    is_active: true,
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "Lengkapi data shift dengan teliti",
    "Pastikan kode shift unik",
    "Data akan digunakan untuk absensi karyawan",
    "Isi semua field yang wajib"
  ];

  useEffect(() => {
    if (shift && mode === "edit") {
      setFormData({
        code: shift.code || "",
        name: shift.name || "",
        shift_type: shift.shift_type || "pagi",
        check_in_time: shift.check_in_time || "",
        check_out_time: shift.check_out_time || "",
        break_minutes: shift.break_minutes || 60,
        is_overnight: shift.is_overnight || false,
        is_wfh: shift.is_wfh || false,
        late_tolerance: shift.late_tolerance || 15,
        early_out_tol: shift.early_out_tol || 15,
        overtime_min: shift.overtime_min || 30,
        is_active: shift.is_active !== undefined ? shift.is_active : true,
      });
    } else {
      setFormData({
        code: "",
        name: "",
        shift_type: "pagi",
        check_in_time: "",
        check_out_time: "",
        break_minutes: 60,
        is_overnight: false,
        is_wfh: false,
        late_tolerance: 15,
        early_out_tol: 15,
        overtime_min: 30,
        is_active: true,
      });
    }
    setErrors({});
    setSaving(false);

    if (isOpen) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [shift, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }

    if (name === "is_wfh" && checked) {
      setFormData(prev => ({
        ...prev,
        check_in_time: "",
        check_out_time: "",
        break_minutes: 0,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = "Kode shift wajib diisi";
    if (!formData.name) newErrors.name = "Nama shift wajib diisi";
    
    if (!formData.is_wfh) {
      if (!formData.check_in_time) newErrors.check_in_time = "Jam masuk wajib diisi";
      if (!formData.check_out_time) newErrors.check_out_time = "Jam keluar wajib diisi";
    }
    
    if (formData.break_minutes < 0) newErrors.break_minutes = "Istirahat tidak boleh negatif";
    if (formData.late_tolerance < 0) newErrors.late_tolerance = "Toleransi tidak boleh negatif";
    if (formData.overtime_min < 0) newErrors.overtime_min = "Minimal lembur tidak boleh negatif";
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setSaving(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSaving(false);
    }
  };

  const isEdit = mode === "edit";
  const shiftTypes = [
    { value: "pagi", label: "Pagi" },
    { value: "siang", label: "Siang" },
    { value: "malam", label: "Malam" },
    { value: "middle", label: "Middle" },
    { value: "office", label: "Office" },
    { value: "wfh", label: "WFH" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div 
        className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity" 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>
      
      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-3xl shadow-xl border border-gray-200 flex flex-col max-h-[90vh]">
        <div className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {isEdit ? "Edit Shift" : "Tambah Shift Baru"}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {isEdit ? 'Perbarui informasi shift kerja' : 'Lengkapi form untuk menambahkan shift baru'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Tutup"
              disabled={saving}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Informasi Dasar Shift
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Kode Shift <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      disabled={isEdit || saving}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors.code ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } ${(isEdit || saving) ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      placeholder="P, S, M, MD, ..."
                    />
                    {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nama Shift <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={saving}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } ${saving ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      placeholder="Pagi, Siang, Malam, ..."
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tipe Shift
                    </label>
                    <select
                      name="shift_type"
                      value={formData.shift_type}
                      onChange={handleChange}
                      disabled={saving}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                    >
                      {shiftTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-4 pt-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_wfh"
                        checked={formData.is_wfh}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-[#1C4D8D] focus:ring-[#1C4D8D]"
                      />
                      <span className="text-sm text-gray-700">WFH (Work From Home)</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_overnight"
                        checked={formData.is_overnight}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-[#1C4D8D] focus:ring-[#1C4D8D]"
                      />
                      <span className="text-sm text-gray-700">Lintas Hari</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Jam Kerja
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Jam Masuk {!formData.is_wfh && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock size={14} className="text-gray-400" />
                      </div>
                      <input
                        type="time"
                        name="check_in_time"
                        value={formData.check_in_time}
                        onChange={handleChange}
                        disabled={formData.is_wfh || saving}
                        className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                          errors.check_in_time ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        } ${(formData.is_wfh || saving) ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      />
                    </div>
                    {errors.check_in_time && <p className="mt-1 text-xs text-red-500">{errors.check_in_time}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Jam Keluar {!formData.is_wfh && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock size={14} className="text-gray-400" />
                      </div>
                      <input
                        type="time"
                        name="check_out_time"
                        value={formData.check_out_time}
                        onChange={handleChange}
                        disabled={formData.is_wfh || saving}
                        className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                          errors.check_out_time ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        } ${(formData.is_wfh || saving) ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      />
                    </div>
                    {errors.check_out_time && <p className="mt-1 text-xs text-red-500">{errors.check_out_time}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Istirahat (menit)
                    </label>
                    <input
                      type="number"
                      name="break_minutes"
                      value={formData.break_minutes}
                      onChange={handleChange}
                      disabled={formData.is_wfh || saving}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors.break_minutes ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } ${(formData.is_wfh || saving) ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      min="0"
                      step="15"
                    />
                    {errors.break_minutes && <p className="mt-1 text-xs text-red-500">{errors.break_minutes}</p>}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Toleransi & Lembur
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Toleransi Telat (menit)
                    </label>
                    <input
                      type="number"
                      name="late_tolerance"
                      value={formData.late_tolerance}
                      onChange={handleChange}
                      disabled={saving}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors.late_tolerance ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } ${saving ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      min="0"
                      step="5"
                    />
                    {errors.late_tolerance && <p className="mt-1 text-xs text-red-500">{errors.late_tolerance}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Toleransi Pulang Cepat (menit)
                    </label>
                    <input
                      type="number"
                      name="early_out_tol"
                      value={formData.early_out_tol}
                      onChange={handleChange}
                      disabled={saving}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors.early_out_tol ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } ${saving ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      min="0"
                      step="5"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Minimal Lembur (menit)
                    </label>
                    <input
                      type="number"
                      name="overtime_min"
                      value={formData.overtime_min}
                      onChange={handleChange}
                      disabled={saving}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors.overtime_min ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } ${saving ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      min="0"
                      step="15"
                    />
                    {errors.overtime_min && <p className="mt-1 text-xs text-red-500">{errors.overtime_min}</p>}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Status
                </h4>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-[#1C4D8D] focus:ring-[#1C4D8D]"
                    />
                    <span className="text-sm text-gray-700">Aktif</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-2">
                    <Sparkles size={14} className="text-gray-500" />
                    Tips Pengisian Data
                  </h4>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={12} className="text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-700">
                      Kode shift harus unik dan tidak boleh sama dengan yang sudah ada
                    </span>
                  </div>
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">
                      Untuk shift WFH, jam masuk dan keluar tidak perlu diisi
                    </span>
                  </div>
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={12} className="text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-700">
                      Centang "Lintas Hari" untuk shift malam yang melewati tengah malam
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-400 italic text-center p-2 bg-gray-50 rounded-lg">
                💡 {placeholders[placeholderIndex]}
              </div>
            </form>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-4 py-2 bg-[#1C4D8D] text-white rounded-lg hover:bg-[#163a6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    <span>{isEdit ? 'Update Shift' : 'Simpan Shift'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}