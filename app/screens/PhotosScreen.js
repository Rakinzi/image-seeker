import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import ImageListings from '../components/ImageListings';
import Screen from '../components/Screen';
import SearchButton from '../components/SearchInput';


export default function PhotosScreen() {
    const [groupedAssets, setGroupedAssets] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const getAlbums = useCallback(async () => {
        setRefreshing(true);
        try {
            const { granted } = await MediaLibrary.getPermissionsAsync();
            if (!granted) {
                alert('You need to enable permission to use this app');
                return;
            }
            const fetchedAssets = await MediaLibrary.getAssetsAsync();
            const groupedAssets = fetchedAssets.assets.reduce((acc, asset) => {
                const date = new Date(asset.modificationTime).toLocaleDateString();
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(asset);
                return acc;
            }, {});
            setGroupedAssets(groupedAssets);
        } catch (error) {
            console.error('Error fetching assets:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        getAlbums();
    }, [getAlbums]);

    const renderAlbum = ({ item: [date, images] }) => (
        <View style={styles.albumContainer}>
            <Text style={styles.albumTitle}>{date}</Text>
            <View style={styles.albumAssetsContainer}>
                <ImageListings images={images} />
            </View>
        </View>
    );

    const handleRefresh = () => {
        getAlbums();
    };

    return (
        <Screen>
            <SearchButton handleSearch={(text) => console.log(text)} />
            <FlatList
                data={Object.entries(groupedAssets)}
                style={styles.container}
                renderItem={renderAlbum}
                keyExtractor={(item) => item[0]} // Use date as key
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.light,
    },
    albumContainer: {
        marginBottom: 20,
    },
    albumTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    albumAssetsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
