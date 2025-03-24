import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

// Ekran boyutlarını al
const { width, height } = Dimensions.get('window');

const BackgroundImage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/petbackground.png')} // Görselin projedeki yolunu belirtin
        style={styles.backgroundImage}
        resizeMode="cover"
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
  }
});

export default BackgroundImage;