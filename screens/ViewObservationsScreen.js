import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity, Button} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Database from '../Database';

const ViewObservationsScreen = () => {
  const [observations, setObservations] = useState([]);
  const {params} = useRoute();
  const hikeId = params?.hikeId;
  const navigation = useNavigation();

  useEffect(() => {
    if (hikeId) {
      Database.getObservationsForHike(hikeId).then(result => {
        setObservations(result);
      });
    }
  }, [hikeId]);

  const navigateToAddObservation = () => {
    navigation.navigate('AddObservation', {hikeId});
  };

  const navigateToEditObservation = observationId => {
    navigation.navigate('EditObservation', {hikeId, observationId});
  };

  const deleteObservation = observationId => {
    Database.deleteObservation(observationId).then(() => {
      const updatedObservations = observations.filter(
        observation => observation.id !== observationId,
      );
      setObservations(updatedObservations);
    });
  };

  return (
    <View>
      <FlatList
        data={observations}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'gray',
              marginBottom: 10,
              padding: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.title}</Text>
            <Text>Comment: {item.comment}</Text>
            <Text>Time: {item.time}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: 'blue',
                  padding: 10,
                  borderRadius: 5,
                  marginRight: 5,
                }}
                onPress={() => navigateToEditObservation(item.id)}>
                <Text style={{color: 'white', textAlign: 'center'}}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: 'red',
                  padding: 10,
                  borderRadius: 5,
                  marginLeft: 5,
                }}
                onPress={() => deleteObservation(item.id)}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ViewObservationsScreen;
