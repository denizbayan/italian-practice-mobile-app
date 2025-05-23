import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ExternalPathString, RelativePathString, useRouter } from 'expo-router';

  const games = [
    {
      title: 'Article Game',
      image: require('@/assets/images/react-logo.png'),
      route: '/home/games/article_game',
    },
    {
      title: 'Dictionary Game',
      image: require('@/assets/images/react-logo.png'),
      route: '/home/games/dictionary_game',
    },
    {
      title: 'Conjugation Game',
      image: require('@/assets/images/react-logo.png'),
      route: '/home/games/conjugation_game',
    },
  ];

const GamesHomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();


  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: insets.bottom + 20 },
      ]}
    >
      {games.map((game, index) => (
        <TouchableOpacity
          key={index}
          style={styles.buttonContainer}
          onPress={() => {
            console.log('Navigating to:', game.route);
            router.push(game.route as RelativePathString);
          }}
          activeOpacity={0.85}
        >
          <ImageBackground
            source={game.image}
            style={styles.background}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.overlay} />
            <Text style={styles.text}>{game.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const screenWidth = Dimensions.get('window').width;
const buttonHeight = 180;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: buttonHeight,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // ~50% dark overlay
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 1,
  },
});

export default GamesHomeScreen;