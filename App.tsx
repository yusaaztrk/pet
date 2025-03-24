import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import LoginScreen from './src/screens/LoginPage';
import SignupScreen from './src/screens/SignupScreen';
import IntroScreen2 from './src/screens/IntroScreen2';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import IntroScreen1 from './src/screens/IntroScreen1';

// Ekran boyutlarını al
const { width, height } = Dimensions.get('window');

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
      {/* Arkaplan görseli */}
      <Image
        source={require('./assets/petbackground1.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Aktif ekranı render et */}
      {renderCurrentScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    zIndex: -1 // Diğer içeriklerin altında olması için
  }
});

export default App;