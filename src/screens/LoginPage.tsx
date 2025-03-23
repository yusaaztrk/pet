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
} from 'react-native';

// Basit navigasyon prop tipini tanımlama
type NavigationProp = {
  navigate: (screenName: string) => void;
};

type Props = {
  navigation: NavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    console.log('Giriş yapılıyor:', username, password);
    // Giriş işlemleri burada yapılacak
  };

  const handleRegister = (): void => {
    console.log('Kayıt ekranına yönlendiriliyor');
    navigation.navigate('Signup');
  };

  const handleForgotPassword = (): void => {
    console.log('Şifremi unuttum ekranına yönlendiriliyor');
    // Şifremi unuttum ekranına yönlendirme işlemi
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
          <Text style={styles.tagline}>Evcil dostlarınız için en iyi arkadaş</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
            <TextInput
              style={styles.input}
              placeholder="E-posta veya kullanıcı adınızı girin"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Şifre</Text>
            <TextInput
              style={styles.input}
              placeholder="Şifrenizi girin"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>GİRİŞ YAP</Text>
          </TouchableOpacity>

          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity 
              style={styles.bottomButton} 
              onPress={handleRegister}
            >
              <Text style={styles.bottomButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.bottomButton} 
              onPress={handleForgotPassword}
            >
              <Text style={styles.bottomButtonText}>Şifremi Unuttum</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8A2BE2', // Mor renk
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
    marginBottom: 20,
    alignItems: 'center',
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
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25,
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
  loginButtonText: {
    color: '#8A2BE2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    width: '100%',
  },
  bottomButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8BFD8',
  },
  bottomButtonText: {
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
});

export default LoginScreen;