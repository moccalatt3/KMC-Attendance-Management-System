import React, { useState } from 'react';
import {
  Calendar,
  Settings,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Download,
  Users,
  Clock,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ChevronDown,
} from 'lucide-react';

export default function PayrollGenerate() {
  const [selectedMonth, setSelectedMonth] = useState('2026-03');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);

  const steps = [
    { id: 1, name: 'Data Absensi', status: 'completed' },
    { id: 2, name: 'Data Lembur', status: 'completed' },
    { id: 3, name: 'Komponen Gaji', status: 'current' },
    { id: 4, name: 'Generate Payroll', status: 'pending' },
  ];

  const payrollSummary = {
    totalKaryawan: 156,
    hadir: 148,
    sakit: 4,
    izin: 2,
    cuti: 2,
    totalJamLembur: 347,
    totalKasbon: 15000000,
  };

  const komponenGaji = [
    { komponen: 'Gaji Pokok', total: 520000000 },
    { komponen: 'Tunjangan Kompetensi', total: 156000000 },
    { komponen: 'Tunjangan Profesi', total: 208000000 },
    { komponen: 'Tunjangan Jabatan', total: 104000000 },
    { komponen: 'Tunjangan Makan', total: 52000000 },
    { komponen: 'Insentif Kinerja', total: 78000000 },
    { komponen: 'Insentif Tindakan', total: 124800000 },
    { komponen: 'Lembur', total: 88400000 },
    { komponen: 'BPJS Kesehatan', total: 18200000 },
    { komponen: 'BPJS Ketenagakerjaan', total: 23400000 },
    { komponen: 'Pajak (PPh 21)', total: 46800000 },
  ];

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 3000);
  };

  const totalPenerimaan = komponenGaji.slice(0, 8).reduce((sum, item) => sum + item.total, 0);
  const totalPotongan = komponenGaji.slice(8, 11).reduce((sum, item) => sum + item.total, 0);
  const totalBersih = totalPenerimaan - totalPotongan;

  // Summary cards untuk statistik
  const summaryCards = [
    {
      title: "TOTAL KARYAWAN",
      value: payrollSummary.totalKaryawan,
      change: "aktif",
      description: "bulan ini",
      icon: <Users size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "KEHADIRAN",
      value: payrollSummary.hadir,
      change: `${Math.round((payrollSummary.hadir / payrollSummary.totalKaryawan) * 100)}%`,
      description: "tingkat hadir",
      icon: <CheckCircle size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "TOTAL LEMBUR",
      value: `${payrollSummary.totalJamLembur} jam`,
      change: "347 jam",
      description: "total lembur",
      icon: <Clock size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "TOTAL KASBON",
      value: formatRupiah(payrollSummary.totalKasbon),
      change: "Rp 15 Jt",
      description: "total potongan",
      icon: <CreditCard size={18} />,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Generate Payroll</h1>
            <p className="text-sm text-gray-600 mt-1">
              Proses perhitungan gaji dan kompensasi karyawan
            </p>
          </div>
        </div>
      </div>

      {/* Steps Progress - tanpa border */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                  step.status === 'completed' ? 'bg-green-100 text-green-600' :
                  step.status === 'current' ? 'bg-[#1C4D8D] text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {step.status === 'completed' ? <CheckCircle size={16} /> : step.id}
                </div>
                <span className={`ml-2 text-sm ${
                  step.status === 'current' ? 'font-medium text-[#1C4D8D]' : 'text-gray-500'
                }`}>{step.name}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Summary Cards - tanpa border dan shadow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Komponen Gaji - tanpa border */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Rekap Komponen Gaji</h2>
              <p className="text-xs text-gray-500">Ringkasan penerimaan dan potongan seluruh karyawan</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Penerimaan */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <TrendingUp size={14} className="text-green-600 mr-2" />
                PENERIMAAN
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {komponenGaji.slice(0, 8).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                      <span className="text-sm text-gray-600">{item.komponen}</span>
                      <span className="text-sm font-medium text-gray-900">{formatRupiah(item.total)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-3 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Total Penerimaan</span>
                      <span className="text-base font-bold text-green-600">{formatRupiah(totalPenerimaan)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Potongan */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <TrendingDown size={14} className="text-red-600 mr-2" />
                POTONGAN
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {komponenGaji.slice(8, 11).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                      <span className="text-sm text-gray-600">{item.komponen}</span>
                      <span className="text-sm font-medium text-gray-900">{formatRupiah(item.total)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-3 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Total Potongan</span>
                      <span className="text-base font-bold text-red-600">{formatRupiah(totalPotongan)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Gaji Bersih */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-[#1C4D8D]" />
                <span className="text-sm font-medium text-[#1C4D8D]">Total Gaji Bersih yang Harus Dibayarkan:</span>
              </div>
              <span className="text-xl font-bold text-[#1C4D8D]">{formatRupiah(totalBersih)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Card - tanpa border */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div>
              <p className="text-sm font-medium text-gray-800">Pastikan data sudah benar sebelum generate</p>
              <p className="text-xs text-gray-500 mt-1">
                Generate payroll akan memproses gaji seluruh karyawan untuk periode Maret 2026. 
                Data yang sudah digenerate dapat direview sebelum finalisasi.
              </p>
            </div>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-3 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-[#163a6f] transition-all disabled:opacity-50 min-w-[180px] justify-center"
          >
            {isGenerating ? (
              <>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>Generate Payroll</span>
              </>
            )}
          </button>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span className="text-sm text-green-700">Payroll berhasil digenerate! Slip gaji telah tersedia untuk semua karyawan.</span>
          </div>
        )}
      </div>
    </div>
  );
}