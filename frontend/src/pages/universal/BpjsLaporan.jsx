import React, { useState } from "react";
import { Download, Heart, Shield, Calendar, Users, TrendingUp, FileText, ChevronRight, PieChart, BarChart3, Activity, DollarSign } from "lucide-react";
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

export default function BpjsLaporan() {
  const [selectedMonth, setSelectedMonth] = useState("2026-03");
  const [activeTab, setActiveTab] = useState("kesehatan");

  // Data untuk summary cards
  const bpjsKesehatanData = {
    totalKaryawan: 156,
    totalIuran: 23400000,
    iuranPerusahaan: 15600000,
    iuranKaryawan: 7800000,
    daftarKaryawan: [
      { 
        id: 1,
        nama: "Dr. Siti Aminah, Sp.PD", 
        nip: "KAR-001", 
        departemen: "Medis",
        iuranPerusahaan: 120000, 
        iuranKaryawan: 60000, 
        total: 180000,
        status: "aktif",
      },
      { 
        id: 2,
        nama: "Ahmad Fauzi, S.Kep", 
        nip: "KAR-002", 
        departemen: "Keperawatan",
        iuranPerusahaan: 100000, 
        iuranKaryawan: 50000, 
        total: 150000,
        status: "aktif",
      },
      { 
        id: 3,
        nama: "Rina Wati, S.Farm", 
        nip: "KAR-003", 
        departemen: "Apotek",
        iuranPerusahaan: 100000, 
        iuranKaryawan: 50000, 
        total: 150000,
        status: "aktif",
      },
      { 
        id: 4,
        nama: "Budi Santoso", 
        nip: "KAR-004", 
        departemen: "Keperawatan",
        iuranPerusahaan: 100000, 
        iuranKaryawan: 50000, 
        total: 150000,
        status: "aktif",
      },
      { 
        id: 5,
        nama: "Dewi Lestari, Amd.Keb", 
        nip: "KAR-005", 
        departemen: "Kebidanan",
        iuranPerusahaan: 100000, 
        iuranKaryawan: 50000, 
        total: 150000,
        status: "aktif",
      },
    ],
  };

  const bpjsNakerData = {
    totalKaryawan: 156,
    totalIuran: 31200000,
    iuranPerusahaan: 20800000,
    iuranKaryawan: 10400000,
    daftarKaryawan: [
      { 
        id: 1,
        nama: "Dr. Siti Aminah, Sp.PD", 
        nip: "KAR-001", 
        departemen: "Medis",
        iuranPerusahaan: 160000, 
        iuranKaryawan: 80000, 
        total: 240000,
        status: "aktif",
      },
      { 
        id: 2,
        nama: "Ahmad Fauzi, S.Kep", 
        nip: "KAR-002", 
        departemen: "Keperawatan",
        iuranPerusahaan: 130000, 
        iuranKaryawan: 65000, 
        total: 195000,
        status: "aktif",
      },
      { 
        id: 3,
        nama: "Rina Wati, S.Farm", 
        nip: "KAR-003", 
        departemen: "Apotek",
        iuranPerusahaan: 130000, 
        iuranKaryawan: 65000, 
        total: 195000,
        status: "aktif",
      },
      { 
        id: 4,
        nama: "Budi Santoso", 
        nip: "KAR-004", 
        departemen: "Keperawatan",
        iuranPerusahaan: 130000, 
        iuranKaryawan: 65000, 
        total: 195000,
        status: "aktif",
      },
      { 
        id: 5,
        nama: "Dewi Lestari, Amd.Keb", 
        nip: "KAR-005", 
        departemen: "Kebidanan",
        iuranPerusahaan: 130000, 
        iuranKaryawan: 65000, 
        total: 195000,
        status: "aktif",
      },
    ],
  };

  // Data untuk grafik
  const iuranTrendData = [
    { bulan: "Okt 2025", kesehatan: 22100000, naker: 29800000 },
    { bulan: "Nov 2025", kesehatan: 22500000, naker: 30200000 },
    { bulan: "Des 2025", kesehatan: 22800000, naker: 30500000 },
    { bulan: "Jan 2026", kesehatan: 23000000, naker: 30800000 },
    { bulan: "Feb 2026", kesehatan: 23200000, naker: 31000000 },
    { bulan: "Mar 2026", kesehatan: 23400000, naker: 31200000 },
  ];

  const iuranPerDepartemen = [
    { name: "Medis", kesehatan: 7200000, naker: 9600000 },
    { name: "Keperawatan", kesehatan: 5400000, naker: 7200000 },
    { name: "Apotek", kesehatan: 3600000, naker: 4800000 },
    { name: "Administrasi", kesehatan: 2400000, naker: 3200000 },
    { name: "Umum", kesehatan: 1800000, naker: 2400000 },
  ];

  const komposisiIuran = [
    { name: "Iuran Perusahaan", value: 67, color: "#3b82f6" },
    { name: "Iuran Karyawan", value: 33, color: "#f59e0b" },
  ];

  const tabs = [
    { 
      id: "kesehatan", 
      label: "BPJS Kesehatan", 
      icon: <Heart size={16} />,
      count: bpjsKesehatanData.daftarKaryawan.length 
    },
    { 
      id: "naker", 
      label: "BPJS Ketenagakerjaan", 
      icon: <Shield size={16} />,
      count: bpjsNakerData.daftarKaryawan.length 
    },
  ];

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", { 
      style: "currency", 
      currency: "IDR", 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(angka);
  };

  const currentData = activeTab === "kesehatan" ? bpjsKesehatanData : bpjsNakerData;

  // Summary Cards - ukuran konsisten dengan halaman lain
  const summaryCards = [
    {
      title: "TOTAL KARYAWAN",
      value: currentData.totalKaryawan,
      change: currentData.totalKaryawan,
      description: "peserta",
      icon: <Users size={20} />,
      iconColor: activeTab === "kesehatan" ? "text-red-600" : "text-blue-600",
      bgColor: activeTab === "kesehatan" ? "bg-red-50" : "bg-blue-50",
    },
    {
      title: "TOTAL IURAN",
      value: formatRupiah(currentData.totalIuran),
      change: "+8.5%",
      trend: "up",
      description: "dari bulan lalu",
      icon: <TrendingUp size={20} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "IURAN PERUSAHAAN",
      value: formatRupiah(currentData.iuranPerusahaan),
      change: "67%",
      description: "dari total",
      icon: <FileText size={20} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "IURAN KARYAWAN",
      value: formatRupiah(currentData.iuranKaryawan),
      change: "33%",
      description: "dari total",
      icon: <Users size={20} />,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-xs font-medium text-gray-900 mb-2">{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.name?.includes("Iuran") ? formatRupiah(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString + "-01").toLocaleDateString("id-ID", options);
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Laporan BPJS</h1>
          <p className="text-sm text-gray-600 mt-1">
            Rekapitulasi iuran BPJS periode {formatDate(selectedMonth)}
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
          {/* Summary Cards - ukuran penuh seperti halaman lain */}
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

          {/* Grafik Utama - 2 baris x 2 kolom dengan ukuran proporsional */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Grafik Komposisi Iuran */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Komposisi Iuran</h3>
                  <p className="text-xs text-gray-600">Perusahaan vs Karyawan</p>
                </div>
            
              </div>
              
              <div className="flex items-center h-48">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={komposisiIuran}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        stroke="none"
                        dataKey="value"
                      >
                        {komposisiIuran.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-4">
                  {komposisiIuran.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-700">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Total Iuran</span>
                      <span className="text-sm font-bold text-gray-900">{formatRupiah(currentData.totalIuran)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grafik Rata-rata Iuran */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Rata-rata Iuran</h3>
                  <p className="text-xs text-gray-600">Per karyawan per bulan</p>
                </div>
              
              </div>
              
              <div className="text-center py-6">
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {formatRupiah(currentData.totalIuran / currentData.totalKaryawan)}
                </p>
                <p className="text-sm text-gray-600 mb-4">per karyawan</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 mb-1">Iuran Perusahaan</p>
                    <p className="text-sm font-semibold text-blue-700">
                      {formatRupiah(currentData.iuranPerusahaan / currentData.totalKaryawan)}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-xs text-orange-600 mb-1">Iuran Karyawan</p>
                    <p className="text-sm font-semibold text-orange-700">
                      {formatRupiah(currentData.iuranKaryawan / currentData.totalKaryawan)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grafik Tren Iuran */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Tren Iuran 6 Bulan</h3>
                  <p className="text-xs text-gray-600">Perkembangan iuran bulanan</p>
                </div>
            
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={iuranTrendData} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
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
                      tickFormatter={(value) => formatRupiah(value).replace("Rp", "")}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey={activeTab === "kesehatan" ? "kesehatan" : "naker"}
                      stroke={activeTab === "kesehatan" ? "#ef4444" : "#3b82f6"}
                      strokeWidth={2}
                      dot={{ r: 4, fill: activeTab === "kesehatan" ? "#ef4444" : "#3b82f6" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grafik Top 5 Departemen */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Top 5 Departemen</h3>
                  <p className="text-xs text-gray-600">Total iuran per departemen</p>
                </div>
            
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={iuranPerDepartemen} 
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
                    barSize={16}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                    <XAxis 
                      type="number" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "#6b7280", fontSize: 11 }}
                      tickFormatter={(value) => formatRupiah(value).replace("Rp", "")}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 11 }}
                      width={50}
                    />
                    <Tooltip 
                      formatter={(value) => formatRupiah(value)}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        fontSize: "11px",
                      }}
                    />
                    <Bar 
                      dataKey={activeTab === "kesehatan" ? "kesehatan" : "naker"} 
                      radius={[0, 4, 4, 0]}
                      fill={activeTab === "kesehatan" ? "#ef4444" : "#3b82f6"}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detail Table */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-700">Detail Iuran Karyawan</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: "900px" }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">NIP</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Departemen</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">Perusahaan</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">Karyawan</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentData.daftarKaryawan.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">{item.nip}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">{item.nama}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">{item.departemen}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-right text-sm text-blue-600 font-medium">
                        {formatRupiah(item.iuranPerusahaan)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right text-sm text-orange-600 font-medium">
                        {formatRupiah(item.iuranKaryawan)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                        {formatRupiah(item.total)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Aktif
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}