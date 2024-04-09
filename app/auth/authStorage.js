import * as SecureStore from 'expo-secure-store';

const storeToken = (authToken) => {
    try {
        SecureStore.setItem('authToken', JSON.stringify(authToken));
        console.log('Token stored successfully');
    } catch (error) {
        console.log('Error storing token:', error);
        throw error; // Rethrow the error for higher level handling
    }
};

const getToken = () => {
    try {
        const token = SecureStore.getItem('authToken');
        if (token) {
            return token;
        } else {
            console.log('No token found');
            return null;
        }
    } catch (error) {
        console.log('Failed to get token:', error);
        throw error; // Rethrow the error for higher level handling
    }
};

const deleteToken = () => {
    try {
        SecureStore.deleteItemAsync('authToken');
        console.log('Token deleted successfully');
    } catch (error) {
        console.log('Failed to delete token:', error);
        throw error; // Rethrow the error for higher level handling
    }
};

export default {
    storeToken,
    getToken,
    deleteToken
};
