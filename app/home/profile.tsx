import { StyleSheet, Image, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


  const ProfileScreen: React.FC = () => {
    return (

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome to Profile</ThemedText>
        </ThemedView>
        
    );
  }

  const styles = StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -90,
      left: -35,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
      paddingTop:100
    },
  });

  export default ProfileScreen;