import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { DietContext } from '../Context/DietContext';
import colors from '../Helper/colors';

const Diet = () => {
  const { dietData } = useContext(DietContext);

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
