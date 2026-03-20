package controllers

import (
    "net/http"
    "strconv"
    "log"
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/services"
)

type ShiftController struct {
    service *services.ShiftService
}

func NewShiftController() *ShiftController {
    return &ShiftController{
        service: services.NewShiftService(),
    }
}

func (c *ShiftController) DaftarShift(ctx *gin.Context) {
    log.Println("Endpoint /api/shift dipanggil")
    
    shifts, err := c.service.AmbilSemuaShift()
    if err != nil {
        log.Printf("Error ambil shift: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data shift",
            "error": err.Error(),
        })
        return
    }
    
    log.Printf("Berhasil ambil %d shift", len(shifts))
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data shift berhasil diambil",
        "data": shifts,
    })
}

func (c *ShiftController) DetailShift(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint /api/shift/%s dipanggil", idParam)
    
    id, err := strconv.ParseUint(idParam, 10, 32)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    shift, err := c.service.AmbilShiftByID(uint(id))
    if err != nil {
        log.Printf("Error ambil shift by ID: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengambil data shift",
            "error": err.Error(),
        })
        return
    }
    
    if shift == nil {
        ctx.JSON(http.StatusNotFound, gin.H{
            "success": false,
            "message": "Shift tidak ditemukan",
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data shift berhasil diambil",
        "data": shift,
    })
}

func (c *ShiftController) TambahShift(ctx *gin.Context) {
    log.Println("Endpoint POST /api/shift dipanggil")
    
    var shift models.Shift
    
    if err := ctx.ShouldBindJSON(&shift); err != nil {
        log.Printf("Error bind JSON: %v", err)
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "Data tidak valid",
            "error": err.Error(),
        })
        return
    }
    
    if err := c.service.ValidasiDataShift(&shift); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": err.Error(),
        })
        return
    }
    
    if err := c.service.TambahShift(&shift); err != nil {
        log.Printf("Error tambah shift: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menambah shift",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusCreated, gin.H{
        "success": true,
        "message": "Shift berhasil ditambahkan",
        "data": shift,
    })
}

func (c *ShiftController) UbahShift(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint PUT /api/shift/%s dipanggil", idParam)
    
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
    
    if err := c.service.PerbaruiShift(uint(id), data); err != nil {
        log.Printf("Error update shift: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengubah data shift",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Data shift berhasil diubah",
    })
}

func (c *ShiftController) HapusShift(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint DELETE /api/shift/%s dipanggil", idParam)
    
    id, err := strconv.ParseUint(idParam, 10, 32)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    if err := c.service.HapusShift(uint(id)); err != nil {
        log.Printf("Error hapus shift: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal menghapus shift",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Shift berhasil dihapus",
    })
}

func (c *ShiftController) ToggleStatusShift(ctx *gin.Context) {
    idParam := ctx.Param("id")
    log.Printf("Endpoint PATCH /api/shift/%s/toggle dipanggil", idParam)
    
    id, err := strconv.ParseUint(idParam, 10, 32)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{
            "success": false,
            "message": "ID tidak valid",
        })
        return
    }
    
    if err := c.service.ToggleStatusShift(uint(id)); err != nil {
        log.Printf("Error toggle status shift: %v", err)
        ctx.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "message": "Gagal mengubah status shift",
            "error": err.Error(),
        })
        return
    }
    
    ctx.JSON(http.StatusOK, gin.H{
        "success": true,
        "message": "Status shift berhasil diubah",
    })
}