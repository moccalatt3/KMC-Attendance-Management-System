package models

import (
    "time"
)

type Role struct {
    ID          uint      `gorm:"primaryKey" json:"id"`
    Name        string    `gorm:"size:50;uniqueIndex;not null" json:"name"`
    DisplayName string    `gorm:"size:100" json:"display_name"`
    Description string    `gorm:"type:text" json:"description"`
    Level       int       `gorm:"default:0" json:"level"`
    IsActive    bool      `gorm:"default:true" json:"is_active"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}

func (Role) TableName() string {
    return "auth_roles"
}