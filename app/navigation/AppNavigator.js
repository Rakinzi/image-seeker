import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ImageListings from '../components/ImageListings'
import MaterialIcon from '../components/MaterialIcon'
import AccountScreen from '../screens/AccountScreen'
import routes from './routes'
import AlbumScreen from '../screens/AlbumScreen'
import PhotosScreen from '../screens/PhotosScreen'
import ImageUpload from '../screens/FavouritesScreen'

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={routes.PHOTOS} component={PhotosScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcon name={'photo'} size={size} color={color} />) }} />
            <Tab.Screen name={routes.ALBUMS} component={AlbumScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcon name={'folder'} size={size} color={color} />) }} />
            <Tab.Screen name={routes.FAVORITES} component={ImageUpload} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<MaterialIcon name={'favorite'} size={size} color={color} />) }} />
            <Tab.Screen name={routes.ACCOUNT} component={AccountScreen} options={{ tabBarIcon: ({ color, size }) => (<MaterialIcon name={'person'} size={size} color={color} />) }} />
        </Tab.Navigator>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})