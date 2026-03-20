package repository

import (
    "time"
    "gorm.io/gorm"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/pkg/database"
)

type PasswordResetRepository struct {
    db *gorm.DB
}

func NewPasswordResetRepository() *PasswordResetRepository {
    return &PasswordResetRepository{
        db: database.GetDB(),
    }
}

func (r *PasswordResetRepository) Create(reset *models.PasswordReset) error {
    return r.db.Create(reset).Error
}

func (r *PasswordResetRepository) FindByToken(token string) (*models.PasswordReset, error) {
    var reset models.PasswordReset
    err := r.db.Where("token = ?", token).First(&reset).Error
    if err == gorm.ErrRecordNotFound {
        return nil, nil
    }
    return &reset, err
}

func (r *PasswordResetRepository) FindByEmail(email string) (*models.PasswordReset, error) {
    var reset models.PasswordReset
    err := r.db.Where("email = ?", email).Order("created_at DESC").First(&reset).Error
    if err == gorm.ErrRecordNotFound {
        return nil, nil
    }
    return &reset, err
}

func (r *PasswordResetRepository) DeleteByToken(token string) error {
    return r.db.Where("token = ?", token).Delete(&models.PasswordReset{}).Error
}

func (r *PasswordResetRepository) DeleteByEmail(email string) error {
    return r.db.Where("email = ?", email).Delete(&models.PasswordReset{}).Error
}

func (r *PasswordResetRepository) CleanExpired() error {
    return r.db.Where("expires_at < ?", time.Now()).Delete(&models.PasswordReset{}).Error
}