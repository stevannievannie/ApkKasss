import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen'; 
import ReportScreen from '../screens/ReportScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#6c757d',
        tabBarStyle: {
          backgroundColor: '#f8f9fa',
          paddingBottom: 5,
          height: 60
        }
      }}
    >
      <Tab.Screen 
        name="Beranda" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Transaksi" 
        component={TransactionScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Laporan" 
        component={ReportScreen} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
