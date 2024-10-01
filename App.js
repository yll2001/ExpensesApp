import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenageExpences from './screens/MenageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/style';
import { Ionicons } from '@expo/vector-icons'
import IconButton from './components/UI/IconButton';
import { ExpensesContextProvider } from './store/expenses-context';



const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpencesOverview() {
  return <BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => { navigation.navigate('ManageExpense') }} />


  })}>
    <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
      title: 'Recent Epxenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />



    }} />
    <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
      title: 'All Expences',
      tabBarLabel: 'All Expenses',
      tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />

    }} />
  </BottomTabs.Navigator >
}


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTinColor: 'white'
          }}>
            <Stack.Screen name="ExpensesOverview" component={ExpencesOverview} options={{
              headerShown: false
            }} />
            <Stack.Screen name="ManageExpense" component={MenageExpences} options={{
              presentation: 'modal'
            }}
            />
          </Stack.Navigator>

        </NavigationContainer>

      </ExpensesContextProvider>
    </>

  );
}

const styles = StyleSheet.create({

});
