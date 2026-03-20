import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, Clock, User, Calendar, FileText, 
  Search, AlertCircle, Eye, Inbox, History, ArrowUpRight, 
  ArrowDownRight, Users 
} from 'lucide-react';

export default function LemburApproval() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('pengajuan');

  const departments = ['Medis', 'Keperawatan', 'Apotek', 'Umum', 'Laboratorium', 'Keamanan'];

  const pendingApprovals = [
    {
      id: 1,
      nama: 'Ahmad Fauzi, S.Kep',
      nip: 'KAR-002',
      departemen: 'Keperawatan',
      shift: 'Siang',
      tanggal: '2026-03-18',
      jamMulai: '21:00',
      jamSelesai: '23:30',
      durasi: 2.5,
      alasan: 'Pasien darurat',
      file: 'SPL_002.pdf',
      pengaju: 'Ahmad Fauzi',
      tglPengajuan: '2026-03-17',
      status: 'pending',
    },
    {
      id: 2,
      nama: 'apt. Rina Wati, S.Farm',
      nip: 'KAR-003',
      departemen: 'Apotek',
      shift: 'Malam',
      tanggal: '2026-03-19',
      jamMulai: '07:00',
      jamSelesai: '09:00',
      durasi: 2,
      alasan: 'Operasi darurat',
      file: 'SPL_003.pdf',
      pengaju: 'Rina Wati',
      tglPengajuan: '2026-03-17',
      status: 'pending',
    },
    {
      id: 3,
      nama: 'Bambang Supriyadi',
      nip: 'KAR-004',
      departemen: 'Keamanan',
      shift: 'Pagi',
      tanggal: '2026-03-20',
      jamMulai: '14:00',
      jamSelesai: '17:00',
      durasi: 3,
      alasan: 'Inventarisasi obat',
      file: 'SPL_004.pdf',
      pengaju: 'Bambang Supriyadi',
      tglPengajuan: '2026-03-16',
      status: 'pending',
    },
    {
      id: 4,
      nama: 'drg. Dewi Lestari',
      nip: 'KAR-006',
      departemen: 'Gigi',
      shift: 'Siang',
      tanggal: '2026-03-21',
      jamMulai: '19:00',
      jamSelesai: '22:00',
      durasi: 3,
      alasan: 'Pasien darurat',
      file: 'SPL_006.pdf',
      pengaju: 'Dewi Lestari',
      tglPengajuan: '2026-03-18',
      status: 'pending',
    },
    {
      id: 5,
      nama: 'Rudi Hermawan, S.Tr.Kes',
      nip: 'KAR-007',
      departemen: 'Laboratorium',
      shift: 'Malam',
      tanggal: '2026-03-22',
      jamMulai: '22:00',
      jamSelesai: '01:00',
      durasi: 3,
      alasan: 'Analisa sampel darurat',
      file: 'SPL_007.pdf',
      pengaju: 'Rudi Hermawan',
      tglPengajuan: '2026-03-19',
      status: 'pending',
    },
  ];

  const historyApprovals = [
    {
      id: 101,
      nama: 'Dr. Siti Aminah, Sp.PD',
      nip: 'KAR-001',
      departemen: 'Medis',
      tanggal: '2026-03-10',
      durasi: 2,
      status: 'approved',
      tglApproval: '2026-03-10',
      catatan: 'Disetujui',
    },
    {
      id: 102,
      nama: 'dr. Maya Sari',
      nip: 'KAR-005',
      departemen: 'Medis',
      tanggal: '2026-03-03',
      durasi: 3,
      status: 'approved',
      tglApproval: '2026-03-04',
      catatan: 'Disetujui',
    },
    {
      id: 103,
      nama: 'Dr. Siti Aminah, Sp.PD',
      nip: 'KAR-001',
      departemen: 'Medis',
      tanggal: '2026-03-01',
      durasi: 3,
      status: 'rejected',
      tglApproval: '2026-03-02',
      catatan: 'Melebihi kuota lembur',
    },
    {
      id: 104,
      nama: 'Ahmad Fauzi, S.Kep',
      nip: 'KAR-002',
      departemen: 'Keperawatan',
      tanggal: '2026-02-25',
      durasi: 2,
      status: 'approved',
      tglApproval: '2026-02-25',
      catatan: 'Disetujui',
    },
    {
      id: 105,
      nama: 'apt. Rina Wati, S.Farm',
      nip: 'KAR-003',
      departemen: 'Apotek',
      tanggal: '2026-02-20',
      durasi: 2.5,
      status: 'approved',
      tglApproval: '2026-02-20',
      catatan: 'Disetujui',
    },
  ];

  // Stats
  const stats = {
    pending: pendingApprovals.length,
    approvedMonth: 12,
    totalJam: 28,
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
      title: "TOTAL JAM LEMBUR",
      value: `${stats.totalJam} jam`,
      change: "+4",
      description: "dari bulan lalu",
      icon: <User size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "RATA-RATA DURASI",
      value: "2.3 jam",
      change: "per lembur",
      description: "rata-rata",
      icon: <Calendar size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const tabs = [
    {
      id: 'pengajuan',
      label: 'Pengajuan Lembur',
      icon: <Inbox size={16} className="mr-1" />,
      count: pendingApprovals.length,
    },
    {
      id: 'riwayat',
      label: 'Riwayat Approval',
      icon: <History size={16} className="mr-1" />,
      count: historyApprovals.length,
    },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">Menunggu</span>;
      case 'approved':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">Disetujui</span>;
      case 'rejected':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap">Ditolak</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">{status}</span>;
    }
  };

  const filteredPending = pendingApprovals.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.departemen.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === 'all' || item.departemen === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const filteredHistory = historyApprovals.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.departemen.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === 'all' || item.departemen === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Approval Lembur (SPL)</h1>
            <p className="text-sm text-gray-600 mt-1">
              Persetujuan Surat Perintah Lembur karyawan
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

      {/* Content: Pengajuan Lembur */}
      {activeTab === 'pengajuan' && (
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
                  placeholder="Cari pengajuan berdasarkan nama, NIP, atau departemen..."
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
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {filteredPending.length} pengajuan
              </div>
            </div>
          </div>

          {/* Tabel Pengajuan */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: "1200px" }}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[220px]">Karyawan</th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">Departemen</th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">Shift</th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">Tanggal</th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Jam</th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">Durasi</th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">Status</th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPending.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-gray-500">
                      <Inbox size={40} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-sm font-medium">Tidak ada pengajuan lembur</p>
                    </td>
                  </tr>
                ) : (
                  filteredPending.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="min-w-[180px]">
                          <p className="text-sm font-medium text-gray-900">{item.nama}</p>
                          <p className="text-xs text-gray-500">{item.nip}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700">{item.departemen}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-gray-700">{item.shift}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-gray-700 whitespace-nowrap">{formatDate(item.tanggal)}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-gray-700 whitespace-nowrap">{item.jamMulai} - {item.jamSelesai}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm font-medium text-gray-900">{item.durasi} jam</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200" title="Setujui">
                            <CheckCircle size={16} />
                          </button>
                          <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200" title="Tolak">
                            <XCircle size={16} />
                          </button>
                          <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200" title="Detail">
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

      {/* Content: Riwayat Approval */}
      {activeTab === 'riwayat' && (
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
                  placeholder="Cari riwayat berdasarkan nama, NIP, atau departemen..."
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
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {filteredHistory.length} riwayat
              </div>
            </div>
          </div>

          {/* Tabel Riwayat */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: "1000px" }}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[220px]">Karyawan</th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">Departemen</th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">Tanggal</th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[90px]">Durasi</th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">Status</th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">Tgl Approval</th>
                  <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-500">
                      <History size={40} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-sm font-medium">Tidak ada riwayat approval</p>
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="min-w-[180px]">
                          <p className="text-sm font-medium text-gray-900">{item.nama}</p>
                          <p className="text-xs text-gray-500">{item.nip}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700">{item.departemen}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-gray-700 whitespace-nowrap">{formatDate(item.tanggal)}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-gray-700">{item.durasi} jam</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700 whitespace-nowrap">{formatDate(item.tglApproval)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-700">{item.catatan}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
            <p className="text-xs text-gray-500">
              Menampilkan {filteredHistory.length} dari {historyApprovals.length} riwayat approval
            </p>
          </div>
        </div>
      )}
    </div>
  );
}