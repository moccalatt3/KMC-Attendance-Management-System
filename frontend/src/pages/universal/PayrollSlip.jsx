import React, { useState } from 'react';
import {
  Download,
  Printer,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';

export default function PayrollSlip() {
  const [selectedMonth, setSelectedMonth] = useState('2026-03');

  const payrollData = {
    nama: 'Dr. Siti Aminah, Sp.PD',
    nip: 'KAR-001',
    jabatan: 'Dokter Spesialis Penyakit Dalam',
    departemen: 'Medis',
    noBPJSKes: '0001234567890',
    noBPJSNaker: '001234567890',
    noRekening: '1234567890 - BCA',
    npwp: '12.345.678.9-012.345',
    bulan: 'Maret 2026',
    periode: '01 - 31 Maret 2026',
    
    penerimaan: [
      { komponen: 'Gaji Pokok', jumlah: 5000000 },
      { komponen: 'Tunjangan Kompetensi', jumlah: 1500000 },
      { komponen: 'Tunjangan Profesi', jumlah: 2000000 },
      { komponen: 'Tunjangan Jabatan', jumlah: 1000000 },
      { komponen: 'Tunjangan Makan', jumlah: 500000 },
      { komponen: 'Insentif Kinerja', jumlah: 750000 },
      { komponen: 'Insentif Tindakan', jumlah: 1200000 },
      { komponen: 'Insentif Transportasi', jumlah: 300000 },
      { komponen: 'Lembur', jumlah: 850000 },
    ],
    
    potongan: [
      { komponen: 'Pajak (PPh 21)', jumlah: 450000 },
      { komponen: 'BPJS Kesehatan', jumlah: 175000 },
      { komponen: 'BPJS Ketenagakerjaan', jumlah: 225000 },
      { komponen: 'Dapen', jumlah: 300000 },
      { komponen: 'Sedekah', jumlah: 50000 },
    ],

    lembur: [
      { tanggal: '02 Maret 2026', durasi: 2, tarif: 37500, jumlah: 75000 },
      { tanggal: '05 Maret 2026', durasi: 2.5, tarif: 37500, jumlah: 93750 },
      { tanggal: '08 Maret 2026', durasi: 3, tarif: 37500, jumlah: 112500 },
      { tanggal: '12 Maret 2026', durasi: 2, tarif: 37500, jumlah: 75000 },
      { tanggal: '15 Maret 2026', durasi: 4, tarif: 37500, jumlah: 150000 },
      { tanggal: '18 Maret 2026', durasi: 2, tarif: 37500, jumlah: 75000 },
      { tanggal: '22 Maret 2026', durasi: 2.5, tarif: 37500, jumlah: 93750 },
      { tanggal: '25 Maret 2026', durasi: 3, tarif: 37500, jumlah: 112500 },
    ],
  };

  const totalPenerimaan = payrollData.penerimaan.reduce((sum, item) => sum + item.jumlah, 0);
  const totalPotongan = payrollData.potongan.reduce((sum, item) => sum + item.jumlah, 0);
  const totalLembur = payrollData.lembur.reduce((sum, item) => sum + item.jumlah, 0);
  const gajiBruto = totalPenerimaan + totalLembur;
  const gajiBersih = gajiBruto - totalPotongan;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header - persis seperti halaman lain */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Slip Gaji Digital</h1>
            <p className="text-sm text-gray-600 mt-1">
              Detail perhitungan gaji dan kompensasi karyawan
            </p>
          </div>
        </div>
      </div>

      {/* Main Slip Card */}
      <div className="bg-white rounded-xl overflow-hidden">
        {/* Slip Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Slip Gaji - {payrollData.bulan}</h2>
                <p className="text-xs text-gray-500">Periode: {payrollData.periode}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                <CheckCircle size={10} />
                Final
              </span>
            </div>
          </div>
        </div>

        {/* Employee Info - dengan ukuran yang sama seperti Karyawan */}
        <div className="p-5 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Nama</p>
              <p className="text-sm font-medium text-gray-900">{payrollData.nama}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">NIP</p>
              <p className="text-sm font-medium text-gray-900">{payrollData.nip}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Jabatan</p>
              <p className="text-sm font-medium text-gray-900">{payrollData.jabatan}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Departemen</p>
              <p className="text-sm font-medium text-gray-900">{payrollData.departemen}</p>
            </div>
          </div>
          
          <div className="my-4 border-t border-gray-100"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">No. BPJS Kesehatan</p>
              <p className="text-sm text-gray-900">{payrollData.noBPJSKes}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">No. BPJS Ketenagakerjaan</p>
              <p className="text-sm text-gray-900">{payrollData.noBPJSNaker}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">No. Rekening</p>
              <p className="text-sm text-gray-900">{payrollData.noRekening}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">NPWP</p>
              <p className="text-sm text-gray-900">{payrollData.npwp}</p>
            </div>
          </div>
        </div>

        {/* Komponen Gaji - dengan padding konsisten */}
        <div className="p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Penerimaan */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">PENERIMAAN</h3>
              <div className="space-y-2">
                {payrollData.penerimaan.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-600">{item.komponen}</span>
                    <span className="text-sm font-medium text-gray-900">{formatRupiah(item.jumlah)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Jumlah Penerimaan (I)</span>
                    <span className="text-base font-bold text-green-600">{formatRupiah(totalPenerimaan)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Potongan */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">POTONGAN</h3>
              <div className="space-y-2">
                {payrollData.potongan.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-600">{item.komponen}</span>
                    <span className="text-sm font-medium text-gray-900">{formatRupiah(item.jumlah)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Jumlah Potongan (III)</span>
                    <span className="text-base font-bold text-red-600">{formatRupiah(totalPotongan)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lembur Section */}
        <div className="px-5 pb-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">DETAIL LEMBUR</h3>
          
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-600">Tanggal</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-600">Durasi</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-600">Tarif/Jam</th>
                  <th className="py-2 px-4 text-right text-xs font-medium text-gray-600">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payrollData.lembur.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-4 text-sm text-gray-600">{item.tanggal}</td>
                    <td className="py-2 px-4 text-sm text-gray-600">{item.durasi} jam</td>
                    <td className="py-2 px-4 text-sm text-gray-600">{formatRupiah(item.tarif)}</td>
                    <td className="py-2 px-4 text-sm text-right font-medium text-gray-900">{formatRupiah(item.jumlah)}</td>
                  </tr>
                ))}
                <tr className="bg-blue-50">
                  <td colSpan="3" className="py-2 px-4 text-sm font-semibold text-gray-700">Total Lembur (Jumlah II)</td>
                  <td className="py-2 px-4 text-right font-bold text-[#1C4D8D]">{formatRupiah(totalLembur)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mx-5 mb-5 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-end">
            <div className="w-full lg:w-96 space-y-2">
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600">Gaji Bruto (I + II)</span>
                <span className="text-sm font-semibold text-gray-900">{formatRupiah(gajiBruto)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600">Total Potongan (III)</span>
                <span className="text-sm font-semibold text-red-600">- {formatRupiah(totalPotongan)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Gaji Bersih</span>
                  <span className="text-base font-bold text-green-600">{formatRupiah(gajiBersih)}</span>
                </div>
                <p className="text-xs text-gray-400 text-right mt-1">Take Home Pay</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Slip gaji ini digenerate secara otomatis oleh sistem HRIS. 
            Perhitungan lembur: (Gaji Pokok + Tunj. Kompetensi + Tunj. Profesi) / 173 jam
          </p>
        </div>
      </div>
    </div>
  );
}