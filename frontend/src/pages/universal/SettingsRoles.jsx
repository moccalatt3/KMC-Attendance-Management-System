import React, { useState, useEffect } from "react";
import {
  Shield,
  Users,
  Key,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  Search,
  ChevronDown,
  Plus,
  Eye,
  Inbox,
  Crown,
  Briefcase,
  UserCog,
  User,
  X,
} from "lucide-react";
import roleService from "../../services/roleService";
import permissionService from "../../services/permissionService";
import ModalRole from "../../components/universal/ModalRole";
import ModalManagePermission from "../../components/universal/ModalManagePermission";

export default function SettingsRoles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [rolePermissions, setRolePermissions] = useState({});

  const [showModalRole, setShowModalRole] = useState(false);
  const [showModalPermission, setShowModalPermission] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedRoleData, setSelectedRoleData] = useState(null);
  const [editingRoleId, setEditingRoleId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rolesRes, permissionsRes] = await Promise.all([
        roleService.ambilSemua(),
        permissionService.ambilGrouped(),
      ]);

      if (rolesRes.success) {
        setRoles(rolesRes.data);

        const permissionsMap = {};
        for (const role of rolesRes.data) {
          const permRes = await roleService.ambilPermissions(role.id);
          if (permRes.success) {
            permissionsMap[role.id] = permRes.data;
          }
        }
        setRolePermissions(permissionsMap);
      }

      if (permissionsRes.success) {
        setGroupedPermissions(permissionsRes.data);

        const flatPermissions = [];
        Object.keys(permissionsRes.data).forEach((module) => {
          Object.keys(permissionsRes.data[module]).forEach((action) => {
            permissionsRes.data[module][action].forEach((perm) => {
              flatPermissions.push(perm);
            });
          });
        });
        setPermissions(flatPermissions);
      }
    } catch (error) {
      console.error("Error fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = () => {
    setModalMode("add");
    setSelectedRoleData(null);
    setShowModalRole(true);
  };

  const handleEditRole = (role) => {
    setModalMode("edit");
    setSelectedRoleData(role);
    setShowModalRole(true);
  };

  const handleManagePermission = (role) => {
    setSelectedRoleData(role);
    setEditingRoleId(role.id);
    setShowModalPermission(true);
  };

  const handleSaveRole = async (data) => {
    setSaving(true);
    try {
      let response;
      if (modalMode === "add") {
        response = await roleService.tambah(data);
      } else {
        response = await roleService.perbarui(selectedRoleData.id, data);
      }

      if (response.success) {
        alert(
          modalMode === "add"
            ? "Role berhasil ditambahkan"
            : "Role berhasil diubah",
        );
        setShowModalRole(false);
        fetchData();
      }
    } catch (error) {
      alert("Gagal menyimpan role");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePermissions = async (permissionIds) => {
    if (!editingRoleId) return;

    setSaving(true);
    try {
      const response = await roleService.updatePermissions(
        editingRoleId,
        permissionIds,
      );
      if (response.success) {
        alert("Permission berhasil diupdate");
        setShowModalPermission(false);
        fetchData();
      }
    } catch (error) {
      alert("Gagal mengupdate permission");
    } finally {
      setSaving(false);
    }
  };

  const getFilteredRoles = () => {
    let filtered = roles;

    if (searchTerm) {
      filtered = filtered.filter(
        (role) =>
          role.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (activeTab !== "all") {
      if (activeTab === "top") {
        filtered = filtered.filter((r) => r.level <= 2);
      } else if (activeTab === "management") {
        filtered = filtered.filter((r) => r.level === 3);
      } else if (activeTab === "staff") {
        filtered = filtered.filter((r) => r.level === 4);
      } else if (activeTab === "supervisor") {
        filtered = filtered.filter((r) => r.level === 5);
      } else if (activeTab === "medical") {
        filtered = filtered.filter(
          (r) =>
            r.level === 6 &&
            (r.name?.includes("DOCTOR") ||
              r.name?.includes("NURSE") ||
              r.name?.includes("MIDWIFE") ||
              r.name?.includes("PHARMACIST") ||
              r.name?.includes("LAB")),
        );
      } else if (activeTab === "general") {
        filtered = filtered.filter(
          (r) =>
            r.level === 6 &&
            (r.name?.includes("ADMIN") || r.name?.includes("GENERAL")),
        );
      }
    }

    return filtered;
  };

  const getRoleColor = (role) => {
    if (role.level <= 2) return "bg-red-100 text-red-700";
    if (role.level === 3) return "bg-blue-100 text-blue-700";
    if (role.level === 4) return "bg-green-100 text-green-700";
    if (role.level === 5) return "bg-yellow-100 text-yellow-700";
    if (
      role.name?.includes("DOCTOR") ||
      role.name?.includes("NURSE") ||
      role.name?.includes("MIDWIFE")
    )
      return "bg-pink-100 text-pink-700";
    if (role.name?.includes("PHARMACIST") || role.name?.includes("LAB"))
      return "bg-teal-100 text-teal-700";
    if (role.name?.includes("ADMIN") || role.name?.includes("GENERAL"))
      return "bg-gray-100 text-gray-700";
    return "bg-gray-100 text-gray-700";
  };

  const summaryCards = [
    {
      title: "TOTAL ROLE",
      value: roles.length,
      change: `${roles.length}`,
      description: "role aktif",
      icon: <Shield size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "TOTAL PENGGUNA",
      value: roles.reduce((acc, role) => acc + (role.users_count || 0), 0),
      change: `${roles.reduce((acc, role) => acc + (role.users_count || 0), 0)}`,
      description: "pengguna",
      icon: <Users size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "LEVEL AKSES",
      value: "6",
      change: "6",
      description: "level hierarki",
      icon: <Key size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "MODUL TERPROTEKSI",
      value: permissions.length,
      change: `${permissions.length}`,
      description: "permission",
      icon: <Eye size={18} />,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const roleTabs = [
    { id: "all", label: "Semua Role", icon: <Inbox size={16} /> },
    { id: "top", label: "Top Management", icon: <Crown size={16} /> },
    { id: "management", label: "Manajemen", icon: <Briefcase size={16} /> },
    { id: "staff", label: "Staff", icon: <UserCog size={16} /> },
    { id: "supervisor", label: "Supervisor", icon: <UserCog size={16} /> },
    { id: "medical", label: "Staff Medis", icon: <User size={16} /> },
    { id: "general", label: "Staff Umum", icon: <User size={16} /> },
  ];

  const filteredRoles = getFilteredRoles();

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Role & Permission
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Kelola hak akses dan izin untuk setiap role pengguna
            </p>
          </div>
          <button
            onClick={handleAddRole}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] transition-all duration-200"
          >
            <Plus size={16} />
            <span>Tambah Role</span>
          </button>
        </div>
      </div>

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
              <div className="flex items-center text-gray-600">
                <span className="text-xs font-medium">{card.change}</span>
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {card.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-white">
          <div className="flex overflow-x-auto pb-1 scrollbar-hide">
            <div className="flex space-x-2">
              {roleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 font-medium text-sm whitespace-nowrap rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#1C4D8D] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? "bg-[#1C4D8D] text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {
                      roles.filter((r) => {
                        if (tab.id === "all") return true;
                        if (tab.id === "top") return r.level <= 2;
                        if (tab.id === "management") return r.level === 3;
                        if (tab.id === "staff") return r.level === 4;
                        if (tab.id === "supervisor") return r.level === 5;
                        if (tab.id === "medical")
                          return (
                            r.level === 6 &&
                            (r.name?.includes("DOCTOR") ||
                              r.name?.includes("NURSE") ||
                              r.name?.includes("MIDWIFE") ||
                              r.name?.includes("PHARMACIST") ||
                              r.name?.includes("LAB"))
                          );
                        if (tab.id === "general")
                          return (
                            r.level === 6 &&
                            (r.name?.includes("ADMIN") ||
                              r.name?.includes("GENERAL"))
                          );
                        return false;
                      }).length
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              />
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {loading ? (
            <div className="py-12 text-center text-gray-500">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#1C4D8D] rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm font-medium">Memuat data...</p>
            </div>
          ) : filteredRoles.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Shield size={40} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-medium">Tidak ada role ditemukan</p>
            </div>
          ) : (
            filteredRoles.map((role) => {
              const roleColor = getRoleColor(role);
              const permissionCount = rolePermissions[role.id]?.length || 0;

              return (
                <div
                  key={role.id}
                  className="bg-white rounded-lg border border-gray-100 overflow-hidden"
                >
                  <div className="px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg self-center ${roleColor.split(" ")[0]}`}
                      >
                        <Shield size={18} className={roleColor.split(" ")[1]} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-base font-semibold text-gray-900">
                            {role.display_name}
                          </h2>
                          <span
                            className={`px-2 py-0.5 rounded-sm text-xs font-medium ${roleColor}`}
                          >
                            {role.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-800 bg-gray-50 px-2 py-1 rounded-md flex items-center">
                            Level {role.level}
                            <span className="mx-2 w-px h-3 bg-gray-300"></span>
                            {role.users_count || 0} pengguna
                            <span className="mx-2 w-px h-3 bg-gray-300"></span>
                            {permissionCount} permission
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleManagePermission(role)}
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                        title="Atur Permission"
                      >
                        <Key size={16} />
                      </button>
                      <button
                        onClick={() => handleEditRole(role)}
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                        title="Edit Role"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Menampilkan {filteredRoles.length} dari {roles.length} role
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

      <ModalRole
        isOpen={showModalRole}
        onClose={() => setShowModalRole(false)}
        onSubmit={handleSaveRole}
        role={selectedRoleData}
        mode={modalMode}
        loading={saving}
      />

      <ModalManagePermission
        isOpen={showModalPermission}
        onClose={() => {
          setShowModalPermission(false);
          setEditingRoleId(null);
        }}
        onSave={handleSavePermissions}
        role={selectedRoleData}
        allPermissions={permissions}
        rolePermissionIds={rolePermissions[editingRoleId] || []}
        loading={saving}
      />
    </div>
  );
}
