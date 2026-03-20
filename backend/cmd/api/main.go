package main

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/moccalatt3/klinik-absensi/internal/config"
	"github.com/moccalatt3/klinik-absensi/internal/models"
	"github.com/moccalatt3/klinik-absensi/internal/routes"
	"github.com/moccalatt3/klinik-absensi/pkg/database"
)

func main() {
	config.Load()
	database.Connect()

	db := database.GetDB()

	err := db.AutoMigrate(
		&models.User{},
		&models.PasswordReset{},
		&models.Shift{},
		&models.Department{},
		&models.Position{},
		&models.Role{},
		&models.Permission{},
		&models.RolePermission{},
		&models.FaceEmbedding{},
		&models.FaceLog{},
	)

	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	log.Println("Database migration completed successfully")

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000", config.AppConfig.FrontendURL},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.OPTIONS("/*path", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, X-Requested-With")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Status(204)
	})

	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":    "OK",
			"message":   "Server is running",
			"timestamp": time.Now(),
		})
	})

	router.Static("/uploads", "./uploads")

	routes.Setup(router)
	routes.SetupKaryawanRoutes(router)
	routes.SetupShiftRoutes(router)
	routes.SetupDepartmentRoutes(router)
	routes.SetupPositionRoutes(router)
	routes.SetupRoleRoutes(router)
	routes.SetupPermissionRoutes(router)
	routes.SetupFaceRoutes(router)

	log.Printf("Server running on port %s", config.AppConfig.Port)
	router.Run(":" + config.AppConfig.Port)
}
