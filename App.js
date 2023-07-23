import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { useFonts } from 'expo-font';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddFarmer from './screens/AddFarmer';
import CollectMilk from './screens/CollectMilk';
import Dues from './screens/Dues';
import Ledger from './screens/Ledger';
import Payments from './screens/Payments';
import RateChart from './screens/RateChart';
import AddFarmerDetails from './screens/AddFarmerDetails';
import AddRateDetails from './screens/AddRateDetails';
import AddCollection from './screens/AddCollection';
import { AuthProvider, useAuth } from './context/AuthContext';

const screens = [
  { name: 'HomeScreen', component: HomeScreen },
  { name: 'AddFarmer', component: AddFarmer },
  { name: 'AddFarmerDetails', component: AddFarmerDetails },
  { name: 'CollectMilk', component: CollectMilk },
  { name: 'AddCollection', component: AddCollection },
  { name: 'RateChart', component: RateChart },
  { name: 'AddRateDetails', component: AddRateDetails },
  { name: 'Payments', component: Payments },
  { name: 'Dues', component: Dues },
  { name: 'Ledger', component: Ledger },
  { name: 'RegisterScreen', component: RegisterScreen },
];

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  const { onLogout } = useAuth()
  return (
    <Stack.Navigator>
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.name === 'HomeScreen' && {
            headerRight: () => <Button onPress={onLogout} title="Logout" > <Text>Logout</Text> </Button>,
          }}
        />
      ))}
    </Stack.Navigator>)
};


const NonAuthenticatedStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
  </Stack.Navigator>
);

const Layout = () => {
  const { authState } = useAuth()
  return (<NavigationContainer>
    {authState && authState.authenticated ? (
      <AuthenticatedStack />
    ) : (
      <NonAuthenticatedStack />
    )}
  </NavigationContainer>)
}

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
    <AuthProvider>
      <PaperProvider style={{
        fontFamily: 'Inter'
      }}>
        <Layout />
      </PaperProvider>
    </AuthProvider>
  );
}
