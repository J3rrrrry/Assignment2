import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';

const ItemsList = ({ data }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: theme.primary }]}>
          <Text style={[styles.itemName, { color: theme.white }]}>
            {item.name || item.description}
          </Text>
          <View style={styles.itemDetails}>
            <Text style={[styles.itemDate, { color: theme.white }]}>{item.date}</Text>
            <Text style={[styles.itemValue, { color: theme.white }]}>
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
    backgroundColor: '#3E3364',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#605A86',
  },
  itemName: {
    fontSize: 16,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDate: {
    marginRight: 10,
  },
  itemValue: {
    fontWeight: 'bold',
  },
});

export default ItemsList;
