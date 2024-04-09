import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AccountImage from '../components/AccountImage'
import routes from '../navigation/routes'
import ListItem from '../components/ListItem'
import ListItemSeparator from '../components/ListItemSeparator'
import AuthContext from '../auth/context'
import authStorage from '../auth/authStorage'
import supabase from '../api/supabase'
const menuItems = [
    {
        title: "Account",
        icon: {
            name: 'format-list-bulleted',
            backgroundColor: colors.primary
        },
        onPress: (navigation) => {
            navigation.navigate(routes.ACCOUNT)
        },
    },
    {
        title: "Settings",
        icon: {
            name: 'email',
            backgroundColor: colors.secondary
        },
        onPress: (navigation) => {
            navigation.navigate(routes.SETTINGS)
        },
    },
    {
        title: "Log Out",
        icon: {
            name: 'email',
            backgroundColor: colors.secondary
        },
        onPress: (navigation) => {

        }
    }
]

export default function AccountScreen({ navigation }) {
    const authContext = useContext(AuthContext)

    const user = JSON.parse(authContext.user)

    useEffect(() => {
        token = authStorage.getToken()
        console.log(token)
        console.log(user)
    })

    const handleLogOut = () => {
        authContext.setUser(null)
        authStorage.deleteToken()
        supabase.auth.signOut()
    }
    return (
        <>
            <AccountImage username={user.profile[0].username} email={user.email} />
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={item => item.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.title}
                            onPress={() => {
                                if (item.title == 'Log Out') {
                                    Alert.alert('Log Out', 'Are you sure you want to log out ?', [

                                        { text: 'Yes', onPress: () => handleLogOut() },
                                        { text: "No" }

                                    ])

                                }
                                item.onPress(navigation)
                            }}
                        />
                    )}

                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
})