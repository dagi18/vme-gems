
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'organizer' | 'usher';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  role: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuth: (auth: { isAuthenticated: boolean; role: string }) => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for each role
const mockUsers: Record<UserRole, User> = {
  admin: {
    id: '1',
    name: 'Admin User',
    email: 'admin@eventpro.com',
    role: 'admin',
  },
  organizer: {
    id: '2',
    name: 'Event Organizer',
    email: 'organizer@eventpro.com',
    role: 'organizer',
  },
  usher: {
    id: '3',
    name: 'Event Usher',
    email: 'usher@eventpro.com',
    role: 'usher',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('eventpro_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email matches any of our mock users
    if (email === 'admin@eventpro.com') {
      setUser(mockUsers.admin);
      localStorage.setItem('eventpro_user', JSON.stringify(mockUsers.admin));
      setIsAuthenticated(true);
      setRole('admin');
    } else if (email === 'organizer@eventpro.com') {
      setUser(mockUsers.organizer);
      localStorage.setItem('eventpro_user', JSON.stringify(mockUsers.organizer));
      setIsAuthenticated(true);
      setRole('organizer');
    } else if (email === 'usher@eventpro.com') {
      setUser(mockUsers.usher);
      localStorage.setItem('eventpro_user', JSON.stringify(mockUsers.usher));
      setIsAuthenticated(true);
      setRole('usher');
    } else {
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventpro_user');
  };

  // For development purposes - allows switching between roles
  const switchRole = (role: UserRole) => {
    setUser(mockUsers[role]);
    localStorage.setItem('eventpro_user', JSON.stringify(mockUsers[role]));
  };

  const setAuth = (auth: { isAuthenticated: boolean; role: string }) => {
    setIsAuthenticated(auth.isAuthenticated);
    setRole(auth.role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      role,
      login,
      logout,
      setAuth,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
