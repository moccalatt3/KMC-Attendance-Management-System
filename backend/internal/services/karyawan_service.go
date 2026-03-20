package services

import (
    "errors"
    "log"
    "github.com/google/uuid"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/repository"
)

type KaryawanService struct {
    karyawanRepo *repository.KaryawanRepository
    userRepo     *repository.UserRepository
    roleRepo     *repository.RoleRepository
    deptRepo     *repository.DepartmentRepository
    posRepo      *repository.PositionRepository
}

func NewKaryawanService() *KaryawanService {
    return &KaryawanService{
        karyawanRepo: repository.NewKaryawanRepository(),
        userRepo:     repository.NewUserRepository(),
        roleRepo:     repository.NewRoleRepository(),
        deptRepo:     repository.NewDepartmentRepository(),
        posRepo:      repository.NewPositionRepository(),
    }
}

func (s *KaryawanService) TambahKaryawanDenganAkun(karyawan models.Karyawan, buatAkun bool, password string, roleIDs []uint, createdBy uuid.UUID) error {
    exists, err := s.karyawanRepo.CekNIPExists(karyawan.EmployeeID, uuid.Nil)
    if err != nil {
        log.Printf("Error cek NIP: %v", err)
        return err
    }
    if exists {
        return errors.New("NIP sudah digunakan")
    }
    
    exists, err = s.karyawanRepo.CekEmailExists(karyawan.Email, uuid.Nil)
    if err != nil {
        log.Printf("Error cek email: %v", err)
        return err
    }
    if exists {
        return errors.New("email sudah digunakan")
    }
    
    if karyawan.Nik != "" {
        exists, err = s.karyawanRepo.CekNikExists(karyawan.Nik, uuid.Nil)
        if err != nil {
            return err
        }
        if exists {
            return errors.New("NIK sudah digunakan")
        }
    }
    
    if karyawan.DepartmentID != nil {
        dept, err := s.deptRepo.AmbilByID(*karyawan.DepartmentID)
        if err != nil {
            return err
        }
        if dept == nil {
            return errors.New("departemen tidak ditemukan")
        }
    }
    
    if karyawan.PositionID != nil {
        pos, err := s.posRepo.AmbilByID(*karyawan.PositionID)
        if err != nil {
            return err
        }
        if pos == nil {
            return errors.New("jabatan tidak ditemukan")
        }
    }
    
    if buatAkun {
        emailExists, err := s.userRepo.EmailExists(karyawan.Email)
        if err != nil {
            return err
        }
        if emailExists {
            return errors.New("email sudah digunakan untuk akun lain")
        }
        
        if password == "" {
            return errors.New("password wajib diisi jika membuat akun")
        }
        
        if len(roleIDs) == 0 {
            return errors.New("minimal satu role harus dipilih")
        }
        
        for _, roleID := range roleIDs {
            role, err := s.roleRepo.FindByID(roleID)
            if err != nil {
                return err
            }
            if role == nil {
                return errors.New("role tidak valid")
            }
        }
    }
    
    karyawan.CreatedBy = &createdBy
    karyawan.IsActive = true
    
    if err := s.karyawanRepo.Tambah(&karyawan); err != nil {
        return err
    }
    
    if buatAkun {
        user := &models.User{
            Name:         karyawan.FullName,
            Email:        karyawan.Email,
            Password:     password,
            EmployeeID:   karyawan.EmployeeID,
            PositionID:   karyawan.PositionID,
            DepartmentID: karyawan.DepartmentID,
            IsActive:     true,
        }
        
        if err := s.userRepo.Create(user); err != nil {
            return err
        }
        
        for _, roleID := range roleIDs {
            if err := s.userRepo.AssignRole(user.ID, roleID, createdBy); err != nil {
                return err
            }
        }
        
        if err := s.karyawanRepo.UpdateUserID(karyawan.ID, user.ID); err != nil {
            return err
        }
    }
    
    return nil
}

