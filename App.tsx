// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import firebaseAuthService from './src/services/firebase';

import IntroScreen1 from './src/screens/IntroScreen1';
import IntroScreen2 from './src/screens/IntroScreen2';
import IntroScreen3 from './src/screens/IntroScreen3';
import LoginScreen from './src/screens/LoginPage';
import SignupScreen from './src/screens/SignupScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import Homepage from './src/screens/Homepage';

import MatchTabs from './src/screens/navigation/MatchTabs';
import MarketTabs from './src/screens/navigation/MarketTabs';
import AdoptionTabs from './src/screens/navigation/AdoptionTabs';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<firebaseAuthService.AuthUser | null>(null);

  // Kullanıcı durum değişikliklerini dinle
  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe; // Cleanup fonksiyonu
  }, [initializing]);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Kullanıcı giriş yapmışsa ana ekranlar
          <>
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="MatchTabs" component={MatchTabs} />
            <Stack.Screen name="MarketTabs" component={MarketTabs} />
            <Stack.Screen name="AdoptionTabs" component={AdoptionTabs} />
          </>
        ) : (
          // Kullanıcı giriş yapmamışsa auth ekranları
          <>
            <Stack.Screen name="IntroScreen1" component={IntroScreen1} />
            <Stack.Screen name="IntroScreen2" component={IntroScreen2} />
            <Stack.Screen name="IntroScreen3" component={IntroScreen3} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default App;