// EditObservationScreen.js
import React, {useEffect, useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Database from '../Database';

const EditObservationScreen = () => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [time, setTime] = useState('');

  const {params} = useRoute();
  const navigation = useNavigation();
  const hikeId = params?.hikeId;
  const observationId = params?.observationId;

  useEffect(() => {
    if (observationId) {
      Database.getObservationById(observationId).then(result => {
        const observation = result;
        setTitle(observation.title);
        setComment(observation.comment);
        setTime(observation.time);
      });
    }
  }, [observationId]);

  const editObservation = () => {
    const updatedObservation = {
      id: observationId,
      title,
      comment,
      time,
      hikeId,
    };

    Database.editObservation(updatedObservation).then(() => {
      navigation.goBack();
    });
  };

  return (
    <View style={{padding: 16}}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
        style={{
          marginBottom: 10,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Comment"
        value={comment}
        onChangeText={text => setComment(text)}
        style={{
          marginBottom: 10,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Time"
        value={time}
        onChangeText={text => setTime(text)}
        style={{
          marginBottom: 10,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
      <Button title="Edit Observation" onPress={editObservation} />
    </View>
  );
};

export default EditObservationScreen;
