package services

import (
    "errors"
    "time"
    "github.com/golang-jwt/jwt/v5"
    "github.com/google/uuid"
    "golang.org/x/crypto/bcrypt"
    "github.com/moccalatt3/klinik-absensi/internal/config"
    "github.com/moccalatt3/klinik-absensi/internal/models"
    "github.com/moccalatt3/klinik-absensi/internal/repository"
    "github.com/moccalatt3/klinik-absensi/pkg/utils"
)

type AuthService struct {
    userRepo     *repository.UserRepository
    resetRepo    *repository.PasswordResetRepository
    emailService *EmailService
}

func NewAuthService() *AuthService {
    return &AuthService{
        userRepo:     repository.NewUserRepository(),
        resetRepo:    repository.NewPasswordResetRepository(),
        emailService: NewEmailService(),
    }
}

type Claims struct {
    UserID uuid.UUID `json:"userId"`
    Email  string    `json:"email"`
    Role   string    `json:"role"`
    jwt.RegisteredClaims
}

func (s *AuthService) Register(name, email, password string) (*models.User, error) {
    exists, err := s.userRepo.EmailExists(email)
    if err != nil {
        return nil, err
    }
    if exists {
        return nil, errors.New("email already exists")
    }
    user := &models.User{
        Name:     name,
        Email:    email,
        Password: password,
        IsActive: true,
    }
    if err := s.userRepo.Create(user); err != nil {
        return nil, err
    }
    return s.userRepo.FindByEmail(email)
}

func (s *AuthService) Login(email, password string) (string, *models.User, error) {
    user, err := s.userRepo.FindByEmail(email)
    if err != nil {
        return "", nil, err
    }
    if user == nil {
        return "", nil, errors.New("invalid credentials")
    }
    if !user.IsActive {
        return "", nil, errors.New("account is deactivated")
    }
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
        return "", nil, errors.New("invalid credentials")
    }
    roles, err := s.userRepo.GetUserRoles(user.ID)
    var primaryRole string
    if err == nil && len(roles) > 0 {
        primaryRole = roles[0]
    } else {
        primaryRole = "user"
    }
    claims := &Claims{
        UserID: user.ID,
        Email:  user.Email,
        Role:   primaryRole,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
        },
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString([]byte(config.AppConfig.JWTSecret))
    if err != nil {
        return "", nil, err
    }
    s.userRepo.UpdateLastLogin(user.ID)
    return tokenString, user, nil
}

func (s *AuthService) ValidateToken(tokenString string) (*Claims, error) {
    token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
        return []byte(config.AppConfig.JWTSecret), nil
    })
    if err != nil {
        return nil, err
    }
    if claims, ok := token.Claims.(*Claims); ok && token.Valid {
        return claims, nil
    }
    return nil, errors.New("invalid token")
}

func (s *AuthService) GetUserByID(id uuid.UUID) (*models.User, error) {
    return s.userRepo.FindByID(id)
}

func (s *AuthService) ForgotPassword(email string) (string, error) {
    user, err := s.userRepo.FindByEmail(email)
    if err != nil {
        return "", err
    }
    if user == nil {
        return "", nil
    }
    s.resetRepo.DeleteByEmail(email)
    token := utils.GenerateRandomToken(64)
    hashedToken := utils.HashToken(token)
    reset := &models.PasswordReset{
        Email:     email,
        Token:     hashedToken,
        ExpiresAt: time.Now().Add(time.Hour),
    }
    if err := s.resetRepo.Create(reset); err != nil {
        return "", err
    }
    return token, nil
}

func (s *AuthService) ResetPassword(token, newPassword string) error {
    hashedToken := utils.HashToken(token)
    reset, err := s.resetRepo.FindByToken(hashedToken)
    if err != nil {
        return err
    }
    if reset == nil {
        return errors.New("invalid or expired token")
    }
    if reset.IsExpired() {
        s.resetRepo.DeleteByToken(hashedToken)
        return errors.New("token has expired")
    }
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    if err := s.userRepo.UpdatePassword(reset.Email, string(hashedPassword)); err != nil {
        return err
    }
    s.resetRepo.DeleteByToken(hashedToken)
    return nil
}

func (s *AuthService) ValidateResetToken(token string) (string, error) {
    hashedToken := utils.HashToken(token)
    reset, err := s.resetRepo.FindByToken(hashedToken)
    if err != nil {
        return "", err
    }
    if reset == nil {
        return "", errors.New("invalid token")
    }
    if reset.IsExpired() {
        s.resetRepo.DeleteByToken(hashedToken)
        return "", errors.New("token has expired")
    }
    return reset.Email, nil
}

func (s *AuthService) GetUserPermissions(userID uuid.UUID) ([]string, []string, error) {
    return s.userRepo.GetUserPermissions(userID)
}