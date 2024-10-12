import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { ActivityContext } from '../Context/ActivityContext';
import colors from '../Helper/colors';

const Activities = () => {
  const { activityData } = useContext(ActivityContext);

  return (
    <View style={styles.screen}>
      <ItemsList data={activityData} />
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

export default Activities;
