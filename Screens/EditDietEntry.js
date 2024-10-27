import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'expo-checkbox';
import { ThemeContext } from '../Context/ThemeContext';
import { updateDB, deleteFromDB } from '../Firebase/firestoreHelper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Ionicons } from '@expo/vector-icons';

const EditDietEntry = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);
  const item = route.params?.item;
  const [description, setDescription] = useState(item?.description || '');
  const [calories, setCalories] = useState(item?.calories?.toString() || '');
  const [date, setDate] = useState(item ? new Date(item.date) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [special, setSpecial] = useState(item?.special || false);
  const [checkboxChecked, setCheckboxChecked] = useState(!special);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleDelete} style={{ marginRight: 15 }}>
          <Ionicons name="trash" size={24} color={theme.white} />
        </Pressable>
      ),
    });
  }, [navigation, theme]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const toggleDatePicker = () => {
    if (showDatePicker && !date) {
      setDate(new Date());
    }
    setShowDatePicker((prevState) => !prevState);
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
      special: !checkboxChecked,
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

  const handleDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes', onPress: async () => {
            try {
              await deleteFromDB(item.id, 'diet');
              Alert.alert('Deleted', 'Diet entry deleted successfully!');
              navigation.goBack();
            } catch (error) {
              console.error('Failed to delete diet entry:', error);
              Alert.alert('Error', 'Failed to delete diet entry');
            }
          }
        },
      ],
      { cancelable: true }
    );
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

      {special && (
        <View style={styles.checkboxContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            This item is marked as special. Select the checkbox if you would like to approve it.
          </Text>
          <Checkbox
            value={checkboxChecked}
            onValueChange={(value) => setCheckboxChecked(value)}
            color={checkboxChecked ? theme.accent : theme.gray}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.goBack()} style={[styles.button, { backgroundColor: theme.accent }]}>
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
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
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
