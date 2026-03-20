package models

import (
    "time"
    "github.com/google/uuid"
)

type PasswordReset struct {
    ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
    Email     string    `gorm:"size:255;index;not null" json:"email"`
    Token     string    `gorm:"size:255;uniqueIndex;not null" json:"-"`
    ExpiresAt time.Time `gorm:"not null" json:"expires_at"`
    UsedAt    *time.Time `json:"used_at"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}

func (PasswordReset) TableName() string {
    return "password_resets"
}

func (p *PasswordReset) IsExpired() bool {
    return time.Now().After(p.ExpiresAt)
}

func (p *PasswordReset) IsUsed() bool {
    return p.UsedAt != nil
}