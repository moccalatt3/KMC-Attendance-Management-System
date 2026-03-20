package services

import (
    "errors"
    "log"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/repository"
)

type RoleService struct {
    roleRepo       *repository.RoleRepository
    permissionRepo *repository.PermissionRepository
}

func NewRoleService() *RoleService {
    return &RoleService{
        roleRepo:       repository.NewRoleRepository(),
        permissionRepo: repository.NewPermissionRepository(),
    }
}

func (s *RoleService) CreateRole(role *models.Role) error {
    existing, err := s.roleRepo.FindByName(role.Name)
    if err != nil {
        log.Printf("Error checking existing role: %v", err)
        return err
    }
    if existing != nil {
        return errors.New("role dengan nama tersebut sudah ada")
    }
    
    return s.roleRepo.Create(role)
}

func (s *RoleService) UpdateRole(id uint, data map[string]interface{}) error {
    role, err := s.roleRepo.FindByID(id)
    if err != nil {
        return err
    }
    if role == nil {
        return errors.New("role tidak ditemukan")
    }
    
    if name, ok := data["name"].(string); ok && name != "" && name != role.Name {
        existing, err := s.roleRepo.FindByName(name)
        if err != nil {
            return err
        }
        if existing != nil {
            return errors.New("role dengan nama tersebut sudah ada")
        }
    }
    
    return s.roleRepo.Update(id, data)
}

func (s *RoleService) DeleteRole(id uint) error {
    role, err := s.roleRepo.FindByID(id)
    if err != nil {
        return err
    }
    if role == nil {
        return errors.New("role tidak ditemukan")
    }
    
    userCount, err := s.roleRepo.GetUserCountByRole(id)
    if err != nil {
        return err
    }
    if userCount > 0 {
        return errors.New("role tidak dapat dihapus karena masih digunakan oleh pengguna")
    }
    
    return s.roleRepo.Delete(id)
}

func (s *RoleService) GetRoleByID(id uint) (*models.Role, error) {
    return s.roleRepo.FindByID(id)
}

func (s *RoleService) GetAllRoles() ([]models.Role, error) {
    return s.roleRepo.FindAll()
}

func (s *RoleService) GetRolesByLevel(level int) ([]models.Role, error) {
    return s.roleRepo.FindByLevel(level)
}

func (s *RoleService) GetRolePermissions(roleID uint) ([]models.Permission, error) {
    return s.roleRepo.GetPermissions(roleID)
}

func (s *RoleService) GetRolePermissionIDs(roleID uint) ([]uint, error) {
    return s.roleRepo.GetPermissionIDs(roleID)
}

func (s *RoleService) UpdateRolePermissions(roleID uint, permissionIDs []uint) error {
    role, err := s.roleRepo.FindByID(roleID)
    if err != nil {
        return err
    }
    if role == nil {
        return errors.New("role tidak ditemukan")
    }
    
    if len(permissionIDs) > 0 {
        for _, permID := range permissionIDs {
            _, err := s.permissionRepo.FindByID(permID)
            if err != nil {
                return errors.New("permission tidak valid")
            }
        }
    }
    
    return s.roleRepo.UpdatePermissions(roleID, permissionIDs)
}

func (s *RoleService) GetRolesWithUserCount() ([]map[string]interface{}, error) {
    roles, err := s.roleRepo.FindAll()
    if err != nil {
        return nil, err
    }
    
    userCounts, err := s.roleRepo.GetUserCountForAllRoles()
    if err != nil {
        return nil, err
    }
    
    var result []map[string]interface{}
    for _, role := range roles {
        result = append(result, map[string]interface{}{
            "id":           role.ID,
            "name":         role.Name,
            "display_name": role.DisplayName,
            "description":  role.Description,
            "level":        role.Level,
            "is_active":    role.IsActive,
            "users_count":  userCounts[role.ID],
        })
    }
    
    return result, nil
}

func (s *RoleService) ValidateRoleData(role *models.Role) error {
    if role.Name == "" {
        return errors.New("nama role wajib diisi")
    }
    if role.DisplayName == "" {
        return errors.New("display name wajib diisi")
    }
    return nil
}