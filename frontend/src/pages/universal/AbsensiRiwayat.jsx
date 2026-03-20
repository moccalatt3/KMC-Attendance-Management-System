import React, { useState } from "react";
import { Eye, Users, UserCheck, Clock3, Calendar } from "lucide-react";

export default function AbsensiRiwayat() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const riwayatAbsensi = [
    {
      id: 1,
      tanggal: "2026-03-01",
      shift: "Pagi (P)",
      jamMasuk: "07:00",
      jamKeluar: "14:00",
      checkIn: "06:55",
      checkOut: "14:10",
      status: "hadir",
      lokasi: "Klinik Utama",
      keterangan: "-",
    },
    {
      id: 2,
      tanggal: "2026-03-02",
      shift: "Pagi (P)",
      jamMasuk: "07:00",
      jamKeluar: "14:00",
      checkIn: "07:15",
      checkOut: "14:00",
      status: "terlambat",
      lokasi: "Klinik Utama",
      keterangan: "Terlambat 15 menit",
    },
    {
      id: 3,
      tanggal: "2026-03-03",
      shift: "Pagi (P)",
      jamMasuk: "07:00",
      jamKeluar: "14:00",
      checkIn: "06:50",
      checkOut: "13:30",
      status: "pulang_cepat",
      lokasi: "Klinik Utama",
      keterangan: "Pulang cepat 30 menit (izin)",
    },
    {
      id: 4,
      tanggal: "2026-03-04",
      shift: "-",
      jamMasuk: "-",
      jamKeluar: "-",
      checkIn: "-",
      checkOut: "-",
      status: "cuti",
      lokasi: "-",
      keterangan: "Cuti Tahunan",
    },
    {
      id: 5,
      tanggal: "2026-03-05",
      shift: "Pagi (P)",
      jamMasuk: "07:00",
      jamKeluar: "14:00",
      checkIn: "06:45",
      checkOut: "16:00",
      status: "lembur",
      lokasi: "Klinik Utama",
      keterangan: "Lembur 2 jam (SPL disetujui)",
    },
    {
      id: 6,
      tanggal: "2026-03-06",
      shift: "Pagi (P)",
      jamMasuk: "07:00",
      jamKeluar: "14:00",
      checkIn: "06:45",
      checkOut: "14:05",
      status: "hadir",
      lokasi: "Klinik Utama",
      keterangan: "-",
    },
    {
      id: 7,
      tanggal: "2026-03-07",
      shift: "-",
      jamMasuk: "-",
      jamKeluar: "-",
      checkIn: "-",
      checkOut: "-",
      status: "libur",
      lokasi: "-",
      keterangan: "Libur Minggu",
    },
    {
      id: 8,
      tanggal: "2026-03-08",
      shift: "Pagi (P)",
      jamMasuk: "07:00",
      jamKeluar: "14:00",
      checkIn: "07:30",
      checkOut: "14:00",
      status: "terlambat",
      lokasi: "Klinik Utama",
      keterangan: "Terlambat 30 menit (potong lemburan)",
    },
    {
      id: 9,
      tanggal: "2026-03-09",
      shift: "Pagi (P)",
      jamMasuk: "07:00",
      jamKeluar: "14:00",
      checkIn: "06:50",
      checkOut: "12:00",
      status: "½_hari",
      lokasi: "Klinik Utama",
      keterangan: "Masuk ½ hari (potong jam lebih)",
    },
    {
      id: 10,
      tanggal: "2026-03-10",
      shift: "Pagi (P)",
      jamMasuk: "07:00",
      jamKeluar: "14:00",
      checkIn: "06:55",
      checkOut: "14:05",
      status: "hadir",
      lokasi: "Klinik Utama",
      keterangan: "-",
    },
  ];

  // Summary Cards dengan icon seperti awal
  const summaryCards = [
    {
      title: "TOTAL HARI",
      value: riwayatAbsensi.length,
      change: "10",
      description: "hari kerja",
      icon: <Calendar size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "HADIR",
      value: riwayatAbsensi.filter((i) => i.status === "hadir").length,
      change: "3",
      description: "karyawan",
      icon: <UserCheck size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "TERLAMBAT",
      value: riwayatAbsensi.filter((i) => i.status === "terlambat").length,
      change: "2",
      description: "kejadian",
      icon: <Clock3 size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "CUTI & IZIN",
      value: riwayatAbsensi.filter((i) => i.status === "cuti" || i.status === "izin" || i.status === "sakit").length,
      change: "1",
      description: "karyawan",
      icon: <Users size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "hadir":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Hadir
          </span>
        );
      case "terlambat":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Terlambat
          </span>
        );
      case "pulang_cepat":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Pulang Cepat
          </span>
        );
      case "cuti":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Cuti
          </span>
        );
      case "izin":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Izin
          </span>
        );
      case "sakit":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Sakit
          </span>
        );
      case "lembur":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Lembur
          </span>
        );
      case "½_hari":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
            ½ Hari
          </span>
        );
      case "libur":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Libur
          </span>
        );
      case "alpha":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Alpha
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const filteredRiwayat = riwayatAbsensi.filter((item) => {
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesSearch =
      item.tanggal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Riwayat Absensi
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Histori kehadiran dan aktivitas absensi karyawan
          </p>
        </div>
      </div>

      {/* Summary Cards - dengan icon seperti awal */}
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

      {/* Filter Section */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cari berdasarkan tanggal, lokasi, atau keterangan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative min-w-[180px]">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-4 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Semua Status</option>
                  <option value="hadir">Hadir</option>
                  <option value="terlambat">Terlambat</option>
                  <option value="pulang_cepat">Pulang Cepat</option>
                  <option value="cuti">Cuti</option>
                  <option value="izin">Izin</option>
                  <option value="sakit">Sakit</option>
                  <option value="lembur">Lembur</option>
                  <option value="½_hari">½ Hari</option>
                  <option value="libur">Libur</option>
                  <option value="alpha">Alpha</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Riwayat */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "1200px" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Tanggal
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Shift
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Jadwal
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Check In
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Check Out
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Lokasi
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Keterangan
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRiwayat.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-gray-500">
                    <p>Tidak ada data absensi</p>
                  </td>
                </tr>
              ) : (
                filteredRiwayat.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {formatDate(item.tanggal)}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {item.shift}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {item.jamMasuk} - {item.jamKeluar}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          item.checkIn > item.jamMasuk && item.jamMasuk !== "-"
                            ? "text-yellow-600"
                            : "text-gray-900"
                        }`}
                      >
                        {item.checkIn}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          item.checkOut < item.jamKeluar && item.jamKeluar !== "-"
                            ? "text-orange-600"
                            : item.checkOut > item.jamKeluar && item.jamKeluar !== "-"
                            ? "text-indigo-600"
                            : "text-gray-900"
                        }`}
                      >
                        {item.checkOut}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.lokasi}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.keterangan}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200">
                        <Eye size={16} />
                      </button>
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