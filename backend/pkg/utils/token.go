package utils

import (
    "crypto/rand"
    "crypto/sha256"
    "encoding/hex"
)

func GenerateRandomToken(length int) string {
    b := make([]byte, length)
    rand.Read(b)
    return hex.EncodeToString(b)
}

func HashToken(token string) string {
    hash := sha256.Sum256([]byte(token))
    return hex.EncodeToString(hash[:])
}