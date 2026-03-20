package models

import (
    "time"
)

type Permission struct {
    ID          uint      `gorm:"primaryKey" json:"id"`
    Module      string    `gorm:"size:50;not null" json:"module"`
    Action      string    `gorm:"size:50;not null" json:"action"`
    Scope       string    `gorm:"size:20;not null" json:"scope"`
    Description string    `gorm:"type:text" json:"description"`
    CreatedAt   time.Time `json:"created_at"`
}

func (Permission) TableName() string {
    return "auth_permissions"
}