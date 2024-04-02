import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Image, View, Platform, Text, Touchable, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function GetMediaPhotos() {
    const [albums, setAlbums] = useState(null);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    async function getAlbums() {
        if (permissionResponse.status !== 'granted') {
            await requestPermission();
        }
        const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
            includeSmartAlbums: true,
        });
        // Filter out albums without assets
        const albumsWithAssets = fetchedAlbums.filter(album => {
            return album.assetCount > 0

        });
        setAlbums(albumsWithAssets);
    }

    async function getAlbumAssets({ albums }) {

    }
}