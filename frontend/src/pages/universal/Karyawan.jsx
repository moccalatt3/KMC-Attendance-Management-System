import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  UserCheck,
  UserX,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import ModalDetailKaryawan from "../../components/universal/ModalDetailKaryawan";
import ModalKaryawan from "../../components/universal/ModalKaryawan";
import karyawanService from "../../services/karyawanService";
import roleService from "../../services/roleService";

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
    <td className="py-4 px-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </td>
    <td className="py-4 px-6">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </td>
    <td className="py-4 px-6">
      <div className="h-4 bg-gray-200 rounded w-32"></div>
    </td>
    <td className="py-4 px-6">
      <div className="h-4 bg-gray-200 rounded w-28"></div>
    </td>
    <td className="py-4 px-6">
      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
    </td>
    <td className="py-4 px-6">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </td>
  </tr>
);

export default function Karyawan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formMode, setFormMode] = useState("add");
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    tetap: 0,
    kontrak: 0,
    cuti: 0,
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchData();
    fetchRoles();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [karyawanRes, statistikRes] = await Promise.all([
        karyawanService.ambilSemua(),
        karyawanService.ambilStatistik()
      ]);
      
      if (karyawanRes.success) {
        setEmployees(karyawanRes.data);
        const depts = [...new Set(karyawanRes.data.map(e => e.department_id))];
        setDepartments(depts);
      }
      
      if (statistikRes.success) {
        setStats(statistikRes.data);
      }
    } catch (error) {
      console.error("Error fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await roleService.ambilSemua();
      if (response.success) {
        setRoles(response.data);
      }
    } catch (error) {
      console.error("Error fetch roles:", error);
    }
  };

  const handleViewDetail = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  const handleAddClick = () => {
    setFormMode("add");
    setSelectedEmployee(null);
    setShowFormModal(true);
  };

  const handleEditClick = (employee) => {
    setFormMode("edit");
    setSelectedEmployee(employee);
    setShowFormModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Yakin ingin menghapus karyawan ini?")) return;
    
    try {
      const response = await karyawanService.hapus(id);
      if (response.success) {
        alert("Karyawan berhasil dihapus");
        fetchData();
      }
    } catch (error) {
      alert("Gagal menghapus karyawan");
    }
  };

  const handleFormSubmit = async (data) => {
    setModalLoading(true);
    try {
      let response;
      if (formMode === "add") {
        response = await karyawanService.tambah(data);
      } else {
        response = await karyawanService.perbarui(selectedEmployee.id, data);
      }
      
      if (response.success) {
        alert(formMode === "add" ? "Karyawan berhasil ditambahkan" : "Karyawan berhasil diubah");
        setShowFormModal(false);
        fetchData();
      }
    } catch (error) {
      alert("Gagal menyimpan data");
    } finally {
      setModalLoading(false);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      (emp.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (emp.employee_id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (emp.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    
    const matchesDept = filterDept === "all" || String(emp.department_id) === filterDept;
    
    return matchesSearch && matchesDept;
  });

  const summaryCards = [
    {
      title: "TOTAL KARYAWAN",
      value: stats.total,
      change: "+2",
      description: "dari bulan lalu",
      icon: <Users size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      changePositive: true,
    },
    {
      title: "KARYAWAN TETAP",
      value: stats.tetap,
      change: stats.total > 0 ? `${Math.round((stats.tetap / stats.total) * 100)}%` : "0%",
      description: "dari total",
      icon: <UserCheck size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      changePositive: true,
    },
    {
      title: "KARYAWAN KONTRAK",
      value: stats.kontrak,
      change: stats.total > 0 ? `${Math.round((stats.kontrak / stats.total) * 100)}%` : "0%",
      description: "dari total",
      icon: <Briefcase size={18} />,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
      changePositive: true,
    },
    {
      title: "CUTI",
      value: stats.cuti,
      change: `${stats.cuti}`,
      description: "karyawan",
      icon: <UserX size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      changePositive: false,
    },
  ];

  const getAvatarColor = (nama) => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", 
      "bg-indigo-500", "bg-pink-500", "bg-teal-500", "bg-orange-500"
    ];
    if (!nama) return colors[0];
    const index = nama.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Data Karyawan</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manajemen data dan informasi karyawan
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] transition-all duration-200"
          >
            <Plus size={16} />
            <span>Tambah Karyawan</span>
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
              <div className="flex items-center">
                <div
                  className={`flex items-center ${
                    card.changePositive ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {card.changePositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span className="text-xs font-medium ml-1">{card.change}</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  {card.description}
                </span>
              </div>
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
                placeholder="Cari karyawan berdasarkan NIP, nama, atau jabatan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm"
              />
            </div>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent min-w-[180px]"
            >
              <option value="all">Semua Departemen</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept || "Tanpa Departemen"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Karyawan
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIP
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departemen
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jabatan
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <>
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                </>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    Tidak ada data karyawan
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full ${getAvatarColor(emp.full_name)} flex items-center justify-center text-white font-medium text-sm flex-shrink-0`}
                        >
                          {emp.full_name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {emp.full_name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {emp.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-mono text-gray-700">
                        {emp.employee_id}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">
                        {emp.department_id || "-"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">
                        {emp.position_id || "-"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          emp.employment_status === "Tetap"
                            ? "bg-green-100 text-green-800"
                            : emp.employment_status === "Cuti"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {emp.employment_status || "Aktif"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetail(emp)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-[#1C4D8D] transition-all duration-200"
                          title="Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditClick(emp)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(emp.id)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                          title="Hapus"
                        >
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
      </div>

      <ModalDetailKaryawan
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        karyawan={selectedEmployee}
        loading={false}
      />

      <ModalKaryawan
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        karyawan={selectedEmployee}
        mode={formMode}
        loading={modalLoading}
        roles={roles}
      />
    </div>
  );
}