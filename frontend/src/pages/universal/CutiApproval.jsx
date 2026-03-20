import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  FileText,
  Search,
  Eye,
  Inbox,
  History,
} from "lucide-react";

export default function CutiApproval() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [activeTab, setActiveTab] = useState("pengajuan");

  const departments = [
    "Medis",
    "Keperawatan",
    "Apotek",
    "Umum",
    "Laboratorium",
    "Keamanan",
    "Gigi",
    "Keuangan",
    "HRD",
  ];

  const pendingApprovals = [
    {
      id: 1,
      nama: "apt. Rina Wati, S.Farm",
      nip: "KAR-003",
      departemen: "Apotek",
      jenis: "Cuti Tahunan",
      durasi: 3,
      tanggalMulai: "2026-03-20",
      status: "pending_level1",
      sisaCuti: 8,
    },
    {
      id: 2,
      nama: "Bambang Supriyadi",
      nip: "KAR-004",
      departemen: "Keamanan",
      jenis: "Izin Sakit",
      durasi: 2,
      tanggalMulai: "2026-03-18",
      status: "pending_level1",
      sisaCuti: 10,
    },
    {
      id: 3,
      nama: "drg. Dewi Lestari",
      nip: "KAR-006",
      departemen: "Gigi",
      jenis: "Cuti Khusus",
      durasi: 15,
      tanggalMulai: "2026-04-01",
      status: "pending_level1",
      sisaCuti: 12,
    },
    {
      id: 4,
      nama: "Ahmad Fauzi, S.Kep",
      nip: "KAR-002",
      departemen: "Keperawatan",
      jenis: "Izin Keluarga",
      durasi: 1,
      tanggalMulai: "2026-03-21",
      status: "pending_level1",
      sisaCuti: 7,
    },
    {
      id: 5,
      nama: "Dr. Siti Aminah, Sp.PD",
      nip: "KAR-001",
      departemen: "Medis",
      jenis: "Cuti Tahunan",
      durasi: 4,
      tanggalMulai: "2026-03-25",
      status: "pending_level1",
      sisaCuti: 6,
    },
    {
      id: 6,
      nama: "Rudi Hermawan, S.Tr.Kes",
      nip: "KAR-007",
      departemen: "Laboratorium",
      jenis: "Cuti Tahunan",
      durasi: 3,
      tanggalMulai: "2026-03-28",
      status: "pending_level1",
      sisaCuti: 9,
    },
  ];

  const historyApprovals = [
    {
      id: 101,
      nama: "Dr. Siti Aminah, Sp.PD",
      nip: "KAR-001",
      departemen: "Medis",
      jenis: "Cuti Tahunan",
      durasi: 3,
      status: "approved",
      tglApproval: "2026-03-05",
      approver: "Ahmad Fauzi",
    },
    {
      id: 102,
      nama: "apt. Rina Wati, S.Farm",
      nip: "KAR-003",
      departemen: "Apotek",
      jenis: "Izin Sakit",
      durasi: 1,
      status: "approved",
      tglApproval: "2026-03-02",
      approver: "Ahmad Fauzi",
    },
    {
      id: 103,
      nama: "Bambang Supriyadi",
      nip: "KAR-004",
      departemen: "Keamanan",
      jenis: "Cuti Tahunan",
      durasi: 5,
      status: "rejected",
      tglApproval: "2026-02-28",
      approver: "Ahmad Fauzi",
    },
    {
      id: 104,
      nama: "drg. Dewi Lestari",
      nip: "KAR-006",
      departemen: "Gigi",
      jenis: "Cuti Khusus",
      durasi: 3,
      status: "approved",
      tglApproval: "2026-02-20",
      approver: "Ahmad Fauzi",
    },
    {
      id: 105,
      nama: "Dr. Siti Aminah, Sp.PD",
      nip: "KAR-001",
      departemen: "Medis",
      jenis: "Cuti Tahunan",
      durasi: 2,
      status: "approved",
      tglApproval: "2026-02-10",
      approver: "Ahmad Fauzi",
    },
    {
      id: 106,
      nama: "Ahmad Fauzi, S.Kep",
      nip: "KAR-002",
      departemen: "Keperawatan",
      jenis: "Izin Sakit",
      durasi: 1,
      status: "approved",
      tglApproval: "2026-02-05",
      approver: "Ahmad Fauzi",
    },
  ];

  // Statistik
  const stats = {
    pending: pendingApprovals.length,
    approved: historyApprovals.filter((item) => item.status === "approved")
      .length,
    rejected: historyApprovals.filter((item) => item.status === "rejected")
      .length,
    avgProcess: 1.5,
  };

  const tabs = [
    {
      id: "pengajuan",
      label: "Pengajuan",
      icon: <Inbox size={16} className="mr-1" />,
      count: pendingApprovals.length,
    },
    {
      id: "riwayat",
      label: "Riwayat",
      icon: <History size={16} className="mr-1" />,
      count: historyApprovals.length,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending_level1":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">
            Menunggu
          </span>
        );
      case "pending_level2":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 whitespace-nowrap">
            Menunggu HRD
          </span>
        );
      case "approved":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
            Disetujui
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap">
            Ditolak
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">
            {status}
          </span>
        );
    }
  };

  const filteredApprovals = pendingApprovals.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept =
      selectedDepartment === "all" || item.departemen === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const filteredHistory = historyApprovals.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept =
      selectedDepartment === "all" || item.departemen === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const summaryCards = [
    {
      title: "MENUNGGU APPROVAL",
      value: stats.pending,
      change: "+2",
      description: "hari ini",
      icon: <Clock size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "DISETUJUI BULAN INI",
      value: stats.approved,
      change: "8",
      description: "pengajuan",
      icon: <CheckCircle size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "DITOLAK BULAN INI",
      value: stats.rejected,
      change: "2",
      description: "pengajuan",
      icon: <XCircle size={18} />,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "RATA-RATA PROSES",
      value: `${stats.avgProcess}`,
      change: "hari",
      description: "per pengajuan",
      icon: <User size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Approval Cuti & Izin
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Persetujuan pengajuan cuti dan izin karyawan
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

      {/* Tabs - Center */}
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

      {/* Content berdasarkan tab dengan search menyatu */}
      {activeTab === "pengajuan" && (
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Cari pengajuan berdasarkan nama, NIP, atau jenis cuti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px] bg-white"
                >
                  <option value="all">Semua Departemen</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tabel Pengajuan */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: "1200px" }}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[220px]">
                    Karyawan
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">
                    Departemen
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                    Jenis
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[90px]">
                    Durasi
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">
                    Tgl Mulai
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[110px]">
                    Sisa Cuti
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">
                    Status
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApprovals.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-gray-500">
                      <Inbox size={40} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-sm font-medium">Tidak ada pengajuan</p>
                    </td>
                  </tr>
                ) : (
                  filteredApprovals.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="min-w-[180px]">
                          <p className="text-sm font-medium text-gray-900">
                            {item.nama}
                          </p>
                          <p className="text-xs text-gray-500">{item.nip}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700">
                          {item.departemen}
                        </span>
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
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700">
                          {formatDate(item.tanggalMulai)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm font-medium text-blue-600">
                          {item.sisaCuti} hari
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                            title="Setujui"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                            title="Tolak"
                          >
                            <XCircle size={16} />
                          </button>
                          <button
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                            title="Detail"
                          >
                            <Eye size={16} />
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

      {activeTab === "riwayat" && (
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Cari riwayat berdasarkan nama, NIP, atau jenis cuti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px] bg-white"
                >
                  <option value="all">Semua Departemen</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tabel Riwayat */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: "1200px" }}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[220px]">
                    Karyawan
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">
                    Departemen
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                    Jenis
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[90px]">
                    Durasi
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">
                    Tgl Approval
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">
                    Approver
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-gray-500">
                      <History
                        size={40}
                        className="mx-auto text-gray-300 mb-2"
                      />
                      <p className="text-sm font-medium">Tidak ada riwayat</p>
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="min-w-[180px]">
                          <p className="text-sm font-medium text-gray-900">
                            {item.nama}
                          </p>
                          <p className="text-xs text-gray-500">{item.nip}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700">
                          {item.departemen}
                        </span>
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
                          {formatDate(item.tglApproval)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700">
                          {item.approver}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
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
    </div>
  );
}
