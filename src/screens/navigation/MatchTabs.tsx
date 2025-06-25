import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MatchScreen from '../Match/Match'; // kendi Match ekranın yolu
import MarketTabs from './MarketTabs';
import AdoptionTabs from './AdoptionTabs';

const Tab = createBottomTabNavigator();

const MatchTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Match') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'Market') {
            iconName = focused ? 'store' : 'store-outline';
          } else if (route.name === 'Adoption') {
            iconName = focused ? 'heart' : 'heart-outline';
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
      <Tab.Screen name="Match" component={MatchScreen} options={{ title: 'Eşleştir' }} />
      <Tab.Screen name="Market" component={MarketTabs} options={{ title: 'Market' }} />
      <Tab.Screen name="Adoption" component={AdoptionTabs} options={{ title: 'Sahiplendir' }} />
    </Tab.Navigator>
  );
};

export default MatchTabs;
