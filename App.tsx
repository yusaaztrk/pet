import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginPage';
import SignupScreen from './src/screens/SignupScreen';
import IntroScreen2 from './src/screens/IntroScreen2';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import IntroScreen1 from './src/screens/IntroScreen1';
import IntroScreen3 from './src/screens/IntroScreen3';

const App: React.FC = () => {
  // Aktif ekranı tutmak için state ekliyoruz
  const [currentScreen, setCurrentScreen] = useState<string>('IntroScreen1');

  // Navigation nesnesi - navigate fonksiyonu şimdi gerçekten ekranı değiştiriyor
  const navigation = {
    navigate: (screenName: string) => {
      console.log(`Navigating to: ${screenName}`);
      setCurrentScreen(screenName);
    },
    goBack: () => {
      // Basit bir geri gitme fonksiyonu (ihtiyaca göre geliştirebilirsiniz)
      setCurrentScreen('IntroScreen1');
    }
  };

  // Hangi ekranın gösterileceğini belirle
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'IntroScreen1':
        return <IntroScreen1 navigation={navigation} />;
      case 'IntroScreen2':
        return <IntroScreen2 navigation={navigation} />;
      case 'IntroScreen3':
        return <IntroScreen3 navigation={navigation} />;
      case 'Login':
        return <LoginScreen navigation={navigation} />;
      case 'Signup':
        return <SignupScreen navigation={navigation} />;
      case 'ForgotPassword':
        return <ForgotPasswordScreen navigation={navigation} />;
      default:
        return <IntroScreen1 navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Artık arkaplan görseli burada yok, her ekranın kendi içinde */}
      
      {/* Aktif ekranı render et */}
      {renderCurrentScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;