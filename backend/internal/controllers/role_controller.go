package controllers

import (
    "net/http"
    "strconv"
    "log"
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/services"
)

type RoleController struct {
    service *services.RoleService
}

func NewRoleController() *RoleController {
    return &RoleController{
        service: services.NewRoleService(),
    }
}

func (c *RoleController) DaftarRoles(ctx *gin.Context) {
    log.Println("Endpoint GET /api/roles dipanggil")
    
    rolesWithCount, err := c.service.GetRolesWithUserCount()
    if err != nil {
        log.Printf("Error ambil roles: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data roles",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data roles berhasil diambil",
        "data": rolesWithCount,
    })
}

func (c *RoleController) DetailRole(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint GET /api/roles/%s dipanggil", idParam)
    
    id, err := strconv.ParseUint(idParam, 10, 32)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    role, err := c.service.GetRoleByID(uint(id))
    if err != nil {
        log.Printf("Error ambil role by ID: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data role",
            "error": err.Error(),
        })
        return
    }
    
    if role == nil {
        ctx.JSON(http.StatusNotFound, gin.H{
            "success": false,
            "message": "Role tidak ditemukan",
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data role berhasil diambil",
        "data": role,
    })
}

func (c *RoleController) TambahRole(ctx *gin.Context) {
    log.Println("Endpoint POST /api/roles dipanggil")
    
    var role models.Role
    
    if err := ctx.ShouldBindJSON(&role); err != nil {
        log.Printf("Error bind JSON: %v", err)
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "Data tidak valid",
            "error": err.Error(),
        })
        return
    }
    
    if err := c.service.ValidateRoleData(&role); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": err.Error(),
        })
        return
    }
    
    if err := c.service.CreateRole(&role); err != nil {
        log.Printf("Error tambah role: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menambah role",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusCreated, gin.H{
        "success": true,
        "message": "Role berhasil ditambahkan",
        "data": role,
    })
}

func (c *RoleController) UbahRole(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint PUT /api/roles/%s dipanggil", idParam)
    
    id, err := strconv.ParseUint(idParam, 10, 32)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    var data map[string]interface{}
    if err := ctx.ShouldBindJSON(&data); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "Data tidak valid",
            "error": err.Error(),
        })
        return
    }
    
    if err := c.service.UpdateRole(uint(id), data); err != nil {
        log.Printf("Error update role: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengubah data role",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data role berhasil diubah",
    })
}

func (c *RoleController) HapusRole(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint DELETE /api/roles/%s dipanggil", idParam)
    
    id, err := strconv.ParseUint(idParam, 10, 32)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    if err := c.service.DeleteRole(uint(id)); err != nil {
        log.Printf("Error hapus role: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menghapus role",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Role berhasil dihapus",
    })
}

func (c *RoleController) PermissionsRole(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint GET /api/roles/%s/permissions dipanggil", idParam)
    
    id, err := strconv.ParseUint(idParam, 10, 32)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    permissions, err := c.service.GetRolePermissionIDs(uint(id))
    if err != nil {
        log.Printf("Error ambil permissions role: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil permissions role",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Permissions role berhasil diambil",
        "data": permissions,
    })
}

func (c *RoleController) UpdatePermissionsRole(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint PUT /api/roles/%s/permissions dipanggil", idParam)
    
    id, err := strconv.ParseUint(idParam, 10, 32)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    var req struct {
        PermissionIDs []uint `json:"permission_ids"`
    }
    
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "Data tidak valid",
            "error": err.Error(),
        })
        return
    }
    
    if err := c.service.UpdateRolePermissions(uint(id), req.PermissionIDs); err != nil {
        log.Printf("Error update permissions role: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengupdate permissions role",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Permissions role berhasil diupdate",
    })
}