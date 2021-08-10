import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MapView, { Marker } from 'react-native-maps';
import React, { useCallback, useLayoutEffect, useState } from 'react'

import HeaderButton from '../components/HeaderButton';
import { StyleSheet } from 'react-native'

const MapScreen = ({ navigation }) => {
    const [selectedLocation, setSelectedLocation] = useState();
    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const savePickedLocationHandler = useCallback(() => {
        console.log(selectedLocation)
        if (!selectedLocation) return;

        navigation.navigate('Nuevo', { picked: selectedLocation });
    }, [selectedLocation]);

    const selectLocationHandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Save"
                        iconName="save-outline"
                        onPress={savePickedLocationHandler}
                    />
                </HeaderButtons>
            )
        })
    }, [navigation, selectedLocation]);

    let markerCoordinates;
    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        };
    }

    return (
        <MapView
            initialRegion={region}
            style={styles.map}
            onPress={selectLocationHandler}
        >
            {markerCoordinates && (
                <Marker title="Selección" coordinate={markerCoordinates} />
            )}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default MapScreen
