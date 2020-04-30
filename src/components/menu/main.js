import React from 'react'
import { Text, View, StatusBar, StyleSheet } from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import {Button} from 'native-base'

//Kaldırılacak Deneme için konmuştur.
import Game from '../game/index'
import Play from './play'


const Main = ({ navigation }) => {

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View>
                <StatusBar hidden={true} barStyle="dark-content" />
            </View>
            <Grid>
                <Col style={styles.cols}>
                    <View style={styles.eachCol}>
                        <Button style={styles.buttons} onPress={() => navigation.navigate('Play')}>
                            <Text style={styles.buttonText}>Play</Text>
                        </Button>
                    </View>
                </Col>

            </Grid>
        </View>
    )
}

export default Main


const styles = StyleSheet.create({
    cols: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    eachCol: {
        paddingVertical: 5
    },
    buttons: {
        backgroundColor: '#febd00',
        borderRadius: 18,
        width: 300,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff'
    }
})