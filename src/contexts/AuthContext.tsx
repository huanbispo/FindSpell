import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, mockUsers, mockAuthDelay } from "../config/mockAuth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("mockUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth state
    const checkAuth = async () => {
      await mockAuthDelay();
      const savedUser = localStorage.getItem("mockUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const signInWithGoogle = async () => {
    await mockAuthDelay();
    setUser(mockUsers.google);
    localStorage.setItem("mockUser", JSON.stringify(mockUsers.google));
  };

  const signInWithApple = async () => {
    await mockAuthDelay();
    setUser(mockUsers.apple);
    localStorage.setItem("mockUser", JSON.stringify(mockUsers.apple));
  };

  const signOut = async () => {
    await mockAuthDelay();
    setUser(null);
    localStorage.removeItem("mockUser");
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithApple,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
