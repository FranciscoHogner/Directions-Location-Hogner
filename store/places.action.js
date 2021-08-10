import * as FileSystem from 'expo-file-system';

import { fetchAddress, insertAddress } from '../db';

import { MAP } from '../constants';

export const ADD_PLACE = 'ADD_PLACE';
export const LOAD_PLACES = 'LOAD_PLACES';

export const addPlace = (title, image, location) => {
    return async dispatch => {
        console.log(location)
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${MAP.API_KEY}`
        );

        //if (!response.ok) throw new Error('[GEOCODE] Algo malo ha sucedido');
        
        const resData = await response.json();
        console.log(resData)
        if (!resData.results) throw new Error('[GEOCODE] Algo malo ha sucedido');
        
        const address = resData.results[0].formatted_address;

        const fileName = image.split('/').pop()
        const Path = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: Path,
            });

            const result = await insertAddress(
                title,
                Path,
                address,
                location.lat,
                location.lng,
            );

            dispatch({
                type: ADD_PLACE,
                payload: {
                    id: result.insertId,
                    title,
                    image: Path,
                    address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    },
                },
            });
        } catch (err) {
            console.log(err.mesage);
            throw err;
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const result = await fetchAddress();
            console.log(result);
            dispatch({ type: LOAD_PLACES, places: result.rows._array });
        } catch (error) {
            throw error;
        }
    }
}