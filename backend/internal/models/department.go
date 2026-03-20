package models

import (
    "time"
    "github.com/google/uuid"
    "gorm.io/gorm"
)

type Department struct {
    ID          uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
    Code        string         `gorm:"size:20;uniqueIndex;not null" json:"code"`
    Name        string         `gorm:"size:100;not null" json:"name"`
    ParentID    *uuid.UUID     `gorm:"type:uuid" json:"parent_id"`
    HeadID      *uuid.UUID     `gorm:"type:uuid" json:"head_id"`
    Description *string        `gorm:"type:text" json:"description"`
    IsActive    bool           `gorm:"default:true" json:"is_active"`
    CreatedAt   time.Time      `json:"created_at"`
    UpdatedAt   time.Time      `json:"updated_at"`
    DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
    Parent   *Department  `gorm:"foreignKey:ParentID" json:"parent,omitempty"`
    Children []Department `gorm:"foreignKey:ParentID" json:"children,omitempty"`
}

func (Department) TableName() string {
    return "hr.departments"
}