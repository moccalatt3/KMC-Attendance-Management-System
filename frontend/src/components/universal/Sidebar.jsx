import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  FileText, 
  Shield,
  Database,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Calendar,
  Clock,
  LogOut,
  ChevronRight,
  UserCog,
  Heart,
  TrendingUp,
  UserPlus,
  Star,
  BookOpen,
  Download,
  Upload,
  Gift,
  Edit,
  Send,
  Map,
  Filter,
  CheckCircle,
  FormInput
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { menuItems } from '../../config/menuConfig';
import { filterMenuByPermission } from '../../utils/permissions';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredMenu = filterMenuByPermission(menuItems, user);

  const getIcon = (iconName) => {
    const icons = {
      Home: <Home size={18} />,
      Users: <Users size={18} />,
      BarChart3: <BarChart3 size={18} />,
      Settings: <Settings size={18} />,
      FileText: <FileText size={18} />,
      Shield: <Shield size={18} />,
      Database: <Database size={18} />,
      CreditCard: <CreditCard size={18} />,
      MessageSquare: <MessageSquare size={18} />,
      HelpCircle: <HelpCircle size={18} />,
      Calendar: <Calendar size={18} />,
      Clock: <Clock size={18} />,
      UserCog: <UserCog size={18} />,
      Heart: <Heart size={18} />,
      TrendingUp: <TrendingUp size={18} />,
      UserPlus: <UserPlus size={18} />,
      Star: <Star size={18} />,
      BookOpen: <BookOpen size={18} />,
      Download: <Download size={18} />,
      Upload: <Upload size={18} />,
      Gift: <Gift size={18} />,
      Edit: <Edit size={18} />,
      Send: <Send size={18} />,
      Map: <Map size={18} />,
      Filter: <Filter size={18} />,
      CheckCircle: <CheckCircle size={18} />,
      FormInput: <FormInput size={18} />
    };
    return icons[iconName] || <Home size={18} />;
  };

  // Fungsi untuk menentukan apakah link perlu prop "end"
  const shouldUseEndProp = (path) => {
    // Path yang memiliki sub-menu (parent path) perlu end={true}
    const parentPaths = [
      '/dashboard',
      '/karyawan',
      '/absensi',
      '/cuti',
      '/lembur',
      '/payroll',
      '/bpjs',
      '/laporan',
      '/master',
      '/settings'
    ];
    
    // Cek apakah path termasuk dalam parentPaths
    // Dan pastikan path-nya bukan child path (tidak memiliki segment tambahan)
    const pathSegments = path.split('/').filter(Boolean);
    return parentPaths.includes(path) && pathSegments.length === 1;
  };

  // Fungsi untuk custom isActive
  const checkIsActive = (itemPath) => {
    // Untuk parent path, hanya aktif jika exact match
    if (shouldUseEndProp(itemPath)) {
      return location.pathname === itemPath;
    }
    
    // Untuk child path, aktif jika path saat ini dimulai dengan itemPath
    // Tapi pastikan tidak salah mengaktifkan parent lain
    if (location.pathname.startsWith(itemPath)) {
      // Kasus khusus: misal di /karyawan/dokumen, jangan sampai mengaktifkan /karyawan/lain
      const remainingPath = location.pathname.replace(itemPath, '');
      return remainingPath === '' || remainingPath.startsWith('/');
    }
    
    return false;
  };

  return (
    <div className="w-64 bg-white h-screen flex flex-col fixed left-0 top-0 z-30">
      {/* Logo & Brand */}
      <div className="h-[60px] border-b border-gray-200 flex items-center px-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/images/logo/hris.png" 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Klinik HRIS</h1>
            <p className="text-xs text-gray-500">v1.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3">
        {filteredMenu.map((section, idx) => (
          <div key={idx} className="mb-8">
            {section.title && (
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 px-2">
                {section.title}
              </h3>
            )}
            <nav className="space-y-1">
              {section.items?.map((item) => {
                const isActive = checkIsActive(item.path);
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={shouldUseEndProp(item.path)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-[#1C4D8D] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={isActive ? 'text-white' : 'text-gray-500'}>
                        {getIcon(item.icon)}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        {item.description && (
                          <p className={`text-xs ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {isActive && (
                      <ChevronRight size={14} className="text-gray-200" />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
        >
          <LogOut size={16} className="text-gray-500 group-hover:text-red-600" />
          <span className="text-sm font-medium group-hover:text-red-600">Keluar</span>
        </button>
      </div>
    </div>
  );
}