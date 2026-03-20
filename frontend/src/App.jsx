import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./layouts/universal/Layout";

// Public pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard
import Dashboard from "./pages/universal/Dashboard";

// Manajemen Karyawan (3 files)
import Karyawan from "./pages/universal/Karyawan";
import KaryawanDokumen from "./pages/universal/KaryawanDokumen";
import KaryawanRiwayat from "./pages/universal/KaryawanRiwayat";

// Absensi (5 files)
import Absensi from "./pages/universal/Absensi";
import AbsensiRiwayat from "./pages/universal/AbsensiRiwayat";
import AbsensiRekap from "./pages/universal/AbsensiRekap";
import AbsensiManual from "./pages/universal/AbsensiManual";
import AbsensiRadius from "./pages/universal/AbsensiRadius";

// Cuti & Izin (4 files)
import Cuti from "./pages/universal/Cuti";
import CutiRiwayat from "./pages/universal/CutiRiwayat";
import CutiApproval from "./pages/universal/CutiApproval";
import CutiApprovalHR from "./pages/universal/CutiApprovalHR";

// Lembur (3 files)
import Lembur from "./pages/universal/Lembur";
import LemburRiwayat from "./pages/universal/LemburRiwayat";
import LemburApproval from "./pages/universal/LemburApproval";

// Payroll (4 files)
import PayrollSlip from "./pages/universal/PayrollSlip";
import PayrollSlipTim from "./pages/universal/PayrollSlipTim";
import PayrollGenerate from "./pages/universal/PayrollGenerate";
import PayrollExport from "./pages/universal/PayrollExport";

// BPJS (2 files)
import Bpjs from "./pages/universal/Bpjs";
import BpjsLaporan from "./pages/universal/BpjsLaporan";

// Laporan (4 files)
import LaporanAbsensi from "./pages/universal/LaporanAbsensi";
import LaporanKaryawan from "./pages/universal/LaporanKaryawan";
import LaporanPayroll from "./pages/universal/LaporanPayroll";
import LaporanExport from "./pages/universal/LaporanExport";

// Master Data (4 files)
import MasterShift from "./pages/universal/MasterShift";
import MasterDivisi from "./pages/universal/MasterDivisi";
import MasterJabatan from "./pages/universal/MasterJabatan";
import MasterLokasi from "./pages/universal/MasterLokasi";

// Pengaturan (3 files)
import SettingsRoles from "./pages/universal/SettingsRoles";
import SettingsProfile from "./pages/universal/SettingsProfile";
import SettingsHelp from "./pages/universal/SettingsHelp";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes - Wrap with Layout */}
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* Dashboard */}
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Manajemen Karyawan */}
            <Route path="karyawan" element={<Karyawan />} />
            <Route path="karyawan/dokumen" element={<KaryawanDokumen />} />
            <Route path="karyawan/riwayat" element={<KaryawanRiwayat />} />
            
            {/* Absensi */}
            <Route path="absensi" element={<Absensi />} />
            <Route path="absensi/riwayat" element={<AbsensiRiwayat />} />
            <Route path="absensi/rekap" element={<AbsensiRekap />} />
            <Route path="absensi/manual" element={<AbsensiManual />} />
            <Route path="absensi/radius" element={<AbsensiRadius />} />
            
            {/* Cuti & Izin */}
            <Route path="cuti/ajukan" element={<Cuti />} />
            <Route path="cuti/riwayat" element={<CutiRiwayat />} />
            <Route path="cuti/approval" element={<CutiApproval />} />
            <Route path="cuti/approval-hr" element={<CutiApprovalHR />} />
            
            {/* Lembur */}
            <Route path="lembur/ajukan" element={<Lembur />} />
            <Route path="lembur/riwayat" element={<LemburRiwayat />} />
            <Route path="lembur/approval" element={<LemburApproval />} />
            
            {/* Payroll */}
            <Route path="payroll/slip" element={<PayrollSlip />} />
            <Route path="payroll/slip-tim" element={<PayrollSlipTim />} />
            <Route path="payroll/generate" element={<PayrollGenerate />} />
            <Route path="payroll/export" element={<PayrollExport />} />
            
            {/* BPJS */}
            <Route path="bpjs" element={<Bpjs />} />
            <Route path="bpjs/laporan" element={<BpjsLaporan />} />
            
            {/* Laporan */}
            <Route path="laporan/absensi" element={<LaporanAbsensi />} />
            <Route path="laporan/karyawan" element={<LaporanKaryawan />} />
            <Route path="laporan/payroll" element={<LaporanPayroll />} />
            <Route path="laporan/export" element={<LaporanExport />} />
            
            {/* Master Data */}
            <Route path="master/shift" element={<MasterShift />} />
            <Route path="master/divisi" element={<MasterDivisi />} />
            <Route path="master/jabatan" element={<MasterJabatan />} />
            <Route path="master/lokasi" element={<MasterLokasi />} />
            
            {/* Pengaturan */}
            <Route path="settings/roles" element={<SettingsRoles />} />
            <Route path="settings/profile" element={<SettingsProfile />} />
            <Route path="settings/help" element={<SettingsHelp />} />
          </Route>
          
          {/* 404 - Redirect to dashboard or login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;