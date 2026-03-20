import React, { useState, useEffect } from "react";
import {
  X,
  FolderTree,
  Users,
  Calendar,
  Tag,
  CheckCircle,
  XCircle,
  ChevronRight
} from "lucide-react";

export default function ModalDetailDepartment({ isOpen, onClose, department }) {
  const [childCount, setChildCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    if (department) {
      if (department.children) {
        setChildCount(department.children.length);
      }
      
      if (department.head) {
        setEmployeeCount(prev => prev + 1);
      }
    }
  }, [department]);

  if (!isOpen || !department) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const InfoRow = ({ label, value }) => (
    <div className="flex py-3 border-b border-gray-100">
      <span className="text-xs text-gray-500 w-1/3">{label}</span>
      <span className="text-xs font-medium text-gray-900 w-2/3">{value || "-"}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div 
        className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-2xl shadow-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#1C4D8D]/10 rounded-lg">
                <FolderTree size={20} className="text-[#1C4D8D]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Detail Divisi
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Informasi lengkap struktur divisi
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Tutup"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#1C4D8D]/10 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-[#1C4D8D]">{department.code}</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{department.name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    department.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {department.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                  {department.parent && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center">
                      <ChevronRight size={12} className="mr-0.5" />
                      Sub dari {department.parent.code}
                    </span>
        )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Users size={14} className="text-gray-400" />
                Statistik
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Sub Divisi</span>
                  <span className="text-sm font-medium text-gray-900">{childCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Karyawan</span>
                  <span className="text-sm font-medium text-gray-900">{employeeCount}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Kepala Divisi</span>
                  <span className="text-sm font-medium text-gray-900">
                    {department.head ? department.head.full_name : '-'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Tag size={14} className="text-gray-400" />
                Informasi
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">ID</span>
                  <span className="text-xs font-mono text-gray-900">{department.id.substring(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Kode</span>
                  <span className="text-sm font-medium text-gray-900">{department.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Parent</span>
                  <span className="text-sm font-medium text-gray-900">
                    {department.parent ? `${department.parent.code} - ${department.parent.name}` : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {department.description && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                Deskripsi
              </h4>
              <p className="text-sm text-gray-700">{department.description}</p>
            </div>
          )}

          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              Informasi Sistem
            </h4>
            <InfoRow label="Dibuat Pada" value={formatDate(department.created_at)} />
            <InfoRow label="Diperbarui Pada" value={formatDate(department.updated_at)} />
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1C4D8D] text-white rounded-lg hover:bg-[#163a6f] transition-colors font-medium text-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}