import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import IntroScreen1 from './src/screens/IntroScreen1'; // Doğru yolu kullandığınızdan emin olun

// Ekran boyutlarını al
const { width, height } = Dimensions.get('window');

const App: React.FC = () => {
  // Basit yönlendirme fonksiyonu
  const navigation = {
    navigate: (screenName: string) => {
      console.log(`Navigating to: ${screenName}`);
      // Bu noktada gerçek yönlendirme işlevselliği ekleyebilirsiniz
    }
  };

  return (
    <View style={styles.container}>
      {/* Arkaplan görseli */}
      <Image
        source={require('./assets/petbackground1.png')} // Doğru dosya adı ve yolunu kullanın
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