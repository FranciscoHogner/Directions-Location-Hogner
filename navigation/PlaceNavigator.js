import { COLORS } from '../constants'
import MapScreen from '../screens/MapScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import PlaceListScreen from '../screens/PlaceListScreen'
import { Platform } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const PlaceStack = createStackNavigator()

const PlaceNavigator = () => (
    <PlaceStack.Navigator
        initialRoute="Direcciones"
        screenOptions={{
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? COLORS.DARK_GREEN : '',
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.DARK_GREEN,
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}
    >
        <PlaceStack.Screen
            name="Direcciones"
            component={PlaceListScreen}
            options={{title: 'Directions'}} 
        />
        <PlaceStack.Screen
            name="Detalle"
            component={PlaceDetailScreen}
            options={{title: 'Direction Details'}} 
        />
        <PlaceStack.Screen
            name="Nuevo"
            component={NewPlaceScreen}
            options={{title: 'New Direction'}} 
        />
        <PlaceStack.Screen
            name="Map"
            component={MapScreen}
            options={{title: 'Map'}} 
        />
    </PlaceStack.Navigator>
)


export default PlaceNavigator