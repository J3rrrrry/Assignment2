import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import colors from '../Helper/colors';

const Button = ({ title, onPress, backgroundColor, textColor }) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: backgroundColor || colors.lightTheme.buttonBlue }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor || colors.lightTheme.white }]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
