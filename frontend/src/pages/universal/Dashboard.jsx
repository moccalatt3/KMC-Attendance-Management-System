import React from "react";
import { useAuth } from "../../context/AuthContext";
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
import {
  Users,
  UserCheck,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Clock,
  CheckCircle,
  Award,
  FileText,
  Briefcase,
  Home,
  Hospital,
  Clock3,
  TrendingUp,
  Minus,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  // Summary Cards Data - 4 Cards sesuai layout
  const summaryCards = [
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
    {
      title: "KEHADIRAN HARI INI",
      value: "287",
      change: "92%",
      trend: "up",
      description: "tingkat kehadiran",
      icon: <UserCheck size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "TERLAMBAT",
      value: "23",
      change: "-5",
      trend: "down",
      description: "dari kemarin",
      icon: <Clock3 size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "CUTI & IZIN",
      value: "24",
      change: "+3",
      trend: "up",
      description: "hari ini",
      icon: <Calendar size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  // Data Tren Kehadiran Mingguan
  const weeklyTrend = [
    { day: "Sen", hadir: 295, izin: 12, sakit: 8, cuti: 10 },
    { day: "Sel", hadir: 298, izin: 14, sakit: 6, cuti: 12 },
    { day: "Rab", hadir: 287, izin: 18, sakit: 12, cuti: 15 },
    { day: "Kam", hadir: 290, izin: 16, sakit: 9, cuti: 14 },
    { day: "Jum", hadir: 285, izin: 20, sakit: 10, cuti: 16 },
    { day: "Sab", hadir: 112, izin: 5, sakit: 3, cuti: 4 },
    { day: "Min", hadir: 45, izin: 2, sakit: 1, cuti: 2 },
  ];

  // Data Status Karyawan
  const employeeStatus = [
    { name: "Tetap", value: 184, color: "#1C4D8D" },
    { name: "Full Time", value: 86, color: "#3b82f6" },
    { name: "Part Time", value: 42, color: "#60a5fa" },
    { name: "Kontrak", value: 16, color: "#93c5fd" },
  ];

  // Data Status Kehadiran untuk Pie
  const attendanceStatus = [
    { name: "Hadir", value: 287, color: "#10b981" },
    { name: "Izin", value: 18, color: "#3b82f6" },
    { name: "Sakit", value: 12, color: "#8b5cf6" },
    { name: "Cuti", value: 15, color: "#ec4899" },
    { name: "Terlambat", value: 23, color: "#f59e0b" },
    { name: "Alpha", value: 8, color: "#ef4444" },
  ];

  // Data Cuti Mendatang
  const upcomingLeaves = [
    {
      id: 1,
      employee: "Dewi Lestari",
      type: "Cuti Tahunan",
      date: "20-25 Jan 2024",
      status: "approved",
      department: "Keuangan",
    },
    {
      id: 2,
      employee: "Rudi Hermawan",
      type: "Cuti Menikah",
      date: "22-29 Jan 2024",
      status: "approved",
      department: "IT",
    },
    {
      id: 3,
      employee: "Indah Permata",
      type: "Cuti Melahirkan",
      date: "1 Feb - 1 Apr 2024",
      status: "pending",
      department: "HRD",
    },
  ];

  // Data Peringatan
  const alerts = [
    {
      id: 1,
      title: "Kontak Akan Berakhir",
      message: "8 karyawan akan habis kontrak dalam 30 hari",
      time: "2 jam lalu",
      type: "warning",
    },
    {
      id: 2,
      title: "Dokumen Perlu Diperbarui",
      message: "15 karyawan perlu perbarui SIP/STR",
      time: "5 jam lalu",
      type: "info",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value} orang
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard HRIS</h1>
            <p className="text-sm text-gray-600 mt-1">
              Selamat datang, {user?.name || "Admin"} - Periode Januari 2024
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

      {/* Grafik & Status Karyawan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Tren Kehadiran Mingguan */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Tren Kehadiran Mingguan
              </h3>
              <p className="text-xs text-gray-600">Kehadiran & non-hadir</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                +4.2%
              </span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyTrend}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                barSize={30}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
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
                {/* Bar dengan radius hanya di atas [4,4,0,0] dan bawah tajam */}
                <Bar
                  dataKey="hadir"
                  stackId="a"
                  fill="#10b981"
                  name="Hadir"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="izin"
                  stackId="a"
                  fill="#3b82f6"
                  name="Izin"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="sakit"
                  stackId="a"
                  fill="#8b5cf6"
                  name="Sakit"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="cuti"
                  stackId="a"
                  fill="#ec4899"
                  name="Cuti"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Karyawan */}
        <div className="bg-white rounded-xl p-5">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">
              Status Karyawan
            </h3>
            <p className="text-xs text-gray-600">Total: 328 karyawan</p>
          </div>

          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={employeeStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  stroke="none"
                  dataKey="value"
                >
                  {employeeStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} orang`, "Jumlah"]}
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
            {employeeStatus.map((item, index) => (
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

      {/* Cuti Mendatang & Peringatan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cuti Mendatang */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Cuti Mendatang
              </h3>
              <p className="text-xs text-gray-600">7 hari ke depan</p>
            </div>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-[#1C4D8D] text-white rounded-lg text-xs font-medium hover:bg-[#163a6f] transition-colors">
              <span>Kelola Cuti</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingLeaves.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-1.5 rounded-lg ${
                      item.status === "approved"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    <Calendar
                      size={14}
                      className={
                        item.status === "approved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {item.employee}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {item.type} - {item.department}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status === "approved" ? "Disetujui" : "Menunggu"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Peringatan & Notifikasi */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Peringatan & Notifikasi
              </h3>
              <p className="text-xs text-gray-600">Perlu perhatian</p>
            </div>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-[#1C4D8D] text-white rounded-lg text-xs font-medium hover:bg-[#163a6f] transition-colors">
              <span>Lihat Semua</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div
                  className={`p-1.5 rounded-full ${
                    alert.type === "warning" ? "bg-orange-200" : "bg-blue-200"
                  }`}
                >
                  {alert.type === "warning" ? (
                    <AlertCircle size={12} className="text-orange-700" />
                  ) : (
                    <FileText size={12} className="text-blue-700" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-900">
                      {alert.title}
                    </p>
                    <span className="text-[10px] text-gray-500">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {alert.message}
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
