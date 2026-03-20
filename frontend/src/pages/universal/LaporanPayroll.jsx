import React, { useState } from "react";
import {
  CreditCard, Download, Calendar, TrendingUp, PieChart, BarChart3,
  Users, ChevronRight, DollarSign, Clock, Percent, FileText, Briefcase
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

export default function LaporanPayroll() {
  const [selectedMonth, setSelectedMonth] = useState("2026-03");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [activeTab, setActiveTab] = useState("ringkasan");

  // ========== FORMAT FUNCTIONS ==========
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", { 
      style: "currency", 
      currency: "IDR", 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(angka);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString + "-01").toLocaleDateString("id-ID", options);
  };

  // ========== DATA ==========
  const payrollSummary = {
    totalGaji: 985000000,
    totalPenerimaan: 1250000000,
    totalPotongan: 265000000,
    rataGaji: 6314103,
    totalLembur: 88400000,
    totalKasbon: 15000000,
    totalBPJS: 54600000,
    totalPajak: 46800000,
  };

  const komponenGaji = [
    { name: "Gaji Pokok", value: 520000000, color: "#1C4D8D" },
    { name: "Tunjangan Kompetensi", value: 156000000, color: "#3b82f6" },
    { name: "Tunjangan Profesi", value: 208000000, color: "#60a5fa" },
    { name: "Tunjangan Jabatan", value: 104000000, color: "#93c5fd" },
    { name: "Tunjangan Makan", value: 52000000, color: "#f59e0b" },
    { name: "Insentif Kinerja", value: 78000000, color: "#f97316" },
    { name: "Insentif Tindakan", value: 124800000, color: "#fbbf24" },
    { name: "Lembur", value: 88400000, color: "#10b981" },
  ];

  const potongan = [
    { name: "BPJS Kesehatan", value: 18200000, color: "#ef4444" },
    { name: "BPJS Ketenagakerjaan", value: 23400000, color: "#f97316" },
    { name: "Pajak (PPh 21)", value: 46800000, color: "#f59e0b" },
    { name: "Dapen", value: 31200000, color: "#eab308" },
    { name: "Sedekah", value: 5200000, color: "#84cc16" },
    { name: "Kasbon", value: 15000000, color: "#10b981" },
    { name: "Lain-lain", value: 124000000, color: "#6b7280" },
  ];

  const payrollPerDepartemen = [
    { name: "Medis", jumlah: 325000000, karyawan: 45, rata: 7222222 },
    { name: "Keperawatan", jumlah: 285000000, karyawan: 52, rata: 5480769 },
    { name: "Apotek", jumlah: 156000000, karyawan: 24, rata: 6500000 },
    { name: "Umum", jumlah: 124000000, karyawan: 18, rata: 6888889 },
    { name: "Laboratorium", jumlah: 95000000, karyawan: 17, rata: 5588235 },
  ];

  const trenBulanan = [
    { bulan: "Jan 2026", total: 945000000 },
    { bulan: "Feb 2026", total: 962000000 },
    { bulan: "Mar 2026", total: 985000000 },
    { bulan: "Apr 2026", total: 991000000 },
    { bulan: "Mei 2026", total: 1002000000 },
    { bulan: "Jun 2026", total: 1015000000 },
  ];

  const komposisiPenerimaan = [
    { name: "Gaji Pokok & Tunjangan", value: 75, color: "#1C4D8D" },
    { name: "Insentif", value: 18, color: "#f59e0b" },
    { name: "Lembur", value: 7, color: "#10b981" },
  ];

  // ========== TABS ==========
  const tabs = [
    { 
      id: "ringkasan", 
      label: "Ringkasan Payroll", 
      icon: <CreditCard size={16} />,
      count: formatRupiah(payrollSummary.totalGaji).replace("Rp", "").trim()
    },
    { 
      id: "komponen", 
      label: "Komponen Gaji", 
      icon: <PieChart size={16} />,
      count: `${komponenGaji.length} komponen`
    },
    { 
      id: "departemen", 
      label: "Per Departemen", 
      icon: <Briefcase size={16} />,
      count: `${payrollPerDepartemen.length} dept`
    },
  ];

  // ========== CUSTOM TOOLTIP ==========
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-xs font-medium text-gray-900 mb-2">{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? formatRupiah(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // ========== SUMMARY CARDS ==========
  const summaryCards = [
    {
      title: "TOTAL GAJI",
      value: formatRupiah(payrollSummary.totalGaji),
      change: "+4.2%",
      trend: "up",
      description: "dari bulan lalu",
      icon: <DollarSign size={20} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "TOTAL LEMBUR",
      value: formatRupiah(payrollSummary.totalLembur),
      change: "+8.5%",
      trend: "up",
      description: "dari bulan lalu",
      icon: <Clock size={20} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "TOTAL POTONGAN",
      value: formatRupiah(payrollSummary.totalPotongan),
      change: "-2.1%",
      trend: "down",
      description: "dari bulan lalu",
      icon: <Percent size={20} />,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "RATA-RATA GAJI",
      value: formatRupiah(payrollSummary.rataGaji),
      change: "+3.8%",
      trend: "up",
      description: "per karyawan",
      icon: <Users size={20} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Laporan Payroll & Penggajian</h1>
          <p className="text-sm text-gray-600 mt-1">
            Rekapitulasi penggajian periode {formatDate(selectedMonth)}
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
          {/* Summary Cards - selalu tampil */}
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
                  {card.trend && (
                    <div className={`flex items-center text-${card.trend === "up" ? "green" : "red"}-600`}>
                      <ChevronRight size={14} className="rotate-90" />
                      <span className="text-xs font-medium ml-0.5">{card.change}</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-500 ml-2">{card.description}</span>
                </div>
              </div>
            ))}
          </div>

          {/* RINGKASAN VIEW */}
          {activeTab === "ringkasan" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Komposisi Penerimaan */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Komposisi Penerimaan</h3>
                    <p className="text-xs text-gray-600">Gaji Pokok vs Insentif vs Lembur</p>
                  </div>
                </div>
                
                <div className="flex items-center h-48">
                  <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={komposisiPenerimaan}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          stroke="none"
                          dataKey="value"
                        >
                          {komposisiPenerimaan.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-2">
                    {komposisiPenerimaan.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                          <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ringkasan Potongan */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Ringkasan Potongan</h3>
                    <p className="text-xs text-gray-600">BPJS, Pajak, dan lainnya</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-600 mb-1">BPJS Kesehatan</p>
                      <p className="text-sm font-bold text-blue-700">{formatRupiah(payrollSummary.totalBPJS / 2)}</p>
                      <p className="text-[10px] text-blue-500">Perusahaan</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-xs text-orange-600 mb-1">BPJS Ketenaga</p>
                      <p className="text-sm font-bold text-orange-700">{formatRupiah(payrollSummary.totalBPJS / 2)}</p>
                      <p className="text-[10px] text-orange-500">Perusahaan</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-yellow-600 mb-1">Pajak (PPh 21)</p>
                      <p className="text-sm font-bold text-yellow-700">{formatRupiah(payrollSummary.totalPajak)}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-purple-600 mb-1">Kasbon</p>
                      <p className="text-sm font-bold text-purple-700">{formatRupiah(payrollSummary.totalKasbon)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tren Payroll */}
              <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Tren Payroll 6 Bulan</h3>
                    <p className="text-xs text-gray-600">Perkembangan total gaji bulanan</p>
                  </div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trenBulanan}
                      margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
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
                        tickFormatter={(value) => formatRupiah(value).replace("Rp", "")}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#1C4D8D"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#1C4D8D" }}
                        activeDot={{ r: 6 }}
                        name="Total Gaji"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* KOMPONEN GAJI VIEW */}
          {activeTab === "komponen" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Penerimaan */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Penerimaan</h3>
                    <p className="text-xs text-gray-600">Komponen gaji dan tunjangan</p>
                  </div>
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {komponenGaji.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="font-medium text-gray-900">{formatRupiah(item.value)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${(item.value / payrollSummary.totalPenerimaan) * 100}%`,
                            backgroundColor: item.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Total Penerimaan</span>
                      <span className="text-sm font-bold text-green-600">
                        {formatRupiah(payrollSummary.totalPenerimaan)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Potongan */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Potongan</h3>
                    <p className="text-xs text-gray-600">BPJS, pajak, dan lainnya</p>
                  </div>
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {potongan.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="font-medium text-gray-900">{formatRupiah(item.value)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${(item.value / payrollSummary.totalPotongan) * 100}%`,
                            backgroundColor: item.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Total Potongan</span>
                      <span className="text-sm font-bold text-red-600">
                        {formatRupiah(payrollSummary.totalPotongan)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DEPARTEMEN VIEW */}
          {activeTab === "departemen" && (
            <div className="space-y-6">
              {/* Grafik per Departemen */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Distribusi Payroll per Departemen</h3>
                    <p className="text-xs text-gray-600">Total gaji per departemen</p>
                  </div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={payrollPerDepartemen}
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
                        tickFormatter={(value) => formatRupiah(value).replace("Rp", "")}
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
                        dataKey="jumlah"
                        fill="#1C4D8D"
                        radius={[4, 4, 0, 0]}
                        name="Total Gaji"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tabel Payroll per Departemen */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-700">Detail Payroll per Departemen</h2>
                  <span className="text-xs text-gray-500">
                    Total {payrollPerDepartemen.length} departemen
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full" style={{ minWidth: "800px" }}>
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Departemen</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">Total Gaji</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">Jumlah Karyawan</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">Rata-rata</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">Persentase</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {payrollPerDepartemen.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-right text-sm text-gray-900">
                            {formatRupiah(item.jumlah)}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-right text-sm text-gray-700">
                            {item.karyawan}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-right text-sm text-blue-600 font-medium">
                            {formatRupiah(item.rata)}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-right text-sm font-medium text-purple-600">
                            {((item.jumlah / payrollSummary.totalGaji) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t border-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">Total</td>
                        <td className="py-3 px-4 text-right text-sm font-bold text-gray-900">
                          {formatRupiah(payrollSummary.totalGaji)}
                        </td>
                        <td className="py-3 px-4 text-right text-sm font-bold text-gray-900">
                          {payrollPerDepartemen.reduce((sum, dept) => sum + dept.karyawan, 0)}
                        </td>
                        <td className="py-3 px-4 text-right text-sm font-bold text-gray-900">
                          {formatRupiah(payrollSummary.rataGaji)}
                        </td>
                        <td className="py-3 px-4 text-right text-sm font-bold text-gray-900">100%</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}