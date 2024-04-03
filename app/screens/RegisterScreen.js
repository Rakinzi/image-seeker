import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext } from 'react'
import Screen from '../components/Screen'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import AppText from '../components/AppText'
import routes from '../navigation/routes'
import AuthContext from '../auth/context'
import ErrorMessage from '../components/ErrorMessage'

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registerError, setRegisterError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const authContext = useContext(AuthContext)

    const handleRegister = async ({ navigation }) => {
        if (email === '' || password === '' || userName === '', confirmPassword === '') {
            setErrorMessage("Please Fill In all your details")
            setRegisterError(true)
            return
        }

        const { data, ok } = await auth.login(email, password)
        if (!ok || !data.success) {
            setErrorMessage(data.message)
            console.log(data.message)
            setLoginError(true)
            return
        }

        alert('You have been registered successfully. Now Log in using your registered credentials')
        navigation.navigate(routes.LOGIN)

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
                    setUserName(text)
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