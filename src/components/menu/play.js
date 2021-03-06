import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'native-base'
import Searching from './searching'
import LottieView from 'lottie-react-native';
import PlayNetwork from '../../networking/firebase/playNetwork'
import { useFocusEffect } from '@react-navigation/native'

const isReady = (roomId, navigation) => {
    PlayNetwork.readyForGame((res) => {
        // console.warn(res)
        if (res === true) {
            console.warn("Oyun Başlıyor...")
            navigation.navigate('Game', { roomId: roomId })
        }
    }, [roomId]);
}
const Play = ({ navigation }) => {
    const [show, SetShow] = useState(true);
    const [roomId, SetRoomId] = useState();
    useFocusEffect(
        React.useCallback(() => {
            PlayNetwork.isRoomEmpty((res) => {
                SetRoomId(res)
                isReady(res,navigation)
            })
        }, [])
    )

    if (show) {
        return (
            <View style={styles.container}>
                <Searching />
            </View>)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.buttonText}>Oyuna Yonlendirildi</Text>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        backgroundColor: '#febd00',
        borderRadius: 18,
        width: 300,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#000'
    }
})

export default Play

