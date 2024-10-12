import React, { useContext, useLayoutEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { ActivityContext } from '../Context/ActivityContext';
import colors from '../Helper/colors';

const Activities = ({ navigation }) => {
  const { activityData } = useContext(ActivityContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddActivity')}>
          <Text style={{ color: colors.accent, fontSize: 16, marginRight: 15 }}>
            Add
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
