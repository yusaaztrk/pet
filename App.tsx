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
import HomePage from './src/screens/Homepage';

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