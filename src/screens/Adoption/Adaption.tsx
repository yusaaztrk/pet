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

  const filters = ['Tümü', 'Köpek', 'Kedi'];

  // Sahiplendirilecek hayvanlar için örnek data
  const pets = [
    { id: 1, name: 'Pamuk', type: 'Köpek', age: '2 yaş', location: 'İstanbul', gender: 'Erkek' },
    { id: 2, name: 'Minnoş', type: 'Kedi', age: '1 yaş', location: 'Ankara', gender: 'Dişi' },
    { id: 3, name: 'Karamel', type: 'Köpek', age: '3 yaş', location: 'İzmir', gender: 'Dişi' },
    { id: 4, name: 'Şeker', type: 'Kedi', age: '6 ay', location: 'Bursa', gender: 'Erkek' },
    { id: 5, name: 'Boncuk', type: 'Köpek', age: '4 yaş', location: 'Adana', gender: 'Erkek' },
    { id: 6, name: 'Pırıl', type: 'Kedi', age: '2.5 yaş', location: 'Antalya', gender: 'Dişi' },
  ];

  const filteredPets = selectedFilter === 'Tümü' 
    ? pets 
    : pets.filter(pet => pet.type === selectedFilter);

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerGradient}>
          <Text style={styles.headerTitle}>🐾 Sevgi Dolu Dostlar</Text>
          <Text style={styles.headerSubtitle}>Yeni bir aile arayan dostlarımız sizi bekliyor</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Filtreler */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
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
                  {filter === 'Köpek' ? '🐕 ' : filter === 'Kedi' ? '🐱 ' : '🐾 '}{filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Acil Sahiplenme */}
        <View style={styles.urgentSection}>
          <View style={styles.urgentHeader}>
            <Text style={styles.urgentTitle}>🚨 Acil Sahiplenme</Text>
            <View style={styles.urgentBadge}>
              <Text style={styles.urgentBadgeText}>ÖNCELİKLİ</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.urgentCard}>
            <View style={styles.urgentImagePlaceholder}>
              <Text style={styles.urgentEmoji}>🐕</Text>
            </View>
            <View style={styles.urgentInfo}>
              <Text style={styles.urgentPetName}>Minik</Text>
              <Text style={styles.urgentDescription}>
                Yaralı bulundu, tedavi edildi. Sıcak bir yuva arıyor.
              </Text>
              <View style={styles.urgentTags}>
                <View style={styles.urgentTag}>
                  <Text style={styles.urgentTagText}>2 yaş</Text>
                </View>
                <View style={styles.urgentTag}>
                  <Text style={styles.urgentTagText}>İstanbul</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Pet Kartları */}
        <View style={styles.petsContainer}>
          <Text style={styles.sectionTitle}>Sahiplenmeyi Bekleyen Dostlar</Text>
          {filteredPets.map((pet) => (
            <TouchableOpacity
              key={pet.id}
              style={styles.petCard}
              onPress={() => console.log(`${pet.name} seçildi`)}
            >
              <View style={styles.petImagePlaceholder}>
                <Text style={styles.petEmoji}>
                  {pet.type === 'Köpek' ? '🐕' : '🐱'}
                </Text>
              </View>
              <View style={styles.petInfo}>
                <View style={styles.petHeader}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  <View style={styles.genderBadge}>
                    <Text style={styles.genderText}>
                      {pet.gender === 'Erkek' ? '♂' : '♀'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.petDetails}>{pet.type} • {pet.age}</Text>
                <Text style={styles.petLocation}>📍 {pet.location}</Text>
                <View style={styles.petActions}>
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Text style={styles.favoriteText}>💜</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactText}>İletişime Geç</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sahiplendirmek isteyenler için buton */}
        <View style={styles.addPetContainer}>
          <TouchableOpacity style={styles.addPetButton}>
            <Text style={styles.addPetButtonText}>+ Dostunu Sahiplendirmek İster misin?</Text>
            <Text style={styles.addPetSubText}>Ücretsiz ilan ver, yuva bul</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  headerContainer: {
    height: 120,
    overflow: 'hidden',
  },
  headerGradient: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  filtersContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  filtersScrollContent: {
    paddingHorizontal: 5,
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
    shadowOpacity: 0.3,
  },
  filterText: {
    color: '#6b7280',
    fontWeight: '700',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
  },
  urgentSection: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  urgentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  urgentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  urgentBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgentBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  urgentCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#fca5a5',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  urgentImagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#fef2f2',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fca5a5',
  },
  urgentEmoji: {
    fontSize: 30,
  },
  urgentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  urgentPetName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  urgentDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  urgentTags: {
    flexDirection: 'row',
  },
  urgentTag: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  urgentTagText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600',
  },
  petsContainer: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    marginLeft: 5,
  },
  petCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  petImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  petEmoji: {
    fontSize: 35,
  },
  petInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  petHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  genderBadge: {
    width: 24,
    height: 24,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  petDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginVertical: 4,
    fontWeight: '500',
  },
  petLocation: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 12,
  },
  petActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    marginRight: 15,
    padding: 5,
  },
  favoriteText: {
    fontSize: 20,
  },
  contactButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  contactText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  addPetContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  addPetButton: {
    backgroundColor: '#8B5CF6',
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addPetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addPetSubText: {
    color: '#e0e7ff',
    fontSize: 13,
    fontWeight: '500',
  },
  });

export default AdoptionScreen;
