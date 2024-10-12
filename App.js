import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Diet from './Screens/Diet';
import Activities from './Screens/Activities';
import AddActivity from './Screens/AddActivity';
import colors from './Helper/colors';
import { DietProvider } from './Context/DietContext';
import { ActivityProvider } from './Context/ActivityContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Diet') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';
        } else if (route.name === 'Activities') {
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
    <Tab.Screen name="Diet" component={Diet} />
    <Tab.Screen name="Activities" component={Activities} />
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
            <Stack.Screen name="AddActivity" component={AddActivity} />
          </Stack.Navigator>
        </NavigationContainer>
      </DietProvider>
    </ActivityProvider>
  );
};

export default App;
