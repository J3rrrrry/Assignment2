import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.buttonContainer}>
        <Button title="Toggle Theme" onPress={toggleTheme} color={theme.accent} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%',
  },
});

export default Settings;

