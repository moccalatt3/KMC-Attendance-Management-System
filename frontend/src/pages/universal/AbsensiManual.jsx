import React, { useState } from 'react';
import {
  User,
  Calendar,
  Clock,
  FileText,
  Camera,
  AlertCircle,
  CheckCircle,
  Users,
  LogIn,
  LogOut,
  ClipboardList,
  Download,
  Search,
} from 'lucide-react';

export default function AbsensiManual() {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkInTime, setCheckInTime] = useState('07:00');
  const [checkOutTime, setCheckOutTime] = useState('14:00');
  const [status, setStatus] = useState('hadir');
  const [keterangan, setKeterangan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    { id: 1, nip: 'KAR-001', nama: 'Dr. Siti Aminah, Sp.PD', departemen: 'Medis' },
    { id: 2, nip: 'KAR-002', nama: 'Ahmad Fauzi, S.Kep', departemen: 'Keperawatan' },
    { id: 3, nip: 'KAR-003', nama: 'Rina Wati, S.Farm', departemen: 'Apotek' },
    { id: 4, nip: 'KAR-004', nama: 'Budi Santoso', departemen: 'Keamanan' },
    { id: 5, nip: 'KAR-005', nama: 'Dewi Lestari', departemen: 'Medis' },
  ];

  const riwayatManual = [
    {
      id: 1,
      tanggal: '2026-03-10',
      nama: 'Dr. Siti Aminah, Sp.PD',
      checkIn: '07:00',
      checkOut: '14:00',
      status: 'hadir',
      inputBy: 'HRD',
      keterangan: '-',
    },
    {
      id: 2,
      tanggal: '2026-03-09',
      nama: 'Ahmad Fauzi, S.Kep',
      checkIn: '07:15',
      checkOut: '14:00',
      status: 'terlambat',
      inputBy: 'HRD',
      keterangan: 'HP rusak, lapor ke HR',
    },
    {
      id: 3,
      tanggal: '2026-03-08',
      nama: 'Rina Wati, S.Farm',
      checkIn: '-',
      checkOut: '-',
      status: 'izin',
      inputBy: 'HRD',
      keterangan: 'Izin acara keluarga',
    },
    {
      id: 4,
      tanggal: '2026-03-07',
      nama: 'Budi Santoso',
      checkIn: '06:50',
      checkOut: '14:10',
      status: 'hadir',
      inputBy: 'HRD',
      keterangan: 'Gangguan sistem',
    },
    {
      id: 5,
      tanggal: '2026-03-06',
      nama: 'Dewi Lestari',
      checkIn: '08:30',
      checkOut: '16:00',
      status: 'lembur',
      inputBy: 'HRD',
      keterangan: 'Lupa absen check in',
    },
  ];

  // Summary cards
  const summaryCards = [
    {
      title: "TOTAL INPUT",
      value: riwayatManual.length,
      change: "+2",
      description: "hari ini",
      icon: <ClipboardList size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "KARYAWAN",
      value: employees.length,
      change: "5",
      description: "aktif",
      icon: <Users size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "CHECK IN",
      value: riwayatManual.filter(i => i.checkIn !== '-').length,
      change: "4",
      description: "karyawan",
      icon: <LogIn size={18} />,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "CHECK OUT",
      value: riwayatManual.filter(i => i.checkOut !== '-').length,
      change: "4",
      description: "karyawan",
      icon: <LogOut size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'hadir':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Hadir</span>;
      case 'terlambat':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Terlambat</span>;
      case 'pulang_cepat':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Pulang Cepat</span>;
      case 'izin':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Izin</span>;
      case 'sakit':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Sakit</span>;
      case 'cuti':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Cuti</span>;
      case 'dinas':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">Dinas</span>;
      case 'lembur':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">Lembur</span>;
      case 'alpha':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Alpha</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      // Reset form
      setSelectedEmployee('');
      setKeterangan('');
    }, 1000);
  };

  const filteredRiwayat = riwayatManual.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Input Absensi Manual</h1>
            <p className="text-sm text-gray-600 mt-1">
              Input absensi untuk karyawan yang terkendala absen online
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards - tanpa border dan shadow */}
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

      {/* Form Input Card */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Form Absensi Manual</h2>
            <p className="text-xs text-gray-500">Isi data absensi untuk karyawan</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Pilih Karyawan */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Pilih Karyawan <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              >
                <option value="">Pilih Karyawan</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.nama} ({emp.nip}) - {emp.departemen}
                  </option>
                ))}
              </select>
            </div>

            {/* Tanggal */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Tanggal <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              >
                <option value="hadir">Hadir</option>
                <option value="terlambat">Terlambat</option>
                <option value="pulang_cepat">Pulang Cepat</option>
                <option value="izin">Izin</option>
                <option value="sakit">Sakit</option>
                <option value="cuti">Cuti</option>
                <option value="dinas">Dinas Luar</option>
                <option value="lembur">Lembur</option>
                <option value="alpha">Alpha</option>
              </select>
            </div>

            {/* Jam Check In */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Jam Check In
              </label>
              <input
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              />
            </div>

            {/* Jam Check Out */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Jam Check Out
              </label>
              <input
                type="time"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
              />
            </div>

            {/* Upload File */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Upload Surat
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Keterangan */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
              Keterangan <span className="text-red-500">*</span>
            </label>
            <textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              required
              rows="2"
              placeholder="Jelaskan alasan input manual (contoh: HP rusak, gangguan sistem, lupa absen, dll)"
              className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent resize-none"
            />
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="p-3 bg-green-50 rounded-lg flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-green-700">Absensi manual berhasil disimpan!</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#163a6f] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  <span>Simpan Absensi Manual</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Riwayat Input Manual */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Riwayat Input Manual</h2>
                <p className="text-xs text-gray-500">Data absensi yang diinput manual</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Riwayat */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "1000px" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Tanggal
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Karyawan
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Check In
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Check Out
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Input Oleh
                </th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRiwayat.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    <p>Tidak ada riwayat input manual</p>
                  </td>
                </tr>
              ) : (
                filteredRiwayat.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {formatDate(item.tanggal)}
                      </span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {item.nama}
                      </span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.checkIn}</span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.checkOut}</span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.inputBy}</span>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.keterangan}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Menampilkan {filteredRiwayat.length} dari {riwayatManual.length} data
          </p>
        </div>
      </div>
    </div>
  );
}