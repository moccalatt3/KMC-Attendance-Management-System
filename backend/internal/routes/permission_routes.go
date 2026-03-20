package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/controllers"
    "github.com/moccalatt3/klinik-absensi/internal/middleware"
)

func SetupPermissionRoutes(router *gin.Engine) {
    permissionController := controllers.NewPermissionController()
    
    api := router.Group("/api")
    api.Use(middleware.AuthMiddleware())
    {
        permissions := api.Group("/permissions")
        {
            permissions.GET("", permissionController.DaftarPermissions)
            permissions.GET("/grouped", permissionController.DaftarGroupedPermissions)
            permissions.GET("/modules", permissionController.DaftarModules)
            permissions.GET("/:id", permissionController.DetailPermission)
            permissions.GET("/module/:module", permissionController.PermissionsByModule)
            permissions.POST("", permissionController.TambahPermission)
            permissions.PUT("/:id", permissionController.UbahPermission)
            permissions.DELETE("/:id", permissionController.HapusPermission)
        }
    }
}