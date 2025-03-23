import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from './src/screens/LoginPage';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
    </SafeAreaView>
  );
}

export default App;