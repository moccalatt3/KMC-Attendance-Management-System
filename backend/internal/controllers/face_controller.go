package controllers

import (
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/moccalatt3/klinik-absensi/internal/services"
)

type FaceController struct {
	service *services.FaceService
}

func NewFaceController() *FaceController {
	return &FaceController{
		service: services.NewFaceService(),
	}
}

func (c *FaceController) Register(ctx *gin.Context) {
	employeeIDStr := ctx.PostForm("employee_id")
	if employeeIDStr == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "employee_id wajib diisi",
		})
		return
	}

	form, err := ctx.MultipartForm()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "gagal membaca form",
		})
		return
	}

	images := form.File["images"]
	poses := ctx.PostFormArray("poses")

	log.Printf("Register request: employee_id=%s, images=%d, poses=%v", employeeIDStr, len(images), poses)

	if len(images) == 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "minimal 1 gambar wajib diupload",
		})
		return
	}

	if len(poses) != len(images) {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "jumlah pose harus sama dengan jumlah gambar",
		})
		return
	}

	var imagesData [][]byte
	for _, fileHeader := range images {
		file, err := fileHeader.Open()
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "gagal membaca gambar",
			})
			return
		}
		defer file.Close()

		imageData, err := io.ReadAll(file)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "gagal membaca gambar",
			})
			return
		}
		imagesData = append(imagesData, imageData)
	}

	embeddings, err := c.service.RegisterBatch(employeeIDStr, imagesData, poses)
	if err != nil {
		log.Printf("Register error: %v", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	var result []gin.H
	for _, e := range embeddings {
		result = append(result, gin.H{
			"id":            e.ID,
			"pose_type":     e.PoseType,
			"quality_score": e.QualityScore,
			"capture_order": e.CaptureOrder,
			"image_url":     e.FaceImageURL,
		})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Registrasi wajah berhasil",
		"data":    result,
	})
}

func (c *FaceController) Verify(ctx *gin.Context) {
	employeeIDStr := ctx.PostForm("employee_id")
	if employeeIDStr == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "employee_id wajib diisi",
		})
		return
	}

	form, err := ctx.MultipartForm()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "gagal membaca form",
		})
		return
	}

	images := form.File["images"]
	if len(images) == 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "gambar wajib diupload",
		})
		return
	}

	log.Printf("Verify request: employee_id=%s, images=%d", employeeIDStr, len(images))

	var imagesData [][]byte
	for _, fileHeader := range images {
		file, err := fileHeader.Open()
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "gagal membaca gambar",
			})
			return
		}
		defer file.Close()

		imageData, err := io.ReadAll(file)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "gagal membaca gambar",
			})
			return
		}
		imagesData = append(imagesData, imageData)
	}

	verified, confidence, err := c.service.VerifyEnhanced(employeeIDStr, imagesData)
	if err != nil {
		log.Printf("Verify error: %v", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": verified,
		"message": func() string {
			if verified {
				return "Verifikasi berhasil"
			}
			return "Verifikasi gagal"
		}(),
		"data": gin.H{
			"verified":   verified,
			"confidence": confidence,
			"threshold":  75.0,
		},
	})
}

func (c *FaceController) Status(ctx *gin.Context) {
	employeeIDStr := ctx.Query("employee_id")
	if employeeIDStr == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "employee_id wajib diisi",
		})
		return
	}

	status, err := c.service.GetStatus(employeeIDStr)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    status,
	})
}

func (c *FaceController) History(ctx *gin.Context) {
	employeeIDStr := ctx.Query("employee_id")
	if employeeIDStr == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "employee_id wajib diisi",
		})
		return
	}

	employeeID, err := uuid.Parse(employeeIDStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "employee_id tidak valid",
		})
		return
	}

	limitStr := ctx.DefaultQuery("limit", "10")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 10
	}

	logs, err := c.service.GetHistory(employeeID, limit)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    logs,
	})
}
