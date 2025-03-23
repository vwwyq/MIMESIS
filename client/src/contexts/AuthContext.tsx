import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // NEW: Loading state

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false); // Auth check complete
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true); // NEW: Show loading while signing in
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = { id: '1', username: email.split('@')[0], email };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));

    setLoading(false); // Done loading
  };

  const signUp = async (username: string, email: string, password: string) => {
    setLoading(true); // NEW: Show loading while signing up
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = { id: '1', username, email };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));

    setLoading(false); // Done loading
  };

  const signOut = () => {
    setLoading(true); // NEW: Indicate loading while signing out
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    setLoading(false); // Done loading
  };

  const updateProfile = async (data: Partial<User>) => {
    setLoading(true); // NEW: Show loading while updating profile
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    setLoading(false); // Done loading
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      signIn,
      signUp,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
