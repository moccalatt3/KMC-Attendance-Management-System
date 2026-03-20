package repository

import (
    "errors"
    "log"
    "time"
    "github.com/google/uuid"
    "gorm.io/gorm"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/pkg/database"
)

type UserRepository struct {
    db *gorm.DB
}

func NewUserRepository() *UserRepository {
    return &UserRepository{
        db: database.GetDB(),
    }
}

func (r *UserRepository) Create(user *models.User) error {
    return r.db.Create(user).Error
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
    var user models.User
    err := r.db.Where("email = ?", email).First(&user).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            log.Printf("User with email %s not found", email)
            return nil, nil
        }
        log.Printf("Error finding user by email: %v", err)
        return nil, err
    }
    log.Printf("User found: %s", user.Email)
    return &user, nil
}

func (r *UserRepository) FindByID(id uuid.UUID) (*models.User, error) {
    var user models.User
    err := r.db.Select("id, name, email, employee_id, position_id, department_id, is_active, last_login_at, created_at, updated_at").First(&user, "id = ?", id).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            log.Printf("User with ID %s not found", id)
            return nil, nil
        }
        log.Printf("Error finding user by ID: %v", err)
        return nil, err
    }
    return &user, nil
}

func (r *UserRepository) FindByEmployeeID(employeeID string) (*models.User, error) {
    var user models.User
    err := r.db.Where("employee_id = ?", employeeID).First(&user).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &user, nil
}

func (r *UserRepository) EmailExists(email string) (bool, error) {
    var count int64
    err := r.db.Model(&models.User{}).Where("email = ?", email).Count(&count).Error
    if err != nil {
        log.Printf("Error checking email exists: %v", err)
        return false, err
    }
    return count > 0, nil
}

func (r *UserRepository) UpdatePassword(email, hashedPassword string) error {
    result := r.db.Model(&models.User{}).Where("email = ?", email).Update("password", hashedPassword)
    if result.Error != nil {
        log.Printf("Error updating password: %v", result.Error)
        return result.Error
    }
    if result.RowsAffected == 0 {
        log.Printf("No user found with email %s to update password", email)
        return errors.New("user not found")
    }
    log.Printf("Password updated for email: %s", email)
    return nil
}

func (r *UserRepository) GetUserPermissions(userID uuid.UUID) ([]string, []string, error) {
    var permissions []string
    var roles []string
    var roleIDs []uint

    type RoleResult struct {
        RoleName string
        RoleID   uint
        RoleLevel int
    }
    var roleResults []RoleResult

    err := r.db.Table("auth_user_roles").
        Select("auth_roles.name as role_name, auth_roles.id as role_id, auth_roles.level as role_level").
        Joins("JOIN auth_roles ON auth_user_roles.role_id = auth_roles.id").
        Where("auth_user_roles.user_id = ?", userID).
        Scan(&roleResults).Error
    
    if err != nil {
        log.Printf("Error fetching roles for user %s: %v", userID, err)
        return nil, nil, err
    }

    for _, r := range roleResults {
        roles = append(roles, r.RoleName)
        roleIDs = append(roleIDs, r.RoleID)
    }

    if len(roleIDs) > 0 {
        err = r.db.Table("auth_role_permissions").
            Select("DISTINCT CONCAT(auth_permissions.module, '.', auth_permissions.action, '.', auth_permissions.scope) as permission_name").
            Joins("JOIN auth_permissions ON auth_role_permissions.permission_id = auth_permissions.id").
            Where("auth_role_permissions.role_id IN ?", roleIDs).
            Pluck("permission_name", &permissions).Error
        
        if err != nil {
            log.Printf("Error fetching permissions for user %s: %v", userID, err)
            return permissions, roles, err
        }
    }

    log.Printf("User %s has roles: %v and %d permissions", userID, roles, len(permissions))
    return permissions, roles, nil
}

func (r *UserRepository) UpdateLastLogin(userID uuid.UUID) error {
    return r.db.Model(&models.User{}).Where("id = ?", userID).Update("last_login_at", time.Now()).Error
}

func (r *UserRepository) AssignRole(userID uuid.UUID, roleID uint, assignedBy uuid.UUID) error {
    result := r.db.Exec("INSERT INTO auth_user_roles (user_id, role_id, assigned_by, assigned_at) VALUES (?, ?, ?, NOW()) ON CONFLICT (user_id, role_id) DO NOTHING", userID, roleID, assignedBy)
    return result.Error
}

func (r *UserRepository) AssignMultipleRoles(userID uuid.UUID, roleIDs []uint, assignedBy uuid.UUID) error {
    tx := r.db.Begin()
    
    for _, roleID := range roleIDs {
        err := tx.Exec("INSERT INTO auth_user_roles (user_id, role_id, assigned_by, assigned_at) VALUES (?, ?, ?, NOW()) ON CONFLICT (user_id, role_id) DO NOTHING", userID, roleID, assignedBy).Error
        if err != nil {
            tx.Rollback()
            return err
        }
    }
    
    return tx.Commit().Error
}

func (r *UserRepository) RemoveRole(userID uuid.UUID, roleID uint) error {
    return r.db.Exec("DELETE FROM auth_user_roles WHERE user_id = ? AND role_id = ?", userID, roleID).Error
}

func (r *UserRepository) RemoveAllRoles(userID uuid.UUID) error {
    return r.db.Exec("DELETE FROM auth_user_roles WHERE user_id = ?", userID).Error
}

func (r *UserRepository) GetUserRoles(userID uuid.UUID) ([]string, error) {
    var roles []string
    err := r.db.Table("auth_user_roles").
        Select("auth_roles.name").
        Joins("JOIN auth_roles ON auth_user_roles.role_id = auth_roles.id").
        Where("auth_user_roles.user_id = ?", userID).
        Pluck("name", &roles).Error
    return roles, err
}

func (r *UserRepository) GetUserRoleIDs(userID uuid.UUID) ([]uint, error) {
    var roleIDs []uint
    err := r.db.Table("auth_user_roles").
        Where("user_id = ?", userID).
        Pluck("role_id", &roleIDs).Error
    return roleIDs, err
}

func (r *UserRepository) UpdateUser(userID uuid.UUID, data map[string]interface{}) error {
    return r.db.Model(&models.User{}).Where("id = ?", userID).Updates(data).Error
}

func (r *UserRepository) DeactivateUser(userID uuid.UUID) error {
    return r.db.Model(&models.User{}).Where("id = ?", userID).Update("is_active", false).Error
}

func (r *UserRepository) ActivateUser(userID uuid.UUID) error {
    return r.db.Model(&models.User{}).Where("id = ?", userID).Update("is_active", true).Error
}