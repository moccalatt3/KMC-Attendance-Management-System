import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  FileText,
  AlertCircle,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Inbox,
  History,
} from "lucide-react";

export default function CutiApprovalHR() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pengajuan");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const pendingLevel2 = [
    {
      id: 1,
      nama_lengkap: "Ahmad Fauzi, S.Kep",
      gelar_depan: "",
      gelar_belakang: "S.Kep",
      nip: "KAR-002",
      departemen: "Keperawatan",
      jabatan: "Kepala Ruangan",
      avatar_color: "bg-blue-500",
      jenis: "Cuti Tahunan",
      tanggalMulai: "2026-03-25",
      tanggalSelesai: "2026-03-30",
      durasi: 6,
      alasan: "Liburan keluarga",
      approverLevel1: "Dr. Siti Aminah",
      tglApproval1: "2026-03-15",
      tglPengajuan: "2026-03-10",
      status: "pending_level2",
      sisaCuti: 8,
      lampiran: null,
    },
    {
      id: 2,
      nama_lengkap: "Rina Wati, S.Farm",
      gelar_depan: "Apt.",
      gelar_belakang: "S.Farm",
      nip: "KAR-003",
      departemen: "Apotek",
      jabatan: "Apoteker Penanggung Jawab",
      avatar_color: "bg-purple-500",
      jenis: "Cuti Khusus",
      tanggalMulai: "2026-04-10",
      tanggalSelesai: "2026-04-20",
      durasi: 11,
      alasan: "Melahirkan",
      approverLevel1: "Budi Santoso",
      tglApproval1: "2026-03-12",
      tglPengajuan: "2026-03-05",
      status: "pending_level2",
      sisaCuti: 12,
      lampiran: "surat_hamil.pdf",
    },
    {
      id: 3,
      nama_lengkap: "Bambang Supriyadi",
      gelar_depan: "",
      gelar_belakang: "",
      nip: "KAR-004",
      departemen: "Keamanan",
      jabatan: "Satpam",
      avatar_color: "bg-yellow-500",
      jenis: "Cuti Tahunan",
      tanggalMulai: "2026-04-01",
      tanggalSelesai: "2026-04-07",
      durasi: 7,
      alasan: "Liburan",
      approverLevel1: "Dr. Siti Aminah",
      tglApproval1: "2026-03-14",
      tglPengajuan: "2026-03-08",
      status: "pending_level2",
      sisaCuti: 5,
      lampiran: null,
    },
    {
      id: 4,
      nama_lengkap: "Dewi Lestari, S.Kep",
      gelar_depan: "",
      gelar_belakang: "S.Kep",
      nip: "KAR-008",
      departemen: "Keperawatan",
      jabatan: "Perawat Senior",
      avatar_color: "bg-pink-500",
      jenis: "Izin Sakit",
      tanggalMulai: "2026-03-28",
      tanggalSelesai: "2026-03-30",
      durasi: 3,
      alasan: "Demam",
      approverLevel1: "Ahmad Fauzi",
      tglApproval1: "2026-03-20",
      tglPengajuan: "2026-03-18",
      status: "pending_level2",
      sisaCuti: 10,
      lampiran: "surat_dokter.pdf",
    },
    {
      id: 5,
      nama_lengkap: "Hendra Wijaya",
      gelar_depan: "",
      gelar_belakang: "",
      nip: "KAR-009",
      departemen: "Laboratorium",
      jabatan: "Analis",
      avatar_color: "bg-cyan-500",
      jenis: "Cuti Tahunan",
      tanggalMulai: "2026-04-05",
      tanggalSelesai: "2026-04-12",
      durasi: 8,
      alasan: "Liburan keluarga",
      approverLevel1: "Dr. Siti Aminah",
      tglApproval1: "2026-03-22",
      tglPengajuan: "2026-03-15",
      status: "pending_level2",
      sisaCuti: 7,
      lampiran: null,
    },
  ];

  const historyApprovals = [
    {
      id: 201,
      nama_lengkap: "Siti Aminah, Sp.PD",
      gelar_depan: "Dr.",
      gelar_belakang: "Sp.PD",
      nip: "KAR-001",
      departemen: "Medis",
      jenis: "Cuti Tahunan",
      durasi: 5,
      status: "approved",
      tglApproval: "2026-03-01",
      catatan: "Disetujui",
      avatar_color: "bg-green-500",
    },
    {
      id: 202,
      nama_lengkap: "Maya Sari",
      gelar_depan: "Dr.",
      gelar_belakang: "",
      nip: "KAR-005",
      departemen: "Medis",
      jenis: "Izin Sakit",
      durasi: 2,
      status: "approved",
      tglApproval: "2026-02-25",
      catatan: "Disetujui",
      avatar_color: "bg-indigo-500",
    },
    {
      id: 203,
      nama_lengkap: "Ahmad Fauzi, S.Kep",
      gelar_depan: "",
      gelar_belakang: "S.Kep",
      nip: "KAR-002",
      departemen: "Keperawatan",
      jenis: "Cuti Tahunan",
      durasi: 10,
      status: "rejected",
      tglApproval: "2026-02-10",
      catatan: "Bentrok dengan jadwal operasional",
      avatar_color: "bg-blue-500",
    },
    {
      id: 204,
      nama_lengkap: "Rina Wati, S.Farm",
      gelar_depan: "Apt.",
      gelar_belakang: "S.Farm",
      nip: "KAR-003",
      departemen: "Apotek",
      jenis: "Cuti Khusus",
      durasi: 14,
      status: "approved",
      tglApproval: "2026-02-15",
      catatan: "Disetujui",
      avatar_color: "bg-purple-500",
    },
    {
      id: 205,
      nama_lengkap: "Bambang Supriyadi",
      gelar_depan: "",
      gelar_belakang: "",
      nip: "KAR-004",
      departemen: "Keamanan",
      jenis: "Izin",
      durasi: 1,
      status: "approved",
      tglApproval: "2026-02-18",
      catatan: "Disetujui",
      avatar_color: "bg-yellow-500",
    },
  ];

  // Stats
  const stats = {
    pending: pendingLevel2.length,
    approvedMonth: 15,
    rejectedMonth: 3,
  };

  const summaryCards = [
    {
      title: "MENUNGGU APPROVAL",
      value: stats.pending,
      change: `${stats.pending}`,
      description: "pengajuan",
      icon: <Clock size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "DISETUJUI BULAN INI",
      value: stats.approvedMonth,
      change: `${stats.approvedMonth}`,
      description: "pengajuan",
      icon: <CheckCircle size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "DITOLAK BULAN INI",
      value: stats.rejectedMonth,
      change: `${stats.rejectedMonth}`,
      description: "pengajuan",
      icon: <XCircle size={18} />,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "TOTAL KARYAWAN",
      value: "328",
      change: "+12",
      trend: "up",
      description: "dari bulan lalu",
      icon: <Users size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  // Tabs configuration
  const tabs = [
    {
      id: "pengajuan",
      label: "Pengajuan Menunggu",
      icon: <Inbox size={16} />,
      count: pendingLevel2.length,
    },
    {
      id: "riwayat",
      label: "Riwayat Approval",
      icon: <History size={16} />,
      count: historyApprovals.length,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending_level2":
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 whitespace-nowrap">
            Menunggu HRD
          </span>
        );
      case "approved":
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 whitespace-nowrap">
            Disetujui
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 whitespace-nowrap">
            Ditolak
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 whitespace-nowrap">
            {status}
          </span>
        );
    }
  };

  const formatShortDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleViewDetail = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedRequest(null);
  };

  const handleApprove = (id) => {
    alert(`Pengajuan #${id} disetujui`);
  };

  const handleReject = (id) => {
    alert(`Pengajuan #${id} ditolak`);
  };

  const filteredPending = pendingLevel2.filter(
    (item) =>
      item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.departemen.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredHistory = historyApprovals.filter(
    (item) =>
      item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.departemen.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Approval Cuti & Izin (Level 2 - HRD)
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Persetujuan final pengajuan cuti dan izin karyawan
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 hover:shadow-sm transition-all duration-200"
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
              {card.trend ? (
                <div
                  className={`flex items-center ${
                    card.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {card.trend === "up" ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  <span className="text-xs font-medium ml-1">
                    {card.change}
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-gray-600">
                  <span className="text-xs font-medium">{card.change}</span>
                </div>
              )}
              <span className="text-xs text-gray-500 ml-2">
                {card.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation - Center */}
      <div className="border-b border-gray-100">
        <div className="flex justify-center px-4 py-2">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-2.5 font-medium text-sm whitespace-nowrap relative transition-all rounded-lg ${
                  activeTab === tab.id
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`px-1.5 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? "bg-gray-200 text-gray-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content: Pengajuan Menunggu - dengan search di dalam tabel */}
      {activeTab === "pengajuan" && (
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Search Bar - menyatu dengan tabel */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Cari pengajuan berdasarkan nama, NIP, atau departemen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                />
              </div>
              <div className="text-sm text-gray-500">
                {filteredPending.length} pengajuan ditemukan
              </div>
            </div>
          </div>

          {/* Tabel dengan kolom lebar */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: "1200px" }}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[250px]">
                    Karyawan
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                    Jenis Cuti
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                    Durasi
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">
                    Sisa Cuti
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">
                    Periode
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">
                    Status
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPending.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-500">
                      <Inbox size={40} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-sm font-medium">
                        Tidak ada pengajuan menunggu persetujuan
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredPending.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full ${item.avatar_color} flex items-center justify-center text-white font-medium text-sm flex-shrink-0`}
                          >
                            {item.nama_lengkap?.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.gelar_depan} {item.nama_lengkap}{" "}
                              {item.gelar_belakang}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.nip} • {item.departemen}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700">
                          {item.jenis}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm font-medium text-gray-900">
                          {item.durasi} hari
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-blue-600 font-medium">
                          {item.sisaCuti} hari
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700">
                          <div>{formatShortDate(item.tanggalMulai)}</div>
                          <div className="text-xs text-gray-500">
                            s/d {formatShortDate(item.tanggalSelesai)}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleViewDetail(item)}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                            title="Detail"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all duration-200"
                            title="Setujui"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200"
                            title="Tolak"
                          >
                            <XCircle size={16} />
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
      )}

      {/* Tab Content: Riwayat Approval - dengan search di dalam tabel */}
      {activeTab === "riwayat" && (
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Search Bar - menyatu dengan tabel */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Cari riwayat berdasarkan nama, NIP, atau departemen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                />
              </div>
            </div>
          </div>

          {/* Tabel dengan kolom lebar */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: "1200px" }}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[280px]">
                    Karyawan
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                    Jenis
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                    Durasi
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                    Tgl Approval
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[250px]">
                    Catatan
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-500">
                      <History
                        size={40}
                        className="mx-auto text-gray-300 mb-2"
                      />
                      <p className="text-sm font-medium">
                        Tidak ada riwayat approval
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full ${item.avatar_color} flex items-center justify-center text-white font-medium text-sm flex-shrink-0`}
                          >
                            {item.nama_lengkap?.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.gelar_depan} {item.nama_lengkap}{" "}
                              {item.gelar_belakang}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.nip} • {item.departemen}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700">
                          {item.jenis}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-gray-700">
                          {item.durasi} hari
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700 whitespace-nowrap">
                          {formatShortDate(item.tglApproval)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700">
                          {item.catatan}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                          title="Detail"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText size={20} className="mr-2 text-[#1C4D8D]" />
                Detail Pengajuan Cuti
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
                  className={`w-16 h-16 rounded-full ${selectedRequest.avatar_color} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}
                >
                  {selectedRequest.nama_lengkap?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedRequest.gelar_depan} {selectedRequest.nama_lengkap}{" "}
                    {selectedRequest.gelar_belakang}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedRequest.jabatan}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    NIP: {selectedRequest.nip} • {selectedRequest.departemen}
                  </p>
                  <div className="mt-2">
                    {getStatusBadge(selectedRequest.status)}
                  </div>
                </div>
              </div>

              {/* Detail Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Informasi Cuti
                  </h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Jenis Cuti</p>
                    <p className="text-sm font-medium">
                      {selectedRequest.jenis}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Durasi</p>
                    <p className="text-sm font-medium">
                      {selectedRequest.durasi} hari
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Sisa Cuti</p>
                    <p className="text-sm font-medium text-blue-600">
                      {selectedRequest.sisaCuti} hari
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Alasan</p>
                    <p className="text-sm">{selectedRequest.alasan}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Timeline
                  </h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Tanggal Pengajuan</p>
                    <p className="text-sm">
                      {formatShortDate(selectedRequest.tglPengajuan)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Periode Cuti</p>
                    <p className="text-sm">
                      {formatShortDate(selectedRequest.tanggalMulai)} -{" "}
                      {formatShortDate(selectedRequest.tanggalSelesai)}
                    </p>
                  </div>
                  {selectedRequest.tglApproval1 && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Disetujui Atasan</p>
                      <p className="text-sm">
                        {selectedRequest.approverLevel1} (
                        {formatShortDate(selectedRequest.tglApproval1)})
                      </p>
                    </div>
                  )}
                  {selectedRequest.lampiran && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Lampiran</p>
                      <p className="text-sm text-blue-600 flex items-center">
                        <FileText size={14} className="mr-1" />
                        {selectedRequest.lampiran}
                      </p>
                    </div>
                  )}
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
              {selectedRequest.status === "pending_level2" && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedRequest.id);
                      closeDetailModal();
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center space-x-2"
                  >
                    <CheckCircle size={16} />
                    <span>Setujui</span>
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedRequest.id);
                      closeDetailModal();
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 flex items-center space-x-2"
                  >
                    <XCircle size={16} />
                    <span>Tolak</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
