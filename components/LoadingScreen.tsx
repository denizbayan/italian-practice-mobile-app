import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" style={styles.spinner} />
      <Text style={styles.text}>Please wait...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // beyaz arkaplan
  },
  spinner: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});