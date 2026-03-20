import React, { useState } from "react";
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
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  UserCheck,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Clock,
  Clock3,
  TrendingUp,
  Download,
  Filter,
  BarChart3,
  XCircle,
  Award
} from "lucide-react";

export default function LaporanAbsensi() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState("2026-03");
  const [selectedDept, setSelectedDept] = useState("all");

  const departments = ["Medis", "Keperawatan", "Apotek", "Umum", "Laboratorium"];

  const absensiStats = {
    totalKaryawan: 156,
    rataKehadiran: 94.2,
    totalHariKerja: 22,
    totalJamKerja: 3432,
    totalKeterlambatan: 47,
    totalPulangCepat: 23,
    totalIzin: 18,
    totalSakit: 12,
    totalCuti: 15,
    totalAlpha: 5,
  };

  // Summary Cards - 4 Cards sesuai layout Dashboard
  const summaryCards = [
    {
      title: "TOTAL KARYAWAN",
      value: absensiStats.totalKaryawan,
      change: "+12",
      trend: "up",
      description: "dari bulan lalu",
      icon: <Users size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "RATA-RATA HADIR",
      value: `${absensiStats.rataKehadiran}%`,
      change: "+2.1%",
      trend: "up",
      description: "dari bulan lalu",
      icon: <UserCheck size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "TOTAL TERLAMBAT",
      value: absensiStats.totalKeterlambatan,
      change: "-5",
      trend: "down",
      description: "dari bulan lalu",
      icon: <Clock3 size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "TOTAL ALPHA",
      value: absensiStats.totalAlpha,
      change: "+2",
      trend: "up",
      description: "dari bulan lalu",
      icon: <XCircle size={18} />,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  // Data Tren Kehadiran 6 Bulan
  const monthlyTrend = [
    { bulan: "Okt", hadir: 93.5, nonHadir: 6.5 },
    { bulan: "Nov", hadir: 94.2, nonHadir: 5.8 },
    { bulan: "Des", hadir: 93.8, nonHadir: 6.2 },
    { bulan: "Jan", hadir: 94.8, nonHadir: 5.2 },
    { bulan: "Feb", hadir: 95.1, nonHadir: 4.9 },
    { bulan: "Mar", hadir: 94.7, nonHadir: 5.3 },
  ];

  // Data Status Kehadiran untuk Pie
  const attendanceStatus = [
    { name: "Hadir", value: 287, color: "#10b981" },
    { name: "Izin", value: 18, color: "#3b82f6" },
    { name: "Sakit", value: 12, color: "#8b5cf6" },
    { name: "Cuti", value: 15, color: "#ec4899" },
    { name: "Terlambat", value: 47, color: "#f59e0b" },
    { name: "Alpha", value: 5, color: "#ef4444" },
  ];

  // Data Rekap per Departemen (untuk card)
  const deptStats = [
    { name: "Medis", hadir: 94.5, total: 45 },
    { name: "Keperawatan", hadir: 93.2, total: 52 },
    { name: "Apotek", hadir: 95.8, total: 18 },
    { name: "Umum", hadir: 92.5, total: 22 },
    { name: "Lab", hadir: 96.2, total: 12 },
  ];

  // Data Tren Keterlambatan
  const keterlambatanTrend = [
    { bulan: "Okt", value: 42 },
    { bulan: "Nov", value: 38 },
    { bulan: "Des", value: 40 },
    { bulan: "Jan", value: 35 },
    { bulan: "Feb", value: 32 },
    { bulan: "Mar", value: 34 },
  ];

  // Data Karyawan dengan Performa Terbaik
  const topPerformers = [
    { name: "Rina Wati", dept: "Apotek", hadir: "100%", badge: "Sempurna" },
    { name: "Dr. Siti Aminah", dept: "Medis", hadir: "95%", badge: "Baik" },
    { name: "Dewi Lestari", dept: "Kebidanan", hadir: "95%", badge: "Baik" },
  ];

  // Data Perlu Perhatian
  const needAttention = [
    { name: "Budi Santoso", dept: "Keperawatan", alpha: 1, terlambat: 4 },
    { name: "Ahmad Fauzi", dept: "Keperawatan", sakit: 1, terlambat: 3 },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString + "-01").toLocaleDateString("id-ID", options);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.name === "Hadir" ? "%" : ""}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header dengan Welcome dan Export */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Laporan Absensi & Kehadiran</h1>
            <p className="text-sm text-gray-600 mt-1">
              Rekapitulasi kehadiran karyawan periode {formatDate(selectedMonth)}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards - persis seperti Dashboard */}
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
                <span className="text-xs font-medium ml-1">{card.change}</span>
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {card.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Grafik & Statistik - layout 3 kolom seperti Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Tren Kehadiran 6 Bulan */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Tren Kehadiran 6 Bulan
              </h3>
              <p className="text-xs text-gray-600">Persentase kehadiran bulanan</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                +1.2%
              </span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyTrend}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  vertical={false}
                />
                <XAxis
                  dataKey="bulan"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                  domain={[90, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="hadir"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Hadir"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Kehadiran */}
        <div className="bg-white rounded-xl p-5">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">
              Status Kehadiran
            </h3>
            <p className="text-xs text-gray-600">Total: {attendanceStatus.reduce((sum, item) => sum + item.value, 0)} kejadian</p>
          </div>

          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  stroke="none"
                  dataKey="value"
                >
                  {attendanceStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} kejadian`, "Jumlah"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "white",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {attendanceStatus.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-xs text-gray-700">{item.name}</span>
                  <span className="text-xs font-medium text-gray-900">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grafik kedua - Tren Keterlambatan & Statistik Departemen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Tren Keterlambatan */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Tren Keterlambatan
              </h3>
              <p className="text-xs text-gray-600">Jumlah keterlambatan per bulan</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">
                -19%
              </span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={keterlambatanTrend}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                barSize={30}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  vertical={false}
                />
                <XAxis
                  dataKey="bulan"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill="#f59e0b"
                  name="Terlambat"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistik per Departemen */}
        <div className="bg-white rounded-xl p-5">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">
              Kehadiran per Departemen
            </h3>
            <p className="text-xs text-gray-600">Rata-rata % kehadiran</p>
          </div>

          <div className="space-y-4">
            {deptStats.map((dept, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-700">{dept.name}</span>
                  <span className="font-medium text-gray-900">{dept.hadir}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${dept.hadir}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                  {dept.total} karyawan
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Cards - Cuti Mendatang & Perlu Perhatian (2 kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Karyawan dengan Kehadiran Terbaik */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Kehadiran Terbaik
              </h3>
              <p className="text-xs text-gray-600">Performa kehadiran tertinggi</p>
            </div>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-[#1C4D8D] text-white rounded-lg text-xs font-medium hover:bg-[#163a6f] transition-colors">
              <span>Lihat Semua</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {topPerformers.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-green-100">
                    <Award size={14} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {item.dept} • Hadir {item.hadir}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Perlu Perhatian */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Perlu Perhatian
              </h3>
              <p className="text-xs text-gray-600">Karyawan dengan banyak keterlambatan</p>
            </div>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-[#1C4D8D] text-white rounded-lg text-xs font-medium hover:bg-[#163a6f] transition-colors">
              <span>Lihat Semua</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {needAttention.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="p-1.5 rounded-full bg-orange-200">
                  <AlertCircle size={12} className="text-orange-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-900">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {item.dept} • {item.terlambat ? `${item.terlambat}x terlambat` : ''} 
                    {item.alpha ? ` • Alpha ${item.alpha}` : ''}
                    {item.sakit ? ` • Sakit ${item.sakit}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}