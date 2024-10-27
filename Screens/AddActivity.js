import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from '../Context/ThemeContext';
import { writeToDB } from '../Firebase/firestoreHelper';
import Button from '../Components/Button';
import { Pressable } from 'react-native';

const AddActivity = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    if (showDatePicker && !date) {
      setDate(new Date());
    }
    setShowDatePicker(prevState => !prevState);
  };

  const validateAndSave = async () => {
    if (!activityType || !duration || !date) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (isNaN(duration)) {
      Alert.alert('Error', 'Duration must be a numeric value.');
      return;
    }

    const newActivity = {
      name: activityType,
      duration: parseInt(duration, 10),
      date: date.toDateString(),
      special: (activityType === 'Running' || activityType === 'Weights') && duration > 60,
    };

    try {
      await writeToDB(newActivity, 'activities');
      Alert.alert('Success', 'Activity added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to add activity:', error);
      Alert.alert('Error', 'Failed to add activity');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Activity Type</Text>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        placeholder="Select an activity type"
        style={[styles.dropdown, { borderColor: theme.primary, backgroundColor: theme.white }]}
      />
      <Text style={[styles.label, { color: theme.text }]}>Duration (min)</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.white }]}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
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
  dropdown: {
    marginBottom: 20,
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

export default AddActivity;
