import { LoadingScreen } from '@/components/LoadingScreen';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Simple storage utility that works on web and mobile
const storage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load authentication state on app start
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const authState = storage.getItem('authState');
      if (authState) {
        setIsAuthenticated(JSON.parse(authState));
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // Check for the specific credentials
    if (username === 'krishnamodi' && password === 'Admin@123') {
      setIsAuthenticated(true);
      // Persist the authentication state
      try {
        storage.setItem('authState', JSON.stringify(true));
      } catch (error) {
        console.error('Error saving auth state:', error);
      }
      return true;
    }
    return false;
  };

  const logout = async () => {
    setIsAuthenticated(false);
    // Clear the authentication state
    try {
      storage.removeItem('authState');
    } catch (error) {
      console.error('Error clearing auth state:', error);
    }
  };

  // Show loading screen while checking authentication state
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 