import React from 'react';
import { Stack } from 'expo-router';


export default function TabLayout() {

  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="games" />
        <Stack.Screen name="profile" />
      </Stack>
  );
}