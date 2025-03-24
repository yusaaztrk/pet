import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import IntroScreen1 from './src/screens/IntroScreen1'; // Doğru yolu kullandığınızdan emin olun

// Ekran boyutlarını al
const { width, height } = Dimensions.get('window');

const App: React.FC = () => {
  // Navigation nesnesi
  const navigation = {
    navigate: (screenName: string) => {
      console.log(`Navigating to: ${screenName}`);
      // Burada gerçek yönlendirme işlevselliği ekleyebilirsiniz
    }
  };

  return (
    <View style={styles.container}>
      {/* Arkaplan görseli */}
      <Image
        source={require('./assets/petbackground1.jpg')} // JPG uzantısı kullanıldı
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* IntroScreen */}
      <IntroScreen1 navigation={navigation} />
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