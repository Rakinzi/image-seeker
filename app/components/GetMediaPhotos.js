import React, { useState, useEffect } from 'react';
import { StyleSheet, View, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import ImageListings from './ImageListings';
import defaultStyles from '../config/styles';
import Screen from './Screen';
import SearchButton from './SearchInput';
import colors from '../config/colors';
import AppText from './AppText';

export default function GetMediaPhotos({ navigation }) {
    const [albums, setAlbums] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    async function getAlbums() {
        const { granted } = await MediaLibrary.getPermissionsAsync()
        if (!granted) {
            alert('You need to enable permission to use this app')
            return
        }
        const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
            includeSmartAlbums: true,
        });
        const albumsWithAssets = fetchedAlbums.filter(album => album.assetCount > 0);
        setAlbums(albumsWithAssets);
    }

    useEffect(() => {
        getAlbums();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        getAlbums().then(() => setRefreshing(false));
    };

    return (
        <Screen>
            <SearchButton handleSearch={(text) => console.log(text)} />
            <FlatList
                style={styles.container}
                data={albums}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AlbumEntry album={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]} // Android
                        tintColor={colors.primary} // iOS
                    />
                }
            />
        </Screen>
    );
}

function AlbumEntry({ album, onPress }) {
    const [assets, setAssets] = useState([]);

    async function getAlbumAssets() {
        const albumAssets = await MediaLibrary.getAssetsAsync({ album });
        setAssets(albumAssets.assets);
    }

    useEffect(() => {
        getAlbumAssets();
    }, [album]);

    return (
        <>
            <TouchableOpacity onPress={onPress}>
                {(assets.length !== 0) &&
                    (<View style={styles.albumContainer}>
                        {album.title && <AppText style={[styles.albumTitle, defaultStyles.AppText]}>{album.title}</AppText>}
                        {assets.length !== 0 && (
                            <ImageListings images={assets} />
                        )}
                    </View>)
                }
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.light
    },
    albumContainer: {
        marginVertical: 10,
    },
    albumTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
