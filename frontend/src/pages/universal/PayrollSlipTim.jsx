import React, { useState } from 'react';
import { 
  Search, Download, Filter, Eye, Calendar, Users, CreditCard,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle
} from 'lucide-react';

export default function PayrollSlipTim() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2026-03');
  const [selectedDept, setSelectedDept] = useState('all');

  const teamPayroll = [
    {
      id: 1,
      nama: 'Dr. Siti Aminah, Sp.PD',
      nip: 'KAR-001',
      departemen: 'Medis',
      jabatan: 'Dokter Spesialis',
      gajiPokok: 5000000,
      tunjangan: 4500000,
      lembur: 850000,
      potongan: 1200000,
      total: 9150000,
      status: 'generated',
    },
    {
      id: 2,
      nama: 'Ahmad Fauzi, S.Kep',
      nip: 'KAR-002',
      departemen: 'Keperawatan',
      jabatan: 'Kepala Ruangan',
      gajiPokok: 3500000,
      tunjangan: 2500000,
      lembur: 450000,
      potongan: 800000,
      total: 5650000,
      status: 'generated',
    },
    {
      id: 3,
      nama: 'apt. Rina Wati, S.Farm',
      nip: 'KAR-003',
      departemen: 'Apotek',
      jabatan: 'Apoteker',
      gajiPokok: 4000000,
      tunjangan: 3000000,
      lembur: 650000,
      potongan: 950000,
      total: 6700000,
      status: 'generated',
    },
    {
      id: 4,
      nama: 'Bambang Supriyadi',
      nip: 'KAR-004',
      departemen: 'Keamanan',
      jabatan: 'Satpam',
      gajiPokok: 3500000,
      tunjangan: 2500000,
      lembur: 550000,
      potongan: 800000,
      total: 5750000,
      status: 'pending',
    },
    {
      id: 5,
      nama: 'drg. Dewi Lestari',
      nip: 'KAR-006',
      departemen: 'Gigi',
      jabatan: 'Dokter Gigi',
      gajiPokok: 5500000,
      tunjangan: 5000000,
      lembur: 950000,
      potongan: 1400000,
      total: 10050000,
      status: 'generated',
    },
    {
      id: 6,
      nama: 'Rudi Hermawan, S.Tr.Kes',
      nip: 'KAR-007',
      departemen: 'Laboratorium',
      jabatan: 'Analis',
      gajiPokok: 3800000,
      tunjangan: 2000000,
      lembur: 350000,
      potongan: 700000,
      total: 5450000,
      status: 'generated',
    },
    {
      id: 7,
      nama: 'dr. Maya Sari',
      nip: 'KAR-005',
      departemen: 'Medis',
      jabatan: 'Dokter Umum',
      gajiPokok: 4500000,
      tunjangan: 3000000,
      lembur: 750000,
      potongan: 950000,
      total: 7300000,
      status: 'pending',
    },
  ];

  const departments = [...new Set(teamPayroll.map(e => e.departemen))];

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(angka);
  };

  const filteredPayroll = teamPayroll.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'all' || item.departemen === selectedDept;
    return matchesSearch && matchesDept;
  });

  const totalGaji = filteredPayroll.reduce((sum, item) => sum + item.total, 0);
  const totalKaryawan = filteredPayroll.length;
  const rataGaji = totalKaryawan ? totalGaji / totalKaryawan : 0;
  const pendingCount = teamPayroll.filter(i => i.status === 'pending').length;

  const summaryCards = [
    {
      title: "TOTAL KARYAWAN",
      value: totalKaryawan,
      change: `${totalKaryawan}`,
      description: "karyawan",
      icon: <Users size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "TOTAL GAJI",
      value: formatRupiah(totalGaji),
      change: "+8.5%",
      description: "dari bulan lalu",
      icon: <CreditCard size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "RATA-RATA GAJI",
      value: formatRupiah(rataGaji),
      change: "per karyawan",
      description: "rata-rata",
      icon: <Users size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "MENUNGGU GENERATE",
      value: pendingCount,
      change: `${pendingCount}`,
      description: "slip gaji",
      icon: <Clock size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'generated':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">Generated</span>;
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">Pending</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">{status}</span>;
    }
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Slip Gaji Tim</h1>
            <p className="text-sm text-gray-600 mt-1">
              Kelola dan lihat slip gaji anggota tim
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

      {/* Search Bar - menyatu dengan tabel */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau NIP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px] bg-white"
              >
                <option value="all">Semua Departemen</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabel Slip Gaji */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "1400px" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[220px]">NIP</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[220px]">Nama</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">Departemen</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[180px]">Jabatan</th>
                <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Gaji Pokok</th>
                <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Tunjangan</th>
                <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">Lembur</th>
                <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">Potongan</th>
                <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Total</th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">Status</th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayroll.length === 0 ? (
                <tr>
                  <td colSpan="11" className="py-12 text-center text-gray-500">
                    <Users size={40} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-medium">Tidak ada data karyawan</p>
                  </td>
                </tr>
              ) : (
                filteredPayroll.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="text-sm font-mono font-medium text-gray-700">{item.nip}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="min-w-[180px]">
                        <p className="text-sm font-medium text-gray-900">{item.nama}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{item.departemen}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{item.jabatan}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-sm text-gray-700 whitespace-nowrap">{formatRupiah(item.gajiPokok)}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-sm text-gray-700 whitespace-nowrap">{formatRupiah(item.tunjangan)}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-sm text-green-600 whitespace-nowrap">{formatRupiah(item.lembur)}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-sm text-red-600 whitespace-nowrap">{formatRupiah(item.potongan)}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-sm font-bold text-gray-900 whitespace-nowrap">{formatRupiah(item.total)}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200" title="Lihat Slip">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Menampilkan {filteredPayroll.length} dari {teamPayroll.length} karyawan
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Generated</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}