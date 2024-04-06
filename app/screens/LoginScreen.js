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

    const validateForms = () => {
        if (email === '' || password === '') {
            setErrorMessage("Please Fill In all your details")
            setEmail('')
            setPassword('')
            setLoginError(true)
            return
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Invalid email')
            setEmail('')
            setPassword('')
            setLoginError(true)
            return
        }

    }

    const handleLogin = async () => {
        validateForms()
        const { data, ok } = await auth.login(email, password)
        if (!ok || !data.success) {
            message = data.message
            if (message == null || message == '' || message == undefined) {
                setErrorMessage('Error occurred while registering')
                setLoginError(true)
                return
            }
            setErrorMessage(data.message)
            console.log(data.message)
            setLoginError(true)
            return
        }


        user = data.user
        console.log(user)
        setEmail('')
        setPassword('')
        authContext.setUser(user)
        authStorage.storeToken(user)

    }

    const handleRegister = () => {
        setLoginError(false);
        navigation.navigate(routes.REGISTER);
    };

    return (
        <Screen style={styles.container}>
            <AppText style={styles.heading}>Image Seeker</AppText>
            <ErrorMessage visible={loginError} error={errorMessage} />
            <AppTextInput icon={'email'} placeholder={'Email'} keyBoardType={'email-address'}
                value={email}
                onChangeText={(text) => {
                    setEmail(text)
                    setLoginError(false)
                }} autoCorrect={false} autoCapitalize="none" name={'email'} />
            <AppTextInput icon={'lock'} placeholder={'Password'} textContentType={'password'}
                value={password}
                onChangeText={(text) => {
                    setPassword(text)
                    setLoginError(false)
                }} autoCorrect={false} autoCapitalize="none" secureTextEntry />
            <AppButton title={'Log in'} onPress={handleLogin} />
            <AppButton title={'Register'} onPress={handleRegister}
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