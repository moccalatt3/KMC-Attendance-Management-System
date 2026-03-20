package services

import (
    "errors"
    "log"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/repository"
)

type ShiftService struct {
    repo *repository.ShiftRepository
}

func NewShiftService() *ShiftService {
    return &ShiftService{
        repo: repository.NewShiftRepository(),
    }
}

func (s *ShiftService) TambahShift(shift *models.Shift) error {
    exists, err := s.repo.CekKodeExists(shift.Code, 0)
    if err != nil {
        log.Printf("Error cek kode shift: %v", err)
        return err
    }
    if exists {
        return errors.New("kode shift sudah digunakan")
    }
    
    return s.repo.Tambah(shift)
}

func (s *ShiftService) AmbilSemuaShift() ([]models.Shift, error) {
    return s.repo.AmbilSemua()
}

func (s *ShiftService) AmbilShiftByID(id uint) (*models.Shift, error) {
    return s.repo.AmbilByID(id)
}

func (s *ShiftService) PerbaruiShift(id uint, data map[string]interface{}) error {
    if code, ok := data["code"].(string); ok && code != "" {
        exists, err := s.repo.CekKodeExists(code, id)
        if err != nil {
            return err
        }
        if exists {
            return errors.New("kode shift sudah digunakan oleh shift lain")
        }
    }
    
    return s.repo.Perbarui(id, data)
}

func (s *ShiftService) HapusShift(id uint) error {
    shift, err := s.repo.AmbilByID(id)
    if err != nil {
        return err
    }
    if shift == nil {
        return errors.New("shift tidak ditemukan")
    }
    
    return s.repo.Hapus(id)
}

func (s *ShiftService) ToggleStatusShift(id uint) error {
    shift, err := s.repo.AmbilByID(id)
    if err != nil {
        return err
    }
    if shift == nil {
        return errors.New("shift tidak ditemukan")
    }
    
    return s.repo.Perbarui(id, map[string]interface{}{
        "is_active": !shift.IsActive,
    })
}

func (s *ShiftService) ValidasiDataShift(shift *models.Shift) error {
    if shift.Code == "" {
        return errors.New("kode shift wajib diisi")
    }
    if shift.Name == "" {
        return errors.New("nama shift wajib diisi")
    }
    if shift.ShiftType == "" {
        return errors.New("tipe shift wajib diisi")
    }
    
    validTypes := map[string]bool{
        "pagi": true, "siang": true, "malam": true,
        "middle": true, "office": true, "wfh": true,
    }
    if !validTypes[shift.ShiftType] {
        return errors.New("tipe shift tidak valid")
    }
    
    return nil
}