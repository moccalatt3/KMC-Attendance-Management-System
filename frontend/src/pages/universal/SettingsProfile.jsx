import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  Key,
  Lock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Upload,
  Trash2,
} from 'lucide-react';

export default function SettingsProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    photo: false,
  });

  const [profileData, setProfileData] = useState({
    name: 'Dr. Siti Aminah, Sp.PD',
    email: 'siti.aminah@klinik.com',
    phone: '081234567890',
    nip: 'KAR-001',
    jabatan: 'Dokter Spesialis Penyakit Dalam',
    departemen: 'Medis',
    tempatLahir: 'Jakarta',
    tanggalLahir: '1985-03-12',
    alamat: 'Jl. Merdeka No. 123, Jakarta Pusat',
    pendidikan: 'Spesialis Penyakit Dalam',
    profile_photo_url: '',
    lastLogin: 'Hari ini, 08:30',
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleProfileSave = () => {
    setLoading(prev => ({ ...prev, profile: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, profile: false }));
      setIsEditing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert('Password baru tidak cocok!');
      return;
    }
    setLoading(prev => ({ ...prev, password: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, password: false }));
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      setPasswordData({ current: '', new: '', confirm: '' });
    }, 1000);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(prev => ({ ...prev, photo: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, photo: false }));
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  const handleDeletePhoto = () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus foto profil?')) return;
    
    setLoading(prev => ({ ...prev, photo: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, photo: false }));
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <User size={15} /> },
    { id: 'security', label: 'Keamanan', icon: <Lock size={15} /> },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Pengaturan Akun</h1>
          <p className="text-sm text-gray-600 mt-1">
            Kelola informasi pribadi dan keamanan akun Anda
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5">
          {activeTab === 'profile' ? (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Informasi Profil</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Perbarui informasi pribadi dan foto profil Anda
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isEditing 
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                      : 'bg-[#1C4D8D] text-white hover:bg-[#163a6f]'
                  }`}
                >
                  {isEditing ? 'Batal' : 'Edit Profil'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Photo */}
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    {/* Profile Photo */}
                    <div className="relative w-28 h-28 rounded-full border-4 border-gray-100 overflow-hidden bg-gray-100 mb-4">
                      {loading.photo ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Loader2 size={30} className="animate-spin text-gray-500" />
                        </div>
                      ) : profileData.profile_photo_url ? (
                        <img
                          src={profileData.profile_photo_url}
                          alt={profileData.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <User size={45} />
                        </div>
                      )}
                    </div>

                    {/* Upload Button */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                          disabled={loading.photo}
                        />
                        <div className={`px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium flex items-center justify-center ${loading.photo ? 'opacity-70 cursor-not-allowed' : ''}`}>
                          {loading.photo ? (
                            <>
                              <Loader2 size={14} className="mr-1.5 animate-spin" />
                              Mengupload...
                            </>
                          ) : (
                            <>
                              <Upload size={14} className="mr-1.5" />
                              Upload Foto
                            </>
                          )}
                        </div>
                      </label>

                      {profileData.profile_photo_url && (
                        <button
                          onClick={handleDeletePhoto}
                          disabled={loading.photo}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all text-sm font-medium flex items-center justify-center"
                        >
                          <Trash2 size={14} className="mr-1.5" />
                          Hapus Foto
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 mt-2 text-center">
                      JPG, PNG, GIF, maksimal 2MB
                    </p>
                  </div>

                  {/* Info Ringkas */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">NIP</span>
                        <span className="text-xs font-medium text-gray-900">{profileData.nip}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Jabatan</span>
                        <span className="text-xs font-medium text-gray-900">{profileData.jabatan}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Departemen</span>
                        <span className="text-xs font-medium text-gray-900">{profileData.departemen}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Login Terakhir</span>
                        <span className="text-xs text-gray-900">{profileData.lastLogin}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Form */}
                <div className="md:col-span-2 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nama Lengkap */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent ${
                            !isEditing ? 'bg-gray-50' : 'bg-white'
                          }`}
                        />
                        <Mail size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    {/* Nomor HP */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Nomor HP</label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent ${
                            !isEditing ? 'bg-gray-50' : 'bg-white'
                          }`}
                        />
                        <Phone size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    {/* Tempat Lahir */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Tempat Lahir</label>
                      <input
                        type="text"
                        value={profileData.tempatLahir}
                        onChange={(e) => setProfileData({ ...profileData, tempatLahir: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                      />
                    </div>

                    {/* Tanggal Lahir */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Tanggal Lahir</label>
                      <input
                        type="date"
                        value={profileData.tanggalLahir}
                        onChange={(e) => setProfileData({ ...profileData, tanggalLahir: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                      />
                    </div>

                    {/* Pendidikan */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Pendidikan</label>
                      <input
                        type="text"
                        value={profileData.pendidikan}
                        onChange={(e) => setProfileData({ ...profileData, pendidikan: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                      />
                    </div>

                    {/* Alamat - Full width */}
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Alamat</label>
                      <input
                        type="text"
                        value={profileData.alamat}
                        onChange={(e) => setProfileData({ ...profileData, alamat: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <div className="flex justify-end pt-4 border-t border-gray-100">
                      <button
                        onClick={handleProfileSave}
                        disabled={loading.profile}
                        className="px-5 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-[#163a6f] transition-all disabled:opacity-50"
                      >
                        {loading.profile ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            <span>Simpan Perubahan</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Change Password */}
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">Ubah Password</h2>
                <p className="text-xs text-gray-500 mb-4">
                  Perbarui password secara berkala untuk keamanan akun
                </p>

                <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      Password Saat Ini <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
                        placeholder="Masukkan password saat ini"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      Password Baru <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
                        placeholder="Minimal 8 karakter"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Minimal 8 karakter dengan huruf dan angka</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700">
                      Konfirmasi Password Baru <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent ${
                          passwordData.confirm && passwordData.new !== passwordData.confirm
                            ? 'border-red-300'
                            : 'border-gray-200'
                        }`}
                        placeholder="Konfirmasi password baru"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {passwordData.confirm && passwordData.new !== passwordData.confirm && (
                      <p className="text-xs text-red-600 mt-1 flex items-center">
                        <AlertCircle size={11} className="mr-1" />
                        Password tidak cocok
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading.password}
                      className="px-5 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-[#163a6f] transition-all disabled:opacity-50"
                    >
                      {loading.password ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Memproses...</span>
                        </>
                      ) : (
                        <>
                          <Key size={16} />
                          <span>Ubah Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Toast */}
      {isSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">Perubahan berhasil disimpan!</span>
        </div>
      )}
    </div>
  );
}