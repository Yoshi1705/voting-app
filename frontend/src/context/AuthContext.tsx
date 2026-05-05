import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole, ROLE_NAMES } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (emailId: string, password: string) => Promise<void>;
  register: (name: string, emailId: string, password: string, roleId: number) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const savedToken = localStorage.getItem('voting_token');
      const savedUser = localStorage.getItem('voting_user');
      
      if (savedToken && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          parsedUser.role = ROLE_NAMES[parsedUser.roleId] || 'CANDIDATE';
          setToken(savedToken);
          setUser(parsedUser);
        } catch (error) {
          console.log("error received rendering initializeAuth",error)
          localStorage.removeItem('voting_token');
          localStorage.removeItem('voting_user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (emailId: string, password: string) => {
    const response = await authService.login({ emailId, password });
    console.log("login response" , response)
    const userData : User = {
    emailId: response.email,
    roleId: String(response.roleId),
    role : ROLE_NAMES[String(response.roleId)],
    name : response.name
    };
    
    setToken(response.token);
    setUser(userData);
    localStorage.setItem('voting_token', response.token);
    localStorage.setItem('voting_user', JSON.stringify(userData));
  };

  const register = async (
  name: string,
  emailId: string,
  password: string,
  roleId: number
) => {
  await authService.register({ 
    name, 
    emailId, 
    password, 
    roleId: Number(roleId)   
  });
};

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('voting_token');
    localStorage.removeItem('voting_user');
  };

  const hasRole = (role: UserRole | UserRole[]) => {
    if (!user || !user.role) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role as UserRole);
    }
    return user.role === role;
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
