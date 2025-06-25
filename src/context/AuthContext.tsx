// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import firebaseAuthService, { AuthUser, AuthResult } from '../services/firebase';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, displayName?: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe; // Cleanup function
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const result = await firebaseAuthService.signInWithEmail(email, password);
      return result;
    } catch (error) {
      return { 
        success: false, 
        error: 'Beklenmeyen bir hata oluştu' 
      };
    }
  };

  const signUp = async (email: string, password: string, displayName?: string): Promise<AuthResult> => {
    try {
      const result = await firebaseAuthService.signUpWithEmail(email, password, displayName);
      return result;
    } catch (error) {
      return { 
        success: false, 
        error: 'Beklenmeyen bir hata oluştu' 
      };
    }
  };

  const signInWithGoogle = async (): Promise<AuthResult> => {
    try {
      const result = await firebaseAuthService.signInWithGoogle();
      return result;
    } catch (error) {
      return { 
        success: false, 
        error: 'Google girişinde hata oluştu' 
      };
    }
  };

  const resetPassword = async (email: string): Promise<AuthResult> => {
    try {
      const result = await firebaseAuthService.resetPassword(email);
      return result;
    } catch (error) {
      return { 
        success: false, 
        error: 'Şifre sıfırlama hatası' 
      };
    }
  };

  const signOut = async (): Promise<AuthResult> => {
    try {
      const result = await firebaseAuthService.signOut();
      return result;
    } catch (error) {
      return { 
        success: false, 
        error: 'Çıkış yapılamadı' 
      };
    }
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