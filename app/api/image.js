import React from 'react';
import { Button, View, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { create } from 'apisauce';
import moment from 'moment';
import Constants from 'expo-constants';

const client = create({
    baseURL: 'http://172.16.30.187:5000',
    headers: { "Content-Type": "multipart/form-data" },
});

export default function ImageUpload() {

    const uploadAllImages = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access media library was denied');
                return;
            }

            const mediaLibraryAssets = await MediaLibrary.getAssetsAsync({
                mediaType: 'photo',
                first: 10, // Adjust this number according to your needs
            });

            const images = mediaLibraryAssets.assets;

            for (let i = 0; i < images.length; i++) {
                const imageUri = images[i].uri;
                const imageType = images[i].filename.split('.').pop();
                const filename = images[i].filename;
                const creationDate = moment(images[i].modificationTime).format('YYYY-MM-DD HH:mm:ss');

                console.log(creationDate, filename, imageType, imageUri)
                const imageData = new FormData();
                imageData.append('image', {
                    uri: imageUri,
                    type: `image/${imageType}`,
                    name: filename,
                });
                imageData.append('image_details', JSON.stringify({ creationDate, filename, }))
                const response = await client.post('/search', imageData);
                console.log(response.status); // Assuming response.data contains the response payload
            }

            Alert.alert('All images uploaded successfully');
        } catch (error) {
            console.error('Error uploading images:', error);
            Alert.alert('Error uploading images');
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Upload All Images" onPress={uploadAllImages} />
        </View>
    );
}
