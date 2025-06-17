import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConjugationPreGamePhase from '@/components/ConjugationPreGamePhase';
import ConjugationGamePhase from '@/components/ConjugationGamePhase';
import { ConjugationGameStackParamList } from '@/types/navigation';



export default function ConjugationGame() {
  const Stack = createNativeStackNavigator<ConjugationGameStackParamList>();
  return (
    <Stack.Navigator initialRouteName="ConjugationPreGamePhase">
      <Stack.Screen
        name="ConjugationPreGamePhase"
        component={ConjugationPreGamePhase}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConjugationGamePhase"
        component={ConjugationGamePhase}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
