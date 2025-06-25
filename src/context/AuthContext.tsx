// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import FirebaseAuthService, { AuthUser } from '../services/firebase';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = FirebaseAuthService.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await FirebaseAuthService.signInWithEmail(email, password);
    return { success: result.success, error: result.error };
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    const result = await FirebaseAuthService.signUpWithEmail(email, password, displayName);
    return { success: result.success, error: result.error };
  };

  const signInWithGoogle = async () => {
    const result = await FirebaseAuthService.signInWithGoogle();
    return { success: result.success, error: result.error };
  };

  const resetPassword = async (email: string) => {
    const result = await FirebaseAuthService.resetPassword(email);
    return { success: result.success, error: result.error };
  };

  const signOut = async () => {
    await FirebaseAuthService.signOut();
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    resetPassword,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
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