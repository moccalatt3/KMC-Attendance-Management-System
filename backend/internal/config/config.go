package config

import (
    "log"
    "os"
    "github.com/joho/godotenv"
)

type Config struct {
    AppName          string
    AppEnv           string
    Port             string
    JWTSecret        string
    JWTExpiresIn     string
    DBHost           string
    DBPort           string
    DBUser           string
    DBPassword       string
    DBName           string
    DBSSLMode        string
    DBTimeZone       string
    FrontendURL      string
    SMTPHost         string
    SMTPPort         string
    SMTPUser         string
    SMTPPass         string
    SMTPAuthEmail    string
    ResetTokenExpiry string
}

var AppConfig Config

func Load() {
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }
    AppConfig = Config{
        AppName:          getEnv("APP_NAME", "Klinik Absensi"),
        AppEnv:           getEnv("APP_ENV", "development"),
        Port:             getEnv("PORT", "5001"),
        JWTSecret:        getEnv("JWT_SECRET", "your-secret-key"),
        JWTExpiresIn:     getEnv("JWT_EXPIRES_IN", "24h"),
        DBHost:           getEnv("DB_HOST", "localhost"),
        DBPort:           getEnv("DB_PORT", "5432"),
        DBUser:           getEnv("DB_USER", "postgres"),
        DBPassword:       getEnv("DB_PASSWORD", ""),
        DBName:           getEnv("DB_NAME", "klinik_absensi"),
        DBSSLMode:        getEnv("DB_SSLMODE", "disable"),
        DBTimeZone:       getEnv("DB_TIMEZONE", "Asia/Jakarta"),
        FrontendURL:      getEnv("FRONTEND_URL", "http://localhost:5173"),
        SMTPHost:         getEnv("SMTP_HOST", "smtp.ethereal.email"),
        SMTPPort:         getEnv("SMTP_PORT", "587"),
        SMTPUser:         getEnv("SMTP_USER", ""),
        SMTPPass:         getEnv("SMTP_PASS", ""),
        ResetTokenExpiry: getEnv("RESET_TOKEN_EXPIRY", "3600"),
    }
}

func getEnv(key, defaultValue string) string {
    if value, exists := os.LookupEnv(key); exists {
        return value
    }
    return defaultValue
}