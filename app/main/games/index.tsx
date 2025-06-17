import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RelativePathString, useRouter } from 'expo-router';
import { testPublic, testSecured } from '@/services/testServices';

const games = [
  {
    title: 'Article Game',
    image: require('@/assets/images/games/article.png'),
    route: '/main/games/article_game',
  },
  {
    title: 'Dictionary Game',
    image: require('@/assets/images/games/dictionary.png'),
    route: '/main/games/dictionary_game',
  },
  {
    title: 'Conjugation Game',
    image: require('@/assets/images/games/conjugation.png'),
    route: '/main/games/conjugation_game',
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
      {games.map((game, index) => {
        const isConjugation = game.title === 'Conjugation Game';
        return (
        <View key={index} style={styles.gameWrapper}>
          <Text style={styles.titleText}>{game.title}</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              router.push(game.route as RelativePathString);
            }}
            activeOpacity={0.85}
          >
            <ImageBackground
              source={game.image}
              style={styles.background}
              imageStyle={[
            styles.imageStyle,
            isConjugation && styles.conjugationImageStyle, // apply specific tweak
          ]}
            >
              <View style={styles.overlay} />
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )
      }
        )}
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;
const buttonHeight = 180;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  gameWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1f2937', // dark gray for visibility
  },
  buttonContainer: {
    width: '100%',
    height: buttonHeight,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  background: {
    flex: 1,
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)', // slightly darken for contrast, optional
  },
  conjugationImageStyle: {
  resizeMode: 'contain',
  transform: [{ scale: 3.2 }], // slight zoom out
},
});

export default GamesHomeScreen;
