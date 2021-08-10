import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { COLORS } from '../constants';

const ImageSelector = props => {
  const [pickedUri, setPickedUri] = useState();

  const verifyPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      Alert.alert(
        'Insuficient Permisions',
        'You need to allow camera permissions',
        [{ text: 'Ok' }],
      );
      return false;
    }

    return true;
  }

  const handlerTakeImage = async () => {
    const isCameraOk = await verifyPermissions();
    if (!isCameraOk) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
      quality: 0.8,
    });

    setPickedUri(image.uri);
    props.onImage(image.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedUri
         ? <Text>Image</Text>
         : <Image style={styles.image} source={{ uri: pickedUri }} />
        }
      </View>
      <Button
        title="Take Photo"
        color={COLORS.LIGTH_PINK}
        onPress={handlerTakeImage}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.ACCENT,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default ImageSelector;