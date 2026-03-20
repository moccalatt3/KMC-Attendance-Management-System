import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Trash2,
  Edit,
  Save,
  Navigation,
  AlertCircle,
  CheckCircle,
  Globe,
  Settings,
  X,
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

export default function AbsensiRadius() {
  const [locations, setLocations] = useState([
    {
      id: 1,
      nama: 'Klinik Utama Bandung',
      alamat: 'Jl. Asia Afrika No. 123, Bandung',
      latitude: -6.9217,
      longitude: 107.6069,
      radius: 100,
      isActive: true,
      totalKaryawan: 45,
    },
    {
      id: 2,
      nama: 'Klinik Setiabudi',
      alamat: 'Jl. Setiabudi No. 45, Bandung',
      latitude: -6.8925,
      longitude: 107.6147,
      radius: 100,
      isActive: true,
      totalKaryawan: 28,
    },
    {
      id: 3,
      nama: 'Klinik Buahbatu',
      alamat: 'Jl. Buahbatu No. 78, Bandung',
      latitude: -6.9375,
      longitude: 107.6342,
      radius: 100,
      isActive: false,
      totalKaryawan: 32,
    },
    {
      id: 4,
      nama: 'Klinik Ujungberung',
      alamat: 'Jl. A.H. Nasution No. 100, Bandung',
      latitude: -6.9025,
      longitude: 107.6875,
      radius: 150,
      isActive: true,
      totalKaryawan: 21,
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({
    nama: '',
    alamat: '',
    latitude: '',
    longitude: '',
    radius: 100,
  });

  // Summary cards
  const summaryCards = [
    {
      title: "TOTAL LOKASI",
      value: locations.length,
      change: "+1",
      description: "bulan ini",
      icon: <MapPin size={18} />,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "LOKASI AKTIF",
      value: locations.filter(loc => loc.isActive).length,
      change: "3",
      description: "beroperasi",
      icon: <CheckCircle size={18} />,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "LOKASI NONAKTIF",
      value: locations.filter(loc => !loc.isActive).length,
      change: "1",
      description: "tidak aktif",
      icon: <X size={18} />,
      iconColor: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      title: "RADIUS RATA-RATA",
      value: "112.5",
      change: "meter",
      description: "default 100m",
      icon: <Globe size={18} />,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const handleEdit = (location) => {
    setEditingId(location.id);
    setEditForm({
      nama: location.nama,
      alamat: location.alamat,
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      radius: location.radius,
    });
  };

  const handleSave = (id) => {
    setLocations(locations.map(loc => 
      loc.id === id ? { 
        ...loc, 
        ...editForm,
        latitude: parseFloat(editForm.latitude),
        longitude: parseFloat(editForm.longitude),
      } : loc
    ));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus lokasi ini?')) {
      setLocations(locations.filter(loc => loc.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setLocations(locations.map(loc => 
      loc.id === id ? { ...loc, isActive: !loc.isActive } : loc
    ));
  };

  const handleAddLocation = () => {
    setShowAddForm(true);
    setEditForm({
      nama: '',
      alamat: '',
      latitude: '',
      longitude: '',
      radius: 100,
    });
  };

  const handleSaveNewLocation = () => {
    const newLocation = {
      id: locations.length + 1,
      ...editForm,
      latitude: parseFloat(editForm.latitude),
      longitude: parseFloat(editForm.longitude),
      isActive: true,
      totalKaryawan: 0,
    };
    setLocations([...locations, newLocation]);
    setShowAddForm(false);
    setEditForm({
      nama: '',
      alamat: '',
      latitude: '',
      longitude: '',
      radius: 100,
    });
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
            <h1 className="text-xl font-bold text-gray-900">Konfigurasi Radius Absen</h1>
            <p className="text-sm text-gray-600 mt-1">
              Kelola lokasi dan radius absensi untuk setiap cabang di Bandung
            </p>
          </div>
          <button
            onClick={handleAddLocation}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] transition-all"
          >
            <Plus size={16} />
            <span>Tambah Lokasi</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-5">
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
              <div className="flex items-center text-green-600">
                <span className="text-xs font-medium">{card.change}</span>
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {card.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Form Tambah Lokasi */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Nama Lokasi</label>
              <input
                type="text"
                value={editForm.nama}
                onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                placeholder="Contoh: Klinik Utama Bandung"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Alamat</label>
              <input
                type="text"
                value={editForm.alamat}
                onChange={(e) => setEditForm({ ...editForm, alamat: e.target.value })}
                placeholder="Jl. Asia Afrika No. 123"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Latitude</label>
              <input
                type="text"
                value={editForm.latitude}
                onChange={(e) => setEditForm({ ...editForm, latitude: e.target.value })}
                placeholder="-6.9217"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Longitude</label>
              <input
                type="text"
                value={editForm.longitude}
                onChange={(e) => setEditForm({ ...editForm, longitude: e.target.value })}
                placeholder="107.6069"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Radius (meter)</label>
              <input
                type="number"
                value={editForm.radius}
                onChange={(e) => setEditForm({ ...editForm, radius: parseInt(e.target.value) })}
                placeholder="100"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSaveNewLocation}
              className="px-4 py-2 bg-[#1C4D8D] text-white rounded-lg text-sm font-medium hover:bg-[#163a6f] transition-all"
            >
              Simpan Lokasi
            </button>
          </div>
        </div>
      )}

      {/* Location List with Leaflet Maps */}
      <div className="space-y-4">
        {locations.map(location => (
          <div key={location.id} className="bg-white rounded-xl overflow-hidden">
            {/* Header Location */}
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${
                    location.isActive ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <MapPin size={24} className={location.isActive ? 'text-blue-600' : 'text-gray-500'} />
                  </div>
                  
                  <div className="flex-1">
                    {editingId === location.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.nama}
                          onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:bg-white"
                          placeholder="Nama Lokasi"
                        />
                        <input
                          type="text"
                          value={editForm.alamat}
                          onChange={(e) => setEditForm({ ...editForm, alamat: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:bg-white"
                          placeholder="Alamat"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={editForm.latitude}
                            onChange={(e) => setEditForm({ ...editForm, latitude: e.target.value })}
                            className="px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:bg-white"
                            placeholder="Latitude"
                          />
                          <input
                            type="text"
                            value={editForm.longitude}
                            onChange={(e) => setEditForm({ ...editForm, longitude: e.target.value })}
                            className="px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:bg-white"
                            placeholder="Longitude"
                          />
                          <input
                            type="number"
                            value={editForm.radius}
                            onChange={(e) => setEditForm({ ...editForm, radius: parseInt(e.target.value) })}
                            className="px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:bg-white"
                            placeholder="Radius (m)"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-semibold text-gray-900">{location.nama}</h3>
                          <button
                            onClick={() => handleToggleActive(location.id)}
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              location.isActive 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {location.isActive ? 'Aktif' : 'Nonaktif'}
                          </button>
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

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  {editingId === location.id ? (
                    <button
                      onClick={() => handleSave(location.id)}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      title="Simpan"
                    >
                      <Save size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(location)}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(location.id)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Leaflet Map */}
            <div className="h-48 w-full border-t border-gray-100" style={{ position: 'relative', zIndex: 0 }}>
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
                  icon={locationIcon}
                >
                  <Popup>
                    <div className="text-sm">
                      <b>{location.nama}</b><br />
                      {location.alamat}<br />
                      Radius: {location.radius} meter
                    </div>
                  </Popup>
                </Marker>
                
                {/* Radius Circle */}
                <Circle
                  center={[location.latitude, location.longitude]}
                  radius={location.radius}
                  pathOptions={{
                    color: location.isActive ? "#1C4D8D" : "#9CA3AF",
                    fillColor: location.isActive ? "#1C4D8D" : "#9CA3AF",
                    fillOpacity: 0.1,
                    weight: 2,
                  }}
                />
              </MapContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}