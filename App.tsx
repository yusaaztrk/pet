import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginPage';
import SignupScreen from './src/screens/SignupScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('Login');
  
  // Basit bir navigasyon objesi oluşturuyoruz
  const navigation = {
    navigate: (screenName: string) => setCurrentScreen(screenName)
  };
  
  return (
    <View style={styles.container}>
      {currentScreen === 'Login' ? (
        <LoginScreen navigation={navigation} />
      ) : currentScreen === 'Signup' ? (
        <SignupScreen navigation={navigation} />
      ) : (
        <ForgotPasswordScreen navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});

export default App;