import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext';
import { ThemeContext } from '../Context/ThemeContext';

const AddDietEntry = ({ navigation }) => {
  const { setDietData } = useContext(DietContext);
  const { theme } = useContext(ThemeContext);
  
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const validateAndSave = () => {
    if (!description || !calories || isNaN(calories) || calories <= 0) {
      Alert.alert('Error', 'Please enter valid values for all fields.');
      return;
    }

    const isSpecial = calories > 800;

    setDietData(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        description: description,
        calories: parseInt(calories),
        date: date.toDateString(),
        special: isSpecial
      }
    ]);

    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.primary }]}>Description</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.white }]}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={[styles.label, { color: theme.primary }]}>Calories</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.white }]}
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <Text style={[styles.label, { color: theme.primary }]}>Date</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.white }]}
        value={date.toDateString()}
        onFocus={() => setShowDatePicker(true)}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={onChangeDate}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={validateAndSave} color={theme.accent} />
        <Button title="Cancel" onPress={() => navigation.goBack()} color={theme.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default AddDietEntry;
