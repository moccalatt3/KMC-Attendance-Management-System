package services

import (
    "crypto/sha256"
    "encoding/hex"
    "fmt"
    "math/rand"
    "net/smtp"
    "github.com/moccalatt3/klinik-absensi/internal/config"
)

type EmailService struct {
    host     string
    port     string
    username string
    password string
}

func NewEmailService() *EmailService {
    return &EmailService{
        host:     config.AppConfig.SMTPHost,
        port:     config.AppConfig.SMTPPort,
        username: config.AppConfig.SMTPUser,
        password: config.AppConfig.SMTPPass,
    }
}

func (s *EmailService) SendResetPasswordEmail(to, token string) error {
    resetLink := fmt.Sprintf("%s/reset-password?token=%s", config.AppConfig.FrontendURL, token)
    subject := "Password Reset Request"
    body := fmt.Sprintf(`
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Click the link below to proceed:</p>
        <p><a href="%s">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
    `, resetLink)
    msg := fmt.Sprintf("From: %s\r\n", s.username)
    msg += fmt.Sprintf("To: %s\r\n", to)
    msg += fmt.Sprintf("Subject: %s\r\n", subject)
    msg += "MIME-version: 1.0;\r\n"
    msg += "Content-Type: text/html; charset=\"UTF-8\";\r\n\r\n"
    msg += body
    auth := smtp.PlainAuth("", s.username, s.password, s.host)
    addr := fmt.Sprintf("%s:%s", s.host, s.port)
    return smtp.SendMail(addr, auth, s.username, []string{to}, []byte(msg))
}

func generateRandomToken(length int) string {
    b := make([]byte, length)
    for i := range b {
        b[i] = byte(rand.Intn(256))
    }
    return hex.EncodeToString(b)
}

func hashToken(token string) string {
    hash := sha256.Sum256([]byte(token))
    return hex.EncodeToString(hash[:])
}