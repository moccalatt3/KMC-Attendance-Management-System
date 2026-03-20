package models

import (
    "time"
    "github.com/google/uuid"
    "gorm.io/gorm"
)

type Position struct {
    ID           uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
    Code         string         `gorm:"size:20;uniqueIndex;not null" json:"code"`
    Name         string         `gorm:"size:100;not null" json:"name"`
    DepartmentID *uuid.UUID     `gorm:"type:uuid" json:"department_id"`
    Level        int            `gorm:"not null;default:1" json:"level"`
    IsMedical    bool           `gorm:"not null;default:false" json:"is_medical"`
    RequiresSip  bool           `gorm:"not null;default:false" json:"requires_sip"`
    RequiresStr  bool           `gorm:"not null;default:false" json:"requires_str"`
    DefaultRole  *string        `gorm:"size:30" json:"default_role"`
    Description  *string        `gorm:"type:text" json:"description"`
    IsActive     bool           `gorm:"not null;default:true" json:"is_active"`
    CreatedAt    time.Time      `json:"created_at"`
    UpdatedAt    time.Time      `json:"updated_at"`
    DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
    
    Department *Department `gorm:"foreignKey:DepartmentID" json:"department,omitempty"`
}

func (Position) TableName() string {
    return "hr.positions"
}