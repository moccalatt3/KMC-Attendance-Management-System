package services

import (
    "errors"
    "log"
    "github.com/google/uuid"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/repository"
)

type PositionService struct {
    repo *repository.PositionRepository
}

func NewPositionService() *PositionService {
    return &PositionService{
        repo: repository.NewPositionRepository(),
    }
}

func (s *PositionService) TambahPosition(position *models.Position) error {
    exists, err := s.repo.CekKodeExists(position.Code, uuid.Nil)
    if err != nil {
        log.Printf("Error cek kode position: %v", err)
        return err
    }
    if exists {
        return errors.New("kode position sudah digunakan")
    }
    
    if position.Level < 1 || position.Level > 10 {
        return errors.New("level harus antara 1 dan 10")
    }
    
    return s.repo.Tambah(position)
}

func (s *PositionService) AmbilSemuaPosition() ([]models.Position, error) {
    return s.repo.AmbilSemua()
}

func (s *PositionService) AmbilSemuaAktif() ([]models.Position, error) {
    return s.repo.AmbilSemuaAktif()
}

func (s *PositionService) AmbilPositionByID(id uuid.UUID) (*models.Position, error) {
    return s.repo.AmbilByID(id)
}

func (s *PositionService) AmbilPositionByCode(code string) (*models.Position, error) {
    return s.repo.AmbilByCode(code)
}

func (s *PositionService) AmbilPositionByDepartment(departmentID uuid.UUID) ([]models.Position, error) {
    return s.repo.AmbilByDepartment(departmentID)
}

func (s *PositionService) AmbilPositionByLevel(level int) ([]models.Position, error) {
    return s.repo.AmbilByLevel(level)
}

func (s *PositionService) PerbaruiPosition(id uuid.UUID, data map[string]interface{}) error {
    if code, ok := data["code"].(string); ok && code != "" {
        exists, err := s.repo.CekKodeExists(code, id)
        if err != nil {
            return err
        }
        if exists {
            return errors.New("kode position sudah digunakan oleh position lain")
        }
    }
    
    if level, ok := data["level"].(float64); ok {
        if level < 1 || level > 10 {
            return errors.New("level harus antara 1 dan 10")
        }
    }
    
    return s.repo.Perbarui(id, data)
}

func (s *PositionService) HapusPosition(id uuid.UUID) error {
    position, err := s.repo.AmbilByID(id)
    if err != nil {
        return err
    }
    if position == nil {
        return errors.New("position tidak ditemukan")
    }
    
    return s.repo.Hapus(id)
}

func (s *PositionService) ToggleStatusPosition(id uuid.UUID) error {
    position, err := s.repo.AmbilByID(id)
    if err != nil {
        return err
    }
    if position == nil {
        return errors.New("position tidak ditemukan")
    }
    
    return s.repo.Perbarui(id, map[string]interface{}{
        "is_active": !position.IsActive,
    })
}

func (s *PositionService) AmbilStatistik() (map[string]interface{}, error) {
    return s.repo.HitungStatistik()
}

func (s *PositionService) ValidasiDataPosition(position *models.Position) error {
    if position.Code == "" {
        return errors.New("kode position wajib diisi")
    }
    if position.Name == "" {
        return errors.New("nama position wajib diisi")
    }
    if position.Level < 1 || position.Level > 10 {
        return errors.New("level harus antara 1 dan 10")
    }
    return nil
}