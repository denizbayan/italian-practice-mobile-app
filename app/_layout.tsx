import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingScreen from '@/components/LoadingScreen';

import { SafeAreaProvider, useSafeAreaInsets  } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (loaded) {
      checkUserAuthentication();
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  const checkUserAuthentication = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
    } 
  };

    useEffect(() => {
      if (isAuthenticated !== null) {
        if (isAuthenticated) {
          router.replace('/home/home');
        } else {
          router.replace('/auth/login');
        }
      }
    }, [isAuthenticated]);



  if (!loaded || isAuthenticated == null) {
    return <LoadingScreen/>; 
  }
  

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1, paddingBottom: insets.bottom }}>
          <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false}} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
   
  );
}