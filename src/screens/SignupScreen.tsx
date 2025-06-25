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

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const { signUp } = useAuth();

  const handleSignup = async (): Promise<void> => {
    // Doğrulamalar
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(email, password, fullName);
      
      if (result.success) {
        Alert.alert(
          'Başarılı',
          'Kayıt işleminiz başarıyla tamamlandı.',
          [
            {
              text: 'Tamam',
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
      } else {
        Alert.alert('Hata', result.error || 'Kayıt işlemi sırasında bir hata oluştu');
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
          <Text style={styles.tagline}>Yeni hesap oluştur</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Ad Soyad</Text>
            <TextInput
              style={styles.input}
              placeholder="Adınızı ve soyadınızı girin"
              placeholderTextColor="#888"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

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
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Şifre</Text>
            <TextInput
              style={styles.input}
              placeholder="Şifrenizi girin (en az 6 karakter)"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Şifre Tekrar</Text>
            <TextInput
              style={styles.input}
              placeholder="Şifrenizi tekrar girin"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity 
            style={[styles.signupButton, loading && styles.disabledButton]} 
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.signupButtonText}>KAYIT OL</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBackToLogin}
            disabled={loading}
          >
            <Text style={styles.backButtonText}>Giriş Ekranına Dön</Text>
          </TouchableOpacity>
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
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 6,
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
  signupButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '80%',
    alignSelf: 'center',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '600',
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
    opacity: 0.7,
  },
});

export default SignupScreen;