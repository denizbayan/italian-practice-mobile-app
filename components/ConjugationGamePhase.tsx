import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface ConjugationGamePhaseProps {
  route: {
    params: {
      selectedTenses: { [key: string]: string[] };
    };
  };
}

const ConjugationGamePhase: React.FC<ConjugationGamePhaseProps> = ({ route }) => {
  const { selectedTenses } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Selected Tenses:</Text>
      {Object.entries(selectedTenses).map(([mood, tenses]) => (
        <View key={mood} style={styles.item}>
          <Text style={styles.mood}>{mood}</Text>
          {tenses.length > 0 ? (
            tenses.map((tense) => <Text key={tense}>• {tense}</Text>)
          ) : (
            <Text style={styles.none}>No tense selected</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    marginBottom: 15,
  },
  mood: {
    fontSize: 18,
    fontWeight: '600',
  },
  none: {
    fontStyle: 'italic',
    color: '#888',
  },
});

export default ConjugationGamePhase;