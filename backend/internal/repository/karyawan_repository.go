package repository

import (
    "errors"
    "github.com/google/uuid"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/pkg/database"
    "gorm.io/gorm"
)

type KaryawanRepository struct {
    db *gorm.DB
}

func NewKaryawanRepository() *KaryawanRepository {
    return &KaryawanRepository{
        db: database.GetDB(),
    }
}

func (r *KaryawanRepository) Tambah(karyawan *models.Karyawan) error {
    return r.db.Create(karyawan).Error
}

func (r *KaryawanRepository) AmbilSemua() ([]models.Karyawan, error) {
    var karyawan []models.Karyawan
    err := r.db.Where("deleted_at IS NULL").
        Preload("Position").
        Preload("Department").
        Preload("User").
        Find(&karyawan).Error
    return karyawan, err
}

func (r *KaryawanRepository) AmbilByID(id uuid.UUID) (*models.Karyawan, error) {
    var karyawan models.Karyawan
    err := r.db.Where("deleted_at IS NULL").
        Preload("Position").
        Preload("Department").
        Preload("User").
        First(&karyawan, "id = ?", id).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &karyawan, nil
}

func (r *KaryawanRepository) AmbilByNIP(nip string) (*models.Karyawan, error) {
    var karyawan models.Karyawan
    err := r.db.Where("employee_id = ? AND deleted_at IS NULL", nip).
        First(&karyawan).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &karyawan, nil
}

func (r *KaryawanRepository) AmbilByEmail(email string) (*models.Karyawan, error) {
    var karyawan models.Karyawan
    err := r.db.Where("email = ? AND deleted_at IS NULL", email).
        First(&karyawan).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &karyawan, nil
}

func (r *KaryawanRepository) AmbilByDepartment(departmentID uuid.UUID) ([]models.Karyawan, error) {
    var karyawan []models.Karyawan
    err := r.db.Where("department_id = ? AND deleted_at IS NULL", departmentID).
        Find(&karyawan).Error
    return karyawan, err
}

func (r *KaryawanRepository) AmbilByPosition(positionID uuid.UUID) ([]models.Karyawan, error) {
    var karyawan []models.Karyawan
    err := r.db.Where("position_id = ? AND deleted_at IS NULL", positionID).
        Find(&karyawan).Error
    return karyawan, err
}

func (r *KaryawanRepository) Perbarui(id uuid.UUID, data map[string]interface{}) error {
    return r.db.Model(&models.Karyawan{}).Where("id = ?", id).Updates(data).Error
}

func (r *KaryawanRepository) Hapus(id uuid.UUID) error {
    return r.db.Model(&models.Karyawan{}).Where("id = ?", id).Update("is_active", false).Error
}

func (r *KaryawanRepository) HapusPermanen(id uuid.UUID) error {
    return r.db.Where("id = ?", id).Delete(&models.Karyawan{}).Error
}

func (r *KaryawanRepository) CekNIPExists(nip string, excludeID uuid.UUID) (bool, error) {
    var count int64
    query := r.db.Model(&models.Karyawan{}).Where("employee_id = ? AND deleted_at IS NULL", nip)
    if excludeID != uuid.Nil {
        query = query.Where("id != ?", excludeID)
    }
    err := query.Count(&count).Error
    return count > 0, err
}

func (r *KaryawanRepository) CekEmailExists(email string, excludeID uuid.UUID) (bool, error) {
    var count int64
    query := r.db.Model(&models.Karyawan{}).Where("email = ? AND deleted_at IS NULL", email)
    if excludeID != uuid.Nil {
        query = query.Where("id != ?", excludeID)
    }
    err := query.Count(&count).Error
    return count > 0, err
}

func (r *KaryawanRepository) CekNikExists(nik string, excludeID uuid.UUID) (bool, error) {
    var count int64
    query := r.db.Model(&models.Karyawan{}).Where("nik = ? AND deleted_at IS NULL", nik)
    if excludeID != uuid.Nil {
        query = query.Where("id != ?", excludeID)
    }
    err := query.Count(&count).Error
    return count > 0, err
}

func (r *KaryawanRepository) UpdateUserID(karyawanID uuid.UUID, userID uuid.UUID) error {
    return r.db.Model(&models.Karyawan{}).Where("id = ?", karyawanID).Update("user_id", userID).Error
}

func (r *KaryawanRepository) HitungStatistik() (map[string]interface{}, error) {
    var total int64
    var tetap int64
    var kontrak int64
    var cuti int64
    var aktif int64
    
    r.db.Model(&models.Karyawan{}).Where("deleted_at IS NULL").Count(&total)
    r.db.Model(&models.Karyawan{}).Where("employment_status = ? AND deleted_at IS NULL", "Tetap").Count(&tetap)
    r.db.Model(&models.Karyawan{}).Where("employment_status = ? AND deleted_at IS NULL", "Kontrak").Count(&kontrak)
    r.db.Model(&models.Karyawan{}).Where("employment_status = ? AND deleted_at IS NULL", "Cuti").Count(&cuti)
    r.db.Model(&models.Karyawan{}).Where("is_active = ? AND deleted_at IS NULL", true).Count(&aktif)
    
    stats := map[string]interface{}{
        "total":    total,
        "tetap":    tetap,
        "kontrak":  kontrak,
        "cuti":     cuti,
        "aktif":    aktif,
        "nonaktif": total - aktif,
    }
    
    return stats, nil
}