import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Diet from './Screens/Diet';
import Activities from './Screens/Activities';
import AddActivity from './Screens/AddActivity';
import AddDietEntry from './Screens/AddDietEntry';
import EditDietEntry from './Screens/EditDietEntry';
import EditActivity from './Screens/EditActivity';
import Settings from './Screens/Settings';
import { ThemeProvider, ThemeContext } from './Context/ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DietStack = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: theme.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="DietScreen" component={Diet} options={{ title: 'Diet' }} />
      <Stack.Screen name="AddDietEntry" component={AddDietEntry} options={{ title: 'Add Diet Entry' }} />
      <Stack.Screen name="EditDietEntry" component={EditDietEntry} options={{ title: 'Edit Diet Entry' }} />
    </Stack.Navigator>
  );
};

const ActivitiesStack = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: theme.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="ActivitiesScreen" component={Activities} options={{ title: 'Activities' }} />
      <Stack.Screen name="AddActivity" component={AddActivity} options={{ title: 'Add Activity' }} />
      <Stack.Screen name="EditActivity" component={EditActivity} options={{ title: 'Edit Activity' }} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: theme.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="SettingsScreen" component={Settings} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'DietTab') {
            return <MaterialCommunityIcons name="food" size={size} color={color} />;
          } else if (route.name === 'ActivitiesTab') {
            iconName = focused ? 'walk' : 'walk-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.gray,
        tabBarStyle: {
          backgroundColor: theme.primary,
        },
      })}
    >
      <Tab.Screen name="ActivitiesTab" component={ActivitiesStack} options={{ title: 'Activities' }} />
      <Tab.Screen name="DietTab" component={DietStack} options={{ title: 'Diet' }} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
