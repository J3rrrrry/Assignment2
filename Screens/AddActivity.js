import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityContext } from '../Context/ActivityContext';
import { ThemeContext } from '../Context/ThemeContext';

const AddActivity = ({ navigation }) => {
  const { setActivityData } = useContext(ActivityContext);
  const { theme } = useContext(ThemeContext);
  
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
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
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const validateAndSave = () => {
    if (!activityType || duration === '' || isNaN(duration) || duration <= 0) {
      Alert.alert('Error', 'Please enter valid values.');
      return;
    }

    const isSpecial = (activityType === 'Running' || activityType === 'Weights') && duration > 60;

    setActivityData(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        name: activityType,
        date: date.toDateString(),
        value: `${duration} min`,
        special: isSpecial
      }
    ]);

    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.white }]}>Activity Type</Text>
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

      <Text style={[styles.label, { color: theme.white }]}>Duration (min)</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.white }]}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <Text style={[styles.label, { color: theme.white }]}>Date</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.white }]}
        value={date ? date.toDateString() : ''} 
        onFocus={() => setShowDatePicker(true)}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()}
          mode="date"
          display="inline"
          onChange={onChangeDate}
          style={styles.datePicker} 
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} color={theme.accent} />
        <Button title="Save" onPress={validateAndSave} color={theme.accent} />
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
