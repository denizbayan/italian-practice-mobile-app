import { Stack } from 'expo-router';

export default function GamesLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Select a Game' }} />
      <Stack.Screen name="article_game" options={{ title: 'Article Game' }} />
      <Stack.Screen name="conjugation_game" options={{ title: 'Conjugation Game' }} />
      <Stack.Screen name="dictionary_game" options={{ title: 'Dictionary Game' }} />
    </Stack>
  );
}