import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        try {
          const permissions = await authService.getUserPermissions(currentUser.id);
          const userWithPermissions = {
            ...currentUser,
            permissions: permissions || []
          };
          setUser(userWithPermissions);
        } catch (error) {
          console.error('Failed to load permissions:', error);
          setUser(currentUser);
        }
      }
      setLoading(false);
    };
    
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      
      const permissions = await authService.getUserPermissions(response.user.id);
      const userWithPermissions = {
        ...response.user,
        permissions: permissions || []
      };
      
      setUser(userWithPermissions);
      localStorage.setItem('user', JSON.stringify(userWithPermissions));
      
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.roles?.includes('super_admin')) return true;
    return user.permissions?.includes(permission) || false;
  };

  const hasAnyPermission = (permissions) => {
    if (!user) return false;
    if (user.roles?.includes('super_admin')) return true;
    return permissions.some(p => user.permissions?.includes(p));
  };

  const value = {
    user,
    login,
    register,
    logout,
    hasPermission,
    hasAnyPermission,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};