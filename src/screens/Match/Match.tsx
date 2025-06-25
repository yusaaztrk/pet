import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const MatchScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'yakinda' | 'eslesme' | 'begendiklerim'>('yakinda');

  // Yakındaki petler için örnek data
  const nearbyPets = [
    { id: 1, name: 'Buddy', type: 'Golden Retriever', age: '3 yaş', distance: '0.5 km' },
    { id: 2, name: 'Luna', type: 'British Shorthair', age: '2 yaş', distance: '1.2 km' },
    { id: 3, name: 'Max', type: 'Labrador', age: '4 yaş', distance: '2.1 km' },
  ];

  // Eşleşmeler için örnek data
  const matches = [
    { id: 1, name: 'Bella', type: 'Poodle', owner: 'Ayşe', matchDate: '2 gün önce' },
    { id: 2, name: 'Charlie', type: 'Maine Coon', owner: 'Mehmet', matchDate: '1 hafta önce' },
  ];

  // Beğendiklerim için örnek data
  const favorites = [
    { id: 1, name: 'Daisy', type: 'Husky', age: '1 yaş', status: 'Bekliyor' },
    { id: 2, name: 'Oscar', type: 'Persian', age: '5 yaş', status: 'Karşılıklı' },
  ];

  const renderNearbyPets = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Yakınınızdaki Dostlar</Text>
      <Text style={styles.sectionSubtitle}>Çevrenizde yeni arkadaşlar keşfedin</Text>
      
      {/* Ana eşleştirme kartı */}
      <View style={styles.mainCard}>
        <View style={styles.petImageLarge}>
          <Text style={styles.placeholderTextLarge}>📷</Text>
        </View>
        <View style={styles.petInfoLarge}>
          <Text style={styles.petNameLarge}>Buddy</Text>
          <Text style={styles.petTypeLarge}>Golden Retriever • 3 yaş</Text>
          <Text style={styles.petDistance}>📍 0.5 km uzakta</Text>
          <Text style={styles.petDescription}>
            Oyun oynamayı seven, enerjik ve dostane bir köpek. Çocuklar ile çok iyi anlaşır.
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.passButton}>
            <Text style={styles.passButtonText}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeButton}>
            <Text style={styles.likeButtonText}>♡</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Diğer yakındaki petler */}
      <Text style={styles.sectionTitle}>Diğer Yakın Dostlar</Text>
      {nearbyPets.slice(1).map((pet) => (
        <TouchableOpacity key={pet.id} style={styles.petCard}>
          <View style={styles.petImage}>
            <Text style={styles.placeholderText}>📷</Text>
          </View>
          <View style={styles.petInfo}>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petType}>{pet.type} • {pet.age}</Text>
            <Text style={styles.petDistance}>📍 {pet.distance}</Text>
          </View>
          <TouchableOpacity style={styles.quickLikeButton}>
            <Text style={styles.quickLikeText}>♡</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMatches = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Eşleşmeleriniz</Text>
      <Text style={styles.sectionSubtitle}>Karşılıklı beğeni aldığınız dostlar</Text>
      
      {matches.length > 0 ? (
        matches.map((match) => (
          <TouchableOpacity key={match.id} style={styles.matchCard}>
            <View style={styles.petImage}>
              <Text style={styles.placeholderText}>📷</Text>
            </View>
            <View style={styles.matchInfo}>
              <Text style={styles.petName}>{match.name}</Text>
              <Text style={styles.petType}>{match.type}</Text>
              <Text style={styles.ownerName}>Sahibi: {match.owner}</Text>
              <Text style={styles.matchDate}>Eşleşme: {match.matchDate}</Text>
            </View>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Mesaj</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Henüz eşleşmeniz yok</Text>
          <Text style={styles.emptyStateSubtext}>Daha fazla profile bakın!</Text>
        </View>
      )}
    </ScrollView>
  );

  const renderFavorites = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Beğendikleriniz</Text>
      <Text style={styles.sectionSubtitle}>Beğeni gönderdiğiniz dostlar</Text>
      
      {favorites.map((favorite) => (
        <TouchableOpacity key={favorite.id} style={styles.favoriteCard}>
          <View style={styles.petImage}>
            <Text style={styles.placeholderText}>📷</Text>
          </View>
          <View style={styles.favoriteInfo}>
            <Text style={styles.petName}>{favorite.name}</Text>
            <Text style={styles.petType}>{favorite.type} • {favorite.age}</Text>
            <View style={styles.statusContainer}>
              <Text style={[
                styles.statusText,
                favorite.status === 'Karşılıklı' ? styles.statusActive : styles.statusPending
              ]}>
                {favorite.status === 'Karşılıklı' ? '💕 Karşılıklı' : '⏳ Bekliyor'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Tab Navigator */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'yakinda' && styles.activeTab]}
          onPress={() => setActiveTab('yakinda')}
        >
          <Text style={[styles.tabText, activeTab === 'yakinda' && styles.activeTabText]}>
            Yakında
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'eslesme' && styles.activeTab]}
          onPress={() => setActiveTab('eslesme')}
        >
          <Text style={[styles.tabText, activeTab === 'eslesme' && styles.activeTabText]}>
            Eşleşme
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'begendiklerim' && styles.activeTab]}
          onPress={() => setActiveTab('begendiklerim')}
        >
          <Text style={[styles.tabText, activeTab === 'begendiklerim' && styles.activeTabText]}>
            Beğendiklerim
          </Text>
        </TouchableOpacity>
      </View>

      {/* İçerik */}
      {activeTab === 'yakinda' && renderNearbyPets()}
      {activeTab === 'eslesme' && renderMatches()}
      {activeTab === 'begendiklerim' && renderFavorites()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#8A2BE2',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#8A2BE2',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  petImageLarge: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeholderTextLarge: {
    fontSize: 48,
    color: '#888',
  },
  petInfoLarge: {
    marginBottom: 20,
  },
  petNameLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  petTypeLarge: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  petDistance: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  petDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  passButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  likeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  petCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  petImage: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    color: '#888',
  },
  petInfo: {
    flex: 1,
    marginLeft: 15,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  petType: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  quickLikeButton: {
    padding: 10,
  },
  quickLikeText: {
    fontSize: 20,
    color: '#8A2BE2',
  },
  matchCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8A2BE2',
  },
  matchInfo: {
    flex: 1,
    marginLeft: 15,
  },
  ownerName: {
    fontSize: 14,
    color: '#8A2BE2',
    fontWeight: '600',
  },
  matchDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  messageButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  favoriteCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  favoriteInfo: {
    flex: 1,
    marginLeft: 15,
  },
  statusContainer: {
    marginTop: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusActive: {
    backgroundColor: '#E8F5E8',
    color: '#4CAF50',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
    color: '#FF9800',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#888',
  },
  });

export default MatchScreen;