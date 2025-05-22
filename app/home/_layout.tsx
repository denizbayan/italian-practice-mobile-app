  import React, { useState } from 'react';
  import { Platform , View, Text, useWindowDimensions, Pressable, StyleSheet } from 'react-native';
  import { Tabs } from 'expo-router';
  import { TabView, SceneMap } from 'react-native-tab-view';
  import { Ionicons } from '@expo/vector-icons';
  import { HapticTab } from '@/components/HapticTab';
  import { IconSymbol } from '@/components/ui/IconSymbol';
  import TabBarBackground from '@/components/ui/TabBarBackground';
  import { Colors } from '@/constants/Colors';
  import { useColorScheme } from '@/hooks/useColorScheme';
  import { NavigationContainer } from '@react-navigation/native';
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
  import { SafeAreaProvider } from 'react-native-safe-area-context';
  import HomeScreen from './home';
  import ProfileScreen from './profile';
import ConjugationGamePrePhase from '@/components/ConjugationGamePrePhase';


  const Tab = createMaterialTopTabNavigator();
  const renderScene = SceneMap({
    welcome: HomeScreen,
    games: ConjugationGamePrePhase,
    profile: ProfileScreen,
  });
  export default function TabLayout() {
      const layout = useWindowDimensions();
      const [index, setIndex] = useState(0);
      const [routes] = useState([
        { key: 'welcome', title: 'Welcome', icon: 'home' },
        { key: 'games', title: 'Games', icon: 'game-controller' },
        { key: 'profile', title: 'Profile', icon: 'person-circle' },
      ]);

      return (
        <View style={{ flex: 1 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={() => null} // hide top tab bar
          />

          {/* Custom Bottom Bar */}
          <View style={styles.tabBar}>
            {routes.map((route, i) => {
              const isActive = i === index;
              return (
                <Pressable
                  key={route.key}
                  onPress={() => setIndex(i)}
                  style={styles.tabItem}
                >
                  <Ionicons
                    name={route.icon as React.ComponentProps<typeof Ionicons>['name']}
                    size={26}
                    color={isActive ? '#3b82f6' : '#94a3b8'}
                  />
                  <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>
                    {route.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      );
  }

  const styles = StyleSheet.create({
    page: {
      flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    pageText: {
      fontSize: 24, fontWeight: '600',
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      backgroundColor: '#fff',
    },
    tabItem: {
      alignItems: 'center',
    },
    tabLabel: {
      fontSize: 12,
      color: '#94a3b8',
    },
    activeLabel: {
      color: '#3b82f6',
      fontWeight: '600',
    },
  });