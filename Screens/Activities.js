import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { ThemeContext } from '../Context/ThemeContext';
import { listenToCollection } from '../Firebase/firestoreHelper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Activities = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [activityData, setActivityData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('AddActivity')}>
          <Text style={{ color: theme.buttonBlue, fontSize: 16, marginRight: 15 }}>Add</Text>
        </Pressable>
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

  useEffect(() => {
    const unsubscribe = listenToCollection('activities', setActivityData);
    return () => unsubscribe();
  }, []);

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
