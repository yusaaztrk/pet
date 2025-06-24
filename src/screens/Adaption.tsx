import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const AdoptionScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Tümü');

  const filters = ['Tümü', 'Köpek', 'Kedi', 'Kuş', 'Diğer'];

  // Sahiplendirilecek hayvanlar için örnek data
  const pets = [
    { id: 1, name: 'Pamuk', type: 'Köpek', age: '2 yaş', location: 'İstanbul' },
    { id: 2, name: 'Minnoş', type: 'Kedi', age: '1 yaş', location: 'Ankara' },
    { id: 3, name: 'Karamel', type: 'Köpek', age: '3 yaş', location: 'İzmir' },
    { id: 4, name: 'Şeker', type: 'Kedi', age: '6 ay', location: 'Bursa' },
    { id: 5, name: 'Cici', type: 'Kuş', age: '1.5 yaş', location: 'Antalya' },
    { id: 6, name: 'Boncuk', type: 'Köpek', age: '4 yaş', location: 'Adana' },
  ];

  const filteredPets = selectedFilter === 'Tümü' 
    ? pets 
    : pets.filter(pet => pet.type === selectedFilter);

  return (
    <ScrollView style={styles.container}>
      {/* Başlık */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Sevgi Dolu Dostlar</Text>
        <Text style={styles.headerSubtitle}>Yeni bir aile arayan dostlarımız</Text>
      </View>

      {/* Filtreler */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Acil Sahiplenme */}
      <View style={styles.urgentSection}>
        <Text style={styles.urgentTitle}>🚨 Acil Sahiplenme</Text>
        <TouchableOpacity style={styles.urgentCard}>
          <View style={styles.petImagePlaceholder}>
            <Text style={styles.placeholderText}>Acil Durum</Text>
          </View>
          <View style={styles.urgentInfo}>
            <Text style={styles.urgentPetName}>Minik</Text>
            <Text style={styles.urgentDescription}>
              Yaralı bulundu, tedavi edildi. Sıcak bir yuva arıyor.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Pet Kartları */}
      <View style={styles.petsContainer}>
        {filteredPets.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            style={styles.petCard}
            onPress={() => console.log(`${pet.name} seçildi`)}
          >
            <View style={styles.petImagePlaceholder}>
              <Text style={styles.placeholderText}>📷</Text>
            </View>
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petDetails}>{pet.type} • {pet.age}</Text>
              <Text style={styles.petLocation}>📍 {pet.location}</Text>
              <View style={styles.petActions}>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Text style={styles.favoriteText}>♡</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton}>
                  <Text style={styles.contactText}>İletişim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sahiplendirmek isteyenler için buton */}
      <View style={styles.addPetContainer}>
        <TouchableOpacity style={styles.addPetButton}>
          <Text style={styles.addPetButtonText}>+ Sahiplendirmek İstiyorum</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#8A2BE2',
  },
  filterText: {
    color: '#666',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  urgentSection: {
    margin: 15,
  },
  urgentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  urgentCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  urgentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  urgentPetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  urgentDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  petsContainer: {
    paddingHorizontal: 15,
  },
  petCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  petImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 14,
  },
  petInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  petDetails: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  petLocation: {
    fontSize: 12,
    color: '#888',
  },
  petActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  favoriteButton: {
    marginRight: 15,
  },
  favoriteText: {
    fontSize: 18,
    color: '#FF6B6B',
  },
  contactButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  contactText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  addPetContainer: {
    padding: 20,
  },
  addPetButton: {
    backgroundColor: '#8A2BE2',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  addPetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdoptionScreen;