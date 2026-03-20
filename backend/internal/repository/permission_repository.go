package repository

import (
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/pkg/database"
    "gorm.io/gorm"
)

type PermissionRepository struct {
    db *gorm.DB
}

func NewPermissionRepository() *PermissionRepository {
    return &PermissionRepository{
        db: database.GetDB(),
    }
}

func (r *PermissionRepository) FindAll() ([]models.Permission, error) {
    var permissions []models.Permission
    err := r.db.Order("module, action, scope").Find(&permissions).Error
    return permissions, err
}

func (r *PermissionRepository) FindByID(id uint) (*models.Permission, error) {
    var permission models.Permission
    err := r.db.First(&permission, id).Error
    if err != nil {
        return nil, err
    }
    return &permission, nil
}

func (r *PermissionRepository) FindByModule(module string) ([]models.Permission, error) {
    var permissions []models.Permission
    err := r.db.Where("module = ?", module).Order("action, scope").Find(&permissions).Error
    return permissions, err
}

func (r *PermissionRepository) FindByModuleAndAction(module, action string) ([]models.Permission, error) {
    var permissions []models.Permission
    err := r.db.Where("module = ? AND action = ?", module, action).Order("scope").Find(&permissions).Error
    return permissions, err
}

func (r *PermissionRepository) FindByScope(scope string) ([]models.Permission, error) {
    var permissions []models.Permission
    err := r.db.Where("scope = ?", scope).Order("module, action").Find(&permissions).Error
    return permissions, err
}

func (r *PermissionRepository) GetModules() ([]string, error) {
    var modules []string
    err := r.db.Model(&models.Permission{}).
        Select("DISTINCT module").
        Order("module").
        Pluck("module", &modules).Error
    return modules, err
}

func (r *PermissionRepository) GetModuleSummary() ([]map[string]interface{}, error) {
    var results []map[string]interface{}
    
    err := r.db.Model(&models.Permission{}).
        Select("module, count(*) as total").
        Group("module").
        Order("module").
        Find(&results).Error
    
    return results, err
}

func (r *PermissionRepository) Create(permission *models.Permission) error {
    return r.db.Create(permission).Error
}

func (r *PermissionRepository) Update(id uint, data map[string]interface{}) error {
    return r.db.Model(&models.Permission{}).Where("id = ?", id).Updates(data).Error
}

func (r *PermissionRepository) Delete(id uint) error {
    return r.db.Delete(&models.Permission{}, id).Error
}

func (r *PermissionRepository) CheckExists(module, action, scope string, excludeID uint) (bool, error) {
    var count int64
    query := r.db.Model(&models.Permission{}).
        Where("module = ? AND action = ? AND scope = ?", module, action, scope)
    
    if excludeID > 0 {
        query = query.Where("id != ?", excludeID)
    }
    
    err := query.Count(&count).Error
    return count > 0, err
}