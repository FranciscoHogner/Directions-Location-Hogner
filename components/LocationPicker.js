import * as Location from 'expo-location';

import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { COLORS } from '../constants';
import MapPreview from './MapPreview';

const LocationPicker = ({ navigation, route, onLocationPicked }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const picked = route.params?.picked || null;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Insuficient Permisions',
          'You need to allow location permissions',
          [{ text: 'Ok' }],
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (picked) {
      setPickedLocation(picked);
      onLocationPicked(picked);
    }
  }, [picked, onLocationPicked]);

  const getLocationHandler = async () => {
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      const data = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      setPickedLocation(data);
      onLocationPicked(data);
    } catch(err) {
      Alert.alert(
        'Couldnt get your location',
        'Please try again',
        [{ text: 'Ok' }],
      )
    } finally {
      setIsFetching(false);
    }
  };

  const pickLocationHandler = () => navigation.push('Map');

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching
          ? <ActivityIndicator size="large" color={COLORS.DARK_GREEN} />
          : <Text>Map Location</Text>
        }
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get your location"
          color={COLORS.PEACH_PUFF}
          onPress={getLocationHandler}
        />
        <Button
          title="Choose Location"
          color={COLORS.LIGTH_PINK}
          onPress={pickLocationHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationPicker: {
    marginVertical: 15,
  },
  mapPreview: {
    borderWidth: 1,
    borderColor: COLORS.PEACH_PUFF,
    marginBottom: 10,
    width: '100%',
    height: 150,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  }
});

export default LocationPicker;