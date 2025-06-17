import React, { useState } from 'react';
import { View, Text, useWindowDimensions, Pressable, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import GamesHomeScreen from './games';
import HomeScreen from './home';
import ProfileScreen from './profile';

const renderScene = SceneMap({
  home: HomeScreen,
  games: GamesHomeScreen,
  profile: ProfileScreen,
});

const IndexScreen: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home' },
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
        renderTabBar={() => null}
      />

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
                name={route.icon as any}
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

export default IndexScreen;
