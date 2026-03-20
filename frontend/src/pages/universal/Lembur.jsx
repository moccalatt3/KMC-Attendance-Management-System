import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Upload,
  Users,
  Clock3,
  TrendingUp,
  Eye,
  Download,
  XCircle,
} from 'lucide-react';

export default function Lembur() {
  const [formData, setFormData] = useState({
    tanggal: '',
    shift: 'P',
    jamMulai: '',
    jamSelesai: '',
    durasi: '',
    alasan: '',
    lampiran: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const shifts = [
    { kode: 'P', nama: 'Pagi', jam: '07:00-14:00' },
    { kode: 'S', nama: 'Siang', jam: '14:00-21:00' },
    { kode: 'M', nama: 'Malam', jam: '21:00-07:00' },
    { kode: 'MD', nama: 'Middle', jam: '08:00-15:00' },
  ];

  const riwayatLembur = [
    {
      id: 1,
      tanggal: '2026-03-10',
      shift: 'Pagi',
      jamMulai: '14:00',
      jamSelesai: '16:00',
      durasi: 2,
      alasan: 'Penyelesaian laporan bulanan',
      status: 'approved',
      approver: 'Ahmad Fauzi',
      lampiran: 'spl_mar10.pdf',
    },
    {
      id: 2,
      tanggal: '2026-03-08',
      shift: 'Siang',
      jamMulai: '21:00',
      jamSelesai: '23:30',
      durasi: 2.5,
      alasan: 'Pasien darurat',
      status: 'pending',
      approver: '-',
    },
    {
      id: 3,
      tanggal: '2026-03-05',
      shift: 'Malam',
      jamMulai: '07:00',
      jamSelesai: '09:00',
      durasi: 2,
      alasan: 'Operasi darurat',
      status: 'approved',
      approver: 'Dr. Siti Aminah',
      lampiran: 'spl_mar05.pdf',
    },
    {
      id: 4,
      tanggal: '2026-03-01',
      shift: 'Middle',
      jamMulai: '15:00',
      jamSelesai: '18:00',
      durasi: 3,
      alasan: 'Meeting dengan klien',
      status: 'rejected',
      approver: 'Ahmad Fauzi',
      catatan: 'Tidak ada approval atasan',
    },
  ];

  // Summary cards
  const summaryCards = [
    {
      title: "TOTAL LEMBUR",
      value: riwayatLembur.reduce((acc, item) => acc + item.durasi, 0),
      change: "jam",
      description: "bulan ini",
      icon: <Clock size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "LEMBUR DISETUJUI",
      value: riwayatLembur
        .filter(i => i.status === 'approved')
        .reduce((acc, item) => acc + item.durasi, 0),
      change: "jam",
      description: "approved",
      icon: <CheckCircle size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "MENUNGGU",
      value: riwayatLembur.filter(i => i.status === 'pending').length,
      change: "pengajuan",
      description: "perlu diproses",
      icon: <AlertCircle size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "RATA-RATA",
      value: (riwayatLembur.reduce((acc, item) => acc + item.durasi, 0) / riwayatLembur.length).toFixed(1),
      change: "jam",
      description: "per lembur",
      icon: <TrendingUp size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'jamMulai' || name === 'jamSelesai') {
      const mulai = name === 'jamMulai' ? value : formData.jamMulai;
      const selesai = name === 'jamSelesai' ? value : formData.jamSelesai;
      
      if (mulai && selesai) {
        const [jamMulai, menitMulai] = mulai.split(':').map(Number);
        const [jamSelesai, menitSelesai] = selesai.split(':').map(Number);
        
        let totalJam = jamSelesai - jamMulai;
        let totalMenit = menitSelesai - menitMulai;
        
        if (totalMenit < 0) {
          totalJam -= 1;
          totalMenit += 60;
        }
        
        const durasi = totalJam + (totalMenit / 60);
        setFormData(prev => ({ ...prev, durasi: durasi.toFixed(1) }));
      }
    }
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
        tanggal: '',
        shift: 'P',
        jamMulai: '',
        jamSelesai: '',
        durasi: '',
        alasan: '',
        lampiran: null,
      });
    }, 1000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1 w-fit">
            <CheckCircle size={10} />
            Disetujui
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit">
            <AlertCircle size={10} />
            Menunggu
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1 w-fit">
            <XCircle size={10} />
            Ditolak
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const filteredRiwayat = riwayatLembur.filter(item => {
    const matchesSearch = item.alasan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.shift.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Pengajuan Lembur (SPL)</h1>
          <p className="text-sm text-gray-600 mt-1">
            Ajukan lembur dan lihat riwayat pengajuan Anda
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

      {/* Form Pengajuan Lembur */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Form Pengajuan Lembur</h2>
            <p className="text-xs text-gray-500">Isi data pengajuan lembur dengan lengkap</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tanggal Lembur */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Tanggal Lembur <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              />
            </div>

            {/* Shift */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Shift <span className="text-red-500">*</span>
              </label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              >
                {shifts.map(s => (
                  <option key={s.kode} value={s.kode}>{s.nama} ({s.jam})</option>
                ))}
              </select>
            </div>

            {/* Jam Mulai */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Jam Mulai Lembur <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="jamMulai"
                value={formData.jamMulai}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              />
            </div>

            {/* Jam Selesai */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Jam Selesai Lembur <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="jamSelesai"
                value={formData.jamSelesai}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              />
            </div>

            {/* Durasi (Read Only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Durasi Lembur (jam)</label>
              <input
                type="text"
                name="durasi"
                value={formData.durasi}
                readOnly
                placeholder="Otomatis terisi"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600"
              />
            </div>

            {/* Upload SPL */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Upload SPL <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              />
            </div>
          </div>

          {/* Alasan */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
              Alasan Lembur <span className="text-red-500">*</span>
            </label>
            <textarea
              name="alasan"
              value={formData.alasan}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Jelaskan alasan dan pekerjaan yang dilakukan saat lembur..."
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent resize-none"
            />
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="p-3 bg-green-50 rounded-lg flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-green-700">Pengajuan lembur berhasil dikirim dan menunggu persetujuan.</span>
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
                  <Clock size={16} />
                  <span>Ajukan Lembur</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Riwayat Pengajuan Lembur */}
      <div className="bg-white rounded-xl overflow-hidden">
        {/* Header Tabel dengan Search dan Filter */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Riwayat Pengajuan Lembur</h2>
                <p className="text-xs text-gray-500">Daftar pengajuan lembur Anda</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari alasan atau shift..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[250px]"
                />
              </div>
              
              {/* Filter Status */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px] bg-white"
              >
                <option value="all">Semua Status</option>
                <option value="approved">Disetujui</option>
                <option value="pending">Menunggu</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabel Riwayat */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "1200px" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Tanggal
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Shift
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Jam Lembur
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Durasi
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Alasan
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Approver
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRiwayat.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    <p>Tidak ada riwayat lembur</p>
                  </td>
                </tr>
              ) : (
                filteredRiwayat.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {formatDate(item.tanggal)}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {item.shift}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {item.jamMulai} - {item.jamSelesai}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.durasi} jam</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.alasan}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.approver}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                          title="Detail"
                        >
                          <Eye size={16} />
                        </button>
                        {item.lampiran && (
                          <button
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                            title="Download SPL"
                          >
                            <Download size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}