package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/moccalatt3/klinik-absensi/internal/controllers"
	"github.com/moccalatt3/klinik-absensi/internal/middleware"
)

func SetupFaceRoutes(router *gin.Engine) {
	faceController := controllers.NewFaceController()

	api := router.Group("/api")
	{
		face := api.Group("/face")
		face.Use(middleware.AuthMiddleware())
		{
			face.POST("/register", faceController.Register)
			face.POST("/verify", faceController.Verify)
			face.GET("/status", faceController.Status)
			face.GET("/history", faceController.History)
		}
	}
}
