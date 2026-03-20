package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/controllers"
    "github.com/moccalatt3/klinik-absensi/internal/middleware"
)

func SetupShiftRoutes(router *gin.Engine) {
    shiftController := controllers.NewShiftController()
    
    api := router.Group("/api")
    {
        shift := api.Group("/shift")
        shift.Use(middleware.AuthMiddleware())
        {
            shift.GET("", shiftController.DaftarShift)
            shift.GET("/:id", shiftController.DetailShift)
            shift.POST("", shiftController.TambahShift)
            shift.PUT("/:id", shiftController.UbahShift)
            shift.DELETE("/:id", shiftController.HapusShift)
            shift.PATCH("/:id/toggle", shiftController.ToggleStatusShift)
        }
    }
}