import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import AppText from '../components/AppText'
import routes from '../navigation/routes'

export default function RegisterScreen({ navigation }) {
    return (
        <Screen style={styles.container}>
            <AppText style={styles.heading}>Image Seeker</AppText>
            <AppTextInput icon={'account'} placeholder={'Username'} autoCorrect={false} autoCapitalize="none" name={'username'} />
            <AppTextInput icon={'email'} placeholder={'Email'} keyBoardType={'email-address'} autoCorrect={false} autoCapitalize="none" />
            <AppTextInput icon={'lock'} placeholder={'Password'} textContentType={'password'} autoCorrect={false} autoCapitalize="none" secureTextEntry />
            <AppTextInput icon={'lock'} placeholder={'Confirm Password'} textContentType={'password'} autoCorrect={false} autoCapitalize="none" secureTextEntry />
            <AppButton title={'Register'} onPress={() => navigation.navigate(routes.REGISTER)} />
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