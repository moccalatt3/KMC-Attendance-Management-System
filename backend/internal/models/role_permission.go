package models

import (
    "time"
)

type RolePermission struct {
    RoleID       uint      `gorm:"primaryKey;column:role_id" json:"role_id"`
    PermissionID uint      `gorm:"primaryKey;column:permission_id" json:"permission_id"`
    CreatedAt    time.Time `json:"created_at"`
}

func (RolePermission) TableName() string {
    return "auth_role_permissions"
}