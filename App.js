import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddHikeScreen from './screens/AddHikeScreen';
import ViewHikesScreen from './screens/ViewHikesScreen';
import ViewHikeDetailScreen from './screens/ViewHikeDetailScreen';
import EditHikeScreen from './screens/EditHikeScreen';
import Database from './Database';
import ViewObservationsScreen from './screens/ViewObservationsScreen';
import AddObservationScreen from './screens/AddObservationScreen';
import EditObservationScreen from './screens/EditObservationScreen';

const Stack = createStackNavigator();

const App = () => {
  // Initialize the SQLite database
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddHike" component={AddHikeScreen} />
        <Stack.Screen name="ViewHikes" component={ViewHikesScreen} />
        <Stack.Screen name="ViewHikeDetail" component={ViewHikeDetailScreen} />
        <Stack.Screen name="EditHike" component={EditHikeScreen} />
        <Stack.Screen
          name="ViewObservations"
          component={ViewObservationsScreen}
        />
        <Stack.Screen name="AddObservation" component={AddObservationScreen} />
        <Stack.Screen
          name="EditObservation"
          component={EditObservationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
