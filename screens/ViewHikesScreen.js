import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Database from '../Database';

const ViewHikesScreen = () => {
  const [hikes, setHikes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    Database.getAllHikes().then(result => {
      setHikes(result);
    });
  }, []);

  const searchHikes = () => {
    Database.searchHikes(searchQuery).then(result => {
      setHikes(result);
    });
  };

  const navigateToViewHikeDetail = hikeId => {
    navigation.navigate('ViewHikeDetail', {hikeId});
  };

  const navigateToEditHike = hikeId => {
    navigation.navigate('EditHike', {hikeId});
  };

  const deleteHike = hikeId => {
    Database.deleteHike(hikeId).then(() => {
      const updatedHikes = hikes.filter(hike => hike.id !== hikeId);
      setHikes(updatedHikes);
    });
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Hikes"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchHikes}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={hikes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.hikeItemContainer}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.location}</Text>
              <Text>{item.date}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigateToViewHikeDetail(item.id)}>
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigateToEditHike(item.id)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteHike(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    margin: 5,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  searchButton: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  hikeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  viewButton: {
    backgroundColor: 'green',
    padding: 8,
    marginRight: 5,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 8,
    marginRight: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'tomato',
    padding: 8,
    borderRadius: 5,
  },
});

export default ViewHikesScreen;
