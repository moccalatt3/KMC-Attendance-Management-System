package controllers

import (
    "net/http"
    "log"
    "github.com/gin-gonic/gin"
    "github.com/go-playground/validator/v10"
    "github.com/google/uuid"
    "github.com/moccalatt3/klinik-absensi/internal/services"
)

type AuthController struct {
    authService *services.AuthService
    validate    *validator.Validate
}

func NewAuthController() *AuthController {
    return &AuthController{
        authService: services.NewAuthService(),
        validate:    validator.New(),
    }
}

type RegisterRequest struct {
    Name     string `json:"name" binding:"required,min=2"`
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=6"`
}

type LoginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

type ForgotPasswordRequest struct {
    Email string `json:"email" binding:"required,email"`
}

type ResetPasswordRequest struct {
    Token    string `json:"token" binding:"required"`
    Password string `json:"password" binding:"required,min=6"`
}

type ValidateTokenRequest struct {
    Token string `json:"token" binding:"required"`
}

type PermissionResponse struct {
    UserID      string   `json:"user_id"`
    Permissions []string `json:"permissions"`
    Roles       []string `json:"roles"`
}

type LoginResponse struct {
    Message     string      `json:"message"`
    Token       string      `json:"token"`
    User        interface{} `json:"user"`
    Permissions []string    `json:"permissions"`
    Roles       []string    `json:"roles"`
}

type MeResponse struct {
    User        interface{} `json:"user"`
    Permissions []string    `json:"permissions"`
    Roles       []string    `json:"roles"`
}

func (c *AuthController) Register(ctx *gin.Context) {
    var req RegisterRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"errors": []gin.H{{"msg": err.Error()}}})
        return
    }
    user, err := c.authService.Register(req.Name, req.Email, req.Password)
    if err != nil {
        if err.Error() == "email already exists" {
            ctx.JSON(http.StatusBadRequest, gin.H{"message": "Email already exists"})
            return
        }
        ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
        return
    }
    ctx.JSON(http.StatusCreated, gin.H{
        "message": "User registered successfully",
        "user":    user,
    })
}

func (c *AuthController) Login(ctx *gin.Context) {
    var req LoginRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"errors": []gin.H{{"msg": err.Error()}}})
        return
    }
    
    token, user, err := c.authService.Login(req.Email, req.Password)
    if err != nil {
        ctx.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
        return
    }
    
    permissions, roles, err := c.authService.GetUserPermissions(user.ID)
    if err != nil {
        log.Printf("Error getting permissions after login: %v", err)
    }
    
    ctx.JSON(http.StatusOK, LoginResponse{
        Message:     "Login successful",
        Token:       token,
        User:        user,
        Permissions: permissions,
        Roles:       roles,
    })
}

func (c *AuthController) GetMe(ctx *gin.Context) {
    userID, exists := ctx.Get("user_id")
    if !exists {
        ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
        return
    }
    
    user, err := c.authService.GetUserByID(userID.(uuid.UUID))
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
        return
    }
    if user == nil {
        ctx.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
        return
    }
    
    permissions, roles, err := c.authService.GetUserPermissions(userID.(uuid.UUID))
    if err != nil {
        log.Printf("Error getting permissions: %v", err)
    }
    
    ctx.JSON(http.StatusOK, MeResponse{
        User:        user,
        Permissions: permissions,
        Roles:       roles,
    })
}

func (c *AuthController) GetUserPermissions(ctx *gin.Context) {
    userIDParam := ctx.Param("id")
    userID, err := uuid.Parse(userIDParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }
    permissions, roles, err := c.authService.GetUserPermissions(userID)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    ctx.JSON(http.StatusOK, PermissionResponse{
        UserID:      userID.String(),
        Permissions: permissions,
        Roles:       roles,
    })
}

func (c *AuthController) ForgotPassword(ctx *gin.Context) {
    var req ForgotPasswordRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"errors": []gin.H{{"msg": err.Error()}}})
        return
    }
    token, err := c.authService.ForgotPassword(req.Email)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
        return
    }
    if token == "" {
        ctx.JSON(http.StatusOK, gin.H{"message": "If your email is registered, you will receive a password reset link"})
        return
    }
    emailService := services.NewEmailService()
    if err := emailService.SendResetPasswordEmail(req.Email, token); err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to send email"})
        return
    }
    ctx.JSON(http.StatusOK, gin.H{
        "message": "Password reset email sent successfully",
    })
}

func (c *AuthController) ResetPassword(ctx *gin.Context) {
    var req ResetPasswordRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"errors": []gin.H{{"msg": err.Error()}}})
        return
    }
    if err := c.authService.ResetPassword(req.Token, req.Password); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
        return
    }
    ctx.JSON(http.StatusOK, gin.H{"message": "Password reset successful. You can now login with your new password."})
}

func (c *AuthController) ValidateResetToken(ctx *gin.Context) {
    var req ValidateTokenRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"valid": false, "message": "Token is required"})
        return
    }
    email, err := c.authService.ValidateResetToken(req.Token)
    if err != nil {
        ctx.JSON(http.StatusOK, gin.H{"valid": false, "message": err.Error()})
        return
    }
    ctx.JSON(http.StatusOK, gin.H{"valid": true, "email": email})
}