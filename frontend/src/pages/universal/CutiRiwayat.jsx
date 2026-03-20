import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Eye,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';

export default function CutiRiwayat() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const riwayatCuti = [
    {
      id: 1,
      jenis: 'Cuti Tahunan',
      tanggalMulai: '2026-02-10',
      tanggalSelesai: '2026-02-12',
      durasi: 3,
      alasan: 'Liburan keluarga',
      status: 'approved',
      approver: 'Ahmad Fauzi (Koordinator)',
      tglApproval: '2026-02-05',
    },
    {
      id: 2,
      jenis: 'Izin Sakit',
      tanggalMulai: '2026-02-15',
      tanggalSelesai: '2026-02-16',
      durasi: 2,
      alasan: 'Demam',
      lampiran: 'surat_dokter.pdf',
      status: 'approved',
      approver: 'Ahmad Fauzi (Koordinator)',
      tglApproval: '2026-02-15',
    },
    {
      id: 3,
      jenis: 'Cuti Tahunan',
      tanggalMulai: '2026-03-01',
      tanggalSelesai: '2026-03-05',
      durasi: 5,
      alasan: 'Liburan ke Bali',
      status: 'pending_level1',
      approver: '-',
      tglApproval: '-',
    },
    {
      id: 4,
      jenis: 'Izin Keperluan Keluarga',
      tanggalMulai: '2026-02-20',
      tanggalSelesai: '2026-02-20',
      durasi: 1,
      alasan: 'Acara keluarga',
      status: 'pending_level2',
      approver: 'Ahmad Fauzi (Koordinator)',
      tglApproval: '2026-02-18',
    },
    {
      id: 5,
      jenis: 'Cuti Khusus',
      tanggalMulai: '2026-01-25',
      tanggalSelesai: '2026-02-05',
      durasi: 12,
      alasan: 'Melahirkan',
      lampiran: 'surat_kelahiran.pdf',
      status: 'approved',
      approver: 'HRD',
      tglApproval: '2026-01-20',
    },
    {
      id: 6,
      jenis: 'Izin Sakit',
      tanggalMulai: '2026-02-28',
      tanggalSelesai: '2026-03-02',
      durasi: 3,
      alasan: 'Demam berdarah',
      status: 'rejected',
      approver: 'Ahmad Fauzi (Koordinator)',
      tglApproval: '2026-02-27',
      catatan: 'Surat dokter tidak lengkap',
    },
  ];

  // Summary cards
  const summaryCards = [
    {
      title: "SISA CUTI TAHUNAN",
      value: "8",
      change: "12",
      description: "total hari",
      icon: <Calendar size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "CUTI TERPAKAI",
      value: riwayatCuti
        .filter(i => i.status === 'approved')
        .reduce((acc, item) => acc + item.durasi, 0),
      change: "hari",
      description: "telah digunakan",
      icon: <Clock size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "MENUNGGU APPROVAL",
      value: riwayatCuti.filter(i => i.status.includes('pending')).length,
      change: "pengajuan",
      description: "perlu diproses",
      icon: <AlertCircle size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "TOTAL PENGAJUAN",
      value: riwayatCuti.length,
      change: "6",
      description: "riwayat",
      icon: <FileText size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1 w-fit">
            <CheckCircle size={10} />
            Disetujui
          </span>
        );
      case 'pending_level1':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit">
            <AlertCircle size={10} />
            Menunggu Atasan
          </span>
        );
      case 'pending_level2':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 flex items-center gap-1 w-fit">
            <AlertCircle size={10} />
            Menunggu HRD
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1 w-fit">
            <XCircle size={10} />
            Ditolak
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const filteredRiwayat = riwayatCuti.filter(item => {
    const matchesSearch = item.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.alasan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Riwayat Cuti & Izin</h1>
          <p className="text-sm text-gray-600 mt-1">
            Lihat histori pengajuan cuti dan izin Anda
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      {/* Riwayat Table dengan Search & Filter di dalamnya */}
      <div className="bg-white rounded-xl overflow-hidden">
        {/* Header Tabel dengan Search dan Filter */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Riwayat Pengajuan</h2>
                <p className="text-xs text-gray-500">Daftar pengajuan cuti dan izin</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Box - ukuran disesuaikan */}
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari jenis atau alasan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[250px]"
                />
              </div>
              
              {/* Filter Status - ukuran sesuai permintaan */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px] bg-white"
              >
                <option value="all">Semua Status</option>
                <option value="approved">Disetujui</option>
                <option value="pending_level1">Menunggu Atasan</option>
                <option value="pending_level2">Menunggu HRD</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "1200px" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Jenis
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Tanggal Cuti
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Durasi
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Alasan
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Approver
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Tgl Approval
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRiwayat.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    <p>Tidak ada riwayat cuti</p>
                  </td>
                </tr>
              ) : (
                filteredRiwayat.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {item.jenis}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {formatDate(item.tanggalMulai)} - {formatDate(item.tanggalSelesai)}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.durasi} hari</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.alasan}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.approver}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {item.tglApproval !== '-' ? formatDate(item.tglApproval) : '-'}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                          title="Detail"
                        >
                          <Eye size={16} />
                        </button>
                        {item.lampiran && (
                          <button
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                            title="Download Lampiran"
                          >
                            <Download size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}