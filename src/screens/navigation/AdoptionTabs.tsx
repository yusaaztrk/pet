import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AdoptionScreen from '../Adoption/Adaption';
import MatchTabs from './MatchTabs';
import MarketTabs from './MarketTabs';

const Tab = createBottomTabNavigator();

const AdoptionTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Adoption') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Match') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'Market') {
            iconName = focused ? 'store' : 'store-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
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
        headerShown: false,
      })}
    >
      <Tab.Screen name="Adoption" component={AdoptionScreen} options={{ title: 'Sahiplendir' }} />
      <Tab.Screen name="Match" component={MatchTabs} options={{ title: 'Eşleştir' }} />
      <Tab.Screen name="Market" component={MarketTabs} options={{ title: 'Market' }} />
    </Tab.Navigator>
  );
};

export default AdoptionTabs;
