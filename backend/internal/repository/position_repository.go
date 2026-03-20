package repository

import (
    "errors"
    "github.com/google/uuid"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/pkg/database"
    "gorm.io/gorm"
)

type PositionRepository struct {
    db *gorm.DB
}

func NewPositionRepository() *PositionRepository {
    return &PositionRepository{
        db: database.GetDB(),
    }
}

func (r *PositionRepository) Tambah(position *models.Position) error {
    return r.db.Create(position).Error
}

func (r *PositionRepository) AmbilSemua() ([]models.Position, error) {
    var positions []models.Position
    err := r.db.Where("deleted_at IS NULL").
        Preload("Department").
        Order("level, code").
        Find(&positions).Error
    return positions, err
}

func (r *PositionRepository) AmbilSemuaAktif() ([]models.Position, error) {
    var positions []models.Position
    err := r.db.Where("deleted_at IS NULL AND is_active = ?", true).
        Preload("Department").
        Order("level, code").
        Find(&positions).Error
    return positions, err
}

func (r *PositionRepository) AmbilByID(id uuid.UUID) (*models.Position, error) {
    var position models.Position
    err := r.db.Where("deleted_at IS NULL").
        Preload("Department").
        First(&position, "id = ?", id).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &position, nil
}

func (r *PositionRepository) AmbilByCode(code string) (*models.Position, error) {
    var position models.Position
    err := r.db.Where("code = ? AND deleted_at IS NULL", code).
        First(&position).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &position, nil
}

func (r *PositionRepository) AmbilByDepartment(departmentID uuid.UUID) ([]models.Position, error) {
    var positions []models.Position
    err := r.db.Where("department_id = ? AND deleted_at IS NULL", departmentID).
        Order("level, code").
        Find(&positions).Error
    return positions, err
}

func (r *PositionRepository) AmbilByLevel(level int) ([]models.Position, error) {
    var positions []models.Position
    err := r.db.Where("level = ? AND deleted_at IS NULL", level).
        Order("code").
        Find(&positions).Error
    return positions, err
}

func (r *PositionRepository) Perbarui(id uuid.UUID, data map[string]interface{}) error {
    return r.db.Model(&models.Position{}).Where("id = ?", id).Updates(data).Error
}

func (r *PositionRepository) Hapus(id uuid.UUID) error {
    return r.db.Where("id = ?", id).Delete(&models.Position{}).Error
}

func (r *PositionRepository) HapusPermanen(id uuid.UUID) error {
    return r.db.Unscoped().Delete(&models.Position{}, id).Error
}

func (r *PositionRepository) CekKodeExists(code string, excludeID uuid.UUID) (bool, error) {
    var count int64
    query := r.db.Model(&models.Position{}).Where("code = ? AND deleted_at IS NULL", code)
    if excludeID != uuid.Nil {
        query = query.Where("id != ?", excludeID)
    }
    err := query.Count(&count).Error
    return count > 0, err
}

func (r *PositionRepository) HitungStatistik() (map[string]interface{}, error) {
    var total int64
    var aktif int64
    var medical int64
    
    r.db.Model(&models.Position{}).Where("deleted_at IS NULL").Count(&total)
    r.db.Model(&models.Position{}).Where("is_active = ? AND deleted_at IS NULL", true).Count(&aktif)
    r.db.Model(&models.Position{}).Where("is_medical = ? AND deleted_at IS NULL", true).Count(&medical)
    
    levelCounts := make(map[int]int64)
    for level := 1; level <= 10; level++ {
        var count int64
        r.db.Model(&models.Position{}).Where("level = ? AND deleted_at IS NULL", level).Count(&count)
        if count > 0 {
            levelCounts[level] = count
        }
    }
    
    stats := map[string]interface{}{
        "total":    total,
        "aktif":    aktif,
        "nonaktif": total - aktif,
        "medical":  medical,
        "nonmedical": total - medical,
        "levels":   levelCounts,
    }
    
    return stats, nil
}