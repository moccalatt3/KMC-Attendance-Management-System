package database

import (
    "fmt"
    "log"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"
    "github.com/moccalatt3/klinik-absensi/internal/config"
)

var DB *gorm.DB

func Connect() {
    dsn := fmt.Sprintf(
        "postgres://%s:%s@%s:%s/%s?sslmode=%s&TimeZone=%s&connect_timeout=10",
        config.AppConfig.DBUser,
        config.AppConfig.DBPassword,
        config.AppConfig.DBHost,
        config.AppConfig.DBPort,
        config.AppConfig.DBName,
        config.AppConfig.DBSSLMode,
        config.AppConfig.DBTimeZone,
    )
    
    log.Printf("Connecting with URL: %s", dsn)
    
    var err error
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }
    
    sqlDB, err := DB.DB()
    if err != nil {
        log.Fatal("Failed to get database instance:", err)
    }
    
    sqlDB.Exec("SET search_path TO public")
    
    var currentDB string
    err = sqlDB.QueryRow("SELECT current_database()").Scan(&currentDB)
    if err != nil {
        log.Fatal("Failed to get current database:", err)
    }
    log.Printf("CURRENT DATABASE: %s", currentDB)
    
    rows, err := sqlDB.Query(`
        SELECT tablename FROM pg_tables 
        WHERE schemaname='public' AND tablename IN ('users', 'password_resets')
    `)
    if err != nil {
        log.Printf("Error checking tables: %v", err)
    } else {
        defer rows.Close()
        var tables []string
        for rows.Next() {
            var table string
            rows.Scan(&table)
            tables = append(tables, table)
        }
        log.Printf("TABLES FOUND: %v", tables)
    }
    
    if err := sqlDB.Ping(); err != nil {
        log.Fatal("Database connection failed:", err)
    }
    log.Println("Database connected successfully")
}

func GetDB() *gorm.DB {
    return DB
}