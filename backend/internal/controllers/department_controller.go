package controllers

import (
    "net/http"
    "log"
    "github.com/gin-gonic/gin"
    "github.com/google/uuid"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/services"
)

type DepartmentController struct {
    service *services.DepartmentService
}

func NewDepartmentController() *DepartmentController {
    return &DepartmentController{
        service: services.NewDepartmentService(),
    }
}

func (c *DepartmentController) DaftarDepartment(ctx *gin.Context) {
    log.Println("Endpoint /api/department dipanggil")
    
    departments, err := c.service.AmbilSemuaDepartment()
    if err != nil {
        log.Printf("Error ambil department: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data department",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data department berhasil diambil",
        "data": departments,
    })
}

func (c *DepartmentController) DaftarDepartmentAktif(ctx *gin.Context) {
    log.Println("Endpoint /api/department/aktif dipanggil")
    
    departments, err := c.service.AmbilSemuaAktif()
    if err != nil {
        log.Printf("Error ambil department aktif: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data department aktif",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data department aktif berhasil diambil",
        "data": departments,
    })
}

func (c *DepartmentController) DaftarRootDepartment(ctx *gin.Context) {
    log.Println("Endpoint /api/department/root dipanggil")
    
    departments, err := c.service.AmbilRootDepartments()
    if err != nil {
        log.Printf("Error ambil root department: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data root department",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data root department berhasil diambil",
        "data": departments,
    })
}

func (c *DepartmentController) DetailDepartment(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint /api/department/%s dipanggil", idParam)
    
    id, err := uuid.Parse(idParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    department, err := c.service.AmbilDepartmentByID(id)
    if err != nil {
        log.Printf("Error ambil department by ID: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data department",
            "error": err.Error(),
        })
        return
    }
    
    if department == nil {
        ctx.JSON(http.StatusNotFound, gin.H{
            "success": false,
            "message": "Department tidak ditemukan",
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data department berhasil diambil",
        "data": department,
    })
}

func (c *DepartmentController) TambahDepartment(ctx *gin.Context) {
    log.Println("Endpoint POST /api/department dipanggil")
    
    var department models.Department
    
    if err := ctx.ShouldBindJSON(&department); err != nil {
        log.Printf("Error bind JSON: %v", err)
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "Data tidak valid",
            "error": err.Error(),
        })
        return
    }
    
    if err := c.service.ValidasiDataDepartment(&department); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": err.Error(),
        })
        return
    }
    
    if err := c.service.TambahDepartment(&department); err != nil {
        log.Printf("Error tambah department: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menambah department",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusCreated, gin.H{
        "success": true,
        "message": "Department berhasil ditambahkan",
        "data": department,
    })
}

func (c *DepartmentController) UbahDepartment(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint PUT /api/department/%s dipanggil", idParam)
    
    id, err := uuid.Parse(idParam)
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
    
    if err := c.service.PerbaruiDepartment(id, data); err != nil {
        log.Printf("Error update department: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengubah data department",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data department berhasil diubah",
    })
}

func (c *DepartmentController) HapusDepartment(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint DELETE /api/department/%s dipanggil", idParam)
    
    id, err := uuid.Parse(idParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    if err := c.service.HapusDepartment(id); err != nil {
        log.Printf("Error hapus department: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menghapus department",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Department berhasil dihapus",
    })
}

func (c *DepartmentController) ToggleStatusDepartment(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint PATCH /api/department/%s/toggle dipanggil", idParam)
    
    id, err := uuid.Parse(idParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    if err := c.service.ToggleStatusDepartment(id); err != nil {
        log.Printf("Error toggle status department: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengubah status department",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Status department berhasil diubah",
    })
}

func (c *DepartmentController) StatistikDepartment(ctx *gin.Context) {
    log.Println("Endpoint /api/department/statistik dipanggil")
    
    stats, err := c.service.AmbilStatistik()
    if err != nil {
        log.Printf("Error ambil statistik: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil statistik",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Statistik berhasil diambil",
        "data": stats,
    })
}