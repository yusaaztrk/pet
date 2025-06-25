// src/services/firebase.ts
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

class FirebaseAuthService {
  private static instance: FirebaseAuthService;

  private constructor() {
    this.initializeGoogleSignIn();
  }

  public static getInstance(): FirebaseAuthService {
    if (!FirebaseAuthService.instance) {
      FirebaseAuthService.instance = new FirebaseAuthService();
    }
    return FirebaseAuthService.instance;
  }

  private initializeGoogleSignIn(): void {
    GoogleSignin.configure({
      webClientId: 'AIzaSyCxWiEg9vXbXGFp2ieF7L8JWYEP5OFJWjk', // Firebase'den alınacak
      offlineAccess: false,
      forceCodeForRefreshToken: true,
    });
  }

  // Kullanıcı durumunu dinle
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        callback(null);
      }
    });
  }

  // Email ile kayıt
  async signUpWithEmail(
    email: string,
    password: string,
    displayName?: string
  ): Promise<AuthResult> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      if (displayName && userCredential.user) {
        await userCredential.user.updateProfile({ displayName });
        await userCredential.user.reload();
      }

      return {
        success: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: displayName || userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  }

  // Email ile giriş
  async signInWithEmail(email: string, password: string): Promise<AuthResult> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );

      return {
        success: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  }

  // Google ile giriş
  async signInWithGoogle(): Promise<AuthResult> {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      return {
        success: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  }

  // Şifre sıfırlama
  async resetPassword(email: string): Promise<AuthResult> {
    try {
      await auth().sendPasswordResetEmail(email);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  }

  // Çıkış yap
  async signOut(): Promise<AuthResult> {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  }

  // Mevcut kullanıcı
  getCurrentUser(): AuthUser | null {
    const user = auth().currentUser;
    return user
      ? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
      : null;
  }

  // Hata mesajlarını çevir
  private getErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'Bu e-posta adresi zaten kullanımda.',
      'auth/invalid-email': 'Geçersiz e-posta adresi.',
      'auth/operation-not-allowed': 'Bu işlem izin verilmiyor.',
      'auth/weak-password': 'Şifre çok zayıf. En az 6 karakter olmalı.',
      'auth/user-disabled': 'Bu hesap devre dışı bırakılmış.',
      'auth/user-not-found': 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.',
      'auth/wrong-password': 'Hatalı şifre.',
      'auth/invalid-credential': 'Geçersiz kimlik bilgileri.',
      'auth/network-request-failed': 'Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.',
      'auth/too-many-requests': 'Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyin.',
      'auth/provider-already-linked': 'Bu hesap zaten bağlı.',
      'auth/requires-recent-login': 'Bu işlem için son zamanlarda tekrar giriş yapmalısınız.',
      'auth/account-exists-with-different-credential': 'Bu e-posta ile farklı bir giriş yöntemi kayıtlı.',
    };

    return errorMessages[errorCode] || 'Bir hata oluştu. Lütfen tekrar deneyin.';
  }
}

const firebaseAuthService = FirebaseAuthService.getInstance();
export default firebaseAuthService;