import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library'
import { useEffect } from 'react';
import Screen from './app/components/Screen';
import AppButton from './app/components/AppButton';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AuthNavigation from './app/navigation/AuthNavigation';
import ImagesDisplay from './app/components/ImagesDisplay';
import ImageListings from './app/components/ImageListings';
import AppNavigator from './app/navigation/AppNavigator';
import AccountImage from './app/components/AccountImage';
import AccountScreen from './app/screens/AccountScreen';
import GetMediaPhotos from './app/components/GetMediaPhotos';
import GetImagesByDate from './app/components/GetImagesByDate';
import SearchInput from './app/components/SearchInput'


export default function App() {


  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}


