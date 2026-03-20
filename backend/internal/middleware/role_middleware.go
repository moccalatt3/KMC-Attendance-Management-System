package middleware

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func RoleMiddleware(allowedRoles ...string) gin.HandlerFunc {
    return func(ctx *gin.Context) {
        userRole, exists := ctx.Get("userRole")
        if !exists {
            ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
            ctx.Abort()
            return
        }
        roleStr, ok := userRole.(string)
        if !ok {
            ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Invalid role format"})
            ctx.Abort()
            return
        }
        for _, allowedRole := range allowedRoles {
            if roleStr == allowedRole {
                ctx.Next()
                return
            }
        }
        ctx.JSON(http.StatusForbidden, gin.H{
            "message": "Access denied. Required roles: " + stringsJoin(allowedRoles, ", "),
        })
        ctx.Abort()
    }
}

func stringsJoin(strs []string, sep string) string {
    if len(strs) == 0 {
        return ""
    }
    result := strs[0]
    for _, s := range strs[1:] {
        result += sep + s
    }
    return result
}