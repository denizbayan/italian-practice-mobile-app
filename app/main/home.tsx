  import React, { useState }from 'react';
  import { View, Text, Button, SafeAreaView, StyleSheet, Dimensions,
  ScrollView} from 'react-native';  
  import { LineChart } from 'react-native-chart-kit';
  import { Ionicons } from '@expo/vector-icons';
  import { getItem } from '@/services/storage/authStorage';
  import { EnumSessionStorageKeys } from '@/constants/enums/EnumSessionStorageKeys';
  
  const screenWidth = Dimensions.get('window').width;
  const username = getItem(EnumSessionStorageKeys.USERNAME);
  const HomeScreen: React.FC = () => {

    const dummyProgressData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          strokeWidth: 2,
        },
      ],
    };

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Welcome Image 
          <Image
            source={require('./assets/language-hero.png')} // Replace with your image
            style={styles.heroImage}
            resizeMode="contain"
          />*/}

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome back, {username}! 🎉</Text>
          <Text style={styles.subtitle}>Keep up the great work on your language journey!</Text>

          {/* Progress Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Weekly Progress</Text>
            <LineChart
              data={dummyProgressData}
              width={screenWidth * 0.9}
              height={180}
              chartConfig={{
                backgroundGradientFrom: '#1e1e2f',
                backgroundGradientTo: '#1e1e2f',
                color: (opacity = 1) => `rgba(100, 220, 255, ${opacity})`,
                labelColor: () => '#ccc',
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: '#00e0ff',
                },
              }}
              bezier
              style={styles.chartStyle}
            />
          </View>

          {/* Navigation Prompt */}
          <View style={styles.swipeContainer}>
            <Text style={styles.swipeText}>To play, swipe right</Text>
            <Ionicons name="arrow-forward-circle" size={36} color="#3b82f6" />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      alignItems: 'center',
      paddingBottom: 40,
    },
    heroImage: {
      width: '90%',
      height: 180,
      marginTop: 20,
    },
    welcomeText: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#000',
      marginTop: 50,
    },
    subtitle: {
      fontSize: 16,
      color: '#94a3b8',
      marginBottom: 20,
    },
    chartContainer: {
      backgroundColor: '#1e293b',
      borderRadius: 16,
      padding: 10,
      marginTop: 10,
      marginBottom: 20,
    },
    chartTitle: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 10,
      fontWeight: '600',
      textAlign: 'center',
    },
    chartStyle: {
      borderRadius: 16,
    },
    swipeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      gap: 10,
    },
    swipeText: {
      fontSize: 16,
      color: '#cbd5e1',
    },
  });

  export default HomeScreen;
