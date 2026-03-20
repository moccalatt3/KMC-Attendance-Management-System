import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle,
  Users,
  UserCheck,
  Clock3,
  Coffee,
} from 'lucide-react';

export default function Cuti() {
  const [formData, setFormData] = useState({
    jenis: 'tahunan',
    tanggalMulai: '',
    tanggalSelesai: '',
    alasan: '',
    lampiran: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sisaCuti = {
    tahunan: 8,
    ditanggungkan: 3,
    khusus: 2,
    totalTahunan: 12,
    totalDitanggungkan: 5,
    totalKhusus: 3,
  };

  // Data riwayat pengajuan cuti
  const riwayatCuti = [
    {
      id: 1,
      jenis: 'Cuti Tahunan',
      tanggalMulai: '2026-03-10',
      tanggalSelesai: '2026-03-12',
      durasi: 3,
      status: 'disetujui',
      alasan: 'Liburan keluarga',
      tglPengajuan: '2026-03-01',
    },
    {
      id: 2,
      jenis: 'Izin Sakit',
      tanggalMulai: '2026-02-20',
      tanggalSelesai: '2026-02-22',
      durasi: 3,
      status: 'disetujui',
      alasan: 'Demam',
      tglPengajuan: '2026-02-20',
    },
    {
      id: 3,
      jenis: 'Cuti Khusus',
      tanggalMulai: '2026-03-15',
      tanggalSelesai: '2026-03-17',
      durasi: 3,
      status: 'pending',
      alasan: 'Menikah',
      tglPengajuan: '2026-03-05',
    },
    {
      id: 4,
      jenis: 'Cuti Tahunan',
      tanggalMulai: '2026-04-01',
      tanggalSelesai: '2026-04-05',
      durasi: 5,
      status: 'ditolak',
      alasan: 'Bersamaan dengan cuti bersama',
      tglPengajuan: '2026-03-08',
    },
  ];

  // Summary cards
  const summaryCards = [
    {
      title: "SISA CUTI TAHUNAN",
      value: `${sisaCuti.tahunan} / ${sisaCuti.totalTahunan}`,
      change: `${sisaCuti.tahunan} hari`,
      description: "tersisa",
      icon: <Calendar size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "CUTI DITANGGUNGKAN",
      value: `${sisaCuti.ditanggungkan} / ${sisaCuti.totalDitanggungkan}`,
      change: `${sisaCuti.ditanggungkan} hari`,
      description: "tersisa",
      icon: <Clock3 size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "CUTI KHUSUS",
      value: `${sisaCuti.khusus} / ${sisaCuti.totalKhusus}`,
      change: `${sisaCuti.khusus} hari`,
      description: "tersisa",
      icon: <Coffee size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "RIWAYAT PENGAJUAN",
      value: riwayatCuti.length,
      change: "4",
      description: "total pengajuan",
      icon: <FileText size={18} />,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, lampiran: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      // Reset form
      setFormData({
        jenis: 'tahunan',
        tanggalMulai: '',
        tanggalSelesai: '',
        alasan: '',
        lampiran: null,
      });
    }, 1000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'disetujui':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Disetujui</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Menunggu</span>;
      case 'ditolak':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Ditolak</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const hitungDurasi = (mulai, selesai) => {
    if (!mulai || !selesai) return 0;
    const start = new Date(mulai);
    const end = new Date(selesai);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const durasi = hitungDurasi(formData.tanggalMulai, formData.tanggalSelesai);

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Pengajuan Cuti & Izin</h1>
          <p className="text-sm text-gray-600 mt-1">
            Ajukan cuti atau izin dan lihat sisa cuti Anda
          </p>
        </div>
      </div>

      {/* Summary Cards */}
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

      {/* Form Pengajuan Cuti */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Form Pengajuan Cuti/Izin</h2>
            <p className="text-xs text-gray-500">Isi data pengajuan cuti atau izin dengan lengkap</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Jenis Cuti */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Jenis Cuti/Izin <span className="text-red-500">*</span>
              </label>
              <select
                name="jenis"
                value={formData.jenis}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              >
                <option value="tahunan">Cuti Tahunan (Sisa: {sisaCuti.tahunan} hari)</option>
                <option value="ditanggungkan">Cuti Ditanggungkan (Sisa: {sisaCuti.ditanggungkan} hari)</option>
                <option value="khusus">Cuti Khusus (Nikah/Melahirkan)</option>
                <option value="sakit">Izin Sakit</option>
                <option value="keperluan">Izin Keperluan Keluarga</option>
                <option value="dinas">Perjalanan Dinas</option>
              </select>
            </div>

            {/* Tanggal Mulai */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Tanggal Mulai <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="tanggalMulai"
                value={formData.tanggalMulai}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              />
            </div>

            {/* Tanggal Selesai */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Tanggal Selesai <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="tanggalSelesai"
                value={formData.tanggalSelesai}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              />
            </div>

            {/* Info Durasi */}
            {formData.tanggalMulai && formData.tanggalSelesai && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Durasi Cuti</label>
                <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 font-medium">
                  {durasi} hari kerja
                </div>
              </div>
            )}

            {/* Upload Lampiran */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Lampiran (surat dokter/undangan/dll)
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-400">Format: PDF, JPG, PNG (max 2MB)</p>
            </div>
          </div>

          {/* Alasan */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
              Alasan <span className="text-red-500">*</span>
            </label>
            <textarea
              name="alasan"
              value={formData.alasan}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Jelaskan alasan pengajuan cuti/izin..."
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent resize-none"
            />
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="p-3 bg-green-50 rounded-lg flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-green-700">Pengajuan berhasil dikirim dan menunggu persetujuan atasan.</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#163a6f] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  <span>Ajukan Cuti/Izin</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}