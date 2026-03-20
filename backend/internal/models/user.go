package models

import (
    "time"
    "github.com/google/uuid"
    "golang.org/x/crypto/bcrypt"
    "gorm.io/gorm"
)

type User struct {
    ID           uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
    Name         string     `gorm:"size:255;not null" json:"name"`
    Email        string     `gorm:"size:255;uniqueIndex;not null" json:"email"`
    Password     string     `gorm:"size:255;not null" json:"-"`
    EmployeeID   string     `gorm:"size:50;uniqueIndex" json:"employee_id"`
    PositionID   *uuid.UUID `gorm:"type:uuid" json:"position_id"`
    DepartmentID *uuid.UUID `gorm:"type:uuid" json:"department_id"`
    IsActive     bool       `gorm:"default:true" json:"is_active"`
    LastLoginAt  *time.Time `json:"last_login_at"`
    CreatedAt    time.Time  `json:"created_at"`
    UpdatedAt    time.Time  `json:"updated_at"`
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    u.Password = string(hashedPassword)
    return nil
}

func (u *User) BeforeUpdate(tx *gorm.DB) error {
    if tx.Statement.Changed("Password") {
        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
        if err != nil {
            return err
        }
        u.Password = string(hashedPassword)
    }
    return nil
}

func (u *User) ComparePassword(password string) error {
    return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
}

func (User) TableName() string {
    return "users"
}