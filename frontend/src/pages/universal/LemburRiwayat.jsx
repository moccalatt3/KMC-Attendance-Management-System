import React, { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  FileText,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
} from "lucide-react";

export default function LemburRiwayat() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("2026-03");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const riwayatLembur = [
    {
      id: 1,
      tanggal: "2026-03-10",
      nama_lengkap: "Siti Aminah, Sp.PD",
      gelar_depan: "Dr.",
      gelar_belakang: "Sp.PD",
      nip: "KAR-001",
      departemen: "Medis",
      jabatan: "Dokter Spesialis Penyakit Dalam",
      avatar_color: "bg-green-500",
      shift: "Pagi",
      jamMulai: "14:00",
      jamSelesai: "16:00",
      durasi: 2,
      alasan: "Penyelesaian laporan bulanan",
      status: "approved",
      approver: "Ahmad Fauzi",
      tglApproval: "2026-03-10",
      file: "SPL_001.pdf",
      catatan: "-",
    },
    {
      id: 2,
      tanggal: "2026-03-08",
      nama_lengkap: "Ahmad Fauzi, S.Kep",
      gelar_depan: "",
      gelar_belakang: "S.Kep",
      nip: "KAR-002",
      departemen: "Keperawatan",
      jabatan: "Kepala Ruangan",
      avatar_color: "bg-blue-500",
      shift: "Siang",
      jamMulai: "21:00",
      jamSelesai: "23:30",
      durasi: 2.5,
      alasan: "Pasien darurat",
      status: "approved",
      approver: "Dr. Siti Aminah",
      tglApproval: "2026-03-09",
      file: "SPL_002.pdf",
      catatan: "-",
    },
    {
      id: 3,
      tanggal: "2026-03-07",
      nama_lengkap: "Rina Wati, S.Farm",
      gelar_depan: "Apt.",
      gelar_belakang: "S.Farm",
      nip: "KAR-003",
      departemen: "Apotek",
      jabatan: "Apoteker Penanggung Jawab",
      avatar_color: "bg-purple-500",
      shift: "Malam",
      jamMulai: "07:00",
      jamSelesai: "09:00",
      durasi: 2,
      alasan: "Operasi darurat",
      status: "approved",
      approver: "Dr. Siti Aminah",
      tglApproval: "2026-03-08",
      file: "SPL_003.pdf",
      catatan: "-",
    },
    {
      id: 4,
      tanggal: "2026-03-05",
      nama_lengkap: "Bambang Supriyadi",
      gelar_depan: "",
      gelar_belakang: "",
      nip: "KAR-004",
      departemen: "Keamanan",
      jabatan: "Satpam",
      avatar_color: "bg-yellow-500",
      shift: "Pagi",
      jamMulai: "14:00",
      jamSelesai: "17:00",
      durasi: 3,
      alasan: "Inventarisasi obat",
      status: "pending",
      approver: "-",
      tglApproval: "-",
      file: "SPL_004.pdf",
      catatan: "-",
    },
    {
      id: 5,
      tanggal: "2026-03-03",
      nama_lengkap: "Maya Sari",
      gelar_depan: "Dr.",
      gelar_belakang: "",
      nip: "KAR-005",
      departemen: "Medis",
      jabatan: "Dokter Umum",
      avatar_color: "bg-indigo-500",
      shift: "Siang",
      jamMulai: "21:00",
      jamSelesai: "00:00",
      durasi: 3,
      alasan: "Pasien gawat darurat",
      status: "approved",
      approver: "Dr. Siti Aminah",
      tglApproval: "2026-03-04",
      file: "SPL_005.pdf",
      catatan: "-",
    },
    {
      id: 6,
      tanggal: "2026-03-01",
      nama_lengkap: "Siti Aminah, Sp.PD",
      gelar_depan: "Dr.",
      gelar_belakang: "Sp.PD",
      nip: "KAR-001",
      departemen: "Medis",
      jabatan: "Dokter Spesialis Penyakit Dalam",
      avatar_color: "bg-green-500",
      shift: "Malam",
      jamMulai: "07:00",
      jamSelesai: "10:00",
      durasi: 3,
      alasan: "Rapat manajemen",
      status: "rejected",
      approver: "HRD",
      tglApproval: "2026-03-02",
      file: "SPL_006.pdf",
      catatan: "Melebihi kuota lembur",
    },
  ];

  // Stats
  const totalPengajuan = riwayatLembur.length;
  const totalDisetujui = riwayatLembur.filter((i) => i.status === "approved").length;
  const totalJam = riwayatLembur
    .filter((i) => i.status === "approved")
    .reduce((acc, item) => acc + item.durasi, 0);
  const totalMenunggu = riwayatLembur.filter((i) => i.status === "pending").length;

  const summaryCards = [
    {
      title: "TOTAL PENGAJUAN",
      value: totalPengajuan,
      change: `${totalPengajuan}`,
      description: "pengajuan",
      icon: <FileText size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "DISETUJUI",
      value: totalDisetujui,
      change: `${totalDisetujui}`,
      description: "pengajuan",
      icon: <CheckCircle size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "TOTAL JAM",
      value: `${totalJam}`,
      change: "jam",
      description: "lembur",
      icon: <Clock size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "MENUNGGU",
      value: totalMenunggu,
      change: `${totalMenunggu}`,
      description: "pengajuan",
      icon: <AlertCircle size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1 w-fit">
            <CheckCircle size={10} />
            Disetujui
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit">
            <AlertCircle size={10} />
            Menunggu
          </span>
        );
      case "rejected":
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
    if (!dateString || dateString === "-") return "-";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const formatShortDate = (dateString) => {
    if (!dateString || dateString === "-") return "-";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedItem(null);
  };

  const handleDownload = (file) => {
    alert(`Mengunduh file: ${file}`);
    // Implementasi download logic di sini
  };

  const filteredRiwayat = riwayatLembur.filter((item) => {
    const matchesSearch =
      item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alasan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Riwayat Lembur
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Riwayat pengajuan lembur karyawan
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5"
          >
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

      {/* Table dengan Search & Filter di dalamnya */}
      <div className="bg-white rounded-xl overflow-hidden">
        {/* Header Tabel dengan Search dan Filter */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Riwayat Pengajuan Lembur</h2>
                <p className="text-xs text-gray-500">Daftar pengajuan lembur karyawan</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Box */}
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama, NIP, atau alasan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent min-w-[250px]"
                />
              </div>
              
              {/* Filter Bulan */}
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent min-w-[140px] bg-white"
              >
                <option value="2026-03">Maret 2026</option>
                <option value="2026-02">Februari 2026</option>
                <option value="2026-01">Januari 2026</option>
              </select>

              {/* Filter Status */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent min-w-[140px] bg-white"
              >
                <option value="all">Semua Status</option>
                <option value="approved">Disetujui</option>
                <option value="pending">Menunggu</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "1400px" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Tanggal
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Karyawan
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Shift
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Jam Lembur
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Durasi
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Alasan
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Approver
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRiwayat.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-gray-500">
                    Tidak ada riwayat lembur
                  </td>
                </tr>
              ) : (
                filteredRiwayat.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {formatDate(item.tanggal)}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full ${item.avatar_color} flex items-center justify-center text-white font-medium text-xs flex-shrink-0`}
                        >
                          {item.nama_lengkap?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.gelar_depan} {item.nama_lengkap}{" "}
                            {item.gelar_belakang}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.nip} • {item.departemen}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {item.shift}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {item.jamMulai} - {item.jamSelesai}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {item.durasi} jam
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {item.alasan}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {item.approver}
                      </span>
                      {item.tglApproval !== "-" && (
                        <p className="text-xs text-gray-500">
                          {formatShortDate(item.tglApproval)}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                          title="Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDownload(item.file)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                          title="Download SPL"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText size={20} className="mr-2 text-[#1C4D8D]" />
                Detail Pengajuan Lembur
              </h2>
              <button
                onClick={closeDetailModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Header Profile */}
              <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-gray-100">
                <div
                  className={`w-16 h-16 rounded-full ${selectedItem.avatar_color} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}
                >
                  {selectedItem.nama_lengkap?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedItem.gelar_depan} {selectedItem.nama_lengkap}{" "}
                    {selectedItem.gelar_belakang}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedItem.jabatan}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    NIP: {selectedItem.nip} • {selectedItem.departemen}
                  </p>
                  <div className="mt-2">{getStatusBadge(selectedItem.status)}</div>
                </div>
              </div>

              {/* Detail Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Informasi Lembur
                  </h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Shift Kerja</p>
                    <p className="text-sm font-medium">{selectedItem.shift}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Jam Lembur</p>
                    <p className="text-sm font-medium">
                      {selectedItem.jamMulai} - {selectedItem.jamSelesai}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Durasi</p>
                    <p className="text-sm font-medium text-blue-600">
                      {selectedItem.durasi} jam
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Alasan</p>
                    <p className="text-sm">{selectedItem.alasan}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Timeline & Dokumen
                  </h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Tanggal Pengajuan</p>
                    <p className="text-sm">{formatDate(selectedItem.tanggal)}</p>
                  </div>
                  {selectedItem.approver !== "-" && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Disetujui Oleh</p>
                      <p className="text-sm">
                        {selectedItem.approver}
                        {selectedItem.tglApproval !== "-" && (
                          <span className="text-xs text-gray-500 ml-2">
                            ({formatShortDate(selectedItem.tglApproval)})
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                  {selectedItem.catatan !== "-" && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Catatan</p>
                      <p className="text-sm text-red-600">{selectedItem.catatan}</p>
                    </div>
                  )}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">File SPL</p>
                    <p className="text-sm text-blue-600 flex items-center">
                      <FileText size={14} className="mr-1" />
                      {selectedItem.file}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">
              <button
                onClick={closeDetailModal}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  handleDownload(selectedItem.file);
                  closeDetailModal();
                }}
                className="px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Download SPL</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}