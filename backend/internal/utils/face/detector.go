package face

import (
	"bytes"
	"encoding/base64"
	"errors"
	"fmt"
	"image"
	_ "image/jpeg"
	_ "image/png"
	"log"
	"os"
	"path/filepath"

	"github.com/disintegration/imaging"
	pigo "github.com/esimov/pigo/core"
)

func getFacefinderPath() (string, error) {
	cwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	possiblePaths := []string{
		filepath.Join(cwd, "../../internal/utils/face/facefinder"),
		filepath.Join(cwd, "../internal/utils/face/facefinder"),
		filepath.Join(cwd, "internal/utils/face/facefinder"),
		"/Users/f/Documents/Work/Klinik Absensi/klinik-absensi/backend/internal/utils/face/facefinder",
	}

	for _, path := range possiblePaths {
		if _, err := os.Stat(path); err == nil {
			log.Printf("Facefinder ditemukan di: %s", path)
			return path, nil
		}
	}

	return "", errors.New("file facefinder tidak ditemukan")
}

func DetectFace(imageData []byte) (string, error) {
	log.Printf("DetectFace: image size=%d bytes", len(imageData))

	img, _, err := image.Decode(bytes.NewReader(imageData))
	if err != nil {
		return "", fmt.Errorf("gagal decode gambar: %v", err)
	}

	bounds := img.Bounds()
	log.Printf("Gambar asli: %dx%d", bounds.Dx(), bounds.Dy())

	resized := imaging.Resize(img, 320, 0, imaging.Lanczos)
	resizedBounds := resized.Bounds()
	log.Printf("Gambar resize: %dx%d", resizedBounds.Dx(), resizedBounds.Dy())

	width := resizedBounds.Dx()
	height := resizedBounds.Dy()

	pixels := pigo.RgbToGrayscale(resized)

	facefinderPath, err := getFacefinderPath()
	if err != nil {
		return "", fmt.Errorf("gagal menemukan cascade: %v", err)
	}

	cascadeFile, err := os.ReadFile(facefinderPath)
	if err != nil {
		return "", fmt.Errorf("gagal baca cascade: %v", err)
	}

	pigoObj := pigo.NewPigo()
	classifier, err := pigoObj.Unpack(cascadeFile)
	if err != nil {
		return "", fmt.Errorf("gagal unpack cascade: %v", err)
	}

	params := pigo.CascadeParams{
		MinSize:     100,
		MaxSize:     1000,
		ShiftFactor: 0.1,
		ScaleFactor: 1.1,
		ImageParams: pigo.ImageParams{
			Pixels: pixels,
			Rows:   height,
			Cols:   width,
			Dim:    width,
		},
	}

	angle := 0.0
	detections := classifier.RunCascade(params, angle)
	detections = classifier.ClusterDetections(detections, 0.2)

	log.Printf("Deteksi wajah: found %d faces", len(detections))

	if len(detections) == 0 {
		return "", errors.New("tidak ada wajah terdeteksi")
	}

	if len(detections) > 1 {
		return "", errors.New("terdeteksi lebih dari satu wajah")
	}

	detection := detections[0]
	log.Printf("Wajah terdeteksi: row=%d, col=%d, scale=%d, score=%f",
		detection.Row, detection.Col, detection.Scale, detection.Q)

	faceBounds := image.Rect(
		detection.Col-detection.Scale/2,
		detection.Row-detection.Scale/2,
		detection.Col+detection.Scale/2,
		detection.Row+detection.Scale/2,
	)

	faceImg := imaging.Crop(resized, faceBounds)
	faceImg = imaging.Resize(faceImg, 128, 128, imaging.Lanczos)

	var buf bytes.Buffer
	if err := imaging.Encode(&buf, faceImg, imaging.JPEG, imaging.JPEGQuality(85)); err != nil {
		return "", fmt.Errorf("gagal encode wajah: %v", err)
	}

	hash := simpleHash(buf.Bytes())
	log.Printf("Hash berhasil dibuat: %s...", hash[:20])

	return hash, nil
}

func Compare(imageData []byte, storedEncoding string) (float64, error) {
	currentEncoding, err := DetectFace(imageData)
	if err != nil {
		return 0, err
	}

	similarity := CompareStrings(currentEncoding, storedEncoding)
	confidence := similarity * 100

	log.Printf("Compare: similarity=%.2f%%, confidence=%.2f%%", similarity*100, confidence)

	return confidence, nil
}

func CalculateQuality(imageData []byte) (float64, error) {
	img, _, err := image.Decode(bytes.NewReader(imageData))
	if err != nil {
		return 0, err
	}

	bounds := img.Bounds()
	width := bounds.Dx()
	height := bounds.Dy()

	if width < 200 || height < 200 {
		log.Printf("Kualitas rendah: ukuran terlalu kecil %dx%d", width, height)
		return 0.3, nil
	}

	if width > 1000 || height > 1000 {
		log.Printf("Kualitas baik: ukuran %dx%d", width, height)
		return 0.9, nil
	}

	log.Printf("Kualitas sedang: ukuran %dx%d", width, height)
	return 0.7, nil
}

func simpleHash(data []byte) string {
	return base64.StdEncoding.EncodeToString(data)
}

func CompareStrings(a, b string) float64 {
	if len(a) == 0 || len(b) == 0 {
		return 0
	}

	aBytes, err := base64.StdEncoding.DecodeString(a)
	if err != nil {
		log.Printf("Gagal decode string a: %v", err)
		return 0
	}

	bBytes, err := base64.StdEncoding.DecodeString(b)
	if err != nil {
		log.Printf("Gagal decode string b: %v", err)
		return 0
	}

	matches := 0
	minLen := len(aBytes)
	if len(bBytes) < minLen {
		minLen = len(bBytes)
	}

	for i := 0; i < minLen; i++ {
		if aBytes[i] == bBytes[i] {
			matches++
		}
	}

	similarity := float64(matches) / float64(minLen)
	return similarity
}
