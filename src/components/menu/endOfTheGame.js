import React from 'react'
import { Text, View, StatusBar, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

const image = { uri: "https://user-images.githubusercontent.com/34552821/82718002-7f282e80-9ca8-11ea-9a0d-52138c1d1bc7.jpg" };
function EndOfTheGame( {navigation} ) {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} style={styles.image}>
                <Grid size={5}>
                    <Row style={styles.cols}>
                        <Text style={styles.text}>OYUN BİTTİ</Text>
                    </Row>
                    <Row style={styles.cols}>
                        <Text style={{
                            fontSize: 25,
                            color: 'pink',
                            fontFamily: 'monospace',
                        }}>Skorunuz : </Text>

                    </Row>
                </Grid>
                <Grid size={5}>
                    <Row>
                        <Col style={styles.cols}>
                            <Icon name="database" size={50} color='#222277' />
                            <Text style={{ color: '#fff' }}>İstatistik</Text>
                        </Col>
                        <Col style={styles.cols}>
                            <TouchableOpacity style={{ backgroundColor: 'transparent', border: 'none' }} onPress={() => navigation.navigate('Main')}>
                                <Icon name="sign-out" size={50} color='#15C4D5' />
                            </TouchableOpacity>

                            <Text style={{ color: '#fff' }}>Menüye Dön</Text>
                        </Col>
                    </Row>

                </Grid>
            </ImageBackground>
        </View>
    )
}

export default EndOfTheGame


const styles = StyleSheet.create({
    text: {
        fontSize: 50,
        color: 'pink',
        fontFamily: 'monospace',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
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
    },
    octagon: {},
    octagonBar: {
        width: 63,
        height: 150,
        /*shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,*/
        backgroundColor: 'grey',
        zIndex: 1
    },
    octagonUp: {},
    octagonFlat: {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: [
            { rotate: '90deg' }
        ],
    },
    octagonLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: [
            { rotate: '-45deg' }
        ],
    },
    octagonRight: {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: [
            { rotate: '45deg' }
        ],
    },
    play: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 99999
    }
})