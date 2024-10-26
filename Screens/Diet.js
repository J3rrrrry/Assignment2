import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { ThemeContext } from '../Context/ThemeContext';
import { listenToCollection } from '../Firebase/firestoreHelper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Diet = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [dietData, setDietData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('AddDietEntry')}>
          <View style={styles.iconContainer}>
            <Ionicons name="add" size={20} color={theme.white} />
            <MaterialCommunityIcons name="food" size={20} color={theme.white} />
          </View>
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
    const unsubscribe = listenToCollection('diet', setDietData);
    return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ItemsList 
        data={dietData} 
        onPressItem={(item) => navigation.navigate('EditDietEntry', { item })} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Diet;
