import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Award,
  AlertTriangle,
  Briefcase,
  FileText,
  Filter,
  Calendar,
  UserCheck,
  Download,
} from "lucide-react";

export default function KaryawanRiwayat() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedJenis, setSelectedJenis] = useState("all");

  const employees = [
    { nip: "KAR-001", nama: "Dr. Siti Aminah, Sp.PD", departemen: "Medis" },
    { nip: "KAR-002", nama: "Ahmad Fauzi, S.Kep", departemen: "Keperawatan" },
    { nip: "KAR-003", nama: "apt. Rina Wati, S.Farm", departemen: "Apotek" },
    { nip: "KAR-004", nama: "Bambang Supriyadi", departemen: "Keamanan" },
    { nip: "KAR-005", nama: "dr. Maya Sari", departemen: "Medis" },
  ];

  const riwayatData = [
    // Dr. Siti Aminah
    {
      id: 1,
      nip: "KAR-001",
      nama: "Dr. Siti Aminah, Sp.PD",
      jenis: "promosi",
      tgl: "2025-06-01",
      tgl_berlaku: "2025-06-01",
      tgl_habis: null,
      keterangan: "Promosi dari Dokter Muda ke Dokter Umum",
      dokumen: "SK_Promosi_001.pdf",
      status: "selesai",
    },
    {
      id: 2,
      nip: "KAR-001",
      nama: "Dr. Siti Aminah, Sp.PD",
      jenis: "kontrak",
      tgl: "2026-01-15",
      tgl_berlaku: "2026-01-15",
      tgl_habis: "2027-01-14",
      keterangan: "Perpanjangan kontrak ke-3, status Tetap",
      dokumen: "Kontrak_3_Siti_Aminah.pdf",
      status: "aktif",
    },
    {
      id: 3,
      nip: "KAR-001",
      nama: "Dr. Siti Aminah, Sp.PD",
      jenis: "sp",
      tgl: "2026-02-20",
      tgl_berlaku: "2026-02-20",
      tgl_habis: "2026-05-20",
      keterangan: "Surat Peringatan 1 - Keterlambatan",
      dokumen: "SP_1_Siti_Aminah.pdf",
      status: "aktif",
    },
    {
      id: 4,
      nip: "KAR-001",
      nama: "Dr. Siti Aminah, Sp.PD",
      jenis: "sanksi",
      tgl: "2026-03-01",
      tgl_berlaku: "2026-03-01",
      tgl_habis: "2026-03-01",
      keterangan: "Sanksi Teguran Lisan",
      dokumen: "-",
      status: "selesai",
    },
    {
      id: 5,
      nip: "KAR-001",
      nama: "Dr. Siti Aminah, Sp.PD",
      jenis: "penghargaan",
      tgl: "2025-12-10",
      tgl_berlaku: "2025-12-10",
      tgl_habis: null,
      keterangan: "Penghargaan Karyawan Teladan Tahun 2025",
      dokumen: "Sertifikat_Teladan_2025.pdf",
      status: "selesai",
    },
    // Ahmad Fauzi
    {
      id: 6,
      nip: "KAR-002",
      nama: "Ahmad Fauzi, S.Kep",
      jenis: "promosi",
      tgl: "2025-09-10",
      tgl_berlaku: "2025-09-10",
      tgl_habis: null,
      keterangan: "Promosi dari Perawat Junior ke Perawat Senior",
      dokumen: "SK_Promosi_002.pdf",
      status: "selesai",
    },
    {
      id: 7,
      nip: "KAR-002",
      nama: "Ahmad Fauzi, S.Kep",
      jenis: "kontrak",
      tgl: "2026-01-20",
      tgl_berlaku: "2026-01-20",
      tgl_habis: "2027-01-19",
      keterangan: "Perpanjangan kontrak ke-2",
      dokumen: "Kontrak_2_Ahmad_Fauzi.pdf",
      status: "aktif",
    },
    {
      id: 8,
      nip: "KAR-002",
      nama: "Ahmad Fauzi, S.Kep",
      jenis: "sp",
      tgl: "2026-02-10",
      tgl_berlaku: "2026-02-10",
      tgl_habis: "2026-05-10",
      keterangan: "Surat Peringatan 1 - Pelanggaran SOP",
      dokumen: "SP_1_Ahmad_Fauzi.pdf",
      status: "aktif",
    },
    {
      id: 9,
      nip: "KAR-002",
      nama: "Ahmad Fauzi, S.Kep",
      jenis: "mutasi",
      tgl: "2025-11-15",
      tgl_berlaku: "2025-11-15",
      tgl_habis: null,
      keterangan: "Mutasi dari IGD ke Rawat Inap",
      dokumen: "SK_Mutasi_002.pdf",
      status: "selesai",
    },
    // Rina Wati
    {
      id: 10,
      nip: "KAR-003",
      nama: "apt. Rina Wati, S.Farm",
      jenis: "kontrak",
      tgl: "2026-02-01",
      tgl_berlaku: "2026-02-01",
      tgl_habis: "2027-01-31",
      keterangan: "Kontrak baru ke-1, status Kontrak",
      dokumen: "Kontrak_1_Rina_Wati.pdf",
      status: "aktif",
    },
    {
      id: 11,
      nip: "KAR-003",
      nama: "apt. Rina Wati, S.Farm",
      jenis: "sp",
      tgl: "2026-02-25",
      tgl_berlaku: "2026-02-25",
      tgl_habis: "2026-05-25",
      keterangan: "Surat Peringatan 1 - Kesalahan Administrasi",
      dokumen: "SP_1_Rina_Wati.pdf",
      status: "aktif",
    },
    {
      id: 12,
      nip: "KAR-003",
      nama: "apt. Rina Wati, S.Farm",
      jenis: "ijin",
      tgl: "2026-03-10",
      tgl_berlaku: "2026-03-10",
      tgl_habis: "2026-03-15",
      keterangan: "Izin Cuti Tahunan",
      dokumen: "Izin_Cuti_003.pdf",
      status: "pending",
    },
    // Bambang Supriyadi
    {
      id: 13,
      nip: "KAR-004",
      nama: "Bambang Supriyadi",
      jenis: "kontrak",
      tgl: "2025-11-01",
      tgl_berlaku: "2025-11-01",
      tgl_habis: "2026-10-31",
      keterangan: "Perpanjangan kontrak ke-4",
      dokumen: "Kontrak_4_Bambang.pdf",
      status: "aktif",
    },
    {
      id: 14,
      nip: "KAR-004",
      nama: "Bambang Supriyadi",
      jenis: "sp",
      tgl: "2026-01-15",
      tgl_berlaku: "2026-01-15",
      tgl_habis: "2026-04-15",
      keterangan: "Surat Peringatan 1 - Meninggalkan Tugas",
      dokumen: "SP_1_Bambang.pdf",
      status: "aktif",
    },
    // dr. Maya Sari
    {
      id: 15,
      nip: "KAR-005",
      nama: "dr. Maya Sari",
      jenis: "kontrak",
      tgl: "2026-01-02",
      tgl_berlaku: "2026-01-02",
      tgl_habis: "2027-01-01",
      keterangan: "Kontrak baru ke-1, status Kontrak",
      dokumen: "Kontrak_1_Maya_Sari.pdf",
      status: "aktif",
    },
    {
      id: 16,
      nip: "KAR-005",
      nama: "dr. Maya Sari",
      jenis: "promosi",
      tgl: "2026-02-15",
      tgl_berlaku: "2026-02-15",
      tgl_habis: null,
      keterangan: "Kenaikan Jabatan Fungsional",
      dokumen: "SK_Jabatan_005.pdf",
      status: "selesai",
    },
  ];

  // Hitung statistik
  const stats = {
    totalPromosi: riwayatData.filter((item) => item.jenis === "promosi").length,
    totalKontrak: riwayatData.filter((item) => item.jenis === "kontrak").length,
    totalSP: riwayatData.filter((item) => item.jenis === "sp").length,
    totalSanksi: riwayatData.filter((item) => item.jenis === "sanksi").length,
    totalMutasi: riwayatData.filter((item) => item.jenis === "mutasi").length,
    totalPenghargaan: riwayatData.filter((item) => item.jenis === "penghargaan")
      .length,
    totalIjin: riwayatData.filter((item) => item.jenis === "ijin").length,
  };

  const filteredRiwayat = riwayatData.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmployee =
      selectedEmployee === "all" || item.nip === selectedEmployee;
    const matchesJenis =
      selectedJenis === "all" || item.jenis === selectedJenis;
    return matchesSearch && matchesEmployee && matchesJenis;
  });

  const getIcon = (jenis) => {
    switch (jenis) {
      case "promosi":
        return <Award size={16} className="text-green-600" />;
      case "kontrak":
        return <Briefcase size={16} className="text-blue-600" />;
      case "sp":
        return <AlertTriangle size={16} className="text-red-600" />;
      case "sanksi":
        return <AlertTriangle size={16} className="text-orange-600" />;
      case "mutasi":
        return <UserCheck size={16} className="text-purple-600" />;
      case "penghargaan":
        return <Award size={16} className="text-yellow-600" />;
      case "ijin":
        return <Calendar size={16} className="text-indigo-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getBadgeColor = (jenis) => {
    switch (jenis) {
      case "promosi":
        return "bg-green-100 text-green-800";
      case "kontrak":
        return "bg-blue-100 text-blue-800";
      case "sp":
        return "bg-red-100 text-red-800";
      case "sanksi":
        return "bg-orange-100 text-orange-800";
      case "mutasi":
        return "bg-purple-100 text-purple-800";
      case "penghargaan":
        return "bg-yellow-100 text-yellow-800";
      case "ijin":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "aktif":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "selesai":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const summaryCards = [
    {
      title: "PROMOSI",
      value: stats.totalPromosi,
      change: "+2",
      description: "tahun ini",
      icon: <Award size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "KONTRAK",
      value: stats.totalKontrak,
      change: "3 aktif",
      description: "dari total",
      icon: <Briefcase size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "SURAT PERINGATAN",
      value: stats.totalSP,
      change: "3 aktif",
      description: "perlu perhatian",
      icon: <AlertTriangle size={18} />,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "MUTASI & LAINNYA",
      value: stats.totalMutasi + stats.totalPenghargaan + stats.totalIjin,
      change: `${stats.totalMutasi} mutasi`,
      description: "lainnya",
      icon: <UserCheck size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Riwayat Karyawan
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Riwayat promosi, kontrak, surat peringatan, dan mutasi karyawan
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
                placeholder="Cari berdasarkan nama, NIP, atau keterangan..."
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
                {employees.map((emp) => (
                  <option key={emp.nip} value={emp.nip}>
                    {emp.nama}
                  </option>
                ))}
              </select>
              <select
                value={selectedJenis}
                onChange={(e) => setSelectedJenis(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
              >
                <option value="all">Semua Jenis</option>
                <option value="promosi">Promosi</option>
                <option value="kontrak">Kontrak</option>
                <option value="sp">Surat Peringatan</option>
                <option value="sanksi">Sanksi</option>
                <option value="mutasi">Mutasi</option>
                <option value="penghargaan">Penghargaan</option>
                <option value="ijin">Izin/Cuti</option>
              </select>
            </div>
          </div>
        </div>

        {/* Riwayat Timeline */}
        <div className="divide-y divide-gray-100">
          {filteredRiwayat.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <FileText size={40} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-medium">Tidak ada data riwayat</p>
              <p className="text-xs text-gray-400 mt-1">
                Coba sesuaikan filter atau kata kunci pencarian Anda
              </p>
            </div>
          ) : (
            filteredRiwayat.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`p-2 rounded-full bg-white border-2 ${
                        item.jenis === "promosi"
                          ? "border-green-500"
                          : item.jenis === "kontrak"
                            ? "border-blue-500"
                            : item.jenis === "sp"
                              ? "border-red-500"
                              : item.jenis === "sanksi"
                                ? "border-orange-500"
                                : item.jenis === "mutasi"
                                  ? "border-purple-500"
                                  : item.jenis === "penghargaan"
                                    ? "border-yellow-500"
                                    : "border-indigo-500"
                      }`}
                    >
                      {getIcon(item.jenis)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {item.nama}
                          </h4>
                          <span className="text-xs text-gray-500">
                            ({item.nip})
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          {item.keterangan}
                        </p>

                        {/* Info dengan garis pemisah */}
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs bg-gray-50 p-2 rounded-lg">
                          <span className="text-gray-700 flex items-center">

                            {formatDate(item.tgl)}
                          </span>

                          <div className="w-px h-3 bg-gray-300"></div>

                          {item.tgl_habis && item.tgl_habis !== item.tgl && (
                            <>
                              <span className="text-gray-700 flex items-center">
                                s.d {formatDate(item.tgl_habis)}
                              </span>
                              <div className="w-px h-3 bg-gray-300"></div>
                            </>
                          )}

                          <span className="text-gray-700 flex items-center">
                            <FileText size={12} className="mr-1" />
                            {item.dokumen}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(item.jenis)}`}
                        >
                          {item.jenis === "promosi"
                            ? "Promosi"
                            : item.jenis === "kontrak"
                              ? "Kontrak"
                              : item.jenis === "sp"
                                ? "SP"
                                : item.jenis === "sanksi"
                                  ? "Sanksi"
                                  : item.jenis === "mutasi"
                                    ? "Mutasi"
                                    : item.jenis === "penghargaan"
                                      ? "Penghargaan"
                                      : item.jenis === "ijin"
                                        ? "Izin/Cuti"
                                        : "Lainnya"}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}
                        >
                          {item.status === "aktif"
                            ? "Aktif"
                            : item.status === "pending"
                              ? "Pending"
                              : "Selesai"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
