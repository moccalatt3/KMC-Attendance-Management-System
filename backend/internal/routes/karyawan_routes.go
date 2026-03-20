package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/controllers"
    "github.com/moccalatt3/klinik-absensi/internal/middleware"
)

func SetupKaryawanRoutes(router *gin.Engine) {
    karyawanController := controllers.NewKaryawanController()
    
    api := router.Group("/api")
    {
        karyawan := api.Group("/karyawan")
        karyawan.Use(middleware.AuthMiddleware())
        {
            karyawan.GET("", karyawanController.DaftarKaryawan)
            karyawan.GET("/statistik", karyawanController.StatistikKaryawan)
            karyawan.GET("/:id", karyawanController.DetailKaryawan)
            karyawan.POST("", karyawanController.TambahKaryawan)
            karyawan.PUT("/:id", karyawanController.UbahKaryawan)
            karyawan.DELETE("/:id", karyawanController.HapusKaryawan)
        }
    }
}