package controllers

import (
    "net/http"
    "strconv"
    "log"
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/services"
)

type PermissionController struct {
    service *services.PermissionService
}

func NewPermissionController() *PermissionController {
    return &PermissionController{
        service: services.NewPermissionService(),
    }
}

func (c *PermissionController) DaftarPermissions(ctx *gin.Context) {
    log.Println("Endpoint GET /api/permissions dipanggil")
    
    permissions, err := c.service.GetAllPermissions()
    if err != nil {
        log.Printf("Error ambil permissions: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data permissions",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data permissions berhasil diambil",
        "data": permissions,
    })
}

func (c *PermissionController) DaftarGroupedPermissions(ctx *gin.Context) {
    log.Println("Endpoint GET /api/permissions/grouped dipanggil")
    
    grouped, err := c.service.GetGroupedPermissions()
    if err != nil {
        log.Printf("Error ambil grouped permissions: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data permissions",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data permissions berhasil diambil",
        "data": grouped,
    })
}

func (c *PermissionController) DaftarModules(ctx *gin.Context) {
    log.Println("Endpoint GET /api/permissions/modules dipanggil")
    
    modules, err := c.service.GetModules()
    if err != nil {
        log.Printf("Error ambil modules: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data modules",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data modules berhasil diambil",
        "data": modules,
    })
}

func (c *PermissionController) DetailPermission(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint GET /api/permissions/%s dipanggil", idParam)
    
    id, err := strconv.ParseUint(idParam, 10, 32)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    permission, err := c.service.GetPermissionByID(uint(id))
    if err != nil {
        log.Printf("Error ambil permission by ID: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data permission",
            "error": err.Error(),
        })
        return
    }
    
    if permission == nil {
        ctx.JSON(http.StatusNotFound, gin.H{
            "success": false,
            "message": "Permission tidak ditemukan",
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data permission berhasil diambil",
        "data": permission,
    })
}

func (c *PermissionController) PermissionsByModule(ctx *gin.Context) {
    module := ctx.Param("module")
    log.Printf("Endpoint GET /api/permissions/module/%s dipanggil", module)
    
    permissions, err := c.service.GetPermissionsByModule(module)
    if err != nil {
        log.Printf("Error ambil permissions by module: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data permissions",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data permissions berhasil diambil",
        "data": permissions,
    })
}

func (c *PermissionController) TambahPermission(ctx *gin.Context) {
    log.Println("Endpoint POST /api/permissions dipanggil")
    
    var permission models.Permission
    
    if err := ctx.ShouldBindJSON(&permission); err != nil {
        log.Printf("Error bind JSON: %v", err)
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "Data tidak valid",
            "error": err.Error(),
        })
        return
    }
    
    if err := c.service.ValidatePermissionData(&permission); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": err.Error(),
        })
        return
    }
    
    if err := c.service.CreatePermission(&permission); err != nil {
        log.Printf("Error tambah permission: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menambah permission",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusCreated, gin.H{
        "success": true,
        "message": "Permission berhasil ditambahkan",
        "data": permission,
    })
}

func (c *PermissionController) UbahPermission(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint PUT /api/permissions/%s dipanggil", idParam)
    
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
    
    if err := c.service.UpdatePermission(uint(id), data); err != nil {
        log.Printf("Error update permission: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengubah data permission",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data permission berhasil diubah",
    })
}

func (c *PermissionController) HapusPermission(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint DELETE /api/permissions/%s dipanggil", idParam)
    
    id, err := strconv.ParseUint(idParam, 10, 32)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    if err := c.service.DeletePermission(uint(id)); err != nil {
        log.Printf("Error hapus permission: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menghapus permission",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Permission berhasil dihapus",
    })
}