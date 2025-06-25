import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
