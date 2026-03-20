package repository

import (
    "errors"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/pkg/database"
    "gorm.io/gorm"
)

type ShiftRepository struct {
    db *gorm.DB
}

func NewShiftRepository() *ShiftRepository {
    return &ShiftRepository{
        db: database.GetDB(),
    }
}

func (r *ShiftRepository) Tambah(shift *models.Shift) error {
    return r.db.Create(shift).Error
}

func (r *ShiftRepository) AmbilSemua() ([]models.Shift, error) {
    var shifts []models.Shift
    err := r.db.Where("deleted_at IS NULL").Order("code").Find(&shifts).Error
    return shifts, err
}

func (r *ShiftRepository) AmbilByID(id uint) (*models.Shift, error) {
    var shift models.Shift
    err := r.db.Where("deleted_at IS NULL").First(&shift, id).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &shift, nil
}

func (r *ShiftRepository) AmbilByCode(code string) (*models.Shift, error) {
    var shift models.Shift
    err := r.db.Where("code = ? AND deleted_at IS NULL", code).First(&shift).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &shift, nil
}

func (r *ShiftRepository) Perbarui(id uint, data map[string]interface{}) error {
    return r.db.Model(&models.Shift{}).Where("id = ?", id).Updates(data).Error
}

func (r *ShiftRepository) Hapus(id uint) error {
    return r.db.Where("id = ?", id).Delete(&models.Shift{}).Error
}

func (r *ShiftRepository) HapusPermanen(id uint) error {
    return r.db.Unscoped().Delete(&models.Shift{}, id).Error
}

func (r *ShiftRepository) CekKodeExists(code string, excludeID uint) (bool, error) {
    var count int64
    query := r.db.Model(&models.Shift{}).Where("code = ? AND deleted_at IS NULL", code)
    if excludeID > 0 {
        query = query.Where("id != ?", excludeID)
    }
    err := query.Count(&count).Error
    return count > 0, err
}