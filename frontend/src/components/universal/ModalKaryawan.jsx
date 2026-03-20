import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  AlertCircle,
  Loader,
  Sparkles,
  CheckCircle,
  User,
  Briefcase,
  Banknote,
  Users
} from "lucide-react";
import departmentService from "../../services/departmentService";
import positionService from "../../services/positionService";

export default function ModalKaryawan({ 
  isOpen, 
  onClose, 
  onSubmit, 
  karyawan, 
  mode, 
  loading,
  roles 
}) {
  const [formData, setFormData] = useState({
    karyawan: {
      full_name: "",
      employee_id: "",
      email: "",
      phone: "",
      gender: "",
      birth_place: "",
      birth_date: "",
      religion: "",
      nik: "",
      address: "",
      position_id: "",
      department_id: "",
      join_date: "",
      employment_status: "Kontrak",
      contract_end_date: "",
      bank_name: "",
      bank_account: "",
      bpjs_health_no: "",
      bpjs_employment_no: "",
    },
    buatAkun: false,
    password: "",
    role_ids: []
  });

  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [loadingPositions, setLoadingPositions] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "Lengkapi data karyawan dengan teliti",
    "Pastikan NIP dan email belum terdaftar",
    "Data akan digunakan untuk payroll dan BPJS",
    "Isi semua field yang wajib diisi"
  ];

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
      fetchPositions();
      
      if (karyawan && mode === "edit") {
        setFormData({
          karyawan: {
            full_name: karyawan.full_name || "",
            employee_id: karyawan.employee_id || "",
            email: karyawan.email || "",
            phone: karyawan.phone || "",
            gender: karyawan.gender || "",
            birth_place: karyawan.birth_place || "",
            birth_date: karyawan.birth_date ? karyawan.birth_date.split('T')[0] : "",
            religion: karyawan.religion || "",
            nik: karyawan.nik || "",
            address: karyawan.address || "",
            position_id: karyawan.position_id || "",
            department_id: karyawan.department_id || "",
            join_date: karyawan.join_date ? karyawan.join_date.split('T')[0] : "",
            employment_status: karyawan.employment_status || "Kontrak",
            contract_end_date: karyawan.contract_end_date ? karyawan.contract_end_date.split('T')[0] : "",
            bank_name: karyawan.bank_name || "",
            bank_account: karyawan.bank_account || "",
            bpjs_health_no: karyawan.bpjs_health_no || "",
            bpjs_employment_no: karyawan.bpjs_employment_no || "",
          },
          buatAkun: false,
          password: "",
          role_ids: []
        });
      } else {
        setFormData({
          karyawan: {
            full_name: "",
            employee_id: "",
            email: "",
            phone: "",
            gender: "",
            birth_place: "",
            birth_date: "",
            religion: "",
            nik: "",
            address: "",
            position_id: "",
            department_id: "",
            join_date: "",
            employment_status: "Kontrak",
            contract_end_date: "",
            bank_name: "",
            bank_account: "",
            bpjs_health_no: "",
            bpjs_employment_no: "",
          },
          buatAkun: false,
          password: "",
          role_ids: []
        });
      }
      setErrors({});

      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [karyawan, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('karyawan.')) {
      const field = name.replace('karyawan.', '');
      setFormData(prev => ({
        ...prev,
        karyawan: { ...prev.karyawan, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleRoleChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(parseInt(options[i].value));
      }
    }
    setFormData(prev => ({ ...prev, role_ids: selected }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.karyawan.full_name.trim()) newErrors["karyawan.full_name"] = "Nama lengkap wajib diisi";
    if (!formData.karyawan.employee_id.trim()) newErrors["karyawan.employee_id"] = "NIP wajib diisi";
    if (!formData.karyawan.email.trim()) newErrors["karyawan.email"] = "Email wajib diisi";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.karyawan.email && !emailRegex.test(formData.karyawan.email)) {
      newErrors["karyawan.email"] = "Format email tidak valid";
    }
    
    if (formData.buatAkun) {
      if (!formData.password.trim()) {
        newErrors.password = "Password wajib diisi jika membuat akun";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password minimal 6 karakter";
      }
      
      if (formData.role_ids.length === 0) {
        newErrors.role_ids = "Minimal satu role harus dipilih";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const fetchDepartments = async () => {
    setLoadingDepts(true);
    try {
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

  const fetchPositions = async () => {
    setLoadingPositions(true);
    try {
      const response = await positionService.ambilAktif();
      if (response.success) {
        setPositions(response.data);
      }
    } catch (error) {
      console.error('Error fetch positions:', error);
    } finally {
      setLoadingPositions(false);
    }
  };

  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div 
        className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity" 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>
      
      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-4xl shadow-xl border border-gray-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {isEdit ? "Edit Karyawan" : "Tambah Karyawan Baru"}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {isEdit 
                  ? 'Perbarui informasi data karyawan' 
                  : 'Lengkapi form untuk menambahkan karyawan baru'}
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-5">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Data Pribadi */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                  Data Pribadi
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="karyawan.full_name"
                      value={formData.karyawan.full_name}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors["karyawan.full_name"] 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      } ${loading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors["karyawan.full_name"] && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors["karyawan.full_name"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      NIP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="karyawan.employee_id"
                      value={formData.karyawan.employee_id}
                      onChange={handleChange}
                      disabled={isEdit || loading}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors["karyawan.employee_id"] 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      } ${(isEdit || loading) ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      placeholder="Contoh: NIP-2024-001"
                    />
                    {errors["karyawan.employee_id"] && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors["karyawan.employee_id"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="karyawan.email"
                      value={formData.karyawan.email}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                        errors["karyawan.email"] 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      } ${loading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      placeholder="karyawan@perusahaan.com"
                    />
                    {errors["karyawan.email"] && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors["karyawan.email"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      No. Telepon
                    </label>
                    <input
                      type="text"
                      name="karyawan.phone"
                      value={formData.karyawan.phone}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                      placeholder="081234567890"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Jenis Kelamin
                    </label>
                    <select
                      name="karyawan.gender"
                      value={formData.karyawan.gender}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      name="karyawan.birth_place"
                      value={formData.karyawan.birth_place}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                      placeholder="Jakarta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      name="karyawan.birth_date"
                      value={formData.karyawan.birth_date}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Agama
                    </label>
                    <select
                      name="karyawan.religion"
                      value={formData.karyawan.religion}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                    >
                      <option value="">Pilih Agama</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      NIK
                    </label>
                    <input
                      type="text"
                      name="karyawan.nik"
                      value={formData.karyawan.nik}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                      placeholder="16 digit NIK"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Alamat
                    </label>
                    <textarea
                      name="karyawan.address"
                      value={formData.karyawan.address}
                      onChange={handleChange}
                      rows="2"
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                      placeholder="Alamat lengkap"
                    />
                  </div>
                </div>
              </div>

              {/* Data Kepegawaian */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                  Data Kepegawaian
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Departemen
                    </label>
                    <select
                      name="karyawan.department_id"
                      value={formData.karyawan.department_id}
                      onChange={handleChange}
                      disabled={loadingDepts || loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                    >
                      <option value="">Pilih Departemen</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>
                          {dept.code} - {dept.name}
                        </option>
                      ))}
                    </select>
                    {loadingDepts && (
                      <p className="mt-1 text-xs text-gray-500 flex items-center">
                        <Loader size={12} className="animate-spin mr-1" />
                        Memuat departemen...
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Jabatan
                    </label>
                    <select
                      name="karyawan.position_id"
                      value={formData.karyawan.position_id}
                      onChange={handleChange}
                      disabled={loadingPositions || loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                    >
                      <option value="">Pilih Jabatan</option>
                      {positions.map(pos => (
                        <option key={pos.id} value={pos.id}>
                          {pos.name}
                        </option>
                      ))}
                    </select>
                    {loadingPositions && (
                      <p className="mt-1 text-xs text-gray-500 flex items-center">
                        <Loader size={12} className="animate-spin mr-1" />
                        Memuat jabatan...
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tanggal Bergabung
                    </label>
                    <input
                      type="date"
                      name="karyawan.join_date"
                      value={formData.karyawan.join_date}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Status Karyawan
                    </label>
                    <select
                      name="karyawan.employment_status"
                      value={formData.karyawan.employment_status}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                    >
                      <option value="Tetap">Tetap</option>
                      <option value="Kontrak">Kontrak</option>
                      <option value="Magang">Magang</option>
                      <option value="Cuti">Cuti</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tanggal Akhir Kontrak
                    </label>
                    <input
                      type="date"
                      name="karyawan.contract_end_date"
                      value={formData.karyawan.contract_end_date}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Data Bank & BPJS */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                  Data Bank & BPJS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nama Bank
                    </label>
                    <input
                      type="text"
                      name="karyawan.bank_name"
                      value={formData.karyawan.bank_name}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                      placeholder="BCA, Mandiri, BRI, dll"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      No. Rekening
                    </label>
                    <input
                      type="text"
                      name="karyawan.bank_account"
                      value={formData.karyawan.bank_account}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                      placeholder="Nomor rekening"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      No. BPJS Kesehatan
                    </label>
                    <input
                      type="text"
                      name="karyawan.bpjs_health_no"
                      value={formData.karyawan.bpjs_health_no}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                      placeholder="Nomor BPJS Kesehatan"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      No. BPJS Ketenagakerjaan
                    </label>
                    <input
                      type="text"
                      name="karyawan.bpjs_employment_no"
                      value={formData.karyawan.bpjs_employment_no}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm disabled:bg-gray-50"
                      placeholder="Nomor BPJS Ketenagakerjaan"
                    />
                  </div>
                </div>
              </div>

              {/* Akun Pengguna (Hanya untuk Tambah) */}
              {mode === "add" && (
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                    Akun Pengguna
                  </h4>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="buatAkun"
                        checked={formData.buatAkun}
                        onChange={(e) => setFormData(prev => ({ ...prev, buatAkun: e.target.checked }))}
                        className="rounded border-gray-300 text-[#1C4D8D] focus:ring-[#1C4D8D]"
                      />
                      <span className="text-sm text-gray-700">Buatkan akun untuk karyawan ini</span>
                    </label>

                    {formData.buatAkun && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Password <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm ${
                              errors.password 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-300'
                            } ${loading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                            placeholder="Minimal 6 karakter"
                          />
                          {errors.password && (
                            <p className="mt-1 text-xs text-red-500 flex items-center">
                              <AlertCircle size={12} className="mr-1" />
                              {errors.password}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Role <span className="text-red-500">*</span>
                          </label>
                          <select
                            multiple
                            name="role_ids"
                            value={formData.role_ids}
                            onChange={handleRoleChange}
                            disabled={loading}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm h-32 ${
                              errors.role_ids 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-300'
                            } ${loading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                          >
                            {roles.map(role => (
                              <option key={role.id} value={role.id}>
                                {role.display_name}
                              </option>
                            ))}
                          </select>
                          {errors.role_ids && (
                            <p className="mt-1 text-xs text-red-500 flex items-center">
                              <AlertCircle size={12} className="mr-1" />
                              {errors.role_ids}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Tekan Ctrl untuk memilih lebih dari satu
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tips Section */}
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
                      NIP harus unik dan tidak boleh sama dengan karyawan lain
                    </span>
                  </div>
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">
                      Pastikan email yang digunakan valid dan aktif
                    </span>
                  </div>
                  <div className="flex items-center p-3 hover:bg-gray-50">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={12} className="text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-700">
                      Data bank dan BPJS diperlukan untuk proses payroll
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Placeholder */}
              <div className="text-xs text-gray-400 italic text-center p-2 bg-gray-50 rounded-lg">
                💡 {placeholders[placeholderIndex]}
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200 bg-white flex-shrink-0">
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
                    <span>{isEdit ? 'Update Karyawan' : 'Simpan Karyawan'}</span>
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