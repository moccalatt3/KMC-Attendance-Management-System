package middleware

import (
    "net/http"
    "strings"
    "github.com/gin-gonic/gin"
    "github.com/moccalatt3/klinik-absensi/internal/services"
)

func AuthMiddleware() gin.HandlerFunc {
    return func(ctx *gin.Context) {
        authHeader := ctx.GetHeader("Authorization")
        if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
            ctx.JSON(http.StatusUnauthorized, gin.H{"message": "No token, authorization denied"})
            ctx.Abort()
            return
        }
        tokenString := strings.TrimPrefix(authHeader, "Bearer ")
        authService := services.NewAuthService()
        claims, err := authService.ValidateToken(tokenString)
        if err != nil {
            ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Token is not valid"})
            ctx.Abort()
            return
        }
        ctx.Set("userID", claims.UserID)
        ctx.Set("userEmail", claims.Email)
        ctx.Set("userRole", claims.Role)
        ctx.Next()
    }
}