func (s *KaryawanService) TambahKaryawan(karyawan *models.Karyawan) error {
    exists, err := s.karyawanRepo.CekNIPExists(karyawan.EmployeeID, uuid.Nil)
    if err != nil {
        log.Printf("Error cek NIP: %v", err)
        return err
    }
    if exists {
        return errors.New("NIP sudah digunakan")
    }
    
    exists, err = s.karyawanRepo.CekEmailExists(karyawan.Email, uuid.Nil)
    if err != nil {
        log.Printf("Error cek email: %v", err)
        return err
    }
    if exists {
        return errors.New("email sudah digunakan")
    }
    
    if karyawan.Nik != "" {
        exists, err = s.karyawanRepo.CekNikExists(karyawan.Nik, uuid.Nil)
        if err != nil {
            log.Printf("Error cek NIK: %v", err)
            return err
        }
        if exists {
            return errors.New("NIK sudah digunakan")
        }
    }
    
    if karyawan.DepartmentID != nil {
        dept, err := s.deptRepo.AmbilByID(*karyawan.DepartmentID)
        if err != nil {
            return err
        }
        if dept == nil {
            return errors.New("departemen tidak ditemukan")
        }
    }
    
    if karyawan.PositionID != nil {
        pos, err := s.posRepo.AmbilByID(*karyawan.PositionID)
        if err != nil {
            return err
        }
        if pos == nil {
            return errors.New("jabatan tidak ditemukan")
        }
    }
    
    return s.karyawanRepo.Tambah(karyawan)
}

func (s *KaryawanService) AmbilSemuaKaryawan() ([]models.Karyawan, error) {
    return s.karyawanRepo.AmbilSemua()
}

func (s *KaryawanService) AmbilKaryawanByID(id uuid.UUID) (*models.Karyawan, error) {
    return s.karyawanRepo.AmbilByID(id)
}

func (s *KaryawanService) PerbaruiKaryawan(id uuid.UUID, data map[string]interface{}) error {
    if nip, ok := data["employee_id"].(string); ok && nip != "" {
        exists, err := s.karyawanRepo.CekNIPExists(nip, id)
        if err != nil {
            return err
        }
        if exists {
            return errors.New("NIP sudah digunakan oleh karyawan lain")
        }
    }
    
    if email, ok := data["email"].(string); ok && email != "" {
        exists, err := s.karyawanRepo.CekEmailExists(email, id)
        if err != nil {
            return err
        }
        if exists {
            return errors.New("email sudah digunakan oleh karyawan lain")
        }
    }
    
    if nik, ok := data["nik"].(string); ok && nik != "" {
        exists, err := s.karyawanRepo.CekNikExists(nik, id)
        if err != nil {
            return err
        }
        if exists {
            return errors.New("NIK sudah digunakan oleh karyawan lain")
        }
    }
    
    return s.karyawanRepo.Perbarui(id, data)
}

func (s *KaryawanService) HapusKaryawan(id uuid.UUID) error {
    karyawan, err := s.karyawanRepo.AmbilByID(id)
    if err != nil {
        return err
    }
    if karyawan == nil {
        return errors.New("karyawan tidak ditemukan")
    }
    
    return s.karyawanRepo.Hapus(id)
}

func (s *KaryawanService) AmbilStatistik() (map[string]interface{}, error) {
    return s.karyawanRepo.HitungStatistik()
}

func (s *KaryawanService) ValidasiDataKaryawan(karyawan *models.Karyawan) error {
    if karyawan.EmployeeID == "" {
        return errors.New("NIP wajib diisi")
    }
    if karyawan.FullName == "" {
        return errors.New("nama lengkap wajib diisi")
    }
    if karyawan.Email == "" {
        return errors.New("email wajib diisi")
    }
    if karyawan.Gender != "" && karyawan.Gender != "L" && karyawan.Gender != "P" {
        return errors.New("gender harus L atau P")
    }
    return nil
}