// AddObservationScreen.js
import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import Database from '../Database';

const AddObservationScreen = ({route, navigation}) => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [time, setTime] = useState('');

  const {hikeId} = route.params;

  const addObservation = () => {
    const observation = {
      title,
      comment,
      time,
      hikeId,
    };

    Database.addObservation(observation).then(() => {
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
      <Button title="Add Observation" onPress={addObservation} />
    </View>
  );
};

export default AddObservationScreen;
