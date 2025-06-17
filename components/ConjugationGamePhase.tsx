import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const italianPronouns = ['io', 'tu', 'lui', 'noi', 'voi', 'loro'];

const ConjugationGamePhase: React.FC = () => {
  const route = useRoute<any>();
  const params = route.params ?? {};
  const {
    selectedTenses = [],
    verbList = [],
    initialConjugation = [],
  } = params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [inputAnswers, setInputAnswers] = useState(Array(6).fill(''));
  const [gameFinished, setGameFinished] = useState(false);

  const current = selectedTenses[currentIndex] ?? {};

  // Initialize answers object from initialConjugation
  useEffect(() => {
    if (!initialConjugation || !Array.isArray(initialConjugation)) {
    console.error('initialConjugation is not a valid array:', initialConjugation);
    return;
  }

    const initialAnswers: any = {};

    initialConjugation.forEach((item: any, index: number) => {
      if (!item || typeof item !== 'object') {
        console.warn(`Skipping invalid item at index ${index}:`, item);
        return;
      }

      const { mood, tense, conjugationDict } = item;



      if (!mood || !tense || !conjugationDict) {
        console.warn(`Incomplete data at index ${index}:`, item);
        return;
      }

      const isSelected = selectedTenses.some(
        (t: any) => t.mood === mood && t.tenseDBKey === tense
      );

      if (!isSelected) {
        return;
      }

      if (!initialAnswers[mood]) initialAnswers[mood] = {};
      if (!initialAnswers[mood][tense]) initialAnswers[mood][tense] = {};

      Object.entries(conjugationDict).forEach(([pronoun, correctAnswer]) => {
        initialAnswers[mood][tense][pronoun] = {
          correctAnswer,
          userAnswer: '',
          isHint: false,
          isCorrect: false
        };
      });
    });
    setAnswers(initialAnswers);
    console.log('initialAnswers:', JSON.stringify(initialAnswers, null, 2));
  }, [initialConjugation]);


  // Save input to inputAnswers
  const handleChange = (value: string, index: number) => {
    const newAnswers = [...inputAnswers];
    newAnswers[index] = value;
    setInputAnswers(newAnswers);
  };

  const handleNext = () => {
    
    console.log("started")
    const mood = current.mood;
    const tense = current.tenseDBKey;

    const updated = { ...answers };

    italianPronouns.forEach((pronoun, i) => {
      updated[mood][tense][pronoun].userAnswer = inputAnswers[i];
    });
    console.log("user answers inserted")
    setAnswers(updated);

    
    console.log(currentIndex + 1 < selectedTenses.length)
    // Go to next or finish
    if (currentIndex + 1 < selectedTenses.length) {
      setCurrentIndex(currentIndex + 1);

      // Pre-fill inputs if user goes back and forth
      const next = selectedTenses[currentIndex + 1];
      const nextInputs = italianPronouns.map(
        p => answers[next.mood]?.[next.tense]?.[p]?.userAnswer || ''
      );
      console.log("user answers cleared for next turn")
      setInputAnswers(nextInputs);
    } else {
      setGameFinished(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prev = selectedTenses[currentIndex - 1];
      const prevInputs = italianPronouns.map(
        p => answers[prev.mood]?.[prev.tense]?.[p]?.userAnswer || ''
      );

      setCurrentIndex(currentIndex - 1);
      setInputAnswers(prevInputs);
    }
  };

  // Run comparison when game finishes
  useEffect(() => {
    if (gameFinished) {
      const updated = { ...answers };

      Object.keys(updated).forEach(mood => {
        Object.keys(updated[mood]).forEach(tense => {
          Object.keys(updated[mood][tense]).forEach(pronoun => {
            const entry = updated[mood][tense][pronoun];
            entry.isCorrect =
              entry.userAnswer.trim().toLowerCase() === entry.correctAnswer.trim().toLowerCase();
          });
        });
      });

      setAnswers(updated);
      console.log('Final Comparison:', JSON.stringify(updated, null, 2));
      alert('Game finished!');
    }
  }, [gameFinished]);

  const isLast = currentIndex === selectedTenses.length - 1;
  const showBack = currentIndex > 0;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        {current.mood} - {current.tense}
      </Text>
      <Text style={styles.header}>
        {initialConjugation[0]?.verb?.verbItalian ?? 'Verb'} 
      </Text>

      <ScrollView contentContainerStyle={styles.inputsWrapper}>
        {italianPronouns.map((pronoun, i) => (
          <View key={pronoun} style={styles.inputRow}>
            <Text style={styles.pronoun}>{pronoun}</Text>
            <TextInput
              style={styles.input}
              value={inputAnswers[i]}
              onChangeText={(text) => handleChange(text, i)}
              placeholder="Type verb..."
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonsWrapper}>
        {showBack && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.nextButton,
            showBack ? {} : styles.nextButtonFull,
            isLast && styles.finishButton,
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextText}>
            {isLast ? 'Finish' : 'Next'} ➤ {currentIndex + 1}/{selectedTenses.length}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6ff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputsWrapper: {
    paddingBottom: 100,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  pronoun: {
    width: 70,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  buttonsWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 30,
    marginRight: 10,
    width: '45%',
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 30,
    width: '50%',
    alignItems: 'center',
  },
  nextButtonFull: {
    width: '100%', // When no back button, next button covers full width (half of screen padding considered)
  },
  nextText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  finishButton: {
  backgroundColor: '#dc3545', // Bootstrap's red or choose any red you like
},
});

export default ConjugationGamePhase;
