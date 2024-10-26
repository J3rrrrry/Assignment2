import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from '../Context/ThemeContext';
import { updateDB, deleteFromDB } from '../Firebase/firestoreHelper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const EditDietEntry = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);
  const item = route.params?.item;
  const [description, setDescription] = useState(item?.description || '');
  const [calories, setCalories] = useState(item?.calories?.toString() || '');
  const [date, setDate] = useState(item ? new Date(item.date) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [special, setSpecial] = useState(item?.special || false);

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

    const updatedDietEntry = {
      description,
      calories: parseInt(calories),
      date: date.toDateString(),
      special,
    };

    try {
      await updateDB(item.id, updatedDietEntry, 'diet');
      Alert.alert('Success', 'Diet entry updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update diet entry:', error);
      Alert.alert('Error', 'Failed to update diet entry');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFromDB(item.id, 'diet');
      Alert.alert('Deleted', 'Diet entry deleted successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to delete diet entry:', error);
      Alert.alert('Error', 'Failed to delete diet entry');
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

      <View style={styles.checkboxContainer}>
        <Text style={[styles.label, { color: theme.text }]}>Special Entry</Text>
        <Switch
          value={special}
          onValueChange={(value) => setSpecial(value)}
          trackColor={{ false: theme.gray, true: theme.accent }}
          thumbColor={special ? theme.primary : theme.white}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={validateAndSave} style={[styles.button, { backgroundColor: theme.buttonBlue }]}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable onPress={handleDelete} style={[styles.button, { backgroundColor: theme.accent }]}>
          <Text style={styles.buttonText}>Delete</Text>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
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

export default EditDietEntry;
