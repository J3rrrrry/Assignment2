import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../Helper/colors';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerAdd}>Add</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerAdd: {
    color: colors.accent,
    fontSize: 16,
    position: 'absolute',
    right: 20,
  },
});

export default Header;
