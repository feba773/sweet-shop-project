// src/context/AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/api';

// Defines the shape of the user object decoded from the JWT
interface User {
  id: string;
  role: 'USER' | 'ADMIN';
}

// Defines the shape of the context value
interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  
  // Initialize user state by decoding the token from local storage on initial load
  const [user, setUser] = useState<User | null>(() => {
    const savedToken = localStorage.getItem('token');
    try {
      return savedToken ? jwtDecode<User>(savedToken) : null;
    } catch (error) {
      // If token is invalid or expired
      localStorage.removeItem('token');
      return null;
    }
  });

  const login = (newToken: string) => {
    try {
      const decodedUser = jwtDecode<User>(newToken);
      setToken(newToken);
      setUser(decodedUser);
      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } catch (error) {
      console.error("Failed to decode token:", error);
      // Handle invalid token case if necessary
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};