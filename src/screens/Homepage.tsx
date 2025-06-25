import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const pets = [
  { id: 1, name: 'Buddy', image: 'https://place-puppy.com/300x300', breed: 'Golden Retriever', age: '2 yaş' },
  { id: 2, name: 'Luna', image: 'https://placekitten.com/300/300', breed: 'British Shorthair', age: '1 yaş' },
  { id: 3, name: 'Max', image: 'https://place-puppy.com/301x301', breed: 'Labrador', age: '3 yaş' },
  { id: 4, name: 'Bella', image: 'https://placekitten.com/301/301', breed: 'Persian', age: '2 yaş' },
];

const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth - 60; // Padding için 60 piksel

const Homepage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hoş Geldiniz!</Text>
          <Text style={styles.subText}>Evcil dostlarınızla harika bir gün geçirin</Text>
        </View>
        <TouchableOpacity style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://placekitten.com/100/100' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Pets Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Evcil Hayvanlarım</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.petsScrollContainer}
          decelerationRate="fast"
          snapToInterval={cardWidth + 20}
          snapToAlignment="center"
        >
          {pets.map((pet, index) => (
            <TouchableOpacity 
              key={pet.id} 
              style={[styles.petCard, { width: cardWidth }]}
              activeOpacity={0.9}
            >
              <View style={styles.petImageContainer}>
                <Image source={{ uri: pet.image }} style={styles.petImage} />
                <View style={styles.petBadge}>
                  <Text style={styles.petBadgeText}>{pet.age}</Text>
                </View>
              </View>
              <View style={styles.petInfo}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petBreed}>{pet.breed}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.matchButton]}
            onPress={() => navigation.navigate('MatchTabs')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>💕</Text>
            <Text style={styles.buttonText}>Eşleştir</Text>
            <Text style={styles.buttonSubText}>Yeni arkadaşlar bul</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.adoptButton]}
            onPress={() => navigation.navigate('AdoptionTabs')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>🏠</Text>
            <Text style={styles.buttonText}>Sahiplendir</Text>
            <Text style={styles.buttonSubText}>Yeni bir yuva</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[styles.button, styles.marketButton, styles.fullWidthButton]}
          onPress={() => navigation.navigate('MarketTabs')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonIcon}>🛍️</Text>
          <Text style={styles.buttonText}>Pet Market</Text>
          <Text style={styles.buttonSubText}>İhtiyaçlarınız için alışveriş yapın</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>İstatistikler</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Evcil Hayvan</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Eşleşme</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Arkadaş</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  profileContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 3,
    borderColor: '#fff',
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  petsScrollContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  petCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  petImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 15,
  },
  petImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: '#ecf0f1',
  },
  petBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  petBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  petInfo: {
    alignItems: 'center',
  },
  petName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  matchButton: {
    backgroundColor: '#e74c3c',
    flex: 0.48,
  },
  adoptButton: {
    backgroundColor: '#f39c12',
    flex: 0.48,
  },
  marketButton: {
    backgroundColor: '#27ae60',
  },
  fullWidthButton: {
    width: '100%',
  },
  buttonIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonSubText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    flex: 0.3,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Homepage;