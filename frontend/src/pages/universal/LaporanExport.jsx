import React, { useState } from 'react';
import {
  Download,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Clock,
  Filter,
  Users,
  TrendingUp,
  XCircle,
} from 'lucide-react';

export default function LaporanExport() {
  const [selectedType, setSelectedType] = useState('absensi');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('2026-03');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const exportOptions = [
    { id: 'absensi', name: 'Laporan Absensi', description: 'Rekap kehadiran, keterlambatan, lembur', icon: <Clock size={16} /> },
    { id: 'karyawan', name: 'Laporan Karyawan', description: 'Data demografi, turnover, kontrak', icon: <Users size={16} /> },
    { id: 'payroll', name: 'Laporan Payroll', description: 'Rekap gaji, komponen, potongan', icon: <TrendingUp size={16} /> },
    { id: 'cuti', name: 'Laporan Cuti & Izin', description: 'Riwayat cuti, sisa cuti, approval', icon: <Calendar size={16} /> },
    { id: 'lembur', name: 'Laporan Lembur', description: 'Rekap lembur per karyawan', icon: <Clock size={16} /> },
    { id: 'bpjs', name: 'Laporan BPJS', description: 'Data iuran BPJS Kesehatan & Ketenagakerjaan', icon: <Users size={16} /> },
    { id: 'kinerja', name: 'Laporan Kinerja', description: 'Penilaian kinerja karyawan', icon: <TrendingUp size={16} /> },
    { id: 'rekrutmen', name: 'Laporan Rekrutmen', description: 'Data lamaran dan onboarding', icon: <FileText size={16} /> },
  ];

  const historyExports = [
    { id: 1, tanggal: '2026-03-10', jenis: 'Laporan Absensi', format: 'PDF', file: 'absensi_mar2026.pdf', size: '1.2 MB', status: 'success' },
    { id: 2, tanggal: '2026-03-05', jenis: 'Laporan Payroll', format: 'Excel', file: 'payroll_mar2026.xlsx', size: '856 KB', status: 'success' },
    { id: 3, tanggal: '2026-03-01', jenis: 'Laporan Karyawan', format: 'PDF', file: 'karyawan_mar2026.pdf', size: '2.1 MB', status: 'success' },
    { id: 4, tanggal: '2026-02-28', jenis: 'Laporan BPJS', format: 'Excel', file: 'bpjs_feb2026.xlsx', size: '432 KB', status: 'success' },
    { id: 5, tanggal: '2026-02-25', jenis: 'Laporan Cuti', format: 'PDF', file: 'cuti_feb2026.pdf', size: '1.5 MB', status: 'failed' },
  ];

  // Summary cards
  const summaryCards = [
    {
      title: "JENIS LAPORAN",
      value: exportOptions.length,
      change: "8",
      description: "pilihan",
      icon: <FileText size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "TOTAL EXPORT",
      value: historyExports.length,
      change: "+3",
      description: "bulan ini",
      icon: <Download size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "BERHASIL",
      value: historyExports.filter(i => i.status === 'success').length,
      change: "4",
      description: "export sukses",
      icon: <CheckCircle size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "GAGAL",
      value: historyExports.filter(i => i.status === 'failed').length,
      change: "1",
      description: "export",
      icon: <XCircle size={18} />,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'success':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1 w-fit">
            <CheckCircle size={10} />
            Sukses
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1 w-fit">
            <XCircle size={10} />
            Gagal
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

  const filteredHistory = historyExports.filter(item =>
    item.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.format.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Export Laporan</h1>
          <p className="text-sm text-gray-600 mt-1">
            Export berbagai jenis laporan dalam format PDF, Excel, atau CSV
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
              <div className="flex items-center text-gray-600">
                <span className="text-xs font-medium">{card.change}</span>
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {card.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Form Export Card */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Pengaturan Export Laporan</h2>
              <p className="text-xs text-gray-500">Pilih jenis laporan, periode, dan format file</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Jenis Laporan */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Jenis Laporan</label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none w-full px-3 py-2.5 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
                >
                  {exportOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Periode */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Periode</label>
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="appearance-none w-full px-3 py-2.5 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
                >
                  <option value="daily">Harian</option>
                  <option value="weekly">Mingguan</option>
                  <option value="monthly">Bulanan</option>
                  <option value="yearly">Tahunan</option>
                  <option value="custom">Kustom</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Bulan/Tahun */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Bulan/Tahun</label>
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="appearance-none w-full px-3 py-2.5 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
                >
                  <option value="2026-03">Maret 2026</option>
                  <option value="2026-02">Februari 2026</option>
                  <option value="2026-01">Januari 2026</option>
                  <option value="2025-12">Desember 2025</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Format File */}
          <div className="mt-4">
            <label className="text-xs font-medium text-gray-700 mb-2 block">Format File</label>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={selectedFormat === 'pdf'}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="mr-1"
                />
                <span className="text-sm font-medium text-gray-700">PDF</span>
              </label>
              <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  checked={selectedFormat === 'excel'}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="mr-1"
                />
                <span className="text-sm font-medium text-gray-700">Excel (.xlsx)</span>
              </label>
              <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={selectedFormat === 'csv'}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="mr-1"
                />
                <span className="text-sm font-medium text-gray-700">CSV</span>
              </label>
            </div>
          </div>

          {/* Tombol Export */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-6 py-3 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-[#163a6f] transition-all disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Mengexport...</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>Export Laporan</span>
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-green-700">Laporan berhasil diexport! File akan segera didownload.</span>
            </div>
          )}
        </div>
      </div>

      {/* Riwayat Export */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Riwayat Export</h2>
                <p className="text-xs text-gray-500">Daftar file yang telah diexport sebelumnya</p>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari riwayat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-4 py-2 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent min-w-[200px]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "1000px" }}>
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Tanggal
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Jenis Laporan
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Format
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  File
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Ukuran
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    Tidak ada riwayat export
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {formatDate(item.tanggal)}
                      </span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {item.jenis}
                      </span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.format}</span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm text-[#1C4D8D]">{item.file}</span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.size}</span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      {item.status === 'success' && (
                        <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200">
                          <Download size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Menampilkan {filteredHistory.length} dari {historyExports.length} riwayat
          </p>
        </div>
      </div>
    </div>
  );
}