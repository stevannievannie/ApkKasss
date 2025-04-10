import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator.js';
import { TransactionProvider } from './context/TransactionContext';

export default function App() {
  return (
    <TransactionProvider>
      <StatusBar backgroundColor="#007bff" barStyle="light-content" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TransactionProvider>
  );
}
