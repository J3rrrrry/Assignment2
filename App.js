import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Diet from './Screens/Diet';
import Activities from './Screens/Activities';
import AddActivity from './Screens/AddActivity';
import AddDietEntry from './Screens/AddDietEntry';
import colors from './Helper/colors';
import { DietProvider } from './Context/DietContext';
import { ActivityProvider } from './Context/ActivityContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DietStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name="DietScreen" component={Diet} options={{ title: 'Diet' }} />
    <Stack.Screen name="AddDietEntry" component={AddDietEntry} options={{ title: 'Add Diet Entry' }} />
  </Stack.Navigator>
);

const ActivitiesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name="ActivitiesScreen" component={Activities} options={{ title: 'Activities' }} />
    <Stack.Screen name="AddActivity" component={AddActivity} options={{ title: 'Add Activity' }} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'DietTab') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';
        } else if (route.name === 'ActivitiesTab') {
          iconName = focused ? 'walk' : 'walk-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.white,
      tabBarStyle: {
        backgroundColor: colors.primary,
      },
    })}
  >
    <Tab.Screen name="DietTab" component={DietStack} options={{ title: 'Diet' }} />
    <Tab.Screen name="ActivitiesTab" component={ActivitiesStack} options={{ title: 'Activities' }} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <ActivityProvider>
      <DietProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.white,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DietProvider>
    </ActivityProvider>
  );
};

export default App;