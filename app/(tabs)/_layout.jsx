import React from 'react';
import { StatusBar } from 'react-native';
import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  return (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#232f3e" />
    <Tabs screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#c6c6c6',
        headerStyle: {
          backgroundColor: '#232f3e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
        backgroundColor: '#232f3e',
        },
       }}>
      <Tabs.Screen name="index" options={{
        headerShown: true,
        title: 'Товары',
        tabBarIcon: ({ focused }) => (
          <Entypo name="home" size={24} color={focused ? 'orange' : 'gray'} />
        )
        }} />
      <Tabs.Screen name="cart" options={{
         title: 'Корзина',
         tabBarIcon: ({ focused }) => (
          <Entypo name="shopping-cart" size={24} color={focused ? 'orange' : 'gray'} />
         )
         }} />
    </Tabs>
 </>
  );
}