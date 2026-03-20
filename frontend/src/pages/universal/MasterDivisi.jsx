import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  FolderTree,
  Users,
  CheckCircle,
  XCircle,
  Filter
} from "lucide-react";
import ModalDepartment from "../../components/universal/ModalDepartment";
import ModalDetailDepartment from "../../components/universal/ModalDetailDepartment";
import departmentService from "../../services/departmentService";

const StatCardSkeleton = () => (
  <div className="bg-white rounded-xl p-5 animate-pulse">
    <div className="flex items-center justify-between mb-3">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
    <div className="flex items-center">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

const TableRowSkeleton = () => (
  <tr className="border-b border-gray-100">
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
    <td className="py-4 px-6"><div className="h-6 bg-gray-200 rounded-full w-20"></div></td>
    <td className="py-4 px-6"><div className="flex items-center space-x-2"><div className="w-8 h-8 bg-gray-200 rounded-lg"></div><div className="w-8 h-8 bg-gray-200 rounded-lg"></div><div className="w-8 h-8 bg-gray-200 rounded-lg"></div></div></td>
  </tr>
);

export default function MasterDivisi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formMode, setFormMode] = useState("add");
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    aktif: 0,
    nonaktif: 0,
    root: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [deptResponse, statsResponse] = await Promise.all([
        departmentService.ambilSemua(),
        departmentService.ambilStatistik()
      ]);
      
      if (deptResponse.success) {
        setDepartments(deptResponse.data);
      }
      
      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error("Error fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (department) => {
    setSelectedDepartment(department);
    setShowDetailModal(true);
  };

  const handleAddClick = () => {
    setFormMode("add");
    setSelectedDepartment(null);
    setShowFormModal(true);
  };

  const handleEditClick = (department) => {
    setFormMode("edit");
    setSelectedDepartment(department);
    setShowFormModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Yakin ingin menghapus divisi ini?")) return;
    
    try {
      const response = await departmentService.hapus(id);
      if (response.success) {
        alert("Divisi berhasil dihapus");
        fetchData();
      }
    } catch (error) {
      alert("Gagal menghapus divisi");
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const response = await departmentService.toggleStatus(id);
      if (response.success) {
        setDepartments(departments.map(d => 
          d.id === id ? { ...d, is_active: !currentStatus } : d
        ));
        
        setStats(prev => ({
          ...prev,
          aktif: currentStatus ? prev.aktif - 1 : prev.aktif + 1,
          nonaktif: currentStatus ? prev.nonaktif + 1 : prev.nonaktif - 1,
        }));
      }
    } catch (error) {
      alert("Gagal mengubah status divisi");
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      let response;
      if (formMode === "add") {
        response = await departmentService.tambah(data);
      } else {
        response = await departmentService.perbarui(selectedDepartment.id, data);
      }
      
      if (response.success) {
        alert(formMode === "add" ? "Divisi berhasil ditambahkan" : "Divisi berhasil diubah");
        setShowFormModal(false);
        fetchData();
      }
    } catch (error) {
      alert("Gagal menyimpan data");
    }
  };

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch = 
      (dept.code?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (dept.name?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (selectedStatus === "aktif") {
      matchesStatus = dept.is_active === true;
    } else if (selectedStatus === "nonaktif") {
      matchesStatus = dept.is_active === false;
    } else if (selectedStatus === "induk") {
      matchesStatus = dept.parent_id === null;
    } else if (selectedStatus === "sub") {
      matchesStatus = dept.parent_id !== null;
    }
    
    return matchesSearch && matchesStatus;
  });

  const getParentName = (parentId) => {
    if (!parentId) return "-";
    const parent = departments.find((d) => d.id === parentId);
    return parent ? `${parent.name} (${parent.code})` : "-";
  };

  const getStatusBadge = (aktif) => {
    return aktif 
      ? <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Aktif</span>
      : <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Nonaktif</span>;
  };

  const summaryCards = [
    {
      title: "TOTAL DIVISI",
      value: stats.total,
      description: "Total seluruh divisi",
      icon: <FolderTree size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "DIVISI AKTIF",
      value: stats.aktif,
      description: "Divisi yang aktif",
      icon: <CheckCircle size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "DIVISI NONAKTIF",
      value: stats.nonaktif,
      description: "Divisi yang tidak aktif",
      icon: <XCircle size={18} />,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "INDUK DIVISI",
      value: stats.root,
      description: "Root divisions",
      icon: <Users size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const statusOptions = [
    { value: "all", label: "Semua Divisi" },
    { value: "aktif", label: "Aktif" },
    { value: "nonaktif", label: "Nonaktif" },
    { value: "induk", label: "Induk Divisi (Root)" },
    { value: "sub", label: "Sub Divisi" },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Master Divisi & Departemen</h1>
            <p className="text-sm text-gray-600 mt-1">
              Kelola struktur organisasi dan pembagian divisi perusahaan
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] transition-all duration-200"
          >
            <Plus size={16} />
            <span>Tambah Divisi</span>
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
                placeholder="Cari berdasarkan kode atau nama divisi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent min-w-[180px]"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "1000px" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Divisi</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Induk Divisi</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <>
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                </>
              ) : filteredDepartments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500">
                    <FolderTree size={40} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-medium">Tidak ada data divisi</p>
                  </td>
                </tr>
              ) : (
                filteredDepartments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="text-sm font-bold text-gray-900">{dept.code}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{dept.name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{getParentName(dept.parent_id)}</span>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(dept.is_active)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetail(dept)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-[#1C4D8D] transition-all duration-200"
                          title="Detail"
                        >
                          <FolderTree size={16} />
                        </button>
                        <button
                          onClick={() => handleEditClick(dept)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(dept.id)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleActive(dept.id, dept.is_active)}
                          className={`p-2 bg-gray-100 rounded-lg transition-all duration-200 ${
                            dept.is_active 
                              ? 'text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700' 
                              : 'text-green-600 hover:bg-green-100 hover:text-green-700'
                          }`}
                          title={dept.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          {dept.is_active ? <XCircle size={16} /> : <CheckCircle size={16} />}
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
              Menampilkan {filteredDepartments.length} dari {departments.length} divisi
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

      <ModalDetailDepartment
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        department={selectedDepartment}
      />

      <ModalDepartment
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        department={selectedDepartment}
        mode={formMode}
      />
    </div>
  );
}