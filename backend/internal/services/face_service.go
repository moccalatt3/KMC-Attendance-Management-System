package services

import (
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/google/uuid"
	"github.com/moccalatt3/klinik-absensi/internal/models"
	"github.com/moccalatt3/klinik-absensi/internal/repository"
	"github.com/moccalatt3/klinik-absensi/internal/utils/face"
)

type FaceService struct {
	faceRepo     *repository.FaceRepository
	karyawanRepo *repository.KaryawanRepository
	uploadDir    string
}

func NewFaceService() *FaceService {
	uploadDir := "uploads/face"
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		os.MkdirAll(uploadDir, 0755)
	}
	return &FaceService{
		faceRepo:     repository.NewFaceRepository(),
		karyawanRepo: repository.NewKaryawanRepository(),
		uploadDir:    uploadDir,
	}
}

func (s *FaceService) RegisterBatch(employeeIDStr string, images [][]byte, poses []string) ([]*models.FaceEmbedding, error) {
	karyawan, err := s.karyawanRepo.AmbilByNIP(employeeIDStr)
	if err != nil || karyawan == nil {
		return nil, errors.New("karyawan tidak ditemukan")
	}

	log.Printf("RegisterBatch: karyawan=%s, images=%d", karyawan.EmployeeID, len(images))

	var embeddings []*models.FaceEmbedding
	for i, imageData := range images {
		log.Printf("Memproses gambar %d dengan pose %s", i, poses[i])

		encoding, err := face.DetectFace(imageData)
		if err != nil {
			log.Printf("Gagal deteksi wajah untuk pose %s: %v", poses[i], err)
			continue
		}

		quality, err := face.CalculateQuality(imageData)
		if err != nil {
			log.Printf("Gagal hitung kualitas untuk pose %s: %v", poses[i], err)
			quality = 0.7
		}

		if quality < 0.5 {
			log.Printf("Kualitas terlalu rendah untuk pose %s: %f", poses[i], quality)
			continue
		}

		filename := fmt.Sprintf("%s_%s_%d.jpg", karyawan.ID.String(), poses[i], time.Now().UnixNano())
		filepath := filepath.Join(s.uploadDir, filename)

		if err := os.WriteFile(filepath, imageData, 0644); err != nil {
			log.Printf("Gagal simpan file untuk pose %s: %v", poses[i], err)
			continue
		}

		embedding := &models.FaceEmbedding{
			ID:           uuid.New(),
			EmployeeID:   karyawan.ID,
			FaceEncoding: encoding,
			FaceImageURL: "/uploads/face/" + filename,
			IsPrimary:    i == 0,
			PoseType:     poses[i],
			QualityScore: quality,
			CaptureOrder: i + 1,
			CreatedAt:    time.Now(),
		}

		if err := s.faceRepo.Create(embedding); err != nil {
			log.Printf("Gagal simpan ke DB untuk pose %s: %v", poses[i], err)
			continue
		}

		embeddings = append(embeddings, embedding)
		log.Printf("Berhasil simpan embedding untuk pose %s", poses[i])
	}

	if len(embeddings) == 0 {
		return nil, errors.New("tidak ada wajah yang berhasil diregistrasi")
	}

	updateData := map[string]interface{}{
		"has_face":        true,
		"face_updated_at": time.Now(),
	}
	s.karyawanRepo.Perbarui(karyawan.ID, updateData)

	log.Printf("Registrasi berhasil: %d embeddings tersimpan", len(embeddings))
	return embeddings, nil
}

func (s *FaceService) VerifyEnhanced(employeeIDStr string, images [][]byte) (bool, float64, error) {
	karyawan, err := s.karyawanRepo.AmbilByNIP(employeeIDStr)
	if err != nil || karyawan == nil {
		return false, 0, errors.New("karyawan tidak ditemukan")
	}

	log.Printf("VerifyEnhanced: karyawan=%s, images=%d", karyawan.EmployeeID, len(images))

	allEmbeddings, err := s.faceRepo.GetByEmployeeID(karyawan.ID)
	if err != nil {
		return false, 0, fmt.Errorf("gagal ambil embeddings: %v", err)
	}

	if len(allEmbeddings) == 0 {
		return false, 0, errors.New("wajah belum diregistrasi")
	}

	log.Printf("Ditemukan %d embeddings untuk perbandingan", len(allEmbeddings))

	var totalConfidence float64
	var validCount int

	for idx, imgData := range images {
		log.Printf("Memproses gambar verifikasi %d", idx)

		currentEncoding, err := face.DetectFace(imgData)
		if err != nil {
			log.Printf("Gagal deteksi wajah pada gambar %d: %v", idx, err)
			continue
		}

		var bestConfidence float64
		var bestMatch string

		for _, emb := range allEmbeddings {
			sim := face.CompareStrings(currentEncoding, emb.FaceEncoding)
			conf := sim * 100

			if conf > bestConfidence {
				bestConfidence = conf
				bestMatch = emb.PoseType
			}
		}

		if bestConfidence > 0 {
			log.Printf("Gambar %d: confidence terbaik %.2f%% dengan pose %s", idx, bestConfidence, bestMatch)
			totalConfidence += bestConfidence
			validCount++
		}
	}

	if validCount == 0 {
		return false, 0, errors.New("tidak dapat memverifikasi wajah")
	}

	avgConfidence := totalConfidence / float64(validCount)
	success := avgConfidence >= 75.0

	log.Printf("Hasil verifikasi: success=%v, avgConfidence=%.2f%%, validCount=%d", success, avgConfidence, validCount)

	for idx, imgData := range images {
		filename := fmt.Sprintf("verify_%s_%d_%d.jpg", karyawan.ID.String(), time.Now().UnixNano(), idx)
		filepath := filepath.Join(s.uploadDir, filename)
		os.WriteFile(filepath, imgData, 0644)

		status := "failed"
		if success {
			status = "success"
		}

		logEntry := &models.FaceLog{
			ID:         uuid.New(),
			EmployeeID: karyawan.ID,
			Status:     status,
			Confidence: avgConfidence,
			ImageURL:   "/uploads/face/" + filename,
			CreatedAt:  time.Now(),
		}
		s.faceRepo.LogVerification(logEntry)
	}

	return success, avgConfidence, nil
}

func (s *FaceService) GetStatus(employeeIDStr string) (map[string]interface{}, error) {
	karyawan, err := s.karyawanRepo.AmbilByNIP(employeeIDStr)
	if err != nil || karyawan == nil {
		return nil, errors.New("karyawan tidak ditemukan")
	}

	embeddings, err := s.faceRepo.GetByEmployeeID(karyawan.ID)
	if err != nil {
		return nil, err
	}

	hasFace := len(embeddings) > 0
	var primaryID *uuid.UUID
	var registeredAt *time.Time
	var poseCount int

	if hasFace {
		poseCount = len(embeddings)
		for _, e := range embeddings {
			if e.IsPrimary {
				primaryID = &e.ID
				registeredAt = &e.CreatedAt
				break
			}
		}
	}

	return map[string]interface{}{
		"has_face":      hasFace,
		"total_faces":   len(embeddings),
		"pose_count":    poseCount,
		"primary_id":    primaryID,
		"registered_at": registeredAt,
	}, nil
}

func (s *FaceService) GetHistory(employeeID uuid.UUID, limit int) ([]models.FaceLog, error) {
	return s.faceRepo.GetHistory(employeeID, limit)
}
