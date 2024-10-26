import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from '../Context/ThemeContext';
import { updateDB, deleteFromDB } from '../Firebase/firestoreHelper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Ionicons } from '@expo/vector-icons';

const EditActivity = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);
  const item = route.params?.item;
  const [activityType, setActivityType] = useState(item?.name || null);
  const [duration, setDuration] = useState(item?.duration?.toString() || '');
  const [date, setDate] = useState(item ? new Date(item.date) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [special, setSpecial] = useState(item?.special || false);
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleDelete} style={{ marginRight: 15 }}>
          <Ionicons name="trash" size={24} color={theme.white} />
        </Pressable>
      ),
    });
  }, [navigation, theme]);

  const toggleDatePicker = () => {
    if (showDatePicker && !date) {
      setDate(new Date());
    }
    setShowDatePicker((prevState) => !prevState);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDate(currentDate);
    setShowDatePicker(false);
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

    const updatedActivity = {
      name: activityType,
      duration: parseInt(duration, 10),
      date: date.toDateString(),
      special,
    };

    try {
      await updateDB(item.id, updatedActivity, 'activities');
      Alert.alert('Success', 'Activity updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update activity:', error);
      Alert.alert('Error', 'Failed to update activity');
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await deleteFromDB(item.id, 'activities');
              Alert.alert('Deleted', 'Activity deleted successfully!');
              navigation.goBack();
            } catch (error) {
              console.error('Failed to delete activity:', error);
              Alert.alert('Error', 'Failed to delete activity');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Activity *</Text>
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

      <Text style={[styles.label, { color: theme.text }]}>Duration (min) *</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.primary, backgroundColor: theme.white }]}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <Text style={[styles.label, { color: theme.text }]}>Date *</Text>
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

      <View style={styles.specialEntryContainer}>
        <Text style={[styles.specialText, { color: theme.text }]}>
          This item is marked as special. Select the checkbox if you would like to approve it.
        </Text>
        <Switch
          value={special}
          onValueChange={(value) => setSpecial(value)}
          trackColor={{ false: theme.gray, true: theme.accent }}
          thumbColor={special ? theme.primary : theme.white}
        />
      </View>

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
  dropdown: {
    marginBottom: 20,
  },
  specialEntryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  specialText: {
    flex: 1,
    fontSize: 14,
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

export default EditActivity;
