package controllers

import (
    "net/http"
    "log"
    "github.com/gin-gonic/gin"
    "github.com/google/uuid"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/services"
)

type PositionController struct {
    service *services.PositionService
}

func NewPositionController() *PositionController {
    return &PositionController{
        service: services.NewPositionService(),
    }
}

func (c *PositionController) DaftarPosition(ctx *gin.Context) {
    log.Println("Endpoint /api/position dipanggil")
    
    positions, err := c.service.AmbilSemuaPosition()
    if err != nil {
        log.Printf("Error ambil position: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data position",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data position berhasil diambil",
        "data": positions,
    })
}

func (c *PositionController) DaftarPositionAktif(ctx *gin.Context) {
    log.Println("Endpoint /api/position/aktif dipanggil")
    
    positions, err := c.service.AmbilSemuaAktif()
    if err != nil {
        log.Printf("Error ambil position aktif: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data position aktif",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data position aktif berhasil diambil",
        "data": positions,
    })
}

func (c *PositionController) DetailPosition(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint /api/position/%s dipanggil", idParam)
    
    id, err := uuid.Parse(idParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    position, err := c.service.AmbilPositionByID(id)
    if err != nil {
        log.Printf("Error ambil position by ID: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data position",
            "error": err.Error(),
        })
        return
    }
    
    if position == nil {
        ctx.JSON(http.StatusNotFound, gin.H{
            "success": false,
            "message": "Position tidak ditemukan",
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data position berhasil diambil",
        "data": position,
    })
}

func (c *PositionController) TambahPosition(ctx *gin.Context) {
    log.Println("Endpoint POST /api/position dipanggil")
    
    var position models.Position
    
    if err := ctx.ShouldBindJSON(&position); err != nil {
        log.Printf("Error bind JSON: %v", err)
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "Data tidak valid",
            "error": err.Error(),
        })
        return
    }
    
    if err := c.service.ValidasiDataPosition(&position); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": err.Error(),
        })
        return
    }
    
    if err := c.service.TambahPosition(&position); err != nil {
        log.Printf("Error tambah position: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menambah position",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusCreated, gin.H{
        "success": true,
        "message": "Position berhasil ditambahkan",
        "data": position,
    })
}

func (c *PositionController) UbahPosition(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint PUT /api/position/%s dipanggil", idParam)
    
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
    
    if err := c.service.PerbaruiPosition(id, data); err != nil {
        log.Printf("Error update position: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengubah data position",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data position berhasil diubah",
    })
}

func (c *PositionController) HapusPosition(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint DELETE /api/position/%s dipanggil", idParam)
    
    id, err := uuid.Parse(idParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    if err := c.service.HapusPosition(id); err != nil {
        log.Printf("Error hapus position: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menghapus position",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Position berhasil dihapus",
    })
}

func (c *PositionController) ToggleStatusPosition(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint PATCH /api/position/%s/toggle dipanggil", idParam)
    
    id, err := uuid.Parse(idParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    if err := c.service.ToggleStatusPosition(id); err != nil {
        log.Printf("Error toggle status position: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengubah status position",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Status position berhasil diubah",
    })
}

func (c *PositionController) StatistikPosition(ctx *gin.Context) {
    log.Println("Endpoint /api/position/statistik dipanggil")
    
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