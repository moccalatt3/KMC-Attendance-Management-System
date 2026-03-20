import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  FolderTree,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function ModalDepartment({ isOpen, onClose, onSubmit, department, mode }) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    parent_id: "",
    description: "",
    is_active: true,
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "Lengkapi data divisi dengan teliti",
    "Pastikan kode divisi unik",
    "Data akan digunakan untuk struktur organisasi",
    "Isi semua field yang wajib"
  ];

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
      
      if (department && mode === "edit") {
        setFormData({
          code: department.code || "",
          name: department.name || "",
          parent_id: department.parent_id || "",
          description: department.description || "",
          is_active: department.is_active !== undefined ? department.is_active : true,
        });
      } else {
        setFormData({
          code: "",
          name: "",
          parent_id: "",
          description: "",
          is_active: true,
        });
      }
      setErrors({});
      setSaving(false);

      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [department, mode, isOpen]);

  const fetchDepartments = async () => {
    setLoadingDepts(true);
    try {
      const { default: departmentService } = await import('../../services/departmentService');
      const response = await departmentService.ambilAktif();
      if (response.success) {
        setDepartments(response.data);
      }
    } catch (error) {
      console.error('Error fetch departments:', error);
    } finally {
      setLoadingDepts(false);
    }
  };

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
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = "Kode divisi wajib diisi";
    if (!formData.name) newErrors.name = "Nama divisi wajib diisi";
    
    if (formData.code && !/^[A-Z0-9]+$/.test(formData.code)) {
      newErrors.code = "Kode divisi hanya boleh huruf kapital dan angka";
    }
    
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
      const submitData = {
        ...formData,
        code: formData.code.toUpperCase(),
        parent_id: formData.parent_id || null,
      };
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSaving(false);
    }
  };

  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div 
        className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-2xl shadow-xl border border-gray-200 flex flex-col max-h-[90vh]">
        <div className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {isEdit ? "Edit Divisi" : "Tambah Divisi Baru"}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {isEdit ? 'Perbarui informasi divisi' : 'Lengkapi form untuk menambahkan divisi baru'}
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
                  Informasi Dasar Divisi
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Kode Divisi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      disabled={isEdit || saving}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm uppercase ${
                        errors.code ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } ${(isEdit || saving) ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      placeholder="HRD, FIN, MED, ..."
                    />
                    {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nama Divisi <span className="text-red-500">*</span>
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
                      placeholder="Human Resource Department"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Induk Divisi
                    </label>
                    <select
                      name="parent_id"
                      value={formData.parent_id}
                      onChange={handleChange}
                      disabled={loadingDepts || saving}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                    >
                      <option value="">Tidak Ada (Root Divisi)</option>
                      {departments
                        .filter(d => isEdit ? d.id !== department?.id : true)
                        .map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.code} - {dept.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      disabled={saving}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                      placeholder="Deskripsi tentang divisi ini..."
                    />
                  </div>

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
                      Kode divisi harus unik dan menggunakan huruf kapital
                    </span>
                  </div>
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">
                      Biarkan "Induk Divisi" kosong untuk root/parent divisi
                    </span>
                  </div>
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={12} className="text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-700">
                      Divisi yang dinonaktifkan tidak akan muncul di dropdown
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
                  <span>{isEdit ? 'Update Divisi' : 'Simpan Divisi'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}