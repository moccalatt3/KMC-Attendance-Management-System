import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Save, X, Search, Briefcase, 
  Power, CheckCircle, AlertCircle, Users, Filter
} from 'lucide-react';
import ModalPosition from '../../components/universal/ModalPosition';
import ModalDetailPosition from '../../components/universal/ModalDetailPosition';
import positionService from '../../services/positionService';

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
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div></td>
    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
    <td className="py-4 px-6"><div className="h-6 bg-gray-200 rounded-full w-20 mx-auto"></div></td>
    <td className="py-4 px-6"><div className="flex items-center justify-center space-x-2"><div className="w-8 h-8 bg-gray-200 rounded-lg"></div><div className="w-8 h-8 bg-gray-200 rounded-lg"></div><div className="w-8 h-8 bg-gray-200 rounded-lg"></div></div></td>
  </tr>
);

export default function MasterJabatan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [positions, setPositions] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    aktif: 0,
    nonaktif: 0,
    medical: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [posResponse, statsResponse] = await Promise.all([
        positionService.ambilSemua(),
        positionService.ambilStatistik()
      ]);
      
      if (posResponse.success) {
        setPositions(posResponse.data);
      }
      
      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Error fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (position) => {
    setSelectedPosition(position);
    setShowDetailModal(true);
  };

  const handleAddClick = () => {
    setFormMode('add');
    setSelectedPosition(null);
    setShowFormModal(true);
  };

  const handleEditClick = (position) => {
    setFormMode('edit');
    setSelectedPosition(position);
    setShowFormModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm('Yakin ingin menghapus jabatan ini?')) return;
    
    try {
      const response = await positionService.hapus(id);
      if (response.success) {
        alert('Jabatan berhasil dihapus');
        fetchData();
      }
    } catch (error) {
      alert('Gagal menghapus jabatan');
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const response = await positionService.toggleStatus(id);
      if (response.success) {
        setPositions(positions.map(p => 
          p.id === id ? { ...p, is_active: !currentStatus } : p
        ));
        
        setStats(prev => ({
          ...prev,
          aktif: currentStatus ? prev.aktif - 1 : prev.aktif + 1,
          nonaktif: currentStatus ? prev.nonaktif + 1 : prev.nonaktif - 1,
        }));
      }
    } catch (error) {
      alert('Gagal mengubah status jabatan');
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      let response;
      if (formMode === 'add') {
        response = await positionService.tambah(data);
      } else {
        response = await positionService.perbarui(selectedPosition.id, data);
      }
      
      if (response.success) {
        alert(formMode === 'add' ? 'Jabatan berhasil ditambahkan' : 'Jabatan berhasil diubah');
        setShowFormModal(false);
        fetchData();
      }
    } catch (error) {
      alert('Gagal menyimpan data');
    }
  };

  const filteredPositions = positions.filter((pos) => {
    const matchesSearch = 
      (pos.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (pos.code?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesLevel = filterLevel === 'all' || pos.level === parseInt(filterLevel);
    
    return matchesSearch && matchesLevel;
  });

  const getStatusBadge = (aktif) => {
    return aktif 
      ? <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Aktif</span>
      : <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Nonaktif</span>;
  };

  const getMedicalBadge = (isMedical) => {
    return isMedical 
      ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">Medis</span>
      : null;
  };

  const summaryCards = [
    {
      title: 'TOTAL JABATAN',
      value: stats.total,
      description: 'Total seluruh jabatan',
      icon: <Briefcase size={18} />,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'JABATAN AKTIF',
      value: stats.aktif,
      description: 'Jabatan yang aktif',
      icon: <CheckCircle size={18} />,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'JABATAN NONAKTIF',
      value: stats.nonaktif,
      description: 'Jabatan tidak aktif',
      icon: <Power size={18} />,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'JABATAN MEDIS',
      value: stats.medical || 0,
      description: 'Tenaga kesehatan',
      icon: <Users size={18} />,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const levelOptions = [
    { value: 'all', label: 'Semua Level' },
    { value: '1', label: 'Level 1' },
    { value: '2', label: 'Level 2' },
    { value: '3', label: 'Level 3' },
    { value: '4', label: 'Level 4' },
    { value: '5', label: 'Level 5' },
    { value: '6', label: 'Level 6' },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Master Jabatan</h1>
            <p className="text-sm text-gray-600 mt-1">
              Kelola data jabatan dan role karyawan
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] transition-all duration-200"
          >
            <Plus size={16} />
            <span>Tambah Jabatan</span>
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
                placeholder="Cari berdasarkan nama atau kode jabatan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent min-w-[150px]"
              >
                {levelOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: '1000px' }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Jabatan</th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default Role</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departemen</th>
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
              ) : filteredPositions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-500">
                    <Briefcase size={40} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-medium">Tidak ada data jabatan</p>
                  </td>
                </tr>
              ) : (
                filteredPositions.map((pos) => (
                  <tr key={pos.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="text-sm font-bold text-gray-900">{pos.code}</span>
                      {pos.is_medical && getMedicalBadge(true)}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{pos.name}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm text-gray-700">Level {pos.level}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{pos.default_role || '-'}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">
                        {pos.department ? `${pos.department.code} - ${pos.department.name}` : '-'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {getStatusBadge(pos.is_active)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleViewDetail(pos)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-[#1C4D8D] transition-all duration-200"
                          title="Detail"
                        >
                          <Briefcase size={16} />
                        </button>
                        <button
                          onClick={() => handleEditClick(pos)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition-all duration-200"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(pos.id)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleActive(pos.id, pos.is_active)}
                          className={`p-2 bg-gray-100 rounded-lg transition-all duration-200 ${
                            pos.is_active 
                              ? 'text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700' 
                              : 'text-green-600 hover:bg-green-100 hover:text-green-700'
                          }`}
                          title={pos.is_active ? 'Nonaktifkan' : 'Aktifkan'}
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
              Menampilkan {filteredPositions.length} dari {positions.length} jabatan
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
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Medis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalDetailPosition
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        position={selectedPosition}
      />

      <ModalPosition
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        position={selectedPosition}
        mode={formMode}
      />
    </div>
  );
}