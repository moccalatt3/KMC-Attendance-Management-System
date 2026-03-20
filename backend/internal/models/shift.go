package models

import (
    "time"
    "gorm.io/gorm"
)

type Shift struct {
    ID             string         `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
    Code           string         `gorm:"size:10;uniqueIndex;not null" json:"code"`
    Name           string         `gorm:"size:50;not null" json:"name"`
    ShiftType      string         `gorm:"size:20;not null" json:"shift_type"`
    CheckInTime    *string        `gorm:"size:5" json:"check_in_time"`
    CheckOutTime   *string        `gorm:"size:5" json:"check_out_time"`
    BreakMinutes   int            `gorm:"default:60" json:"break_minutes"`
    IsOvernight    bool           `gorm:"default:false" json:"is_overnight"`
    IsWfh          bool           `gorm:"default:false" json:"is_wfh"`
    LateTolerance  int            `gorm:"default:15" json:"late_tolerance"`
    EarlyOutTol    int            `gorm:"default:15" json:"early_out_tol"`
    OvertimeMin    int            `gorm:"default:30" json:"overtime_min"`
    IsActive       bool           `gorm:"default:true" json:"is_active"`
    CreatedAt      time.Time      `json:"created_at"`
    UpdatedAt      time.Time      `json:"updated_at"`
    DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Shift) TableName() string {
    return "hr.shifts"
}