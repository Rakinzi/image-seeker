import { StyleSheet, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import Screen from '../components/Screen'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import AppText from '../components/AppText'
import routes from '../navigation/routes'
import AuthContext from '../auth/context'
import ErrorMessage from '../components/ErrorMessage'
import auth from '../api/auth'

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerError, setRegisterError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const authContext = useContext(AuthContext)

    const validateForms = () => {
        if (email === '' || password === '' || username === '', confirmPassword === '') {
            setErrorMessage("Please Fill In all your details")
            setRegisterError(true)
            return true
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match')
            setRegisterError(true)
            return true
        }

        if (password.length < 6) {
            setErrorMessage('The password should be at least 6 characters')
            setRegisterError(true)
            return true
        }

        if ((!/\S+@\S+\.\S+/.test(email))) {
            setErrorMessage('Invalid email')
            setRegisterError(true)
            return true
        }
    }

    const handleRegister = async () => {
        if (validateForms()) {
            return
        }


        const { data, ok } = await auth.register(email, password, username)
        if (!ok || !data.success) {
            message = data.message
            console.log(data)
            if (message == null || message == '' || message == undefined) {
                setErrorMessage('Error occurred while registering')
                setRegisterError(true)
                return
            }
            setErrorMessage(data.message)
            console.log(data.message)
            setRegisterError(true)
            return
        }

        Alert.alert('Success', 'You have been registered successfully click ok to get redirected to the login page', [
            { text: 'Okay', onPress: () => navigation.navigate(routes.LOGIN) },
        ])


    }
    return (
        <Screen style={styles.container}>
            <AppText style={styles.heading}>Image Seeker</AppText>
            <ErrorMessage error={errorMessage} visible={registerError} />
            <AppTextInput icon={'person'} placeholder={'Username'}
                autoCorrect={false}
                autoCapitalize="none"
                name={'username'}
                onChangeText={(text) => {
                    setUsername(text)
                    setRegisterError(false)
                }}
            />
            <AppTextInput
                icon={'email'}
                placeholder={'Email'}
                keyBoardType={'email-address'}
                name={'email'} autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => {
                    setEmail(text)
                    setRegisterError(false)
                }}
            />
            <AppTextInput
                icon={'lock'}
                placeholder={'Password'}
                textContentType={'password'}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry
                name={'password'}
                onChangeText={(text) => {
                    setPassword(text)
                    setRegisterError(false)
                }}
            />
            <AppTextInput icon={'lock'}
                placeholder={'Confirm Password'}
                textContentType={'password'}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry
                name={'confirm-password'}
                onChangeText={(text) => {
                    setConfirmPassword(text)
                    setRegisterError(false)
                }} />
            <AppButton title={'Register'} onPress={handleRegister} />
            <AppButton title={'Log in'} onPress={() => navigation.navigate(routes.LOGIN)} />
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