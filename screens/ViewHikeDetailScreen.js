import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Database from '../Database';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ViewHikeDetailScreen = () => {
  const [hike, setHike] = useState(null);
  const {params} = useRoute();
  const hikeId = params?.hikeId;
  const navigation = useNavigation();

  useEffect(() => {
    if (hikeId) {
      Database.getHikeById(hikeId).then(result => {
        setHike(result);
      });
    }
  }, [hikeId]);

  const navigateToAddObservation = () => {
    navigation.navigate('AddObservation', {hikeId});
  };

  const navigateToViewObservations = () => {
    navigation.navigate('ViewObservations', {hikeId});
  };

  if (!hike) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Hike Details</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{hike.name}</Text>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{hike.location}</Text>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{hike.date}</Text>

        {/* Additional fields */}
        <Text style={styles.label}>Difficulty:</Text>
        <Text style={styles.value}>{hike.difficulty}</Text>
        <Text style={styles.label}>Parking Status:</Text>
        <Text style={styles.value}>
          {hike.parkingStatus ? 'Available' : 'Not Available'}
        </Text>
        <Text style={styles.label}>Length of Hike:</Text>
        <Text style={styles.value}>{hike.lengthOfHike}</Text>
        <Text style={styles.label}>Elevation:</Text>
        <Text style={styles.value}>{hike.elevation}</Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{hike.description}</Text>
        <Text style={styles.label}>Time to Complete:</Text>
        <Text style={styles.value}>{hike.timeToComplete}</Text>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginRight: 5,
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 5,
            }}
            onPress={navigateToAddObservation}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Add Observation
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              marginLeft: 5,
              backgroundColor: 'green',
              padding: 10,
              borderRadius: 5,
            }}
            onPress={navigateToViewObservations}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              View Observations
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ViewHikeDetailScreen;
