package models

import (
	"time"

	"github.com/google/uuid"
)

type Karyawan struct {
	ID               uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID           *uuid.UUID `gorm:"type:uuid" json:"user_id"`
	EmployeeID       string     `gorm:"column:employee_id;size:50;uniqueIndex;not null" json:"employee_id"`
	FullName         string     `gorm:"column:full_name;size:255;not null" json:"full_name"`
	Nickname         string     `gorm:"column:nickname;size:100" json:"nickname"`
	Email            string     `gorm:"column:email;size:255;uniqueIndex;not null" json:"email"`
	Phone            string     `gorm:"column:phone;size:50" json:"phone"`
	BirthPlace       string     `gorm:"column:birth_place;size:100" json:"birth_place"`
	BirthDate        *time.Time `gorm:"column:birth_date" json:"birth_date"`
	Gender           string     `gorm:"column:gender;size:1;check:gender IN ('L','P')" json:"gender"`
	Religion         string     `gorm:"column:religion;size:50" json:"religion"`
	Nik              string     `gorm:"column:nik;size:16;uniqueIndex" json:"nik"`
	Address          string     `gorm:"column:address;type:text" json:"address"`
	PositionID       *uuid.UUID `gorm:"column:position_id;type:uuid" json:"position_id"`
	DepartmentID     *uuid.UUID `gorm:"column:department_id;type:uuid" json:"department_id"`
	JoinDate         *time.Time `gorm:"column:join_date" json:"join_date"`
	EmploymentStatus string     `gorm:"column:employment_status;size:50" json:"employment_status"`
	ContractEndDate  *time.Time `gorm:"column:contract_end_date" json:"contract_end_date"`
	BankName         string     `gorm:"column:bank_name;size:100" json:"bank_name"`
	BankAccount      string     `gorm:"column:bank_account;size:50" json:"bank_account"`
	BpjsHealthNo     string     `gorm:"column:bpjs_health_no;size:50" json:"bpjs_health_no"`
	BpjsEmploymentNo string     `gorm:"column:bpjs_employment_no;size:50" json:"bpjs_employment_no"`
	PhotoURL         string     `gorm:"column:photo_url;type:text" json:"photo_url"`
	HasFace          bool       `gorm:"column:has_face;default:false" json:"has_face"`
	FaceUpdatedAt    *time.Time `gorm:"column:face_updated_at" json:"face_updated_at"`
	IsActive         bool       `gorm:"column:is_active;default:true" json:"is_active"`
	CreatedAt        time.Time  `gorm:"column:created_at" json:"created_at"`
	UpdatedAt        time.Time  `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt        *time.Time `gorm:"column:deleted_at;index" json:"-"`
	CreatedBy        *uuid.UUID `gorm:"column:created_by;type:uuid" json:"created_by"`
	UpdatedBy        *uuid.UUID `gorm:"column:updated_by;type:uuid" json:"updated_by"`

	User       *User       `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Position   *Position   `gorm:"foreignKey:PositionID" json:"position,omitempty"`
	Department *Department `gorm:"foreignKey:DepartmentID" json:"department,omitempty"`
}

func (Karyawan) TableName() string {
	return "hr.employees"
}
