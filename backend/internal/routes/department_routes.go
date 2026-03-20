package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/controllers"
    "github.com/moccalatt3/klinik-absensi/internal/middleware"
)

func SetupDepartmentRoutes(router *gin.Engine) {
    departmentController := controllers.NewDepartmentController()
    
    api := router.Group("/api")
    {
        department := api.Group("/department")
        department.Use(middleware.AuthMiddleware())
        {
            department.GET("", departmentController.DaftarDepartment)
            department.GET("/aktif", departmentController.DaftarDepartmentAktif)
            department.GET("/root", departmentController.DaftarRootDepartment)
            department.GET("/statistik", departmentController.StatistikDepartment)
            department.GET("/:id", departmentController.DetailDepartment)
            department.POST("", departmentController.TambahDepartment)
            department.PUT("/:id", departmentController.UbahDepartment)
            department.DELETE("/:id", departmentController.HapusDepartment)
            department.PATCH("/:id/toggle", departmentController.ToggleStatusDepartment)
        }
    }
}