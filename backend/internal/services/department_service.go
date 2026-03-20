package services

import (
    "errors"
    "log"
    "github.com/google/uuid"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/repository"
)

type DepartmentService struct {
    repo *repository.DepartmentRepository
}

func NewDepartmentService() *DepartmentService {
    return &DepartmentService{
        repo: repository.NewDepartmentRepository(),
    }
}

func (s *DepartmentService) TambahDepartment(department *models.Department) error {
    exists, err := s.repo.CekKodeExists(department.Code, uuid.Nil)
    if err != nil {
        log.Printf("Error cek kode department: %v", err)
        return err
    }
    if exists {
        return errors.New("kode department sudah digunakan")
    }
    
    if department.ParentID != nil {
        parent, err := s.repo.AmbilByID(*department.ParentID)
        if err != nil {
            return err
        }
        if parent == nil {
            return errors.New("parent department tidak ditemukan")
        }
    }
    
    return s.repo.Tambah(department)
}

func (s *DepartmentService) AmbilSemuaDepartment() ([]models.Department, error) {
    return s.repo.AmbilSemua()
}

func (s *DepartmentService) AmbilSemuaAktif() ([]models.Department, error) {
    return s.repo.AmbilSemuaAktif()
}

func (s *DepartmentService) AmbilDepartmentByID(id uuid.UUID) (*models.Department, error) {
    return s.repo.AmbilByID(id)
}

func (s *DepartmentService) AmbilDepartmentByCode(code string) (*models.Department, error) {
    return s.repo.AmbilByCode(code)
}

func (s *DepartmentService) AmbilRootDepartments() ([]models.Department, error) {
    return s.repo.AmbilRootDepartments()
}

func (s *DepartmentService) AmbilChildDepartments(parentID uuid.UUID) ([]models.Department, error) {
    return s.repo.AmbilChildDepartments(parentID)
}

func (s *DepartmentService) PerbaruiDepartment(id uuid.UUID, data map[string]interface{}) error {
    if code, ok := data["code"].(string); ok && code != "" {
        exists, err := s.repo.CekKodeExists(code, id)
        if err != nil {
            return err
        }
        if exists {
            return errors.New("kode department sudah digunakan oleh department lain")
        }
    }
    
    if parentID, ok := data["parent_id"]; ok && parentID != nil {
        parentUUID, err := uuid.Parse(parentID.(string))
        if err == nil && parentUUID != uuid.Nil {
            if parentUUID == id {
                return errors.New("department tidak bisa menjadi parent dari dirinya sendiri")
            }
            
            parent, err := s.repo.AmbilByID(parentUUID)
            if err != nil {
                return err
            }
            if parent == nil {
                return errors.New("parent department tidak ditemukan")
            }
        }
    }
    
    return s.repo.Perbarui(id, data)
}

func (s *DepartmentService) HapusDepartment(id uuid.UUID) error {
    department, err := s.repo.AmbilByID(id)
    if err != nil {
        return err
    }
    if department == nil {
        return errors.New("department tidak ditemukan")
    }
    
    hasChildren, err := s.repo.CekMemilikiAnak(id)
    if err != nil {
        return err
    }
    if hasChildren {
        return errors.New("tidak dapat menghapus department yang masih memiliki sub-department")
    }
    
    return s.repo.Hapus(id)
}

func (s *DepartmentService) ToggleStatusDepartment(id uuid.UUID) error {
    department, err := s.repo.AmbilByID(id)
    if err != nil {
        return err
    }
    if department == nil {
        return errors.New("department tidak ditemukan")
    }
    
    return s.repo.Perbarui(id, map[string]interface{}{
        "is_active": !department.IsActive,
    })
}

func (s *DepartmentService) AmbilStatistik() (map[string]interface{}, error) {
    return s.repo.HitungStatistik()
}

func (s *DepartmentService) ValidasiDataDepartment(department *models.Department) error {
    if department.Code == "" {
        return errors.New("kode department wajib diisi")
    }
    if department.Name == "" {
        return errors.New("nama department wajib diisi")
    }
    return nil
}