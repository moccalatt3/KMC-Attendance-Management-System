import React, { useState } from "react";
import {
  Search,
  Download,
  Calendar,
  BarChart3,
  Users,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AbsensiRekap() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState("2026-03");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Data rekap absensi sesuai dengan struktur data karyawan
  const [rekapData] = useState([
    {
      id: 1,
      nip: "KAR-001",
      nama_lengkap: "Siti Aminah, Sp.PD",
      gelar_depan: "Dr.",
      gelar_belakang: "Sp.PD",
      departemen: "Medis",
      jabatan: "Dokter Spesialis Penyakit Dalam",
      status: "Aktif",
      avatar_color: "bg-green-500",
      absensi: {
        hadir: 20,
        terlambat: 2,
        izin: 1,
        cuti: 2,
        sakit: 0,
        alpha: 0,
        total_hari_kerja: 25,
        persentase: 88,
      },
    },
    {
      id: 2,
      nip: "KAR-002",
      nama_lengkap: "Ahmad Fauzi, S.Kep",
      gelar_depan: "",
      gelar_belakang: "S.Kep",
      departemen: "Keperawatan",
      jabatan: "Kepala Ruangan",
      status: "Aktif",
      avatar_color: "bg-blue-500",
      absensi: {
        hadir: 18,
        terlambat: 3,
        izin: 2,
        cuti: 1,
        sakit: 1,
        alpha: 0,
        total_hari_kerja: 25,
        persentase: 72,
      },
    },
    {
      id: 3,
      nip: "KAR-003",
      nama_lengkap: "Rina Wati, S.Farm",
      gelar_depan: "Apt.",
      gelar_belakang: "S.Farm",
      departemen: "Apotek",
      jabatan: "Apoteker Penanggung Jawab",
      status: "Aktif",
      avatar_color: "bg-purple-500",
      absensi: {
        hadir: 22,
        terlambat: 1,
        izin: 0,
        cuti: 0,
        sakit: 0,
        alpha: 2,
        total_hari_kerja: 25,
        persentase: 88,
      },
    },
    {
      id: 4,
      nip: "KAR-004",
      nama_lengkap: "Bambang Supriyadi",
      gelar_depan: "",
      gelar_belakang: "",
      departemen: "Keamanan",
      jabatan: "Satpam",
      status: "Cuti",
      avatar_color: "bg-yellow-500",
      absensi: {
        hadir: 19,
        terlambat: 4,
        izin: 1,
        cuti: 0,
        sakit: 1,
        alpha: 0,
        total_hari_kerja: 25,
        persentase: 76,
      },
    },
    {
      id: 5,
      nip: "KAR-005",
      nama_lengkap: "Maya Sari",
      gelar_depan: "Dr.",
      gelar_belakang: "",
      departemen: "Medis",
      jabatan: "Dokter Umum",
      status: "Aktif",
      avatar_color: "bg-indigo-500",
      absensi: {
        hadir: 21,
        terlambat: 2,
        izin: 0,
        cuti: 1,
        sakit: 1,
        alpha: 0,
        total_hari_kerja: 25,
        persentase: 84,
      },
    },
  ]);

  // Hitung statistik
  const totalKaryawan = rekapData.length;
  const totalHadir = rekapData.reduce((sum, emp) => sum + emp.absensi.hadir, 0);
  const totalTerlambat = rekapData.reduce((sum, emp) => sum + emp.absensi.terlambat, 0);
  const totalIzin = rekapData.reduce((sum, emp) => sum + emp.absensi.izin, 0);
  const totalCuti = rekapData.reduce((sum, emp) => sum + emp.absensi.cuti, 0);
  const totalSakit = rekapData.reduce((sum, emp) => sum + emp.absensi.sakit, 0);
  const totalAlpha = rekapData.reduce((sum, emp) => sum + emp.absensi.alpha, 0);
  
  const rataPersentase = Math.round(
    rekapData.reduce((sum, emp) => sum + emp.absensi.persentase, 0) / totalKaryawan
  );

  const teamStats = {
    totalKaryawan,
    totalHadir,
    rataPersentase,
    totalTerlambat,
    totalIzin,
    totalCuti,
    totalSakit,
    totalAlpha,
  };

  // Data untuk grafik
  const chartData = [
    { name: "Hadir", value: totalHadir, color: "#10b981" },
    { name: "Izin", value: totalIzin, color: "#3b82f6" },
    { name: "Sakit", value: totalSakit, color: "#8b5cf6" },
    { name: "Cuti", value: totalCuti, color: "#ec4899" },
  ];

  const summaryCards = [
    {
      title: "TOTAL KARYAWAN",
      value: teamStats.totalKaryawan,
      change: `${teamStats.totalKaryawan}`,
      description: "terdaftar",
      icon: <Users size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "RATA-RATA HADIR",
      value: `${teamStats.rataPersentase}%`,
      change: teamStats.rataPersentase >= 85 ? "Baik" : "Kurang",
      trend: teamStats.rataPersentase >= 85 ? "up" : "down",
      description: "dari target 85%",
      icon: <BarChart3 size={18} />,
      iconColor: teamStats.rataPersentase >= 85 ? "text-green-600" : "text-yellow-600",
      bgColor: teamStats.rataPersentase >= 85 ? "bg-green-50" : "bg-yellow-50",
    },
    {
      title: "TOTAL TERLAMBAT",
      value: teamStats.totalTerlambat,
      change: `${teamStats.totalTerlambat}`,
      description: "kejadian",
      icon: <Clock size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "TOTAL ALPHA",
      value: teamStats.totalAlpha,
      change: `${teamStats.totalAlpha}`,
      description: "tanpa keterangan",
      icon: <XCircle size={18} />,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm" style={{ color: payload[0].color }}>
            {payload[0].name}: {payload[0].value} orang
          </p>
        </div>
      );
    }
    return null;
  };

  const handleViewDetail = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedEmployee(null);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString + "-01").toLocaleDateString("id-ID", options);
  };

  // Filter employees berdasarkan search
  const filteredData = rekapData.filter((emp) => {
    const matchesSearch =
      emp.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.departemen.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Rekap Absensi
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Rekapitulasi kehadiran karyawan periode{" "}
              {formatDate(selectedMonth)}
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] transition-all duration-200">
            <Download size={16} />
            <span>Export Laporan</span>
          </button>
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

      {/* Grafik Distribusi Kehadiran */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart Distribusi */}
        <div className="bg-white rounded-xl p-5">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">
              Distribusi Kehadiran
            </h3>
            <p className="text-xs text-gray-600">
              Total {teamStats.totalHadir} kehadiran
            </p>
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  stroke="none"
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                      strokeWidth={0}
                      fontSize={12}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Detail - Ukuran lebih kecil */}
        <div className="bg-white rounded-xl p-5">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">
              Detail Status Kehadiran
            </h3>
            <p className="text-xs text-gray-600">Perbandingan status</p>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                layout="vertical"
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} fontSize={10} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  width={50}
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari karyawan berdasarkan NIP atau nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
              >
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
                <option value="yearly">Tahunan</option>
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
              >
                <option value="2026-01">Januari 2026</option>
                <option value="2026-02">Februari 2026</option>
                <option value="2026-03">Maret 2026</option>
                <option value="2026-04">April 2026</option>
                <option value="2026-05">Mei 2026</option>
                <option value="2026-06">Juni 2026</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabel Rekap Absensi */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Karyawan
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hadir
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Terlambat
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Izin
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cuti
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sakit
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alpha
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % Hadir
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    Tidak ada data absensi
                  </td>
                </tr>
              ) : (
                filteredData.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => handleViewDetail(emp)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full ${emp.avatar_color} flex items-center justify-center text-white font-medium text-xs flex-shrink-0`}
                        >
                          {emp.nama_lengkap?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {emp.gelar_depan} {emp.nama_lengkap}{" "}
                            {emp.gelar_belakang}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {emp.departemen} - {emp.jabatan}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm font-medium text-green-600">
                        {emp.absensi.hadir}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-yellow-600">
                        {emp.absensi.terlambat}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-blue-600">
                        {emp.absensi.izin}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-purple-600">
                        {emp.absensi.cuti}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-orange-600">
                        {emp.absensi.sakit}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-red-600">
                        {emp.absensi.alpha}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm font-medium">
                          {emp.absensi.persentase}%
                        </span>
                        <div className="w-12 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              emp.absensi.persentase >= 85
                                ? "bg-green-500"
                                : emp.absensi.persentase >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${emp.absensi.persentase}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Absensi Karyawan */}
      {showDetailModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart3 size={20} className="mr-2 text-[#1C4D8D]" />
                Detail Absensi Karyawan
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
                  className={`w-16 h-16 rounded-full ${selectedEmployee.avatar_color} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}
                >
                  {selectedEmployee.nama_lengkap?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedEmployee.gelar_depan}{" "}
                    {selectedEmployee.nama_lengkap}{" "}
                    {selectedEmployee.gelar_belakang}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedEmployee.jabatan}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    NIP: {selectedEmployee.nip} • {selectedEmployee.departemen}
                  </p>
                </div>
              </div>

              {/* Ringkasan Absensi */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-green-600 mb-1">Hadir</p>
                  <p className="text-xl font-bold text-green-700">
                    {selectedEmployee.absensi.hadir}
                  </p>
                  <p className="text-xs text-green-500">hari</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-yellow-600 mb-1">Terlambat</p>
                  <p className="text-xl font-bold text-yellow-700">
                    {selectedEmployee.absensi.terlambat}
                  </p>
                  <p className="text-xs text-yellow-500">kali</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-blue-600 mb-1">Izin</p>
                  <p className="text-xl font-bold text-blue-700">
                    {selectedEmployee.absensi.izin}
                  </p>
                  <p className="text-xs text-blue-500">hari</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-purple-600 mb-1">Cuti</p>
                  <p className="text-xl font-bold text-purple-700">
                    {selectedEmployee.absensi.cuti}
                  </p>
                  <p className="text-xs text-purple-500">hari</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-orange-600 mb-1">Sakit</p>
                  <p className="text-xl font-bold text-orange-700">
                    {selectedEmployee.absensi.sakit}
                  </p>
                  <p className="text-xs text-orange-500">hari</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-red-600 mb-1">Alpha</p>
                  <p className="text-xl font-bold text-red-700">
                    {selectedEmployee.absensi.alpha}
                  </p>
                  <p className="text-xs text-red-500">hari</p>
                </div>
              </div>

              {/* Detail Perhitungan */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Detail Perhitungan
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Hari Kerja</span>
                    <span className="font-medium">
                      {selectedEmployee.absensi.total_hari_kerja} hari
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Kehadiran</span>
                    <span className="font-medium text-green-600">
                      {selectedEmployee.absensi.hadir} hari
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Ketidakhadiran</span>
                    <span className="font-medium text-red-600">
                      {selectedEmployee.absensi.izin +
                        selectedEmployee.absensi.cuti +
                        selectedEmployee.absensi.sakit +
                        selectedEmployee.absensi.alpha}{" "}
                      hari
                    </span>
                  </div>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700">Persentase Kehadiran</span>
                      <span
                        className={`${
                          selectedEmployee.absensi.persentase >= 85
                            ? "text-green-600"
                            : selectedEmployee.absensi.persentase >= 70
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedEmployee.absensi.persentase}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={closeDetailModal}
                className="px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}