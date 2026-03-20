package repository

import (
    "errors"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/pkg/database"
    "gorm.io/gorm"
)

type RoleRepository struct {
    db *gorm.DB
}

func NewRoleRepository() *RoleRepository {
    return &RoleRepository{
        db: database.GetDB(),
    }
}

func (r *RoleRepository) Create(role *models.Role) error {
    return r.db.Create(role).Error
}

func (r *RoleRepository) Update(id uint, data map[string]interface{}) error {
    return r.db.Model(&models.Role{}).Where("id = ?", id).Updates(data).Error
}

func (r *RoleRepository) Delete(id uint) error {
    return r.db.Model(&models.Role{}).Where("id = ?", id).Update("is_active", false).Error
}

func (r *RoleRepository) FindByID(id uint) (*models.Role, error) {
    var role models.Role
    err := r.db.Where("is_active = ?", true).First(&role, id).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &role, nil
}

func (r *RoleRepository) FindByName(name string) (*models.Role, error) {
    var role models.Role
    err := r.db.Where("name = ? AND is_active = ?", name, true).First(&role).Error
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, err
    }
    return &role, nil
}

func (r *RoleRepository) FindAll() ([]models.Role, error) {
    var roles []models.Role
    err := r.db.Where("is_active = ?", true).Order("level, name").Find(&roles).Error
    return roles, err
}

func (r *RoleRepository) FindByLevel(level int) ([]models.Role, error) {
    var roles []models.Role
    err := r.db.Where("level = ? AND is_active = ?", level, true).Order("name").Find(&roles).Error
    return roles, err
}

func (r *RoleRepository) GetUserCountByRole(roleID uint) (int64, error) {
    var count int64
    err := r.db.Table("auth_user_roles").Where("role_id = ?", roleID).Count(&count).Error
    return count, err
}

func (r *RoleRepository) GetUserCountForAllRoles() (map[uint]int64, error) {
    var results []struct {
        RoleID uint
        Count  int64
    }
    
    err := r.db.Table("auth_user_roles").
        Select("role_id, count(*) as count").
        Group("role_id").
        Scan(&results).Error
    
    if err != nil {
        return nil, err
    }
    
    counts := make(map[uint]int64)
    for _, r := range results {
        counts[r.RoleID] = r.Count
    }
    
    return counts, nil
}

func (r *RoleRepository) GetPermissions(roleID uint) ([]models.Permission, error) {
    var permissions []models.Permission
    err := r.db.Table("auth_role_permissions").
        Select("auth_permissions.*").
        Joins("JOIN auth_permissions ON auth_role_permissions.permission_id = auth_permissions.id").
        Where("auth_role_permissions.role_id = ?", roleID).
        Find(&permissions).Error
    return permissions, err
}

func (r *RoleRepository) GetPermissionIDs(roleID uint) ([]uint, error) {
    var ids []uint
    err := r.db.Table("auth_role_permissions").
        Where("role_id = ?", roleID).
        Pluck("permission_id", &ids).Error
    return ids, err
}

func (r *RoleRepository) UpdatePermissions(roleID uint, permissionIDs []uint) error {
    tx := r.db.Begin()
    
    if err := tx.Where("role_id = ?", roleID).Delete(&models.RolePermission{}).Error; err != nil {
        tx.Rollback()
        return err
    }
    
    if len(permissionIDs) > 0 {
        var rolePermissions []models.RolePermission
        for _, permID := range permissionIDs {
            rolePermissions = append(rolePermissions, models.RolePermission{
                RoleID:       roleID,
                PermissionID: permID,
            })
        }
        
        if err := tx.Create(&rolePermissions).Error; err != nil {
            tx.Rollback()
            return err
        }
    }
    
    return tx.Commit().Error
}