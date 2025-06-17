import React, { useState,useRef,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConjugationGameStackParamList } from '@/types/navigation';
import { getVerbList } from '@/services/verbServices';
import { getConjugation } from '@/services/conjugationServices';
import { all } from 'axios';

const ConjugationPreGamePhase: React.FC = () => {

  type Navigation = NativeStackNavigationProp<ConjugationGameStackParamList, 'ConjugationPreGamePhase'>;
  const navigation = useNavigation<Navigation>();

  type DropdownType = {
    key: string;
    label: string;
    options: string[];
  };

const ExampleDropdownComponent: React.FC<{
  dropdown: DropdownType;
  selectedOptions: string[];
  onChange: (newSelection: string[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ dropdown, selectedOptions, onChange, isOpen, onToggle }) => {
  const animation = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const dropdownHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, dropdown.options.length * 45 + 60],
  });

  const dropdownOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const iconRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const selectAllStatus =
    selectedOptions.length === dropdown.options.length
      ? 'checked'
      : selectedOptions.length > 0
      ? 'indeterminate'
      : 'unchecked';

  const handleSelectAll = () => {
    const allSelected = selectedOptions.length === dropdown.options.length;
    onChange(allSelected ? [] : [...dropdown.options]);
  };

  const handleCheckboxChange = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    const updated = isSelected
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    onChange(updated);
  };

  return (
    <View>
      <TouchableOpacity onPress={onToggle} style={styles.dropdownButton}>
        <Text style={styles.dropdownButtonText}>
          {dropdown.label}
          {selectedOptions.length > 0 ? ` (${selectedOptions.length})` : ''}
        </Text>
        <Animated.View style={{ marginLeft: 8, transform: [{ rotate: iconRotation }] }}>
          <Icon name="caret-down" size={22} color="#4CAF50" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.dropdownList,
          {
            height: dropdownHeight,
            opacity: dropdownOpacity,
            overflow: 'hidden',
          },
        ]}
      >
        <View style={styles.checkboxContainer}>
          <Checkbox status={selectAllStatus} onPress={handleSelectAll} />
          <Text style={styles.checkboxLabel}>Select All</Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 5 }} />
        {dropdown.options.map((option) => (
          <View key={option} style={styles.checkboxContainer}>
            <Checkbox
              status={selectedOptions.includes(option) ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange(option)}
            />
            <Text style={styles.checkboxLabel}>{option}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

  const [selectedTenses, setSelectedTenses] = useState<{ [key: string]: string[] }>({
    Indicativo: [],
    Condizionale: [],
    Congiuntivo: [],
    Imperativo: [],
    Gerundio: [],
  });

  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const dropdowns = [
    { label: 'Indicativo', key: 'Indicativo', options: ['Presente', 'Passato Prossimo', 'Imperfetto', 'Futuro Semplice'] },
    { label: 'Condizionale', key: 'Condizionale', options: ['Presente', 'Passato'] },
    { label: 'Congiuntivo', key: 'Congiuntivo', options: ['Presente', 'Passato', 'Imperfetto'] },
    { label: 'Imperativo', key: 'Imperativo', options: ['Presente'] },
    { label: 'Gerundio', key: 'Gerundio', options: ['Presente', 'Passato'] },
  ];

  const startGame = async () => {
    const selectedTensesDTO: { mood: string; tense: string; tenseDBKey: string }[] = [];

    Object.entries(selectedTenses).forEach(([mood, tenses]) => {
      tenses.forEach((tense) => {
        selectedTensesDTO.push({ mood, tense, tenseDBKey: tense.split(" ").join("") });
      });
    });

    const verbList = await getVerbList();


    if (!verbList || verbList.length === 0) {
      alert('No verbs found');
      return;
    }

    const firstVerb = verbList[0].verbItalian;

    // 2. Get conjugation of first verb
    const firstConjugation = await getConjugation(firstVerb);

    // 3. Navigate with all data
    navigation.navigate('ConjugationGamePhase', {
      selectedTenses: selectedTensesDTO,
      verbList,
      initialConjugation: firstConjugation,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.pageHeader}>Select Mood & Tenses to Start!</Text>

        {/* Vertical Mood Panel */}
        <ScrollView style={styles.verticalMenu}>
          {dropdowns.map((dropdown) => (
            <View key={dropdown.key} style={styles.moodButtonWrapper}>
              <ExampleDropdownComponent 
                dropdown={dropdown}
                selectedOptions={selectedTenses[dropdown.key]}
                onChange={(newSelection) =>
                  setSelectedTenses((prev) => ({
                    ...prev,
                    [dropdown.key]: newSelection,
                  }))
                }
                isOpen={!!openDropdowns[dropdown.key]}
                onToggle={() =>
                  setOpenDropdowns((prev) => ({
                    ...prev,
                    [dropdown.key]: !prev[dropdown.key],
                  }))
                }
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={[
              styles.fancyButton,
              Object.values(selectedTenses).every(tenses => tenses.length === 0) && styles.disabledButton,
            ]}
            onPress={startGame}
            disabled={Object.values(selectedTenses).every(tenses => tenses.length === 0)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
    
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dropdownButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  fancyButton: {
    backgroundColor: '#28a745',  // Nice green color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    transform: [{ scale: 1 }],
    // Add subtle animation later if you want
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  disabledButton: {
    backgroundColor: '#a3d3a1',  // Lighter green for disabled state
    shadowOpacity: 0,
    elevation: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderTopColor: '#ccc',
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  pageHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  verticalMenu: {
    marginBottom: 70,
  },
  moodButtonWrapper: {
    marginBottom: 10,
  },
  moodButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  dropdownList: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  }
});

export default ConjugationPreGamePhase;
