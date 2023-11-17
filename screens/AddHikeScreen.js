import React, {useState} from 'react';
import {
  View,
  TextInput,
  Switch,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Database from '../Database';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const AddHikeScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const [difficulty, setDifficulty] = useState('');
  const [parkingStatus, setParkingStatus] = useState(false);
  const [lengthOfHike, setLengthOfHike] = useState('');
  const [elevation, setElevation] = useState('');
  const [description, setDescription] = useState('');
  const [timeToComplete, setTimeToComplete] = useState('');

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const navigation = useNavigation();

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onDateSelect = day => {
    setDate(day.dateString);
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const showToast = (type, message) => {
    console.log('INSIDE SHOW TOAST');
    try {
      Toast.show({
        type,
        text1: message,
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addHike = () => {
    console.log('HELLO>>>');
    if (
      !name.trim() ||
      !location.trim() ||
      !date.trim() ||
      !difficulty.trim() ||
      !lengthOfHike.trim() ||
      !description.trim()
    ) {
      showToast(
        'warning',
        'All fields except Elevation and Time to Complete are required.',
      );
      return;
    }
    const hike = {
      name,
      location,
      date,
      difficulty,
      parkingStatus,
      lengthOfHike,
      elevation,
      description,
      timeToComplete,
    };

    Database.addHike(hike)
      .then(() => {
        showToast('success', 'Hike added successfully');
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        showToast('error', 'Error adding hike');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={text => setLocation(text)}
      />

      {/* Additional fields */}
      <TextInput
        style={styles.input}
        placeholder="Difficulty"
        value={difficulty}
        onChangeText={text => setDifficulty(text)}
      />

      {/* Toggle button for parking status */}
      <View style={styles.parkingStatusContainer}>
        <Text>Parking Status: </Text>
        <Switch
          value={parkingStatus}
          onValueChange={() => setParkingStatus(!parkingStatus)}
        />
        <Text>{parkingStatus ? 'Available' : 'Not Available'}</Text>
      </View>

      {/* Calendar component */}
      {showCalendar && (
        <Calendar
          onDayPress={onDateSelect}
          hideExtraDays
          markedDates={{[date]: {selected: true}}}
        />
      )}

      {/* Selected date display */}
      {selectedDate !== '' && (
        <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
      )}

      {/* Select Date button */}
      <TouchableOpacity style={styles.smallButton} onPress={toggleCalendar}>
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>

      {/* Additional fields for Android */}
      {Platform.OS === 'android' && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Length of Hike"
            value={lengthOfHike}
            onChangeText={text => setLengthOfHike(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Elevation"
            value={elevation}
            onChangeText={text => setElevation(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Time to Complete"
            value={timeToComplete}
            onChangeText={text => setTimeToComplete(text)}
          />
        </View>
      )}

      {/* Add Hike button */}
      <TouchableOpacity style={styles.addButton} onPress={addHike}>
        <Text style={styles.buttonText}>Add Hike</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  parkingStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedDate: {
    marginTop: 10,
  },
  smallButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AddHikeScreen;
