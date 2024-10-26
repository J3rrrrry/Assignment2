import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext';
import { ThemeContext } from '../Context/ThemeContext';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const AddDietEntry = ({ navigation }) => {
  const { setDietData } = useContext(DietContext);
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

  const validateAndSave = () => {
    if (!description) {
      Alert.alert('Error', 'Please enter a description.');
      return;
    }

    if (calories === '' || isNaN(calories)) {
      Alert.alert('Error', 'Please enter a valid numeric calorie value.');
      return;
    }

    if (calories <= 0) {
      Alert.alert('Error', 'Calories must be greater than 0.');
      return;
    }

    if (!date) {
      Alert.alert('Error', 'Please select a date.');
      return;
    }

    const isSpecial = calories > 800;

    setDietData(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        description,
        calories: parseInt(calories),
        date: date.toDateString(),
        special: isSpecial
      }
    ]);

    navigation.goBack();
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
        <Pressable onPress={() => navigation.goBack()} style={[styles.button, { backgroundColor: theme.buttonBlue }]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={validateAndSave} style={[styles.button, { backgroundColor: theme.buttonBlue }]}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  datePicker: {
    width: '100%',
    transform: [{ scale: 0.8 }],
  },
});

export default AddDietEntry;
