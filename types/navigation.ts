// types/navigation.ts
export type ConjugationGameStackParamList = {
  ConjugationPreGamePhase: undefined;
  ConjugationGamePhase: {
    selectedTenses: { mood: string; tense: string; tenseDBKey: string }[];
    verbList: any[];
    initialConjugation: any[]; 
  };
};