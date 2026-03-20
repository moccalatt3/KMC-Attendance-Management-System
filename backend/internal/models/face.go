package models

import (
	"time"

	"github.com/google/uuid"
)

type FaceEmbedding struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	EmployeeID   uuid.UUID `gorm:"column:employee_id;type:uuid;not null" json:"employee_id"`
	FaceEncoding string    `gorm:"column:face_encoding;type:text;not null" json:"-"`
	FaceImageURL string    `gorm:"column:face_image_url;type:text" json:"face_image_url"`
	IsPrimary    bool      `gorm:"column:is_primary;default:false" json:"is_primary"`
	PoseType     string    `gorm:"column:pose_type;size:30" json:"pose_type"`
	QualityScore float64   `gorm:"column:quality_score;type:decimal(3,2)" json:"quality_score"`
	CaptureOrder int       `gorm:"column:capture_order" json:"capture_order"`
	CreatedAt    time.Time `gorm:"column:created_at" json:"created_at"`

	Karyawan Karyawan `gorm:"foreignKey:EmployeeID;references:ID" json:"karyawan,omitempty"`
}

func (FaceEmbedding) TableName() string {
	return "hr.face_embeddings"
}

type FaceLog struct {
	ID         uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	EmployeeID uuid.UUID `gorm:"column:employee_id;type:uuid;not null" json:"employee_id"`
	Status     string    `gorm:"column:status;size:20;not null" json:"status"`
	Confidence float64   `gorm:"column:confidence;type:decimal(5,2)" json:"confidence"`
	ImageURL   string    `gorm:"column:image_url;type:text" json:"image_url"`
	CreatedAt  time.Time `gorm:"column:created_at" json:"created_at"`

	Karyawan Karyawan `gorm:"foreignKey:EmployeeID;references:ID" json:"karyawan,omitempty"`
}

func (FaceLog) TableName() string {
	return "attendance.face_logs"
}
