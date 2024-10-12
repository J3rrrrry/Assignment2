import React, { useContext, useLayoutEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { DietContext } from '../Context/DietContext';
import colors from '../Helper/colors';

const Diet = ({ navigation }) => {
  const { dietData } = useContext(DietContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddDietEntry')}>
          <Text style={{ color: colors.accent, fontSize: 16, marginRight: 15 }}>
            Add
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <ItemsList data={dietData} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
});

export default Diet;
