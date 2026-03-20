package repository

import (
	"errors"

	"github.com/google/uuid"
	"github.com/moccalatt3/klinik-absensi/internal/models"
	"github.com/moccalatt3/klinik-absensi/pkg/database"
	"gorm.io/gorm"
)

type FaceRepository struct {
	db *gorm.DB
}

func NewFaceRepository() *FaceRepository {
	return &FaceRepository{
		db: database.GetDB(),
	}
}

func (r *FaceRepository) Create(embedding *models.FaceEmbedding) error {
	return r.db.Create(embedding).Error
}

func (r *FaceRepository) GetByEmployeeID(employeeID uuid.UUID) ([]models.FaceEmbedding, error) {
	var embeddings []models.FaceEmbedding
	err := r.db.Where("employee_id = ?", employeeID).Find(&embeddings).Error
	return embeddings, err
}

func (r *FaceRepository) GetPrimary(employeeID uuid.UUID) (*models.FaceEmbedding, error) {
	var embedding models.FaceEmbedding
	err := r.db.Where("employee_id = ? AND is_primary = ?", employeeID, true).First(&embedding).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &embedding, nil
}

func (r *FaceRepository) Delete(id uuid.UUID) error {
	return r.db.Delete(&models.FaceEmbedding{}, "id = ?", id).Error
}

func (r *FaceRepository) LogVerification(log *models.FaceLog) error {
	return r.db.Create(log).Error
}

func (r *FaceRepository) GetHistory(employeeID uuid.UUID, limit int) ([]models.FaceLog, error) {
	var logs []models.FaceLog
	err := r.db.Where("employee_id = ?", employeeID).
		Order("created_at DESC").
		Limit(limit).
		Find(&logs).Error
	return logs, err
}

func (r *FaceRepository) SetPrimary(employeeID uuid.UUID, embeddingID uuid.UUID) error {
	tx := r.db.Begin()

	if err := tx.Model(&models.FaceEmbedding{}).
		Where("employee_id = ? AND is_primary = ?", employeeID, true).
		Update("is_primary", false).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Model(&models.FaceEmbedding{}).
		Where("id = ?", embeddingID).
		Update("is_primary", true).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}
