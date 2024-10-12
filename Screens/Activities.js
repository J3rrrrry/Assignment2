import React, { useContext, useLayoutEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { ActivityContext } from '../Context/ActivityContext';
import { ThemeContext } from '../Context/ThemeContext';

const Activities = ({ navigation }) => {
  const { activityData } = useContext(ActivityContext);
  const { theme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddActivity')}>
          <Text style={{ color: theme.accent, fontSize: 16, marginRight: 15 }}>
            Add
          </Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: theme.primary,
      },
      headerTintColor: theme.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation, theme]);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ItemsList data={activityData} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Activities;
