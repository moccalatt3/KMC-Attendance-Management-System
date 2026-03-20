package services

import (
    "errors"
    "log"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/repository"
)

type PermissionService struct {
    permissionRepo *repository.PermissionRepository
}

func NewPermissionService() *PermissionService {
    return &PermissionService{
        permissionRepo: repository.NewPermissionRepository(),
    }
}

func (s *PermissionService) GetAllPermissions() ([]models.Permission, error) {
    return s.permissionRepo.FindAll()
}

func (s *PermissionService) GetPermissionByID(id uint) (*models.Permission, error) {
    return s.permissionRepo.FindByID(id)
}

func (s *PermissionService) GetPermissionsByModule(module string) ([]models.Permission, error) {
    return s.permissionRepo.FindByModule(module)
}

func (s *PermissionService) GetModules() ([]string, error) {
    return s.permissionRepo.GetModules()
}

func (s *PermissionService) GetModuleSummary() ([]map[string]interface{}, error) {
    return s.permissionRepo.GetModuleSummary()
}

func (s *PermissionService) GetGroupedPermissions() (map[string]map[string][]models.Permission, error) {
    permissions, err := s.permissionRepo.FindAll()
    if err != nil {
        return nil, err
    }
    
    result := make(map[string]map[string][]models.Permission)
    
    for _, perm := range permissions {
        if _, ok := result[perm.Module]; !ok {
            result[perm.Module] = make(map[string][]models.Permission)
        }
        if _, ok := result[perm.Module][perm.Action]; !ok {
            result[perm.Module][perm.Action] = []models.Permission{}
        }
        result[perm.Module][perm.Action] = append(result[perm.Module][perm.Action], perm)
    }
    
    return result, nil
}

func (s *PermissionService) CreatePermission(permission *models.Permission) error {
    exists, err := s.permissionRepo.CheckExists(permission.Module, permission.Action, permission.Scope, 0)
    if err != nil {
        log.Printf("Error checking existing permission: %v", err)
        return err
    }
    if exists {
        return errors.New("permission dengan module, action, dan scope yang sama sudah ada")
    }
    
    return s.permissionRepo.Create(permission)
}

func (s *PermissionService) UpdatePermission(id uint, data map[string]interface{}) error {
    permission, err := s.permissionRepo.FindByID(id)
    if err != nil {
        return err
    }
    if permission == nil {
        return errors.New("permission tidak ditemukan")
    }
    
    module, _ := data["module"].(string)
    action, _ := data["action"].(string)
    scope, _ := data["scope"].(string)
    
    if module != "" && action != "" && scope != "" {
        if module != permission.Module || action != permission.Action || scope != permission.Scope {
            exists, err := s.permissionRepo.CheckExists(module, action, scope, id)
            if err != nil {
                return err
            }
            if exists {
                return errors.New("permission dengan module, action, dan scope yang sama sudah ada")
            }
        }
    }
    
    return s.permissionRepo.Update(id, data)
}

func (s *PermissionService) DeletePermission(id uint) error {
    permission, err := s.permissionRepo.FindByID(id)
    if err != nil {
        return err
    }
    if permission == nil {
        return errors.New("permission tidak ditemukan")
    }
    
    return s.permissionRepo.Delete(id)
}

func (s *PermissionService) ValidatePermissionData(permission *models.Permission) error {
    if permission.Module == "" {
        return errors.New("module wajib diisi")
    }
    if permission.Action == "" {
        return errors.New("action wajib diisi")
    }
    if permission.Scope == "" {
        return errors.New("scope wajib diisi")
    }
    if permission.Scope != "all" && permission.Scope != "department" && 
       permission.Scope != "team" && permission.Scope != "own" &&
       permission.Scope != "level1" && permission.Scope != "level2" {
        return errors.New("scope tidak valid")
    }
    return nil
}

func (s *PermissionService) FormatPermissionName(permission *models.Permission) string {
    return permission.Module + "." + permission.Action + "." + permission.Scope
}