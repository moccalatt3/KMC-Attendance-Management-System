export const menuItems = [
  {
    title: 'MAIN MENU',
    items: [
      {
        icon: 'Home',
        label: 'Dashboard',
        path: '/dashboard',
        description: 'Overview & analytics',
        permission: 'dashboard.view.own'
      }
    ]
  },
  {
    title: 'MANAJEMEN KARYAWAN',
    items: [
      {
        icon: 'Users',
        label: 'Data Karyawan',
        path: '/karyawan',
        description: 'Lihat data karyawan',
        permission: 'employees.view.team'
      },
      {
        icon: 'FileText',
        label: 'Dokumen Karyawan',
        path: '/karyawan/dokumen',
        description: 'Lihat dokumen karyawan',
        permission: 'employees.documents.view.team'
      },
      {
        icon: 'UserCog',
        label: 'Riwayat Jabatan',
        path: '/karyawan/riwayat',
        description: 'Riwayat promosi & mutasi',
        permission: 'employees.promotion.view.team'
      }
    ]
  },
  {
    title: 'ABSENSI & KEHADIRAN',
    items: [
      {
        icon: 'Clock',
        label: 'Check In/Out',
        path: '/absensi',
        description: 'Absensi harian',
        permission: 'attendance.view.own'
      },
      {
        icon: 'Calendar',
        label: 'Riwayat Absensi',
        path: '/absensi/riwayat',
        description: 'Lihat riwayat kehadiran',
        permission: 'attendance.view.own'
      },
      {
        icon: 'BarChart3',
        label: 'Rekap Absensi',
        path: '/absensi/rekap',
        description: 'Rekap kehadiran tim',
        permission: 'attendance.rekap.view.team'
      },
      {
        icon: 'Settings',
        label: 'Manual Absen',
        path: '/absensi/manual',
        description: 'Input absensi manual',
        permission: 'attendance.manual.input.all'
      },
      {
        icon: 'Map',
        label: 'Radius Absen',
        path: '/absensi/radius',
        description: 'Konfigurasi titik GPS',
        permission: 'attendance.radius.configure.all'
      }
    ]
  },
  {
    title: 'CUTI & IZIN',
    items: [
      {
        icon: 'Calendar',
        label: 'Ajukan Cuti/Izin',
        path: '/cuti/ajukan',
        description: 'Pengajuan cuti baru',
        permission: 'leave.view.own'
      },
      {
        icon: 'FileText',
        label: 'Riwayat Cuti',
        path: '/cuti/riwayat',
        description: 'Lihat riwayat cuti',
        permission: 'leave.view.own'
      },
      {
        icon: 'CheckCircle',
        label: 'Approval (Atasan)',
        path: '/cuti/approval',
        description: 'Approve level 1',
        permission: 'leave.approve.level1'
      },
      {
        icon: 'Shield',
        label: 'Approval (HRD)',
        path: '/cuti/approval-hr',
        description: 'Approve level 2',
        permission: 'leave.approve.level2'
      }
    ]
  },
  {
    title: 'LEMBUR',
    items: [
      {
        icon: 'Clock',
        label: 'Ajukan Lembur',
        path: '/lembur/ajukan',
        description: 'Pengajuan lembur',
        permission: 'overtime.view.own'
      },
      {
        icon: 'FileText',
        label: 'Riwayat Lembur',
        path: '/lembur/riwayat',
        description: 'Lihat riwayat lembur',
        permission: 'overtime.view.own'
      },
      {
        icon: 'CheckCircle',
        label: 'Approval Lembur',
        path: '/lembur/approval',
        description: 'Approve lembur',
        permission: 'overtime.approve.level1'
      }
    ]
  },
  {
    title: 'PAYROLL',
    items: [
      {
        icon: 'CreditCard',
        label: 'Slip Gaji',
        path: '/payroll/slip',
        description: 'Lihat slip gaji',
        permission: 'payroll.view.own'
      },
      {
        icon: 'Users',
        label: 'Slip Gaji Tim',
        path: '/payroll/slip-tim',
        description: 'Lihat slip gaji tim',
        permission: 'payroll.view.department'
      },
      {
        icon: 'Settings',
        label: 'Generate Payroll',
        path: '/payroll/generate',
        description: 'Proses penggajian',
        permission: 'payroll.generate.all'
      },
      {
        icon: 'Download',
        label: 'Export Payroll',
        path: '/payroll/export',
        description: 'Export laporan',
        permission: 'payroll.export.all'
      }
    ]
  },
  {
    title: 'BPJS',
    items: [
      {
        icon: 'Heart',
        label: 'BPJS Karyawan',
        path: '/bpjs',
        description: 'Data kepesertaan BPJS',
        permission: 'bpjs.view.all'
      },
      {
        icon: 'FileText',
        label: 'Laporan BPJS',
        path: '/bpjs/laporan',
        description: 'Generate laporan BPJS',
        permission: 'bpjs.report.all'
      }
    ]
  },
  {
    title: 'LAPORAN',
    items: [
      {
        icon: 'BarChart3',
        label: 'Laporan Absensi',
        path: '/laporan/absensi',
        description: 'Statistik masuk & lembur',
        permission: 'reports.attendance.view.all'
      },
      {
        icon: 'Users',
        label: 'Laporan Karyawan',
        path: '/laporan/karyawan',
        description: 'Data & turnover karyawan',
        permission: 'reports.employees.view.all'
      },
      {
        icon: 'CreditCard',
        label: 'Laporan Payroll',
        path: '/laporan/payroll',
        description: 'Rekap penggajian',
        permission: 'reports.payroll.view.all'
      },
      {
        icon: 'Download',
        label: 'Export Laporan',
        path: '/laporan/export',
        description: 'Download laporan',
        permission: 'reports.export.all'
      }
    ]
  },
  {
    title: 'MASTER DATA',
    items: [
      {
        icon: 'Database',
        label: 'Master Shift',
        path: '/master/shift',
        description: 'Kelola kode shift',
        permission: 'master.access.all'
      },
      {
        icon: 'Users',
        label: 'Master Divisi',
        path: '/master/divisi',
        description: 'Kelola departemen',
        permission: 'master.access.all'
      },
      {
        icon: 'UserCog',
        label: 'Master Jabatan',
        path: '/master/jabatan',
        description: 'Kelola posisi',
        permission: 'master.access.all'
      },
      {
        icon: 'Map',
        label: 'Lokasi Absen',
        path: '/master/lokasi',
        description: 'Konfigurasi radius',
        permission: 'master.access.all'
      }
    ]
  },
  {
    title: 'PENGATURAN',
    items: [
      {
        icon: 'UserCog',
        label: 'Role & Hak Akses',
        path: '/settings/roles',
        description: 'Atur permission',
        permission: 'settings.roles.manage.all'
      },
      {
        icon: 'Settings',
        label: 'Profil',
        path: '/settings/profile',
        description: 'Profil pribadi',
        permission: 'settings.profile.view.own'
      },
      {
        icon: 'HelpCircle',
        label: 'Bantuan',
        path: '/settings/help',
        description: 'Panduan penggunaan',
        permission: 'settings.help.view.all'
      }
    ]
  }
];