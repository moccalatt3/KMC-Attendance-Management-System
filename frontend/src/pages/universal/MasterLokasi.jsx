import React, { useState } from 'react';
import { 
  MapPin, Plus, Edit, Trash2, Save, X, Search, Navigation, 
  CheckCircle, Power, AlertCircle, Globe, Home, Building2 
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix untuk icon marker Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom icon untuk lokasi
const locationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon untuk pusat
const pusatIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MasterLokasi() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([
    { 
      id: 1, 
      nama: 'Klinik Utama Bandung', 
      alamat: 'Jl. Asia Afrika No. 123, Bandung',
      latitude: -6.9217,
      longitude: 107.6069,
      radius: 100,
      tipe: 'pusat',
      aktif: true,
      totalKaryawan: 45,
    },
    { 
      id: 2, 
      nama: 'Klinik Setiabudi', 
      alamat: 'Jl. Setiabudi No. 45, Bandung',
      latitude: -6.8925,
      longitude: 107.6147,
      radius: 100,
      tipe: 'cabang',
      aktif: true,
      totalKaryawan: 28,
    },
    { 
      id: 3, 
      nama: 'Klinik Buahbatu', 
      alamat: 'Jl. Buahbatu No. 78, Bandung',
      latitude: -6.9375,
      longitude: 107.6342,
      radius: 100,
      tipe: 'cabang',
      aktif: false,
      totalKaryawan: 32,
    },
    { 
      id: 4, 
      nama: 'Klinik Ujungberung', 
      alamat: 'Jl. A.H. Nasution No. 100, Bandung',
      latitude: -6.9025,
      longitude: 107.6875,
      radius: 150,
      tipe: 'cabang',
      aktif: true,
      totalKaryawan: 21,
    },
    { 
      id: 5, 
      nama: 'Klinik Dago', 
      alamat: 'Jl. Ir. H. Juanda No. 56, Bandung',
      latitude: -6.8932,
      longitude: 107.6158,
      radius: 100,
      tipe: 'cabang',
      aktif: true,
      totalKaryawan: 19,
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    nama: '',
    alamat: '',
    latitude: '',
    longitude: '',
    radius: 100,
    tipe: 'cabang',
    aktif: true,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLocation, setNewLocation] = useState({
    nama: '',
    alamat: '',
    latitude: '',
    longitude: '',
    radius: 100,
    tipe: 'cabang',
    aktif: true,
  });

  // Stats
  const stats = {
    total: locations.length,
    aktif: locations.filter(l => l.aktif).length,
    nonaktif: locations.filter(l => !l.aktif).length,
    pusat: locations.filter(l => l.tipe === 'pusat').length,
    cabang: locations.filter(l => l.tipe === 'cabang').length,
  };

  const summaryCards = [
    {
      title: "TOTAL LOKASI",
      value: stats.total,
      change: `${stats.total}`,
      description: "lokasi",
      icon: <MapPin size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "LOKASI AKTIF",
      value: stats.aktif,
      change: `${stats.aktif}`,
      description: "beroperasi",
      icon: <CheckCircle size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "LOKASI NONAKTIF",
      value: stats.nonaktif,
      change: `${stats.nonaktif}`,
      description: "tidak aktif",
      icon: <Power size={18} />,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "RADIUS RATA-RATA",
      value: "110",
      change: "meter",
      description: "default 100m",
      icon: <Globe size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const handleEdit = (loc) => {
    setEditingId(loc.id);
    setEditForm({
      nama: loc.nama,
      alamat: loc.alamat,
      latitude: loc.latitude.toString(),
      longitude: loc.longitude.toString(),
      radius: loc.radius,
      tipe: loc.tipe,
      aktif: loc.aktif,
    });
  };

  const handleSave = (id) => {
    setLocations(locations.map(l => 
      l.id === id ? { 
        ...l, 
        ...editForm,
        latitude: parseFloat(editForm.latitude),
        longitude: parseFloat(editForm.longitude),
      } : l
    ));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus lokasi ini?')) {
      setLocations(locations.filter(l => l.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setLocations(locations.map(l => 
      l.id === id ? { ...l, aktif: !l.aktif } : l
    ));
  };

  const handleAddLocation = () => {
    const newId = Math.max(...locations.map(l => l.id)) + 1;
    setLocations([...locations, { 
      id: newId, 
      ...newLocation,
      latitude: parseFloat(newLocation.latitude),
      longitude: parseFloat(newLocation.longitude),
      totalKaryawan: 0 
    }]);
    setShowAddForm(false);
    setNewLocation({
      nama: '',
      alamat: '',
      latitude: '',
      longitude: '',
      radius: 100,
      tipe: 'cabang',
      aktif: true,
    });
  };

  const filteredLocations = locations.filter(loc => 
    loc.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.alamat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (aktif) => {
    return aktif 
      ? <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">Aktif</span>
      : <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">Nonaktif</span>;
  };

  const getTipeBadge = (tipe) => {
    return tipe === 'pusat'
      ? <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 whitespace-nowrap flex items-center">
          <Home size={12} className="mr-1" />
          Pusat
        </span>
      : <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap flex items-center">
          <Building2 size={12} className="mr-1" />
          Cabang
        </span>;
  };

  // Style untuk map container
  const mapContainerStyle = {
    height: '200px',
    width: '100%',
    zIndex: 1
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Master Lokasi Absen</h1>
            <p className="text-sm text-gray-600 mt-1">
              Kelola lokasi dan radius absensi untuk setiap cabang di Bandung
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] transition-all duration-200"
          >
            <Plus size={16} />
            <span>Tambah Lokasi</span>
          </button>
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

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm mb-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus size={18} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Tambah Lokasi Baru</h2>
                <p className="text-xs text-gray-500">Isi data lokasi absensi</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Nama Lokasi *</label>
              <input
                type="text"
                value={newLocation.nama}
                onChange={(e) => setNewLocation({ ...newLocation, nama: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: Klinik Cabang E"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Tipe</label>
              <select
                value={newLocation.tipe}
                onChange={(e) => setNewLocation({ ...newLocation, tipe: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cabang">Cabang</option>
                <option value="pusat">Pusat</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Alamat</label>
              <input
                type="text"
                value={newLocation.alamat}
                onChange={(e) => setNewLocation({ ...newLocation, alamat: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Jl. Asia Afrika No. 123, Bandung"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Latitude</label>
              <input
                type="text"
                value={newLocation.latitude}
                onChange={(e) => setNewLocation({ ...newLocation, latitude: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: -6.9217"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Longitude</label>
              <input
                type="text"
                value={newLocation.longitude}
                onChange={(e) => setNewLocation({ ...newLocation, longitude: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: 107.6069"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Radius (meter)</label>
              <input
                type="number"
                value={newLocation.radius}
                onChange={(e) => setNewLocation({ ...newLocation, radius: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end space-x-2">
              <button
                onClick={handleAddLocation}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-all duration-200"
              >
                Simpan
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location List with Leaflet Maps */}
      <div className="space-y-4">
        {filteredLocations.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <MapPin size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-500">Tidak ada data lokasi</p>
          </div>
        ) : (
          filteredLocations.map(location => (
            <div key={location.id} className="bg-white rounded-xl overflow-hidden">
              {/* Header Location */}
              <div className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        location.aktif ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <MapPin size={24} className={location.aktif ? 'text-blue-600' : 'text-gray-500'} />
                      </div>
                      
                      <div className="flex-1">
                        {editingId === location.id ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editForm.nama}
                                onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nama Lokasi"
                              />
                              <select
                                value={editForm.tipe}
                                onChange={(e) => setEditForm({ ...editForm, tipe: e.target.value })}
                                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="cabang">Cabang</option>
                                <option value="pusat">Pusat</option>
                              </select>
                            </div>
                            <input
                              type="text"
                              value={editForm.alamat}
                              onChange={(e) => setEditForm({ ...editForm, alamat: e.target.value })}
                              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Alamat"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <input
                                type="text"
                                value={editForm.latitude}
                                onChange={(e) => setEditForm({ ...editForm, latitude: e.target.value })}
                                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Latitude"
                              />
                              <input
                                type="text"
                                value={editForm.longitude}
                                onChange={(e) => setEditForm({ ...editForm, longitude: e.target.value })}
                                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Longitude"
                              />
                              <input
                                type="number"
                                value={editForm.radius}
                                onChange={(e) => setEditForm({ ...editForm, radius: parseInt(e.target.value) })}
                                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Radius (m)"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h3 className="text-base font-semibold text-gray-900">{location.nama}</h3>
                              {getTipeBadge(location.tipe)}
                              {getStatusBadge(location.aktif)}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{location.alamat}</p>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                Lat: {location.latitude.toFixed(4)}
                              </span>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                Long: {location.longitude.toFixed(4)}
                              </span>
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                Radius: {location.radius} meter
                              </span>
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                {location.totalKaryawan} karyawan
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 mt-4 lg:mt-0 lg:ml-4">
                    {editingId === location.id ? (
                      <>
                        <select
                          value={editForm.aktif.toString()}
                          onChange={(e) => setEditForm({ ...editForm, aktif: e.target.value === 'true' })}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="true">Aktif</option>
                          <option value="false">Nonaktif</option>
                        </select>
                        <button
                          onClick={() => handleSave(location.id)}
                          className="p-2 bg-gray-100 text-green-600 rounded-lg hover:bg-green-100 hover:text-green-700 transition-all duration-200"
                          title="Simpan"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-gray-100 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all duration-200"
                          title="Batal"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(location)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(location.id)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleActive(location.id)}
                          className={`p-2 bg-gray-100 rounded-lg transition-all duration-200 ${
                            location.aktif 
                              ? 'text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700' 
                              : 'text-green-600 hover:bg-green-100 hover:text-green-700'
                          }`}
                          title={location.aktif ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          <Power size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Leaflet Map */}
              <div className="h-48 w-full border-t border-gray-200" style={{ position: 'relative', zIndex: 0 }}>
                <MapContainer
                  center={[location.latitude, location.longitude]}
                  zoom={16}
                  style={mapContainerStyle}
                  scrollWheelZoom={false}
                  zoomControl={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Marker Lokasi */}
                  <Marker 
                    position={[location.latitude, location.longitude]} 
                    icon={location.tipe === 'pusat' ? pusatIcon : locationIcon}
                  >
                    <Popup>
                      <div className="text-sm">
                        <b>{location.nama}</b><br />
                        {location.alamat}<br />
                        Radius: {location.radius} meter<br />
                        {location.totalKaryawan} karyawan
                      </div>
                    </Popup>
                  </Marker>
                  
                  {/* Radius Circle */}
                  <Circle
                    center={[location.latitude, location.longitude]}
                    radius={location.radius}
                    pathOptions={{
                      color: location.aktif ? "#1C4D8D" : "#9CA3AF",
                      fillColor: location.aktif ? "#1C4D8D" : "#9CA3AF",
                      fillOpacity: 0.1,
                      weight: 2,
                    }}
                  />
                </MapContainer>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}