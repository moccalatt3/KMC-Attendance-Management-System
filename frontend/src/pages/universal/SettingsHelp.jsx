import React, { useState } from 'react';
import { 
  HelpCircle, BookOpen, Mail, MessageSquare, FileText, Video, 
  Download, Search, ChevronRight, Phone, Clock, 
  AlertCircle, Users, Zap, Shield
} from 'lucide-react';

export default function SettingsHelp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const faqs = [
    {
      id: 1,
      question: 'Bagaimana cara melakukan absensi?',
      answer: 'Buka menu Absensi lalu klik tombol Check In. Pastikan Anda berada dalam radius yang ditentukan dan GPS aktif.',
      category: 'absensi'
    },
    {
      id: 2,
      question: 'Bagaimana jika HP rusak/hilang saat akan absen?',
      answer: 'Segera laporkan ke HRD untuk dilakukan input absensi manual.',
      category: 'absensi'
    },
    {
      id: 3,
      question: 'Bagaimana cara mengajukan cuti?',
      answer: 'Ajukan cuti melalui menu Cuti & Izin. Pengajuan akan melalui approval atasan dan HRD.',
      category: 'cuti'
    },
    {
      id: 4,
      question: 'Bagaimana perhitungan lembur?',
      answer: 'Lembur dihitung setelah melewati 30 menit dari jam kerja normal. Perhitungan: (Gaji Pokok + Tunjangan Kompetensi + Tunjangan Profesi) / 173 jam.',
      category: 'payroll'
    },
    {
      id: 5,
      question: 'Bagaimana cara melihat slip gaji?',
      answer: 'Slip gaji dapat diakses melalui menu Payroll > Slip Gaji dalam format PDF.',
      category: 'payroll'
    },
    {
      id: 6,
      question: 'Apa yang harus dilakukan jika lupa password?',
      answer: 'Gunakan fitur "Lupa Password" di halaman login. Ikuti instruksi yang dikirim ke email Anda.',
      category: 'umum'
    },
  ];

  const guides = [
    { id: 1, title: 'Panduan Absensi Karyawan', type: 'pdf', size: '2.4 MB' },
    { id: 2, title: 'Panduan Pengajuan Cuti', type: 'pdf', size: '1.8 MB' },
    { id: 3, title: 'Panduan Payroll HRD', type: 'pdf', size: '3.1 MB' },
    { id: 4, title: 'Video Tutorial Absensi', type: 'video', duration: '5:30' },
    { id: 5, title: 'Video Tutorial Cuti Online', type: 'video', duration: '4:15' },
  ];

  const contacts = [
    { 
      department: 'HRD', 
      email: 'hrd@klinik.com', 
      phone: '021-1234567 ext. 101', 
      hours: 'Sen-Jum 08:00-17:00',
      icon: <Users size={20} />,
      color: 'blue'
    },
    { 
      department: 'IT Support', 
      email: 'it@klinik.com', 
      phone: '021-1234567 ext. 102', 
      hours: 'Sen-Sab 07:00-19:00',
      icon: <Zap size={20} />,
      color: 'yellow'
    },
    { 
      department: 'Payroll', 
      email: 'payroll@klinik.com', 
      phone: '021-1234567 ext. 103', 
      hours: 'Sen-Jum 09:00-16:00',
      icon: <Shield size={20} />,
      color: 'green'
    },
  ];

  const categories = [
    { id: 'all', label: 'Semua', count: faqs.length },
    { id: 'absensi', label: 'Absensi', count: faqs.filter(f => f.category === 'absensi').length },
    { id: 'cuti', label: 'Cuti', count: faqs.filter(f => f.category === 'cuti').length },
    { id: 'payroll', label: 'Payroll', count: faqs.filter(f => f.category === 'payroll').length },
    { id: 'umum', label: 'Umum', count: faqs.filter(f => f.category === 'umum').length },
  ];

  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pusat Bantuan</h1>
        <p className="text-sm text-gray-600 mt-1">
          Dokumentasi, panduan, dan dukungan teknis
        </p>
      </div>

      {/* Search & Category Tabs - Digabung dalam 1 Card */}
      <div className="bg-white rounded-lg p-5">
        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari pertanyaan atau panduan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1C4D8D]"
          />
        </div>

        {/* Category Tabs - Center */}
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#1C4D8D] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <div className="bg-white rounded-lg p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
            Pertanyaan Umum
          </h2>
          
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">Tidak ada pertanyaan</p>
            ) : (
              filteredFaqs.map(faq => (
                <div key={faq.id} className="border border-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                    className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-900 pr-4">{faq.question}</span>
                    <ChevronRight 
                      size={16} 
                      className={`transform transition-transform flex-shrink-0 ${
                        activeFaq === faq.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === faq.id && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                      <p className="text-sm text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Guides Section */}
        <div className="bg-white rounded-lg p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
            Panduan & Tutorial
          </h2>
          
          <div className="space-y-3">
            {guides.map(guide => (
              <div key={guide.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {guide.type === 'pdf' ? (
                    <FileText size={18} className="text-red-500" />
                  ) : (
                    <Video size={18} className="text-blue-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{guide.title}</p>
                    <p className="text-xs text-gray-500">
                      {guide.type === 'pdf' ? guide.size : guide.duration}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white rounded-lg text-gray-500 hover:text-[#1C4D8D]">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Form */}
      <div className="bg-white rounded-lg p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Buat Tiket Bantuan</h2>
        <textarea
          rows="3"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1C4D8D]"
          placeholder="Jelaskan masalah yang Anda alami..."
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-500">Respon dalam 1x24 jam</span>
          <button className="px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#154078]">
            Kirim Tiket
          </button>
        </div>
      </div>
    </div>
  );
}