import React, { useState } from 'react';
import {
  Download,
  FileText,
  Calendar,
  Users,
  CreditCard,
  Filter,
  CheckCircle,
  ChevronDown,
  Clock,
  TrendingUp,
} from 'lucide-react';

export default function PayrollExport() {
  const [selectedMonth, setSelectedMonth] = useState('2026-03');
  const [exportFormat, setExportFormat] = useState('excel');
  const [exportType, setExportType] = useState('summary');
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const exportOptions = [
    { id: 'summary', name: 'Rekap Payroll', description: 'Ringkasan gaji seluruh karyawan', icon: <TrendingUp size={16} /> },
    { id: 'detail', name: 'Detail Payroll', description: 'Detail komponen gaji per karyawan', icon: <FileText size={16} /> },
    { id: 'slip', name: 'Semua Slip Gaji', description: 'Slip gaji semua karyawan (PDF)', icon: <FileText size={16} /> },
    { id: 'bank', name: 'Format Transfer Bank', description: 'File untuk transfer bank (CSV/Excel)', icon: <CreditCard size={16} /> },
    { id: 'bpjs', name: 'Laporan BPJS', description: 'Data BPJS Kesehatan & Ketenagakerjaan', icon: <Users size={16} /> },
    { id: 'pajak', name: 'Laporan Pajak', description: 'Data PPh 21 karyawan', icon: <FileText size={16} /> },
  ];

  const historyExports = [
    { id: 1, tanggal: '2026-03-05', jenis: 'Rekap Payroll', format: 'Excel', file: 'payroll_rekap_mar2026.xlsx', size: '245 KB' },
    { id: 2, tanggal: '2026-03-05', jenis: 'Slip Gaji', format: 'PDF', file: 'slip_gaji_mar2026.zip', size: '2.4 MB' },
    { id: 3, tanggal: '2026-02-05', jenis: 'Format Transfer', format: 'CSV', file: 'transfer_bank_feb2026.csv', size: '128 KB' },
    { id: 4, tanggal: '2026-02-05', jenis: 'Laporan BPJS', format: 'Excel', file: 'bpjs_feb2026.xlsx', size: '312 KB' },
  ];

  // Summary cards
  const summaryCards = [
    {
      title: "TOTAL EXPORT",
      value: historyExports.length,
      change: "+2",
      description: "bulan ini",
      icon: <Download size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "JENIS LAPORAN",
      value: exportOptions.length,
      change: "6",
      description: "pilihan",
      icon: <FileText size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "PERIODE AKTIF",
      value: "Maret 2026",
      change: "bulan",
      description: "berjalan",
      icon: <Calendar size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "FORMAT FILE",
      value: "Excel/CSV/PDF",
      change: "3",
      description: "format",
      icon: <Filter size={18} />,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
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

  const filteredHistory = historyExports.filter(item =>
    item.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.format.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Export Laporan Payroll</h1>
            <p className="text-sm text-gray-600 mt-1">
              Export data payroll dalam berbagai format dan jenis laporan
            </p>
          </div>
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

      {/* Export Options Card */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Pilih Jenis Laporan</h2>
              <p className="text-xs text-gray-500">Pilih jenis laporan yang akan diexport</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportOptions.map(option => (
              <label
                key={option.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  exportType === option.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="exportType"
                    value={option.id}
                    checked={exportType === option.id}
                    onChange={(e) => setExportType(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`p-1 rounded ${
                        exportType === option.id ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {option.icon}
                      </span>
                      <p className={`text-sm font-medium ${
                        exportType === option.id ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {option.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-7">{option.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Format Export Card */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Format Export</h2>
            <p className="text-xs text-gray-500">Pilih format file yang diinginkan</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="format"
                value="excel"
                checked={exportFormat === 'excel'}
                onChange={(e) => setExportFormat(e.target.value)}
                className="mr-1"
              />
              <span className="text-sm font-medium text-gray-700">Excel (.xlsx)</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="format"
                value="csv"
                checked={exportFormat === 'csv'}
                onChange={(e) => setExportFormat(e.target.value)}
                className="mr-1"
              />
              <span className="text-sm font-medium text-gray-700">CSV</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="format"
                value="pdf"
                checked={exportFormat === 'pdf'}
                onChange={(e) => setExportFormat(e.target.value)}
                className="mr-1"
              />
              <span className="text-sm font-medium text-gray-700">PDF</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Card */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div>
              <p className="text-sm font-medium text-gray-800">Siap untuk mengexport laporan</p>
              <p className="text-xs text-gray-500 mt-1">
                File akan digenerate sesuai dengan jenis laporan dan format yang dipilih
              </p>
            </div>
          </div>
          
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-6 py-3 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-[#163a6f] transition-all disabled:opacity-50 min-w-[180px] justify-center"
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
          <table className="w-full" style={{ minWidth: "800px" }}>
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
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
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
                      <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200">
                        <Download size={16} />
                      </button>
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