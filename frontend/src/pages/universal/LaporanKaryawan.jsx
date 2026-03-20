import React, { useState } from "react";
import {
  Users, Download, Filter, Calendar, TrendingUp, PieChart, 
  BarChart3, UserPlus, UserMinus, Briefcase, GraduationCap, 
  Heart, ChevronRight, AlertCircle, Clock
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function LaporanKaryawan() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [activeTab, setActiveTab] = useState("demografi");

  // Data Demografi
  const demografiData = {
    totalKaryawan: 156,
    pria: 68,
    wanita: 88,
    statusPernikahan: { menikah: 98, belum: 58 },
    pendidikan: [
      { name: "S2", value: 12, color: "#1C4D8D" },
      { name: "S1", value: 78, color: "#3b82f6" },
      { name: "D3", value: 42, color: "#60a5fa" },
      { name: "SMA", value: 24, color: "#93c5fd" },
    ],
    usia: [
      { range: "< 25", jumlah: 28, color: "#f97316" },
      { range: "25-35", jumlah: 82, color: "#f59e0b" },
      { range: "36-45", jumlah: 34, color: "#eab308" },
      { range: "> 45", jumlah: 12, color: "#84cc16" },
    ],
    perDepartemen: [
      { name: "Medis", jumlah: 45, persen: 29 },
      { name: "Keperawatan", jumlah: 52, persen: 33 },
      { name: "Apotek", jumlah: 18, persen: 12 },
      { name: "Umum", jumlah: 22, persen: 14 },
      { name: "Lainnya", jumlah: 19, persen: 12 },
    ],
  };

  // Data Turnover
  const turnoverData = {
    totalMasuk: 12,
    totalKeluar: 8,
    turnoverRate: 5.2,
    alasanKeluar: [
      { name: "Mengundurkan Diri", value: 4, color: "#ef4444" },
      { name: "Kontrak Habis", value: 2, color: "#f97316" },
      { name: "Pensiun", value: 1, color: "#3b82f6" },
      { name: "PHK", value: 1, color: "#8b5cf6" },
    ],
    trenBulanan: [
      { bulan: "Jan", masuk: 2, keluar: 1 },
      { bulan: "Feb", masuk: 1, keluar: 0 },
      { bulan: "Mar", masuk: 3, keluar: 2 },
      { bulan: "Apr", masuk: 2, keluar: 1 },
      { bulan: "Mei", masuk: 2, keluar: 2 },
      { bulan: "Jun", masuk: 2, keluar: 2 },
    ],
  };

  // Data Kontrak
  const kontrakData = {
    tetap: 98,
    fulltime: 42,
    parttime: 16,
    statusKaryawan: [
      { name: "Tetap", value: 98, color: "#10b981" },
      { name: "Full Time", value: 42, color: "#3b82f6" },
      { name: "Part Time", value: 16, color: "#f59e0b" },
    ],
    kontrakBerakhir: [
      { id: 1, nama: "Rina Wati", departemen: "Apotek", tglBerakhir: "2027-02-01", status: "Kontrak 1", sisaHari: 45 },
      { id: 2, nama: "Budi Santoso", departemen: "Keperawatan", tglBerakhir: "2026-12-31", status: "Kontrak 2", sisaHari: 30 },
      { id: 3, nama: "Dewi Lestari", departemen: "Kebidanan", tglBerakhir: "2026-11-30", status: "Kontrak 3", sisaHari: 15 },
      { id: 4, nama: "Ahmad Fauzi", departemen: "Keperawatan", tglBerakhir: "2026-10-15", status: "Kontrak 1", sisaHari: 7 },
    ],
  };

  const tabs = [
    { 
      id: "demografi", 
      label: "Demografi Karyawan", 
      icon: <PieChart size={16} />,
      count: demografiData.totalKaryawan 
    },
    { 
      id: "turnover", 
      label: "Turnover Karyawan", 
      icon: <TrendingUp size={16} />,
      count: `${turnoverData.turnoverRate}%` 
    },
    { 
      id: "kontrak", 
      label: "Status Kontrak", 
      icon: <Briefcase size={16} />,
      count: kontrakData.kontrakBerakhir.length 
    },
  ];

  const formatNumber = (angka) => {
    return new Intl.NumberFormat("id-ID").format(angka);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-xs font-medium text-gray-900 mb-2">{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value} {entry.name === "Turnover Rate" ? "%" : "orang"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Summary Cards berdasarkan tab aktif
  const getSummaryCards = () => {
    if (activeTab === "demografi") {
      return [
        {
          title: "TOTAL KARYAWAN",
          value: demografiData.totalKaryawan,
          change: "+12",
          trend: "up",
          description: "dari tahun lalu",
          icon: <Users size={20} />,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          title: "PRIA",
          value: demografiData.pria,
          change: "44%",
          description: "dari total",
          icon: <Users size={20} />,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          title: "WANITA",
          value: demografiData.wanita,
          change: "56%",
          description: "dari total",
          icon: <Users size={20} />,
          iconColor: "text-pink-600",
          bgColor: "bg-pink-50",
        },
        {
          title: "MENIKAH",
          value: demografiData.statusPernikahan.menikah,
          change: "63%",
          description: "dari total",
          icon: <Heart size={20} />,
          iconColor: "text-purple-600",
          bgColor: "bg-purple-50",
        },
      ];
    } else if (activeTab === "turnover") {
      return [
        {
          title: "TOTAL MASUK",
          value: turnoverData.totalMasuk,
          change: "+4",
          trend: "up",
          description: "dari tahun lalu",
          icon: <UserPlus size={20} />,
          iconColor: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          title: "TOTAL KELUAR",
          value: turnoverData.totalKeluar,
          change: "-2",
          trend: "down",
          description: "dari tahun lalu",
          icon: <UserMinus size={20} />,
          iconColor: "text-red-600",
          bgColor: "bg-red-50",
        },
        {
          title: "TURNOVER RATE",
          value: `${turnoverData.turnoverRate}%`,
          change: "-0.8%",
          trend: "down",
          description: "dari tahun lalu",
          icon: <TrendingUp size={20} />,
          iconColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
        },
        {
          title: "RATA-RATA / BULAN",
          value: "1.3",
          change: "masuk/keluar",
          description: "per bulan",
          icon: <Calendar size={20} />,
          iconColor: "text-purple-600",
          bgColor: "bg-purple-50",
        },
      ];
    } else {
      return [
        {
          title: "KARYAWAN TETAP",
          value: kontrakData.tetap,
          change: "63%",
          description: "dari total",
          icon: <Briefcase size={20} />,
          iconColor: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          title: "FULL TIME",
          value: kontrakData.fulltime,
          change: "27%",
          description: "dari total",
          icon: <Briefcase size={20} />,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          title: "PART TIME",
          value: kontrakData.parttime,
          change: "10%",
          description: "dari total",
          icon: <Briefcase size={20} />,
          iconColor: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          title: "KONTRAK BERAKHIR",
          value: kontrakData.kontrakBerakhir.length,
          change: "+2",
          trend: "up",
          description: "dari bulan lalu",
          icon: <AlertCircle size={20} />,
          iconColor: "text-red-600",
          bgColor: "bg-red-50",
        },
      ];
    }
  };

  const summaryCards = getSummaryCards();

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Laporan Karyawan & Turnover</h1>
          <p className="text-sm text-gray-600 mt-1">
            Rekapitulasi data karyawan periode tahun {selectedYear}
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="border-b border-gray-100 overflow-x-auto">
          <div className="flex justify-start sm:justify-center px-3 sm:px-4 py-2 sm:py-3 min-w-max sm:min-w-full">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-1.5 sm:py-2.5 font-medium text-xs sm:text-sm whitespace-nowrap relative transition-all rounded-lg ${
                    activeTab === tab.id
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="hidden sm:inline">{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 sm:px-2 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? "bg-gray-100 text-gray-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {card.title}
                  </p>
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <div className={card.iconColor}>{card.icon}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {card.value}
                </h3>

                <div className="flex items-center">
                  {card.trend ? (
                    <div className={`flex items-center text-${card.trend === "up" ? "green" : "red"}-600`}>
                      <ChevronRight size={14} className="rotate-90" />
                      <span className="text-xs font-medium ml-0.5">{card.change}</span>
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-gray-600">{card.change}</span>
                  )}
                  <span className="text-xs text-gray-500 ml-2">{card.description}</span>
                </div>
              </div>
            ))}
          </div>

          {/* DEMOGRAFI VIEW */}
          {activeTab === "demografi" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Pendidikan */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Pendidikan Terakhir</h3>
                    <p className="text-xs text-gray-600">Distribusi tingkat pendidikan</p>
                  </div>
                </div>
                
                <div className="flex items-center h-48">
                  <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={demografiData.pendidikan}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          stroke="none"
                          dataKey="value"
                        >
                          {demografiData.pendidikan.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-2">
                    {demografiData.pendidikan.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">{item.value}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-100 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Total</span>
                        <span className="text-xs font-bold text-gray-900">
                          {demografiData.pendidikan.reduce((sum, item) => sum + item.value, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kelompok Usia */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Kelompok Usia</h3>
                    <p className="text-xs text-gray-600">Distribusi usia karyawan</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {demografiData.usia.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">{item.range}</span>
                        <span className="font-medium text-gray-900">{item.jumlah} orang</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${(item.jumlah / demografiData.totalKaryawan) * 100}%`,
                            backgroundColor: item.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribusi per Departemen */}
              <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Distribusi per Departemen</h3>
                    <p className="text-xs text-gray-600">Jumlah karyawan per departemen</p>
                  </div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={demografiData.perDepartemen}
                      margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                      barSize={25}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                      <XAxis
                        dataKey="name"
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
                        dataKey="jumlah"
                        fill="#1C4D8D"
                        radius={[4, 4, 0, 0]}
                        name="Jumlah"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TURNOVER VIEW */}
          {activeTab === "turnover" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Tren Turnover */}
              <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Tren Turnover 6 Bulan</h3>
                    <p className="text-xs text-gray-600">Perbandingan karyawan masuk vs keluar</p>
                  </div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={turnoverData.trenBulanan}
                      margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                      barSize={25}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
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
                        dataKey="masuk"
                        fill="#10b981"
                        name="Masuk"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="keluar"
                        fill="#ef4444"
                        name="Keluar"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Alasan Keluar */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Alasan Keluar</h3>
                    <p className="text-xs text-gray-600">Distribusi penyebab resign</p>
                  </div>
                </div>
                
                <div className="flex items-center h-48">
                  <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={turnoverData.alasanKeluar}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          stroke="none"
                          dataKey="value"
                        >
                          {turnoverData.alasanKeluar.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-2">
                    {turnoverData.alasanKeluar.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ringkasan Turnover */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Ringkasan Turnover</h3>
                    <p className="text-xs text-gray-600">Tahun {selectedYear}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-green-600 mb-1">Total Masuk</p>
                      <p className="text-xl font-bold text-green-700">{turnoverData.totalMasuk}</p>
                      <p className="text-xs text-green-500">orang</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-red-600 mb-1">Total Keluar</p>
                      <p className="text-xl font-bold text-red-700">{turnoverData.totalKeluar}</p>
                      <p className="text-xs text-red-500">orang</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-xs text-yellow-600 mb-1">Turnover Rate</p>
                    <p className="text-2xl font-bold text-yellow-700">{turnoverData.turnoverRate}%</p>
                    <p className="text-xs text-yellow-500 mt-1">Di bawah rata-rata industri (10-15%)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* KONTRAK VIEW */}
          {activeTab === "kontrak" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Status Karyawan */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Status Karyawan</h3>
                    <p className="text-xs text-gray-600">Berdasarkan jenis kontrak</p>
                  </div>
                </div>
                
                <div className="flex items-center h-48">
                  <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={kontrakData.statusKaryawan}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          stroke="none"
                          dataKey="value"
                        >
                          {kontrakData.statusKaryawan.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-2">
                    {kontrakData.statusKaryawan.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kontrak Akan Berakhir */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Kontrak Akan Berakhir</h3>
                    <p className="text-xs text-gray-600">3 bulan ke depan</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {kontrakData.kontrakBerakhir.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-1.5 rounded-lg ${
                          item.sisaHari <= 7 ? "bg-red-100" :
                          item.sisaHari <= 30 ? "bg-yellow-100" : "bg-blue-100"
                        }`}>
                          <Clock size={14} className={
                            item.sisaHari <= 7 ? "text-red-600" :
                            item.sisaHari <= 30 ? "text-yellow-600" : "text-blue-600"
                          } />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{item.nama}</h4>
                          <p className="text-xs text-gray-500">
                            {item.departemen} • {item.status}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gray-900">{item.tglBerakhir}</p>
                        <p className={`text-[10px] ${
                          item.sisaHari <= 7 ? "text-red-600" :
                          item.sisaHari <= 30 ? "text-yellow-600" : "text-gray-500"
                        }`}>
                          Sisa {item.sisaHari} hari
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}