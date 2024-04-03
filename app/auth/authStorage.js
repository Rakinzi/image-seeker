import * as SecureStore from 'expo-secure-store'

const key = 'authToken'

const storeToken = async authToken => {
    try {
        deleteToken()
        await SecureStore.setItemAsync(key, authToken)
    } catch (error) {
        console.log('Error storing token', error)
    }
}

const getToken = async () => {
    try {
        await SecureStore.getItemAsync(key)
    } catch (error) {
        console.log('Failed to get token', error)
    }
}

const deleteToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.log('Failed to delete token', error)
    }
}

export default {
    storeToken,
    getToken,
    deleteToken
}