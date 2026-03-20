package repository

import (
    "errors"
    "github.com/google/uuid"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/pkg/database"
    "gorm.io/gorm"
)

type DepartmentRepository struct {
    db *gorm.DB
}

func NewDepartmentRepository() *DepartmentRepository {
    return &DepartmentRepository{
        db: database.GetDB(),
    }
}

func (r *DepartmentRepository) Tambah(department *models.Department) error {
    return r.db.Create(department).Error
}

func (r *DepartmentRepository) AmbilSemua() ([]models.Department, error) {
    var departments []models.Department
    err := r.db.Where("deleted_at IS NULL").
        Preload("Parent").
        Order("code").
        Find(&departments).Error
    return departments, err
}

func (r *DepartmentRepository) AmbilSemuaAktif() ([]models.Department, error) {
    var departments []models.Department
    err := r.db.Where("deleted_at IS NULL AND is_active = ?", true).
        Preload("Parent").
        Order("code").
        Find(&departments).Error
    return departments, err
}

func (r *DepartmentRepository) AmbilByID(id uuid.UUID) (*models.Department, error) {
    var department models.Department
    err := r.db.Where("deleted_at IS NULL").
        Preload("Parent").
        Preload("Head").
        First(&department, "id = ?", id).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &department, nil
}

func (r *DepartmentRepository) AmbilByCode(code string) (*models.Department, error) {
    var department models.Department
    err := r.db.Where("code = ? AND deleted_at IS NULL", code).
        First(&department).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &department, nil
}

func (r *DepartmentRepository) AmbilRootDepartments() ([]models.Department, error) {
    var departments []models.Department
    err := r.db.Where("parent_id IS NULL AND deleted_at IS NULL").
        Order("code").
        Find(&departments).Error
    return departments, err
}

func (r *DepartmentRepository) AmbilChildDepartments(parentID uuid.UUID) ([]models.Department, error) {
    var departments []models.Department
    err := r.db.Where("parent_id = ? AND deleted_at IS NULL", parentID).
        Order("code").
        Find(&departments).Error
    return departments, err
}

func (r *DepartmentRepository) Perbarui(id uuid.UUID, data map[string]interface{}) error {
    return r.db.Model(&models.Department{}).Where("id = ?", id).Updates(data).Error
}

func (r *DepartmentRepository) Hapus(id uuid.UUID) error {
    return r.db.Where("id = ?", id).Delete(&models.Department{}).Error
}

func (r *DepartmentRepository) HapusPermanen(id uuid.UUID) error {
    return r.db.Unscoped().Delete(&models.Department{}, id).Error
}

func (r *DepartmentRepository) CekKodeExists(code string, excludeID uuid.UUID) (bool, error) {
    var count int64
    query := r.db.Model(&models.Department{}).Where("code = ? AND deleted_at IS NULL", code)
    if excludeID != uuid.Nil {
        query = query.Where("id != ?", excludeID)
    }
    err := query.Count(&count).Error
    return count > 0, err
}

func (r *DepartmentRepository) CekMemilikiAnak(id uuid.UUID) (bool, error) {
    var count int64
    err := r.db.Model(&models.Department{}).
        Where("parent_id = ? AND deleted_at IS NULL", id).
        Count(&count).Error
    return count > 0, err
}

func (r *DepartmentRepository) HitungStatistik() (map[string]interface{}, error) {
    var total int64
    var aktif int64
    var root int64
    
    r.db.Model(&models.Department{}).Where("deleted_at IS NULL").Count(&total)
    r.db.Model(&models.Department{}).Where("is_active = ? AND deleted_at IS NULL", true).Count(&aktif)
    r.db.Model(&models.Department{}).Where("parent_id IS NULL AND deleted_at IS NULL").Count(&root)
    
    stats := map[string]interface{}{
        "total":   total,
        "aktif":   aktif,
        "nonaktif": total - aktif,
        "root":    root,
        "sub":     total - root,
    }
    
    return stats, nil
}