import React, { useState } from 'react';
import { 
  FileText, Download, Upload, Trash2, Eye, Plus, Search, 
  Calendar, Filter, CheckCircle, AlertCircle, Clock 
} from 'lucide-react';

export default function KaryawanDokumen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedJenis, setSelectedJenis] = useState('all');

  const documents = [
    {
      id: 1,
      nip: 'KAR-001',
      nama: 'Dr. Siti Aminah, Sp.PD',
      jenis: 'KTP',
      namaFile: 'ktp_siti_aminah.pdf',
      tglUpload: '2026-01-15',
      ukuran: '245 KB',
      status: 'verified',
    },
    {
      id: 2,
      nip: 'KAR-001',
      nama: 'Dr. Siti Aminah, Sp.PD',
      jenis: 'Kartu Keluarga',
      namaFile: 'kk_siti_aminah.pdf',
      tglUpload: '2026-01-15',
      ukuran: '312 KB',
      status: 'verified',
    },
    {
      id: 3,
      nip: 'KAR-001',
      nama: 'Dr. Siti Aminah, Sp.PD',
      jenis: 'NPWP',
      namaFile: 'npwp_siti_aminah.pdf',
      tglUpload: '2026-01-15',
      ukuran: '189 KB',
      status: 'verified',
    },
    {
      id: 4,
      nip: 'KAR-001',
      nama: 'Dr. Siti Aminah, Sp.PD',
      jenis: 'Kontrak Kerja',
      namaFile: 'kontrak_3_siti_aminah.pdf',
      tglUpload: '2026-01-15',
      ukuran: '1.2 MB',
      tglMulai: '2026-01-15',
      tglHabis: '2027-01-14',
      status: 'active',
    },
    {
      id: 5,
      nip: 'KAR-001',
      nama: 'Dr. Siti Aminah, Sp.PD',
      jenis: 'SIP',
      namaFile: 'sip_siti_aminah.pdf',
      tglUpload: '2026-01-15',
      ukuran: '456 KB',
      tglBerlaku: '2024-01-01',
      tglHabis: '2026-12-31',
      status: 'active',
    },
    {
      id: 6,
      nip: 'KAR-001',
      nama: 'Dr. Siti Aminah, Sp.PD',
      jenis: 'STR',
      namaFile: 'str_siti_aminah.pdf',
      tglUpload: '2026-01-15',
      ukuran: '523 KB',
      tglBerlaku: '2024-01-01',
      tglHabis: '2026-12-31',
      status: 'active',
    },
    {
      id: 7,
      nip: 'KAR-001',
      nama: 'Dr. Siti Aminah, Sp.PD',
      jenis: 'Surat Peringatan',
      namaFile: 'sp_1_siti_aminah.pdf',
      tglUpload: '2026-02-20',
      ukuran: '178 KB',
      tglSP: '2026-02-20',
      tglPemutihan: '2026-05-20',
      status: 'warning',
    },
    {
      id: 8,
      nip: 'KAR-002',
      nama: 'Ahmad Fauzi, S.Kep',
      jenis: 'KTP',
      namaFile: 'ktp_ahmad_fauzi.pdf',
      tglUpload: '2026-01-20',
      ukuran: '234 KB',
      status: 'verified',
    },
    {
      id: 9,
      nip: 'KAR-002',
      nama: 'Ahmad Fauzi, S.Kep',
      jenis: 'Kontrak Kerja',
      namaFile: 'kontrak_2_ahmad_fauzi.pdf',
      tglUpload: '2026-01-20',
      ukuran: '1.1 MB',
      tglMulai: '2026-01-20',
      tglHabis: '2027-01-19',
      status: 'active',
    },
    {
      id: 10,
      nip: 'KAR-002',
      nama: 'Ahmad Fauzi, S.Kep',
      jenis: 'STR',
      namaFile: 'str_ahmad_fauzi.pdf',
      tglUpload: '2026-01-20',
      ukuran: '498 KB',
      tglBerlaku: '2024-02-01',
      tglHabis: '2026-01-31',
      status: 'expired',
    },
    {
      id: 11,
      nip: 'KAR-003',
      nama: 'apt. Rina Wati, S.Farm',
      jenis: 'KTP',
      namaFile: 'ktp_rina_wati.pdf',
      tglUpload: '2026-02-01',
      ukuran: '241 KB',
      status: 'verified',
    },
    {
      id: 12,
      nip: 'KAR-003',
      nama: 'apt. Rina Wati, S.Farm',
      jenis: 'Kontrak Kerja',
      namaFile: 'kontrak_1_rina_wati.pdf',
      tglUpload: '2026-02-01',
      ukuran: '1.0 MB',
      tglMulai: '2026-02-01',
      tglHabis: '2027-02-01',
      status: 'active',
    },
    {
      id: 13,
      nip: 'KAR-003',
      nama: 'apt. Rina Wati, S.Farm',
      jenis: 'SIP',
      namaFile: 'sip_rina_wati.pdf',
      tglUpload: '2026-02-01',
      ukuran: '412 KB',
      tglBerlaku: '2026-02-01',
      tglHabis: '2028-02-01',
      status: 'pending',
    },
    {
      id: 14,
      nip: 'KAR-004',
      nama: 'Bambang Supriyadi',
      jenis: 'KTP',
      namaFile: 'ktp_bambang.pdf',
      tglUpload: '2025-11-01',
      ukuran: '228 KB',
      status: 'verified',
    },
    {
      id: 15,
      nip: 'KAR-004',
      nama: 'Bambang Supriyadi',
      jenis: 'Kontrak Kerja',
      namaFile: 'kontrak_4_bambang.pdf',
      tglUpload: '2025-11-01',
      ukuran: '1.3 MB',
      tglMulai: '2025-11-01',
      tglHabis: '2026-10-31',
      status: 'active',
    },
  ];

  // Hitung statistik dokumen
  const stats = {
    total: documents.length,
    verified: documents.filter(doc => doc.status === 'verified').length,
    active: documents.filter(doc => doc.status === 'active').length,
    pending: documents.filter(doc => doc.status === 'pending').length,
    warning: documents.filter(doc => doc.status === 'warning' || doc.status === 'expired').length,
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.namaFile.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmployee = selectedEmployee === 'all' || doc.nip === selectedEmployee;
    const matchesJenis = selectedJenis === 'all' || doc.jenis === selectedJenis;
    return matchesSearch && matchesEmployee && matchesJenis;
  });

  const employees = [...new Set(documents.map(d => ({ nip: d.nip, nama: d.nama })))];
  const uniqueEmployees = employees.filter((v, i, a) => a.findIndex(t => t.nip === v.nip) === i);
  
  const jenisDokumen = [...new Set(documents.map(d => d.jenis))];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'verified': 
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Terverifikasi</span>;
      case 'active': 
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Aktif</span>;
      case 'pending': 
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Menunggu</span>;
      case 'warning': 
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Peringatan</span>;
      case 'expired': 
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Kadaluarsa</span>;
      default: 
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const summaryCards = [
    {
      title: "TOTAL DOKUMEN",
      value: stats.total,
      change: "+3",
      description: "bulan ini",
      icon: <FileText size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "TERVERIFIKASI",
      value: stats.verified,
      change: `${Math.round((stats.verified / stats.total) * 100)}%`,
      description: "dari total",
      icon: <CheckCircle size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "MENUNGGU",
      value: stats.pending,
      change: `${stats.pending}`,
      description: "perlu diproses",
      icon: <Clock size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "PERLU PERHATIAN",
      value: stats.warning,
      change: `${stats.warning}`,
      description: "warning/expired",
      icon: <AlertCircle size={18} />,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dokumen Karyawan</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manajemen dokumen dan berkas karyawan
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] transition-all duration-200">
            <Upload size={16} />
            <span>Upload Dokumen</span>
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

      {/* Search and Filter */}
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
                placeholder="Cari berdasarkan nama, NIP, jenis dokumen, atau nama file..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
              >
                <option value="all">Semua Karyawan</option>
                {uniqueEmployees.map(emp => (
                  <option key={emp.nip} value={emp.nip}>{emp.nama}</option>
                ))}
              </select>
              <select
                value={selectedJenis}
                onChange={(e) => setSelectedJenis(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
              >
                <option value="all">Semua Jenis</option>
                {jenisDokumen.map((jenis, index) => (
                  <option key={index} value={jenis}>{jenis}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dokumen Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIP</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Dokumen</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama File</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Upload</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-500">
                    <FileText size={40} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-medium">Tidak ada data dokumen</p>
                    <p className="text-xs text-gray-400 mt-1">Coba sesuaikan filter atau kata kunci pencarian Anda</p>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="text-sm font-mono font-medium text-gray-700">{doc.nip}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900">{doc.nama}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{doc.jenis}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <FileText size={14} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{doc.namaFile}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{formatDate(doc.tglUpload)}</span>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200" title="Lihat">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200" title="Download">
                          <Download size={16} />
                        </button>
                        <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200" title="Hapus">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Info Summary */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Menampilkan <span className="font-medium">{filteredDocs.length}</span> dari <span className="font-medium">{documents.length}</span> dokumen
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Terverifikasi</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Aktif</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Menunggu</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Peringatan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}