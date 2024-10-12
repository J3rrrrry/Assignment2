import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DataContext } from '../context/DataContext';

const ItemsList = ({ type }) => {
  const { data } = useContext(DataContext);
  const items = type === 'diet' ? data.diet : data.activities;

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
          {type === 'diet' ? (
            <Text style={styles.value}>{item.calories} kcal</Text>
          ) : (
            <Text style={styles.value}>{item.duration}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#4e5d94',
    marginVertical: 5,
    borderRadius: 5,
  },
  name: {
    color: '#fff',
    fontSize: 18,
  },
  date: {
    color: '#fff',
    fontSize: 16,
  },
  value: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ItemsList;
