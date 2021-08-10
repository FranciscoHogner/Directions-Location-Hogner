import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'

import { COLORS } from '../constants'
import ImageSelector from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';
import { addPlace } from '../store/places.action';
import { useDispatch } from 'react-redux';

const NewPlaceScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedLocation, setSelectedLocation] = useState();

    const onHandlerTitle = text => setTitle(text);
    const onHandlerImage = path => setSelectedImage(path);

    const onHandlerSave = () => {
        dispatch(addPlace(title, selectedImage, selectedLocation));
        navigation.goBack();
    }

    const onHandlerLocationPicked = useCallback(location => {
        setSelectedLocation(location);
    }, [setSelectedLocation]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    placeholder='Image Title'
                    style={styles.input}
                    onChangeText={onHandlerTitle}
                    value={title}
                />
                <ImageSelector onImage={onHandlerImage} />
                <LocationPicker
                    navigation={navigation}
                    route={route}
                    onLocationPicked={onHandlerLocationPicked}
                />
                <View style={styles.footer}>
                    <Button
                        title="Save Direction"
                        color={COLORS.LIGHT_GREEN}
                        onPress={onHandlerSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
    footer: {
        marginTop: 30,
    }
})

export default NewPlaceScreen
