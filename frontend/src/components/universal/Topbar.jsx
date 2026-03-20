import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Bell, 
  ChevronDown, 
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  MessageSquare,
  Users,
  Calendar,
  AlertCircle,
  BookOpen,
  Search
} from 'lucide-react';

export default function Topbar() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      text: 'Ada 5 pengajuan cuti baru perlu approval',
      time: '10 menit yang lalu',
      read: false,
      type: 'task',
    },
    {
      id: 2,
      text: '3 karyawan belum check-in hari ini',
      time: '1 jam yang lalu',
      read: false,
      type: 'alert',
    },
    {
      id: 3,
      text: 'Payroll bulan Maret telah digenerate',
      time: '3 jam yang lalu',
      read: true,
      type: 'success',
    },
    {
      id: 4,
      text: 'Meeting HRD jam 14:00 WIB',
      time: '5 jam yang lalu',
      read: true,
      type: 'meeting',
    },
    {
      id: 5,
      text: 'Data BPJS perlu diupdate',
      time: '1 hari yang lalu',
      read: true,
      type: 'deadline',
    },
  ]);

  const handleLogout = () => {
    logout();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Mendapatkan inisial dari nama
  const getInitials = () => {
    if (user?.nama) return user.nama.charAt(0).toUpperCase();
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.username) return user.username.charAt(0).toUpperCase();
    return 'U';
  };

  // Mendapatkan nama lengkap
  const getFullName = () => {
    if (user?.nama) return user.nama;
    if (user?.name) return user.name;
    if (user?.username) return user.username;
    return 'User';
  };

  // Mendapatkan role/jabatan
  const getRole = () => {
    if (user?.jabatan) return user.jabatan;
    if (user?.role) return user.role;
    return 'User';
  };

  // Mendapatkan email
  const getEmail = () => {
    if (user?.email) return user.email;
    return 'user@example.com';
  };

  return (
    <header className="h-[60px] bg-white border-b border-gray-200 px-6 flex items-center justify-end fixed top-0 left-64 right-0 z-20">
      <div className="flex items-center space-x-4">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title={darkMode ? "Mode terang" : "Mode gelap"}
        >
          {darkMode ? (
            <Sun size={20} className="text-gray-600" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>

        {/* Messages */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <MessageSquare size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1C4D8D] text-white text-xs font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Notifications - Selaras dengan contoh */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
          >
            <Bell size={20} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-lg py-2 z-20 border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Notifikasi
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-1.5 rounded-full ${
                            notif.type === 'schedule'
                              ? 'bg-green-100'
                              : notif.type === 'task'
                                ? 'bg-yellow-100'
                                : notif.type === 'deadline'
                                  ? 'bg-red-100'
                                  : notif.type === 'meeting'
                                    ? 'bg-purple-100'
                                    : notif.type === 'success'
                                      ? 'bg-blue-100'
                                      : notif.type === 'alert'
                                        ? 'bg-orange-100'
                                        : 'bg-gray-100'
                          }`}
                        >
                          {notif.type === 'schedule' && (
                            <Calendar size={14} className="text-green-600" />
                          )}
                          {notif.type === 'task' && (
                            <BookOpen size={14} className="text-yellow-600" />
                          )}
                          {notif.type === 'deadline' && (
                            <AlertCircle size={14} className="text-red-600" />
                          )}
                          {notif.type === 'meeting' && (
                            <Users size={14} className="text-purple-600" />
                          )}
                          {notif.type === 'success' && (
                            <MessageSquare size={14} className="text-blue-600" />
                          )}
                          {notif.type === 'alert' && (
                            <AlertCircle size={14} className="text-orange-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notif.text}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <span className="w-2 h-2 bg-[#1C4D8D] rounded-full"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-100">
                  <button className="text-sm text-[#1C4D8D] hover:text-[#12315e] font-medium">
                    Lihat semua notifikasi
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile - Background Gray 100, Text Gray 700 (Selaras dengan contoh) */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 p-1 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors px-3 py-1.5"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-700 font-bold text-sm">
                {getInitials()}
              </span>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-gray-700">
                {getFullName()}
              </p>
              <p className="text-xs text-gray-500">
                {getRole()}
              </p>
            </div>
            <ChevronDown size={16} className="text-gray-500 hidden lg:block" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-sm py-2 z-20">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg">
                      {getInitials()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {getFullName()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getEmail()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <User size={16} className="text-gray-500" />
                    <span>Profil Saya</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                    <Settings size={16} className="text-gray-500" />
                    <span>Pengaturan Akun</span>
                  </button>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  >
                    {darkMode ? (
                      <Sun size={16} className="text-gray-500" />
                    ) : (
                      <Moon size={16} className="text-gray-500" />
                    )}
                    <span>{darkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut size={16} />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}