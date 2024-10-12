import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Activities from './Screens/Activities';
import Diet from './Screens/Diet';
import DataProvider from './context/DataContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Activities') {
                iconName = 'fitness-outline';
              } else if (route.name === 'Diet') {
                iconName = 'restaurant-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Activities" component={Activities} />
          <Tab.Screen name="Diet" component={Diet} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
