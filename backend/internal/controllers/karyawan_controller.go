package controllers

import (
    "net/http"
    "log"
    "time"
    "github.com/gin-gonic/gin"
    "github.com/google/uuid"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/services"
)

type KaryawanController struct {
    service *services.KaryawanService
}

func NewKaryawanController() *KaryawanController {
    return &KaryawanController{
        service: services.NewKaryawanService(),
    }
}

func (c *KaryawanController) DaftarKaryawan(ctx *gin.Context) {
    log.Println("Endpoint /api/karyawan dipanggil")
    
    karyawan, err := c.service.AmbilSemuaKaryawan()
    if err != nil {
        log.Printf("Error ambil karyawan: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data karyawan",
            "error": err.Error(),
        })
        return
    }
    
    log.Printf("Berhasil ambil %d karyawan", len(karyawan))
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data karyawan berhasil diambil",
        "data": karyawan,
    })
}

func (c *KaryawanController) StatistikKaryawan(ctx *gin.Context) {
    log.Println("Endpoint /api/karyawan/statistik dipanggil")
    
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
    
    log.Printf("Statistik: %+v", stats)
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Statistik berhasil diambil",
        "data": stats,
    })
}

func (c *KaryawanController) DetailKaryawan(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint /api/karyawan/%s dipanggil", idParam)
    
    id, err := uuid.Parse(idParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    karyawan, err := c.service.AmbilKaryawanByID(id)
    if err != nil {
        log.Printf("Error ambil karyawan by ID: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data karyawan",
            "error": err.Error(),
        })
        return
    }
    
    if karyawan == nil {
        ctx.JSON(http.StatusNotFound, gin.H{
            "success": false,
            "message": "Karyawan tidak ditemukan",
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data karyawan berhasil diambil",
        "data": karyawan,
    })
}

func (c *KaryawanController) TambahKaryawan(ctx *gin.Context) {
    log.Println("Endpoint POST /api/karyawan dipanggil")
    
    var req struct {
        Karyawan   models.Karyawan `json:"karyawan"`
        BuatAkun   bool            `json:"buat_akun"`
        Password   string          `json:"password"`
        RoleIDs    []uint          `json:"role_ids"`
    }
    
    if err := ctx.ShouldBindJSON(&req); err != nil {
        log.Printf("Error bind JSON: %v", err)
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "Data tidak valid",
            "error": err.Error(),
        })
        return
    }
    
    userIDStr, exists := ctx.Get("user_id")
    if !exists {
        ctx.JSON(http.StatusUnauthorized, gin.H{
            "success": false,
            "message": "Unauthorized",
        })
        return
    }
    
    userID, err := uuid.Parse(userIDStr.(string))
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Invalid user ID format",
        })
        return
    }
    
    if err := c.service.TambahKaryawanDenganAkun(req.Karyawan, req.BuatAkun, req.Password, req.RoleIDs, userID); err != nil {
        log.Printf("Error tambah karyawan: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menambah karyawan",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusCreated, gin.H{
        "success": true,
        "message": "Karyawan berhasil ditambahkan",
    })
}

func (c *KaryawanController) UbahKaryawan(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint PUT /api/karyawan/%s dipanggil", idParam)
    
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
    
    userIDStr, exists := ctx.Get("user_id")
    if exists {
        if userID, err := uuid.Parse(userIDStr.(string)); err == nil {
            data["updated_by"] = userID
            data["updated_at"] = time.Now()
        }
    }
    
    if err := c.service.PerbaruiKaryawan(id, data); err != nil {
        log.Printf("Error update karyawan: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengubah data karyawan",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data karyawan berhasil diubah",
    })
}

func (c *KaryawanController) HapusKaryawan(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint DELETE /api/karyawan/%s dipanggil", idParam)
    
    id, err := uuid.Parse(idParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    if err := c.service.HapusKaryawan(id); err != nil {
        log.Printf("Error hapus karyawan: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menghapus karyawan",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Karyawan berhasil dihapus",
    })
}