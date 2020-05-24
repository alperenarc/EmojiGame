import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, StatusBar, Button, Text, TouchableOpacity, Image } from 'react-native';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import Authentication from '../../networking/authentication/index';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Icon } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'

const signIn = (navigation) => {
    Authentication.signInWithGoogle(navigation)
}

const auth = ({ navigation }) => {
    useEffect(() => {
        GoogleSignin.configure({
            //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '1017485454373-vgij4p6em02g70g8lqc7ogqu4h0trbo6.apps.googleusercontent.com', // required
        });
    });
    const image = { uri: "https://user-images.githubusercontent.com/34552821/82718002-7f282e80-9ca8-11ea-9a0d-52138c1d1bc7.jpg" };
    return (
        <ImageBackground style={styles.image}>

                <Image
                    style={{ width: '60%', height: '30%',marginBottom: 30}}
                    source={{
                        uri: 'https://user-images.githubusercontent.com/34552821/82743039-ee1b8b00-9d6d-11ea-9a2e-703b4cc468b0.png',
                    }}
                />

            <TouchableOpacity style={styles.buttons} onPress={() => signIn(navigation)}>

                <Icon active name="md-person" style={{ color: '#fff', textAlign: 'center' }} />

                <Text style={{ fontFamily: 'notoserif', color: '#fff', padding: 10 }}>Google ile giriş yap !</Text>

            </TouchableOpacity>

        </ImageBackground>



    )
}

const styles = StyleSheet.create({
    buttons: {
        backgroundColor: '#EDB032',
        borderRadius: 18,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default auth;


{/********************************

 <View source={image} style={styles.containerView}>
            <View>
                <StatusBar barStyle="dark-content" />
            </View>
            <GoogleSigninButton style={{backgroundColor:'transparent', width: '50%', height: 50, marginTop: 25 }} onPress={() => this.signIn(navigation)} />
            <TouchableOpacity style={styles.buttons} onPress={() => this.signIn(navigation)}>
                <Text style={{ fontFamily: 'notoserif', color: '#000', padding: 10 }}> <Icon active name="md-person" style={{ color: '#ff5a5f' }} />Google ile giriş yap !</Text>
            </TouchableOpacity>
        </View>


*/}