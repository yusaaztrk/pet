import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

type SettingItem = {
  id: string;
  title: string;
  icon: string;
  type: 'navigation' | 'switch' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
};

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: () => {
            console.log('Çıkış yapılıyor...');
            // Çıkış işlemi burada yapılacak
          },
        },
      ]
    );
  };

  const profileSettings: SettingItem[] = [
    {
      id: 'profile',
      title: 'Profil Düzenle',
      icon: '👤',
      type: 'navigation',
      onPress: () => console.log('Profil düzenleme sayfasına git'),
    },
    {
      id: 'pets',
      title: 'Evcil Hayvanlarım',
      icon: '🐕',
      type: 'navigation',
      onPress: () => console.log('Evcil hayvanlar sayfasına git'),
    },
    {
      id: 'photos',
      title: 'Fotoğraflarım',
      icon: '📷',
      type: 'navigation',
      onPress: () => console.log('Fotoğraflar sayfasına git'),
    },
  ];

  const privacySettings: SettingItem[] = [
    {
      id: 'location',
      title: 'Konum Paylaşımı',
      icon: '📍',
      type: 'switch',
      value: locationEnabled,
      onToggle: setLocationEnabled,
    },
    {
      id: 'visibility',
      title: 'Profil Görünürlüğü',
      icon: '👁️',
      type: 'navigation',
      onPress: () => console.log('Görünürlük ayarları'),
    },
    {
      id: 'blocked',
      title: 'Engellenen Kullanıcılar',
      icon: '🚫',
      type: 'navigation',
      onPress: () => console.log('Engellenen kullanıcılar'),
    },
  ];

  const appSettings: SettingItem[] = [
    {
      id: 'notifications',
      title: 'Bildirimler',
      icon: '🔔',
      type: 'switch',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      id: 'sound',
      title: 'Ses Efektleri',
      icon: '🔊',
      type: 'switch',
      value: soundEnabled,
      onToggle: setSoundEnabled,
    },
    {
      id: 'darkmode',
      title: 'Karanlık Mod',
      icon: '🌙',
      type: 'switch',
      value: darkModeEnabled,
      onToggle: setDarkModeEnabled,
    },
    {
      id: 'language',
      title: 'Dil Seçimi',
      icon: '🌐',
      type: 'navigation',
      onPress: () => console.log('Dil seçimi'),
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      id: 'help',
      title: 'Yardım ve Destek',
      icon: '❓',
      type: 'navigation',
      onPress: () => console.log('Yardım sayfası'),
    },
    {
      id: 'feedback',
      title: 'Geri Bildirim',
      icon: '💬',
      type: 'navigation',
      onPress: () => console.log('Geri bildirim formu'),
    },
    {
      id: 'about',
      title: 'Hakkında',
      icon: 'ℹ️',
      type: 'navigation',
      onPress: () => console.log('Hakkında sayfası'),
    },
    {
      id: 'terms',
      title: 'Kullanım Şartları',
      icon: '📋',
      type: 'navigation',
      onPress: () => console.log('Kullanım şartları'),
    },
    {
      id: 'privacy',
      title: 'Gizlilik Politikası',
      icon: '🔒',
      type: 'navigation',
      onPress: () => console.log('Gizlilik politikası'),
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === 'switch'}
      >
        <View style={styles.settingLeft}>
          <Text style={styles.settingIcon}>{item.icon}</Text>
          <Text style={styles.settingTitle}>{item.title}</Text>
        </View>
        <View style={styles.settingRight}>
          {item.type === 'switch' ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#E0E0E0', true: '#8A2BE2' }}
              thumbColor={item.value ? '#fff' : '#f4f3f4'}
            />
          ) : (
            <Text style={styles.settingArrow}>›</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profil Özeti */}
      <View style={styles.profileSummary}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>👤</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Kullanıcı Adı</Text>
          <Text style={styles.profileEmail}>kullanici@email.com</Text>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Düzenle</Text>
        </TouchableOpacity>
      </View>

      {/* Profil Ayarları */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profil</Text>
        {profileSettings.map(renderSettingItem)}
      </View>

      {/* Gizlilik Ayarları */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gizlilik</Text>
        {privacySettings.map(renderSettingItem)}
      </View>

      {/* Uygulama Ayarları */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Uygulama</Text>
        {appSettings.map(renderSettingItem)}
      </View>

      {/* Destek ve Bilgi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destek ve Bilgi</Text>
        {supportSettings.map(renderSettingItem)}
      </View>

      {/* Çıkış Butonu */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>

      {/* Uygulama Bilgileri */}
      <View style={styles.appInfo}>
        <Text style={styles.appName}>PetPal</Text>
        <Text style={styles.appVersion}>Sürüm 1.0.0</Text>
        <Text style={styles.appCopyright}>© 2024 PetPal. Tüm hakları saklıdır.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileSummary: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileAvatarText: {
    fontSize: 24,
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  editProfileButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  editProfileText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 25,
  },
   sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  settingItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingArrow: {
    fontSize: 20,
    color: '#999',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 10,
    color: '#d11a2a',
  },
  logoutText: {
    fontSize: 16,
    color: '#d11a2a',
    fontWeight: 'bold',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  appCopyright: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default SettingsScreen;
