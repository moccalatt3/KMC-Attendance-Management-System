package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/controllers"
    "github.com/moccalatt3/klinik-absensi/internal/middleware"
)

func SetupPositionRoutes(router *gin.Engine) {
    positionController := controllers.NewPositionController()
    
    api := router.Group("/api")
    {
        position := api.Group("/position")
        position.Use(middleware.AuthMiddleware())
        {
            position.GET("", positionController.DaftarPosition)
            position.GET("/aktif", positionController.DaftarPositionAktif)
            position.GET("/statistik", positionController.StatistikPosition)
            position.GET("/:id", positionController.DetailPosition)
            position.POST("", positionController.TambahPosition)
            position.PUT("/:id", positionController.UbahPosition)
            position.DELETE("/:id", positionController.HapusPosition)
            position.PATCH("/:id/toggle", positionController.ToggleStatusPosition)
        }
    }
}