// HomeScreen.js
import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Replace 'your_logo.png' with the actual path or URL of your logo image
const LogoImage = require('./images/logo.png');

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToAddHike = () => {
    navigation.navigate('AddHike');
  };

  const navigateToViewHikes = () => {
    navigation.navigate('ViewHikes');
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between', padding: 20}}>
      {/* Logo centered at the top */}
      <View style={{alignItems: 'center'}}>
        <Image source={LogoImage} style={{width: 350, height: 350}} />
      </View>

      {/* Buttons centered in the middle */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{padding: 15, backgroundColor: '#3498db', borderRadius: 5}}
          onPress={navigateToAddHike}>
          <Text style={{color: '#fff'}}>Add Hike</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{padding: 15, backgroundColor: '#e74c3c', borderRadius: 5}}
          onPress={navigateToViewHikes}>
          <Text style={{color: '#fff'}}>View Hikes</Text>
        </TouchableOpacity>
      </View>

      {/* Additional space below the buttons */}
      <View style={{marginBottom: 20}} />

      {/* Other content or components can be added below the buttons as needed */}
    </View>
  );
};

export default HomeScreen;
