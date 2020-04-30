import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground, StatusBar, Button, Text, TouchableOpacity } from 'react-native';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import Authentication from '../../networking/authentication/index';
import { GoogleSignin } from '@react-native-community/google-signin';
import {Icon} from 'native-base'


signIn = (navigation) => {
    Authentication.signInWithGoogle(navigation)
}

const auth = ({ navigation }) => {
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '1017485454373-vgij4p6em02g70g8lqc7ogqu4h0trbo6.apps.googleusercontent.com', // required
        });
    });
    const image = { uri: "https://s25031.pcdn.co/wp-content/uploads/2017/09/css-gradient-03.jpg" };
    return (


        <View source={image} style={styles.containerView}>
            <View>
                <StatusBar barStyle="dark-content" />
            </View>
            {/*<GoogleSigninButton style={{backgroundColor:'transparent', width: '50%', height: 50, marginTop: 25 }} onPress={() => this.signIn(navigation)} />*/}
            <TouchableOpacity style={styles.buttons} onPress={() => this.signIn(navigation)}>
                <Text style={{ fontFamily: 'notoserif', color: '#000', padding: 10 }}> <Icon active name="md-person" style={{ color: '#ff5a5f' }} />Google ile giriş yap !</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#83fe00"
    },
    buttons: {
        borderRadius: 50,
        borderRadius: 25,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 1,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
})

export default auth;

{/**
                 *  <Image style={{ width: 135, height: 145, marginTop: 175 }}
                source={require('../../images/meet-logo.png')} />
                 * 
                 */}