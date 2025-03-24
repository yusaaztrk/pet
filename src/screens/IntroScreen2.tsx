import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

// Ekran boyutlarını al
const { width, height } = Dimensions.get('window');

const BackgroundImage = () => {
  return (
    <View style={styles.container}>
      {/* Ana arka plan resmi */}
      <Image
        source={require('../../assets/petbackground2.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Orta üstte yer alacak ikinci resim */}
      <Image
        source={require('../../assets/petbackground22.png')}
        style={styles.topImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: -1, // Diğer içeriklerin altında olması için
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  topImage: {
    position: 'absolute',
    top: 40, // Üstten boşluk
    alignSelf: 'center', // Yatayda ortala
    width: width * 0.7, // Ekran genişliğinin %70'i kadar
    height: height * 0.3, // Yüksekliği ihtiyaca göre ayarlayın
  }
});

export default BackgroundImage;