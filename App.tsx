// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

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

// Ana navigation bileşeni
const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  // Loading durumunda gösterilecek ekran
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Kullanıcı giriş yapmışsa ana ekranlar
          <Stack.Screen name="Homepage" component={HomePage} />
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
=======
      <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IntroScreen1" component={IntroScreen1} />
        <Stack.Screen name="IntroScreen2" component={IntroScreen2} />
        <Stack.Screen name="IntroScreen3" component={IntroScreen3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />

        {/* Bu kısımlar eklendi */}
        <Stack.Screen name="MatchTabs" component={MatchTabs} />
        <Stack.Screen name="MarketTabs" component={MarketTabs} />
        <Stack.Screen name="AdoptionTabs" component={AdoptionTabs} />
>>>>>>> c1cbc58e3dda5e2d4f17299998980104fbc51e40
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
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