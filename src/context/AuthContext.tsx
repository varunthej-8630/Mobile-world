import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount } from '../types';
import { mockDb } from '../data/mockDb';

interface AuthContextType {
  user: UserAccount | null;
  login: (email: string, name?: string, role?: UserAccount['role']) => void;
  register: (name: string, email: string, phone?: string) => void;
  updateProfile: (updates: Partial<UserAccount>) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    setUser(mockDb.getCurrentUser());
  }, []);

  const login = (email: string, name?: string, role: UserAccount['role'] = 'customer') => {
    const logged = mockDb.loginUser(email, name || 'Geschätzter Kunde', role);
    setUser(logged);
  };

  const register = (name: string, email: string, phone?: string) => {
    const registered = mockDb.loginUser(email, name, 'customer');
    if (phone) registered.phone = phone;
    mockDb.updateUser({ phone });
    setUser(registered);
  };

  const updateProfile = (updates: Partial<UserAccount>): boolean => {
    const updated = mockDb.updateUser(updates);
    if (updated) {
      setUser({ ...updated });
      return true;
    }
    return false;
  };

  const logout = () => {
    mockDb.logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        updateProfile,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
