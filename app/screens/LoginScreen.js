import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Screen from '../components/Screen'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import AppText from '../components/AppText'
import routes from '../navigation/routes'
import ErrorMessage from '../components/ErrorMessage'
import AuthContext from '../auth/context'
import apiClient from '../api/client'
import auth from '../api/auth'
import authStorage from '../auth/authStorage'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const authContext = useContext(AuthContext)

    const handleLogin = async () => {
        if (email === '' || password === '') {
            setErrorMessage("Please Fill In all your details")
            setLoginError(true)
            return
        }

        const { data, ok } = await auth.login(email, password)
        if (!ok || !data.success) {
            setErrorMessage(data.message)
            console.log(data.message)
            setLoginError(true)
            return
        }


        user = data.user
        console.log(user)
        authContext.setUser(user)
        authStorage.storeToken(user)

    }
    return (
        <Screen style={styles.container}>
            <AppText style={styles.heading}>Image Seeker</AppText>
            <ErrorMessage visible={loginError} error={errorMessage} />
            <AppTextInput icon={'email'} placeholder={'Email'} keyBoardType={'email-address'}
                onChangeText={(text) => {
                    setEmail(text)
                    setLoginError(false)
                }} autoCorrect={false} autoCapitalize="none" name={'email'} />
            <AppTextInput icon={'lock'} placeholder={'Password'} textContentType={'password'}
                onChangeText={(text) => {
                    setPassword(text)
                    setLoginError(false)
                }} autoCorrect={false} autoCapitalize="none" secureTextEntry />
            <AppButton title={'Log in'} onPress={handleLogin} />
            <AppButton title={'Register'} onPress={() => {
                setLoginError(false)
                navigation.navigate(routes.REGISTER)
            }
            }
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 25,
        marginVertical: 10
    }
})