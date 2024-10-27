import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from '../Context/ThemeContext';
import { writeToDB } from '../Firebase/firestoreHelper';
import Button from '../Components/Button';
import { Pressable } from 'react-native';

const AddDietEntry = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const toggleDatePicker = () => {
    if (showDatePicker && !date) {
      setDate(new Date());
    }
    setShowDatePicker(prevState => !prevState);
  };

  const validateAndSave = async () => {
    if (!description || !calories || !date) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (isNaN(calories)) {
      Alert.alert('Error', 'Calories must be a numeric value.');
      return;
    }

    const newDietEntry = {
      description,
      calories: parseInt(calories),
      date: date.toDateString(),
      special: calories > 800,
    };

    try {
      await writeToDB(newDietEntry, 'diet');
      Alert.alert('Success', 'Diet entry added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to add diet entry:', error);
      Alert.alert('Error', 'Failed to add diet entry');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Description</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.white }]}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={[styles.label, { color: theme.text }]}>Calories</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.white }]}
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />
      <Text style={[styles.label, { color: theme.text }]}>Date</Text>
      <Pressable onPressIn={toggleDatePicker}>
        <View>
          <TextInput
            style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.white }]}
            value={date ? date.toDateString() : ''}
            editable={false}
            pointerEvents="none"
            placeholder="Select a date"
          />
        </View>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="inline"
          onChange={onChangeDate}
          style={styles.datePicker}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} backgroundColor={theme.accent} />
        <Button title="Save" onPress={validateAndSave} backgroundColor={theme.buttonBlue} />
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
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  datePicker: {
    width: '100%',
    transform: [{ scale: 0.8 }],
  },
});

export default AddDietEntry;
