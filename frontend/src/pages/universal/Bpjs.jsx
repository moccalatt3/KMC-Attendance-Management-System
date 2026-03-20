import React, { useState } from "react";
import { Heart, Shield, Edit, Save, Search, AlertCircle, Users, UserCheck } from "lucide-react";

export default function Bpjs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDept, setSelectedDept] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const bpjsData = [
    {
      id: 1,
      nama: "Dr. Siti Aminah",
      nip: "KAR-001",
      departemen: "Medis",
      bpjsKes: "0001234567890",
      bpjsNaker: "001234567890",
      statusKes: "aktif",
      statusNaker: "aktif",
      tglUpdateKes: "2026-01-01",
      tglUpdateNaker: "2026-01-01",
    },
    {
      id: 2,
      nama: "Ahmad Fauzi",
      nip: "KAR-002",
      departemen: "Keperawatan",
      bpjsKes: "0001234567891",
      bpjsNaker: "001234567891",
      statusKes: "aktif",
      statusNaker: "aktif",
      tglUpdateKes: "2026-01-01",
      tglUpdateNaker: "2026-01-01",
    },
    {
      id: 3,
      nama: "Rina Wati",
      nip: "KAR-003",
      departemen: "Apotek",
      bpjsKes: "0001234567892",
      bpjsNaker: "001234567892",
      statusKes: "aktif",
      statusNaker: "nonaktif",
      tglUpdateKes: "2026-01-01",
      tglUpdateNaker: "2026-02-15",
    },
    {
      id: 4,
      nama: "Budi Santoso",
      nip: "KAR-004",
      departemen: "Keperawatan",
      bpjsKes: "0001234567893",
      bpjsNaker: "001234567893",
      statusKes: "aktif",
      statusNaker: "aktif",
      tglUpdateKes: "2026-01-01",
      tglUpdateNaker: "2026-01-01",
    },
    {
      id: 5,
      nama: "Dewi Lestari",
      nip: "KAR-005",
      departemen: "Medis",
      bpjsKes: "0001234567894",
      bpjsNaker: "001234567894",
      statusKes: "aktif",
      statusNaker: "aktif",
      tglUpdateKes: "2026-01-01",
      tglUpdateNaker: "2026-01-01",
    },
    {
      id: 6,
      nama: "Hendra Wijaya",
      nip: "KAR-006",
      departemen: "Farmasi",
      bpjsKes: "0001234567895",
      bpjsNaker: "001234567895",
      statusKes: "nonaktif",
      statusNaker: "aktif",
      tglUpdateKes: "2026-02-01",
      tglUpdateNaker: "2026-01-01",
    },
    {
      id: 7,
      nama: "Maya Sari",
      nip: "KAR-007",
      departemen: "Administrasi",
      bpjsKes: "0001234567896",
      bpjsNaker: "001234567896",
      statusKes: "aktif",
      statusNaker: "aktif",
      tglUpdateKes: "2026-01-01",
      tglUpdateNaker: "2026-01-01",
    },
  ];

  const departments = [...new Set(bpjsData.map((e) => e.departemen))];

  // Summary Cards
  const summaryCards = [
    {
      title: "TOTAL KARYAWAN",
      value: bpjsData.length,
      change: "7",
      description: "terdaftar",
      icon: <Users size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "BPJS KESEHATAN AKTIF",
      value: bpjsData.filter((i) => i.statusKes === "aktif").length,
      change: bpjsData.filter((i) => i.statusKes === "aktif").length,
      description: "peserta aktif",
      icon: <Heart size={18} />,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "BPJS AKTIF",
      value: bpjsData.filter((i) => i.statusNaker === "aktif").length,
      change: bpjsData.filter((i) => i.statusNaker === "aktif").length,
      description: "peserta aktif",
      icon: <Shield size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "PERLU UPDATE",
      value: bpjsData.filter((i) => i.statusKes === "nonaktif" || i.statusNaker === "nonaktif").length,
      change: bpjsData.filter((i) => i.statusKes === "nonaktif" || i.statusNaker === "nonaktif").length,
      description: "data perlu diperbarui",
      icon: <AlertCircle size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "aktif":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Aktif
          </span>
        );
      case "nonaktif":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Nonaktif
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

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({
      bpjsKes: item.bpjsKes,
      bpjsNaker: item.bpjsNaker,
      statusKes: item.statusKes,
      statusNaker: item.statusNaker,
    });
  };

  const handleSave = (id) => {
    setEditingId(null);
    // Save logic here
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const filteredData = bpjsData.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bpjsKes.includes(searchTerm) ||
      item.bpjsNaker.includes(searchTerm);
    
    const matchesDept = selectedDept === "all" || item.departemen === selectedDept;
    
    let matchesStatus = true;
    if (selectedStatus === "kes_aktif") {
      matchesStatus = item.statusKes === "aktif";
    } else if (selectedStatus === "kes_nonaktif") {
      matchesStatus = item.statusKes === "nonaktif";
    } else if (selectedStatus === "naker_aktif") {
      matchesStatus = item.statusNaker === "aktif";
    } else if (selectedStatus === "naker_nonaktif") {
      matchesStatus = item.statusNaker === "nonaktif";
    } else if (selectedStatus === "perlu_update") {
      matchesStatus = item.statusKes === "nonaktif" || item.statusNaker === "nonaktif";
    }
    
    return matchesSearch && matchesDept && matchesStatus;
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
          <h1 className="text-xl font-bold text-gray-900">Kepesertaan BPJS</h1>
          <p className="text-sm text-gray-600 mt-1">
            Kelola data kepesertaan BPJS Kesehatan dan Ketenagakerjaan karyawan
          </p>
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

            <h3 className="text-xl font-bold text-gray-900 mb-1">{card.value}</h3>

            <div className="flex items-center">
              <div className="flex items-center text-green-600">
                <span className="text-xs font-medium">{card.change}</span>
              </div>
              <span className="text-xs text-gray-500 ml-2">{card.description}</span>
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
                placeholder="Cari berdasarkan nama, NIP, atau nomor BPJS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative min-w-[180px]">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full pl-4 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Semua Departemen</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative min-w-[180px]">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-4 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Semua Status</option>
                  <option value="kes_aktif">BPJS Kesehatan Aktif</option>
                  <option value="kes_nonaktif">BPJS Kesehatan Nonaktif</option>
                  <option value="naker_aktif">BPJS Ketenagakerjaan Aktif</option>
                  <option value="naker_nonaktif">BPJS Ketenagakerjaan Nonaktif</option>
                  <option value="perlu_update">Perlu Update</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "1400px" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  NIP
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Nama
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Departemen
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  BPJS Kesehatan
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  BPJS Ketenagakerjaan
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Tgl Update Kesehatan
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Tgl Update Naker
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-gray-500">
                    <p>Tidak ada data kepesertaan BPJS</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{item.nip}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{item.nama}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.departemen}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {editingId === item.id ? (
                        <input
                          type="text"
                          name="bpjsKes"
                          value={editData.bpjsKes}
                          onChange={handleChange}
                          className="px-2 py-1 border border-gray-200 rounded-lg text-sm w-36 focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
                        />
                      ) : (
                        <span className="text-sm font-mono">{item.bpjsKes}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {editingId === item.id ? (
                        <select
                          name="statusKes"
                          value={editData.statusKes}
                          onChange={handleChange}
                          className="px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
                        >
                          <option value="aktif">Aktif</option>
                          <option value="nonaktif">Nonaktif</option>
                        </select>
                      ) : (
                        getStatusBadge(item.statusKes)
                      )}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {editingId === item.id ? (
                        <input
                          type="text"
                          name="bpjsNaker"
                          value={editData.bpjsNaker}
                          onChange={handleChange}
                          className="px-2 py-1 border border-gray-200 rounded-lg text-sm w-36 focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
                        />
                      ) : (
                        <span className="text-sm font-mono">{item.bpjsNaker}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {editingId === item.id ? (
                        <select
                          name="statusNaker"
                          value={editData.statusNaker}
                          onChange={handleChange}
                          className="px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
                        >
                          <option value="aktif">Aktif</option>
                          <option value="nonaktif">Nonaktif</option>
                        </select>
                      ) : (
                        getStatusBadge(item.statusNaker)
                      )}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{formatDate(item.tglUpdateKes)}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{formatDate(item.tglUpdateNaker)}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {editingId === item.id ? (
                        <button
                          onClick={() => handleSave(item.id)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                        >
                          <Save size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                        >
                          <Edit size={16} />
                        </button>
                      )}
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