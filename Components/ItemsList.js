import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import colors from '../Helper/colors';

const ItemsList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>
          {item.name || item.description}
          </Text>
          <View style={styles.itemDetails}>
            <Text style={styles.itemDate}>{item.date}</Text>
            <Text style={styles.itemValue}>
              {item.value || item.calories}
              </Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.primary,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: colors.white,
    fontSize: 16,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDate: {
    color: colors.white,
    marginRight: 10,
  },
  itemValue: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default ItemsList;
