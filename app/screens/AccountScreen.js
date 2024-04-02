import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AccountImage from '../components/AccountImage'
import routes from '../navigation/routes'
import ListItem from '../components/ListItem'
import ListItemSeparator from '../components/ListItemSeparator'
const menuItems = [
    {
        title: "Account",
        icon: {
            name: 'format-list-bulleted',
            backgroundColor: colors.primary
        },
        targetScreen: routes.ACCOUNT
    },
    {
        title: "Settings",
        icon: {
            name: 'email',
            backgroundColor: colors.secondary
        },
        targetScreen: routes.SETTINGS
    },
    {
        title: "Log Out",
        icon: {
            name: 'email',
            backgroundColor: colors.secondary
        },
        targetScreen: 'Messages'
    }
]

export default function AccountScreen({ navigation }) {
    return (
        <>
            <AccountImage username={'Rakinzi Silver'} email={'silverrakinzi@gmail.com'} />
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={item => item.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.title}
                            onPress={() => navigation.navigate(item.targetScreen)}
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