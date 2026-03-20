import React, { useState, useEffect } from "react";
import { X, Save, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";

export default function ModalManagePermission({
  isOpen,
  onClose,
  onSave,
  role,
  allPermissions,
  rolePermissionIds,
  loading,
}) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [expandedModules, setExpandedModules] = useState({});
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (isOpen && rolePermissionIds) {
      setSelectedPermissions(rolePermissionIds);

      const initialExpanded = {};
      const modules = [...new Set(allPermissions.map((p) => p.module))];
      modules.slice(0, 2).forEach((module) => {
        initialExpanded[module] = true;
      });
      setExpandedModules(initialExpanded);
    } else {
      setSelectedPermissions([]);
    }
    setActiveTab("all");
  }, [isOpen, rolePermissionIds, allPermissions]);

  if (!isOpen) return null;

  const toggleModule = (module) => {
    setExpandedModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const togglePermission = (permissionId) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };

  const selectAllInModule = (modulePermissions) => {
    const moduleIds = modulePermissions.map((p) => p.id);
    const allSelected = moduleIds.every((id) =>
      selectedPermissions.includes(id),
    );

    if (allSelected) {
      setSelectedPermissions((prev) =>
        prev.filter((id) => !moduleIds.includes(id)),
      );
    } else {
      setSelectedPermissions((prev) => {
        const newIds = [...prev];
        moduleIds.forEach((id) => {
          if (!newIds.includes(id)) newIds.push(id);
        });
        return newIds;
      });
    }
  };

  const getModulePermissions = (module) => {
    return allPermissions.filter((p) => p.module === module);
  };

  const getFilteredModules = () => {
    if (!allPermissions.length) return [];

    const modules = [...new Set(allPermissions.map((p) => p.module))];

    if (activeTab !== "all") {
      return modules.filter((module) =>
        module.toLowerCase().includes(activeTab.toLowerCase()),
      );
    }

    return modules;
  };

  const getActionLabel = (action) => {
    const labels = {
      view: "Lihat",
      create: "Tambah",
      edit: "Edit",
      delete: "Hapus",
      export: "Export",
      import: "Import",
      upload: "Upload",
      rekap: "Rekap",
      manual: "Manual",
      approve: "Approve",
      "approve.level1": "Approve Level 1",
      "approve.level2": "Approve Level 2",
      reject: "Tolak",
      hitung: "Hitung",
      generate: "Generate",
      report: "Report",
      manage: "Kelola",
      access: "Akses",
      configure: "Konfigurasi",
    };
    return labels[action] || action;
  };

  const getScopeLabel = (scope) => {
    const labels = {
      all: "Semua",
      department: "Departemen",
      team: "Tim",
      own: "Sendiri",
      level1: "Level 1",
      level2: "Level 2",
    };
    return labels[scope] || scope;
  };

  const getScopeBadgeColor = (scope) => {
    const colors = {
      all: "bg-purple-100 text-purple-700",
      department: "bg-blue-100 text-blue-700",
      team: "bg-green-100 text-green-700",
      own: "bg-gray-100 text-gray-700",
      level1: "bg-yellow-100 text-yellow-700",
      level2: "bg-orange-100 text-orange-700",
    };
    return colors[scope] || "bg-gray-100 text-gray-700";
  };

  const moduleTabs = [
    { id: "all", label: "Semua" },
    { id: "dashboard", label: "Dashboard" },
    { id: "employees", label: "Karyawan" },
    { id: "attendance", label: "Absensi" },
    { id: "leave", label: "Cuti" },
    { id: "overtime", label: "Lembur" },
    { id: "payroll", label: "Payroll" },
    { id: "bpjs", label: "BPJS" },
    { id: "reports", label: "Laporan" },
    { id: "master", label: "Master" },
    { id: "settings", label: "Pengaturan" },
  ];

  const filteredModules = getFilteredModules();

  const getModuleCount = (tabId) => {
    if (tabId === "all") return filteredModules.length;
    return filteredModules.filter((m) =>
      m.toLowerCase().includes(tabId.toLowerCase()),
    ).length;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>

      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-5xl shadow-xl border border-gray-200 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Atur Permission
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Role:{" "}
                <span className="font-medium text-[#1C4D8D]">
                  {role?.display_name || role?.name}
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Tutup"
              disabled={loading}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-gray-100 bg-white">
          <div className="flex overflow-x-auto pb-1 scrollbar-hide">
            <div className="flex space-x-2">
              {moduleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#1C4D8D] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1 py-0.5 text-[10px] rounded-full ${
                      activeTab === tab.id
                        ? "bg-[#1C4D8D] text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {getModuleCount(tab.id)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-3">
            {filteredModules.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <AlertCircle size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm font-medium">
                  Tidak ada module ditemukan
                </p>
              </div>
            ) : (
              filteredModules.map((module) => {
                const modulePermissions = getModulePermissions(module);
                const allSelected = modulePermissions.every((p) =>
                  selectedPermissions.includes(p.id),
                );
                const someSelected = modulePermissions.some((p) =>
                  selectedPermissions.includes(p.id),
                );

                return (
                  <div
                    key={module}
                    className="border border-gray-100 rounded-lg overflow-hidden"
                  >
                    <div
                      className="px-4 py-2.5 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleModule(module)}
                    >
                      <div className="flex items-center space-x-2">
                        <ChevronDown
                          size={16}
                          className={`text-gray-500 transition-transform ${
                            expandedModules[module] ? "" : "-rotate-90"
                          }`}
                        />
                        <h3 className="text-sm font-medium text-gray-900">
                          {module}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {modulePermissions.length} permission
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <label
                          className="flex items-center space-x-1.5 text-xs cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={allSelected}
                            ref={(input) => {
                              if (input) {
                                input.indeterminate =
                                  someSelected && !allSelected;
                              }
                            }}
                            onChange={() =>
                              selectAllInModule(modulePermissions)
                            }
                            className="rounded border-gray-300 text-[#1C4D8D] focus:ring-[#1C4D8D] w-3.5 h-3.5"
                          />
                          <span className="text-gray-600">Pilih Semua</span>
                        </label>
                      </div>
                    </div>

                    {expandedModules[module] && (
                      <div className="p-4 border-t border-gray-100 bg-white">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {modulePermissions.map((permission) => (
                            <button
                              key={permission.id}
                              onClick={() => togglePermission(permission.id)}
                              className={`px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                                selectedPermissions.includes(permission.id)
                                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              <div className="flex items-center space-x-1.5 overflow-hidden">
                                {selectedPermissions.includes(
                                  permission.id,
                                ) && (
                                  <CheckCircle
                                    size={10}
                                    className="flex-shrink-0"
                                  />
                                )}
                                <span className="truncate">
                                  {getActionLabel(permission.action)}
                                </span>
                              </div>
                              <span
                                className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium flex-shrink-0 ${getScopeBadgeColor(permission.scope)}`}
                              >
                                {getScopeLabel(permission.scope)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="px-6 py-3 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedPermissions([])}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Hapus Semua
              </button>
              <div className="w-px h-4 bg-gray-300"></div>
              <button
                onClick={() =>
                  setSelectedPermissions(allPermissions.map((p) => p.id))
                }
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Pilih Semua
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={() => onSave(selectedPermissions)}
                disabled={loading}
                className="px-3 py-1.5 bg-[#1C4D8D] text-white rounded-lg hover:bg-[#163a6f] transition-colors text-sm flex items-center space-x-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    <span>Simpan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
