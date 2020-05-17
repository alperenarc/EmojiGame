import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';


const splashScreen = ({ navigation }) => {

    const [initialized, setinitialized] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initialized) setinitialized(false);
    }
    useFocusEffect(
        React.useCallback(() => {
            const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

            return () => subscriber();
        }, [])
    );

    if (initialized) return null;

    if (!user) {
        //go auth
        setTimeout(function () {
            navigation.navigate('Auth')
        }, 3000);

    } else {
        //go app
        setTimeout(function () {
            navigation.navigate('InitialApp')
        }, 3000);
    }

    return (
        <View style={styles.center}>
            {/** <LottieView style={{ width: 200 }} source={require('../../animations/animation.json')} autoPlay loop />*/}
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'https://user-images.githubusercontent.com/34552821/81238089-c73d2500-9009-11ea-8f04-6367598685f0.png',
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff'
    },
    tinyLogo: {
        width: 200,
        height: 130
    }
})

export default splashScreen;