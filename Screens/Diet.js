import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';

const Diet = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Add" onPress={() => {}} />
      <ItemsList type="diet" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#B6B3D1',
  },
});

export default Diet;
