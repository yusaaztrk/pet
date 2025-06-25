import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

type NavigationProp = {
  navigate: (screenName: string) => void;
};

type Props = {
  navigation: NavigationProp;
};

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [resetSent, setResetSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const { resetPassword } = useAuth();

  const handleResetPassword = async (): Promise<void> => {
    // Email doğrulama
    if (!email || !email.includes('@')) {
      Alert.alert('Hata', 'Lütfen geçerli bir e-posta adresi girin');
      return;
    }

    setLoading(true);
    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        setResetSent(true);
      } else {
        Alert.alert('Hata', result.error || 'Şifre sıfırlama e-postası gönderilirken bir hata oluştu');
      }
    } catch (error) {
      Alert.alert('Hata', 'Beklenmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = (): void => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        style={{backgroundColor: '#ffffff'}}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>PetPal</Text>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Şifremi Unuttum</Text>
          <Text style={styles.headerSubtitle}>
            {resetSent 
              ? 'E-posta adresinize şifre sıfırlama bağlantısı gönderildi' 
              : 'E-posta adresinizi girerek şifrenizi sıfırlayabilirsiniz'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          {!resetSent ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>E-posta</Text>
                <TextInput
                  style={styles.input}
                  placeholder="E-posta adresinizi girin"
                  placeholderTextColor="#888"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!loading}
                />
              </View>

              <TouchableOpacity 
                style={[styles.resetButton, loading && styles.disabledButton]} 
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#8A2BE2" />
                ) : (
                  <Text style={styles.resetButtonText}>ŞİFREMİ SIFIRLA</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                Şifre sıfırlama bağlantınız gönderildi. Lütfen e-posta kutunuzu kontrol edin.
              </Text>
              <TouchableOpacity 
                style={styles.resetButton} 
                onPress={handleBackToLogin}
              >
                <Text style={styles.resetButtonText}>GİRİŞ SAYFASINA DÖN</Text>
              </TouchableOpacity>
            </View>
          )}

          {!resetSent && (
            <View style={styles.loginRedirectContainer}>
              <Text style={styles.loginRedirectText}>Şifrenizi hatırladınız mı?</Text>
              <TouchableOpacity onPress={handleBackToLogin}>
                <Text style={styles.loginRedirectButton}>Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerImageContainer}>
            <Image
              source={require('../../assets/paw-print.png')}
              style={styles.pawPrint}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#D8BFD8',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '80%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#8A2BE2',
  },
  resetButtonText: {
    color: '#8A2BE2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  loginRedirectText: {
    color: '#666',
    fontSize: 14,
  },
  loginRedirectButton: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  successContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  successText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  footerImageContainer: {
    alignItems: 'center',
  },
  pawPrint: {
    width: 40,
    height: 40,
    opacity: 0.7,
    tintColor: '#8A2BE2',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default ForgotPasswordScreen;