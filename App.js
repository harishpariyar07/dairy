import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AddFarmer from './screens/AddFarmer';
import CollectMilk from './screens/CollectMilk';
import Dues from './screens/Dues';
import Ledger from './screens/Ledger';
import Payments from './screens/Payments';
import RateChart from './screens/RateChart';

const screens = [
  { name: 'LoginScreen', component: LoginScreen },
  { name: 'SignUpScreen', component: SignUpScreen },
  { name: 'HomeScreen', component: HomeScreen },
  { name: 'AddFarmer', component: AddFarmer },
  { name: 'CollectMilk', component: CollectMilk },
  { name: 'RateChart', component: RateChart },
  { name: 'Payments', component: Payments },
  { name: 'Dues', component: Dues },
  { name: 'Ledger', component: Ledger }
];

const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    Inter: require('./assets/fonts/Inter-Medium.ttf'),
    InterB: require('./assets/fonts/Inter-Bold.ttf'),
    LeagueSB: require('./assets/fonts/LeagueSpartan-Bold.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
