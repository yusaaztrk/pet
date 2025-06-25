import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Ekran bileşenlerini içe aktar
import MarketScreen from '../screens/Market';
import AdoptionScreen from '../screens/Adaption';
import MatchScreen from '../screens/Match';
import MessageScreen from '../screens/Message';
import SettingsScreen from '../screens/Settings';

const Tab = createBottomTabNavigator();

const HomePage: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          switch (route.name) {
            case 'Market':
              iconName = focused ? 'shopping' : 'shopping-outline';
              break;
            case 'Sahiplendir':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Eşleştir':
              iconName = focused ? 'account-multiple' : 'account-multiple-outline';
              break;
            case 'Mesajlar':
              iconName = focused ? 'chat' : 'chat-outline';
              break;
            case 'Ayarlar':
              iconName = focused ? 'cog' : 'cog-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#8A2BE2',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#8A2BE2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Market" component={MarketScreen} options={{ title: 'Market' }} />
      <Tab.Screen name="Sahiplendir" component={AdoptionScreen} options={{ title: 'Sahiplendir' }} />
      <Tab.Screen name="Eşleştir" component={MatchScreen} options={{ title: 'Eşleştir' }} />
      <Tab.Screen name="Mesajlar" component={MessageScreen} options={{ title: 'Mesajlar' }} />
      <Tab.Screen name="Ayarlar" component={SettingsScreen} options={{ title: 'Ayarlar' }} />
    </Tab.Navigator>
  );
};

export default HomePage;
