import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';

// Ekran boyutlarını al
const { width, height } = Dimensions.get('window');

// Navigation prop tipi
type NavigationProp = {
  navigate: (screenName: string) => void;
};

type Props = {
  navigation: NavigationProp;
};

const IntroScreen1: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };
    
  const handleNext = () => {
    navigation.navigate('IntroScreen2'); // Login yerine IntroScreen2'ye yönlendirme
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Arkaplan görseli - her sayfanın kendi içinde */}
      <Image
        source={require('../../assets/petbackground1.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Orta kısımdaki köpek görseli */}
      <View style={styles.dogImageContainer}>
        <Image
          source={require('../../assets/1Pet.png')}
          style={styles.dogImage}
          resizeMode="contain"
        />
      </View>
        
      <View style={styles.contentContainer}>
        <Text style={styles.title}>PetPal</Text>
        <Text style={styles.subtitle}>Evcil dostlarınız için en iyi arkadaş</Text>
            
        <View style={styles.spacer} />
           
      </View>
        
      {/* Sağ alt köşedeki ileri butonu */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>İLERİ</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  },
  dogImageContainer: {
    position: 'absolute',
    top: height * 0.10,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginTop: -45,
  },
  dogImage: {
    width: width * 0.65,
    height: width * 0.65,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: width * 0.2,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  spacer: {
    height: 60, 
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3949AB',
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3949AB',
  }
});

export default IntroScreen1;