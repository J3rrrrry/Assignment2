import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext';
import colors from '../Helper/colors';

const AddDietEntry = ({ navigation }) => {
  const { setDietData } = useContext(DietContext);
  
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
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Calories</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
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
        <Button title="Save" onPress={validateAndSave} color={colors.accent} />
        <Button title="Cancel" onPress={() => navigation.goBack()} color={colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default AddDietEntry;
