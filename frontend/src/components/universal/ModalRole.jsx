import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Shield
} from "lucide-react";

export default function ModalRole({ isOpen, onClose, onSubmit, role, mode, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    description: "",
    level: 6
  });
  const [errors, setErrors] = useState({});
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "Lengkapi data role dengan teliti",
    "Pastikan nama role unik",
    "Level menentukan hierarki akses",
    "Isi semua field yang wajib"
  ];

  useEffect(() => {
    if (role && mode === "edit") {
      setFormData({
        name: role.name || "",
        display_name: role.display_name || "",
        description: role.description || "",
        level: role.level || 6
      });
    } else {
      setFormData({
        name: "",
        display_name: "",
        description: "",
        level: 6
      });
    }
    setErrors({});

    if (isOpen) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [role, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama role wajib diisi";
    if (!formData.display_name.trim()) newErrors.display_name = "Display name wajib diisi";
    if (!formData.level) newErrors.level = "Level wajib diisi";
    if (formData.level < 1 || formData.level > 10) newErrors.level = "Level harus antara 1-10";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  const levelOptions = [
    { value: 1, label: "Level 1 - Top Management (CEO/Direktur)" },
    { value: 2, label: "Level 2 - Top Management (Direktur)" },
    { value: 3, label: "Level 3 - Manajemen (Manager)" },
    { value: 4, label: "Level 4 - Staff (Supervisor/Coordinator)" },
    { value: 5, label: "Level 5 - Staff Senior" },
    { value: 6, label: "Level 6 - Staff" },
    { value: 7, label: "Level 7 - Staff Junior" },
    { value: 8, label: "Level 8 - Intern" },
    { value: 9, label: "Level 9 - Outsourcing" },
    { value: 10, label: "Level 10 - Others" }
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
      
      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-xl shadow-xl border border-gray-200 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {mode === "add" ? "Tambah Role Baru" : "Edit Role"}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {mode === "add" ? 'Lengkapi form untuk menambahkan role baru' : 'Perbarui informasi role'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Tutup"
              disabled={loading}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Informasi Role
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nama Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } ${loading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      placeholder="Contoh: HR_MANAGER, DOCTOR"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.name}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Gunakan huruf besar dan underscore
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Display Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="display_name"
                      value={formData.display_name}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors.display_name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } ${loading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      placeholder="Contoh: Manajer HRD"
                    />
                    {errors.display_name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.display_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors.level ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } ${loading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                    >
                      {levelOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.level && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.level}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Jelaskan tanggung jawab role ini..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                      disabled={loading}
                    />
                  </div>
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
                      Nama role harus unik dan tidak boleh sama dengan yang sudah ada
                    </span>
                  </div>
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">
                      Level 1 adalah level tertinggi (Super Admin/Direktur)
                    </span>
                  </div>
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={12} className="text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-700">
                      Role dengan level lebih rendah tidak bisa mengelola role di atasnya
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-400 italic text-center p-2 bg-gray-50 rounded-lg">
                {placeholders[placeholderIndex]}
              </div>
            </form>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-[#1C4D8D] text-white rounded-lg hover:bg-[#163a6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    <span>{mode === "add" ? "Simpan Role" : "Update Role"}</span>
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