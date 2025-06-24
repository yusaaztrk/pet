import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

type Message = {
  id: number;
  petName: string;
  ownerName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
};

const MessageScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  // Örnek mesaj verileri
  const messages: Message[] = [
    {
      id: 1,
      petName: 'Bella',
      ownerName: 'Ayşe',
      lastMessage: 'Merhaba! Bella çok tatlı görünüyor. Tanışabilir miyiz?',
      timestamp: '2 dk',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 2,
      petName: 'Charlie',
      ownerName: 'Mehmet',
      lastMessage: 'Teşekkürler! Charlie de çok arkadaş canlısı.',
      timestamp: '1 sa',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 3,
      petName: 'Luna',
      ownerName: 'Zeynep',
      lastMessage: 'Yarın parkta buluşabilir miyiz?',
      timestamp: '3 sa',
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: 4,
      petName: 'Max',
      ownerName: 'Can',
      lastMessage: 'Fotoğrafları çok güzel! 📸',
      timestamp: 'Dün',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 5,
      petName: 'Daisy',
      ownerName: 'Elif',
      lastMessage: 'Merhaba, nasılsınız?',
      timestamp: '2 gün',
      unreadCount: 3,
      isOnline: true,
    },
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.petName.toLowerCase().includes(searchText.toLowerCase()) ||
                         message.ownerName.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = activeFilter === 'all' || (activeFilter === 'unread' && message.unreadCount > 0);
    
    return matchesSearch && matchesFilter;
  });

  const totalUnreadCount = messages.reduce((sum, message) => sum + message.unreadCount, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mesajlar</Text>
        {totalUnreadCount > 0 && (
          <View style={styles.totalUnreadBadge}>
            <Text style={styles.totalUnreadText}>{totalUnreadCount}</Text>
          </View>
        )}
      </View>

      {/* Arama ve Filtreler */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Mesajlarda ara..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'all' && styles.filterButtonActive]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[styles.filterText, activeFilter === 'all' && styles.filterTextActive]}>
              Tümü
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'unread' && styles.filterButtonActive]}
            onPress={() => setActiveFilter('unread')}
          >
            <Text style={[styles.filterText, activeFilter === 'unread' && styles.filterTextActive]}>
              Okunmamış
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mesaj Listesi */}
      <ScrollView style={styles.messagesList}>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <TouchableOpacity
              key={message.id}
              style={[
                styles.messageCard,
                message.unreadCount > 0 && styles.messageCardUnread
              ]}
              onPress={() => console.log(`${message.petName} ile sohbete git`)}
            >
              <View style={styles.messageHeader}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>📷</Text>
                  </View>
                  {message.isOnline && <View style={styles.onlineIndicator} />}
                </View>
                
                <View style={styles.messageInfo}>
                  <View style={styles.messageTopRow}>
                    <Text style={styles.petName}>{message.petName}</Text>
                    <Text style={styles.timestamp}>{message.timestamp}</Text>
                  </View>
                  <Text style={styles.ownerName}>Sahibi: {message.ownerName}</Text>
                  <Text 
                    style={[
                      styles.lastMessage,
                      message.unreadCount > 0 && styles.lastMessageUnread
                    ]}
                    numberOfLines={2}
                  >
                    {message.lastMessage}
                  </Text>
                </View>
                
                {message.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{message.unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>💬</Text>
            <Text style={styles.emptyStateTitle}>
              {searchText ? 'Mesaj bulunamadı' : 'Henüz mesajınız yok'}
            </Text>
            <Text style={styles.emptyStateText}>
              {searchText 
                ? 'Arama kriterlerinize uygun mesaj bulunamadı'
                : 'Dostlarınızla eşleştikten sonra mesajlaşmaya başlayabilirsiniz'
              }
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Yeni Mesaj Butonu */}
      <TouchableOpacity style={styles.newMessageButton}>
        <Text style={styles.newMessageButtonText}>✉️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  totalUnreadBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  totalUnreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  filterButtonActive: {
    backgroundColor: '#8A2BE2',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  messagesList: {
    flex: 1,
  },
  messageCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageCardUnread: {
    borderColor: '#8A2BE2',
    borderWidth: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageInfo: {
    flex: 1,
  },
  messageTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  ownerName: {
    fontSize: 14,
    color: '#8A2BE2',
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  lastMessageUnread: {
    fontWeight: '600',
    color: '#333',
  },
  unreadBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  newMessageButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  newMessageButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default MessageScreen;