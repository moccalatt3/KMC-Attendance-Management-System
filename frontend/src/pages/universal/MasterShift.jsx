import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  Power,
  AlertCircle,
  Filter
} from "lucide-react";
import ModalShift from "../../components/universal/ModalShift";
import ModalDetailShift from "../../components/universal/ModalDetailShift";
import shiftService from "../../services/shiftService";

const StatCardSkeleton = () => (
  <div className="bg-white rounded-xl p-5 animate-pulse">
    <div className="flex items-center justify-between mb-3">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
    <div className="flex items-center">
      <div className="h-4 bg-gray-200 rounded w-32"></div>
    </div>
  </div>
);

const TableRowSkeleton = () => (
  <tr className="border-b border-gray-100">
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div></td>
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div></td>
    <td className="py-4 px-6"><div className="h-6 bg-gray-200 rounded-full w-20 mx-auto"></div></td>
    <td className="py-4 px-6"><div className="flex items-center justify-center space-x-2"><div className="w-8 h-8 bg-gray-200 rounded-lg"></div><div className="w-8 h-8 bg-gray-200 rounded-lg"></div><div className="w-8 h-8 bg-gray-200 rounded-lg"></div></div></td>
  </tr>
);

export default function MasterShift() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [formMode, setFormMode] = useState("add");
  const [shifts, setShifts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    aktif: 0,
    nonaktif: 0,
    wfh: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await shiftService.ambilSemua();
      if (response.success) {
        setShifts(response.data);
        
        const aktif = response.data.filter(s => s.is_active).length;
        const wfh = response.data.filter(s => s.is_wfh).length;
        
        setStats({
          total: response.data.length,
          aktif: aktif,
          nonaktif: response.data.length - aktif,
          wfh: wfh,
        });
      }
    } catch (error) {
      console.error("Error fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (shift) => {
    setSelectedShift(shift);
    setShowDetailModal(true);
  };

  const handleAddClick = () => {
    setFormMode("add");
    setSelectedShift(null);
    setShowFormModal(true);
  };

  const handleEditClick = (shift) => {
    setFormMode("edit");
    setSelectedShift(shift);
    setShowFormModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Yakin ingin menghapus shift ini?")) return;
    
    try {
      const response = await shiftService.hapus(id);
      if (response.success) {
        alert("Shift berhasil dihapus");
        fetchData();
      }
    } catch (error) {
      alert("Gagal menghapus shift");
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const response = await shiftService.toggleStatus(id);
      if (response.success) {
        setShifts(shifts.map(s => 
          s.id === id ? { ...s, is_active: !currentStatus } : s
        ));
        
        setStats(prev => ({
          ...prev,
          aktif: currentStatus ? prev.aktif - 1 : prev.aktif + 1,
          nonaktif: currentStatus ? prev.nonaktif + 1 : prev.nonaktif - 1,
        }));
      }
    } catch (error) {
      alert("Gagal mengubah status shift");
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      let response;
      if (formMode === "add") {
        response = await shiftService.tambah(data);
      } else {
        response = await shiftService.perbarui(selectedShift.id, data);
      }
      
      if (response.success) {
        alert(formMode === "add" ? "Shift berhasil ditambahkan" : "Shift berhasil diubah");
        setShowFormModal(false);
        fetchData();
      }
    } catch (error) {
      alert("Gagal menyimpan data");
    }
  };

  const filteredShifts = shifts.filter((shift) => {
    const matchesSearch = 
      (shift.code?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (shift.name?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || shift.shift_type === filterType;
    
    return matchesSearch && matchesType;
  });

  const getShiftTypeBadge = (type) => {
    const colors = {
      pagi: "bg-blue-100 text-blue-800",
      siang: "bg-yellow-100 text-yellow-800",
      malam: "bg-indigo-100 text-indigo-800",
      middle: "bg-purple-100 text-purple-800",
      office: "bg-green-100 text-green-800",
      wfh: "bg-teal-100 text-teal-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (aktif) => {
    return aktif 
      ? <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Aktif</span>
      : <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Nonaktif</span>;
  };

  const formatTime = (time) => {
    if (!time) return "-";
    return time.substring(0, 5);
  };

  const calculateWorkHours = (shift) => {
    if (!shift.check_in_time || !shift.check_out_time || shift.is_wfh) return "-";
    
    const masuk = shift.check_in_time.split(':').map(Number);
    const keluar = shift.check_out_time.split(':').map(Number);
    
    let jam = keluar[0] - masuk[0];
    if (jam < 0) jam += 24;
    
    const menit = keluar[1] - masuk[1];
    const totalJam = jam + menit/60;
    const afterBreak = totalJam - (shift.break_minutes / 60);
    
    return `${afterBreak.toFixed(1)} jam`;
  };

  const summaryCards = [
    {
      title: "TOTAL SHIFT",
      value: stats.total,
      description: "Total seluruh shift",
      icon: <Clock size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "SHIFT AKTIF",
      value: stats.aktif,
      description: "Shift yang sedang digunakan",
      icon: <CheckCircle size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "SHIFT NONAKTIF",
      value: stats.nonaktif,
      description: "Shift yang tidak digunakan",
      icon: <Power size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "SHIFT WFH",
      value: stats.wfh,
      description: "Work From Home",
      icon: <AlertCircle size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const shiftTypes = [
    { value: "all", label: "Semua Tipe" },
    { value: "pagi", label: "Pagi" },
    { value: "siang", label: "Siang" },
    { value: "malam", label: "Malam" },
    { value: "middle", label: "Middle" },
    { value: "office", label: "Office" },
    { value: "wfh", label: "WFH" },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Master Shift</h1>
            <p className="text-sm text-gray-600 mt-1">
              Kelola data shift dan jam kerja karyawan
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] transition-all duration-200"
          >
            <Plus size={16} />
            <span>Tambah Shift</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          summaryCards.map((card, index) => (
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
              <p className="text-xs text-gray-500">
                {card.description}
              </p>
            </div>
          ))
        )}
      </div>

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
                placeholder="Cari berdasarkan kode atau nama shift..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent min-w-[150px]"
              >
                {shiftTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "1200px" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Shift</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Masuk</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Keluar</th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Istirahat</th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Jam</th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <>
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                </>
              ) : filteredShifts.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-gray-500">
                    <Clock size={40} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-medium">Tidak ada data shift</p>
                  </td>
                </tr>
              ) : (
                filteredShifts.map((shift) => (
                  <tr key={shift.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="text-sm font-bold text-gray-900">{shift.code}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{shift.name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getShiftTypeBadge(shift.shift_type)}`}>
                        {shift.shift_type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{formatTime(shift.check_in_time)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{formatTime(shift.check_out_time)}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-gray-700">{shift.break_minutes} menit</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {calculateWorkHours(shift)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {getStatusBadge(shift.is_active)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleViewDetail(shift)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-[#1C4D8D] transition-all duration-200"
                          title="Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditClick(shift)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(shift.id)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleActive(shift.id, shift.is_active)}
                          className={`p-2 bg-gray-100 rounded-lg transition-all duration-200 ${
                            shift.is_active 
                              ? 'text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700' 
                              : 'text-green-600 hover:bg-green-100 hover:text-green-700'
                          }`}
                          title={shift.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          <Power size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Menampilkan {filteredShifts.length} dari {shifts.length} shift
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Aktif</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Nonaktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalDetailShift
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        shift={selectedShift}
      />

      <ModalShift
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        shift={selectedShift}
        mode={formMode}
      />
    </div>
  );
}