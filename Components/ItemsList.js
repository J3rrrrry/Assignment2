import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const ItemsList = ({ data, onPressItem }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressItem(item)}>
          <View style={[styles.itemContainer, { backgroundColor: theme.primary }]}>
            <Text style={[styles.itemName, { color: theme.white }]}>
              {item.name || item.description}
            </Text>
            <View style={styles.itemDetails}>
              {item.special && (
                <Ionicons
                  name="warning"
                  size={20}
                  color="#FFC107"
                  style={styles.warningIcon}
                />
              )}
              <Text style={[styles.itemDate, { backgroundColor: theme.white, color: theme.primary }]}>
                {item.date}
              </Text>
              <Text style={[styles.itemValue, { backgroundColor: theme.white, color: theme.primary }]}>
                {item.duration ? `${item.duration} mins` : `${item.calories} kcal`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
    flex: 1,
    color: '#fff',
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDate: {
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    color: '#000',
    minWidth: 100,
  },
  itemValue: {
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    color: '#000',
    minWidth: 60,
    textAlign: 'center',
  },
  warningIcon: {
    marginRight: 8,
  },
});

export default ItemsList;
