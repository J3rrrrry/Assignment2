import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityContext } from '../Context/ActivityContext';
import colors from '../Helper/colors';

const AddActivity = ({ navigation }) => {
  const { setActivityData } = useContext(ActivityContext);
  
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
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
    <View style={styles.container}>
      <Text style={styles.label}>Activity Type</Text>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        placeholder="Select an activity type"
        style={styles.dropdown}
      />

      <Text style={styles.label}>Duration (min)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
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
  dropdown: {
    marginBottom: 20,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default AddActivity;
