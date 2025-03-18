
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation - in a real app this would be an API call
      if (password.length < 6) {
        toast.error("Authentication failed", {
          description: "Invalid email or password"
        });
        return false;
      }
      
      const newUser = { id: `user-${Date.now()}`, email };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Welcome back!");
      
      return true;
    } catch (error) {
      toast.error("Authentication failed", {
        description: "Service is temporarily unavailable"
      });
      return false;
    }
  };

  const signup = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation - in a real app this would be an API call
      if (password.length < 6) {
        toast.error("Sign up failed", {
          description: "Password must be at least 6 characters"
        });
        return false;
      }
      
      // Create and store user
      const newUser = { id: `user-${Date.now()}`, email, name };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Account created successfully!");
      
      return true;
    } catch (error) {
      toast.error("Sign up failed", {
        description: "Service is temporarily unavailable"
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('joinedEvents');
    localStorage.removeItem('browsing_locked');
    toast.info("You've been logged out");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading,
      isAuthenticated: !!user,
      login, 
      signup, 
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
