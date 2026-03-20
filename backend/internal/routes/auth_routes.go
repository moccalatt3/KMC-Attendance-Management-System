package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/controllers"
    "github.com/moccalatt3/klinik-absensi/internal/middleware"
)

func Setup(router *gin.Engine) {
    authController := controllers.NewAuthController()
    api := router.Group("/api")
    {
        auth := api.Group("/auth")
        {
            auth.POST("/register", authController.Register)
            auth.POST("/login", authController.Login)
            auth.POST("/forgot-password", authController.ForgotPassword)
            auth.POST("/reset-password", authController.ResetPassword)
            auth.POST("/validate-reset-token", authController.ValidateResetToken)
        }
        
        protected := api.Group("/auth")
        protected.Use(middleware.AuthMiddleware())
        {
            protected.GET("/me", authController.GetMe)
            protected.GET("/users/:id/permissions", authController.GetUserPermissions)
        }
    }
}