package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/controllers"
    "github.com/moccalatt3/klinik-absensi/internal/middleware"
)

func SetupRoleRoutes(router *gin.Engine) {
    roleController := controllers.NewRoleController()
    
    api := router.Group("/api")
    api.Use(middleware.AuthMiddleware())
    {
        roles := api.Group("/roles")
        {
            roles.GET("", roleController.DaftarRoles)
            roles.GET("/:id", roleController.DetailRole)
            roles.GET("/:id/permissions", roleController.PermissionsRole)
            roles.POST("", roleController.TambahRole)
            roles.PUT("/:id", roleController.UbahRole)
            roles.PUT("/:id/permissions", roleController.UpdatePermissionsRole)
            roles.DELETE("/:id", roleController.HapusRole)
        }
    }
}