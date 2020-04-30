import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { firebase } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin';

const Options = ({ navigation }) => {
    signOut = () => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '1017485454373-vgij4p6em02g70g8lqc7ogqu4h0trbo6.apps.googleusercontent.com', // required
        });
        GoogleSignin.revokeAccess()
        GoogleSignin.signOut()
        firebase.auth().signOut()
        navigation.navigate('SplashScreen')
    }
    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <Button title="Sign Out" onPress={signOut} />
        </View>
    )
}

export default Options;