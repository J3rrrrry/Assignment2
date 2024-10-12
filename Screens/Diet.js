import React, { useContext, useLayoutEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { DietContext } from '../Context/DietContext';
import { ThemeContext } from '../Context/ThemeContext';

const Diet = ({ navigation }) => {
  const { dietData } = useContext(DietContext);
  const { theme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddDietEntry')}>
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
      <ItemsList data={dietData} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Diet;
