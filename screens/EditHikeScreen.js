import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Platform,
  Switch,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Calendar} from 'react-native-calendars';
import {useRoute, useNavigation} from '@react-navigation/native';
import Database from '../Database';

const EditHikeScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [parkingStatus, setParkingStatus] = useState(false);
  const [lengthOfHike, setLengthOfHike] = useState('');
  const [elevation, setElevation] = useState('');
  const [description, setDescription] = useState('');
  const [timeToComplete, setTimeToComplete] = useState('');

  const {params} = useRoute();
  const navigation = useNavigation();
  const hikeId = params?.hikeId;

  useEffect(() => {
    if (hikeId) {
      Database.getHikeById(hikeId).then(result => {
        const hike = result;
        setName(hike.name);
        setLocation(hike.location);
        setDate(hike.date);
        setDifficulty(hike.difficulty);
        setParkingStatus(hike.parkingStatus);
        setLengthOfHike(hike.lengthOfHike);
        setElevation(hike.elevation);
        setDescription(hike.description);
        setTimeToComplete(hike.timeToComplete);
      });
    }
  }, [hikeId]);

  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onDateSelect = day => {
    setDate(day.dateString);
    setShowCalendar(false);
  };

  const showToast = (type, message) => {
    Toast.show({
      type,
      text1: message,
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  const editHike = () => {
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
    const updatedHike = {
      id: hikeId,
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

    Database.editHike(updatedHike).then(() => {
      // Update details in the hike list screen
      navigation.navigate('Home');
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
      {date !== '' && (
        <Text style={styles.selectedDate}>Selected Date: {date}</Text>
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

      {/* Edit Hike button */}
      <TouchableOpacity style={styles.editButton} onPress={editHike}>
        <Text style={styles.buttonText}>Edit Hike</Text>
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
  editButton: {
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

export default EditHikeScreen;
