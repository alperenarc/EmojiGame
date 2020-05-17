import React from 'react'
import { Text, View, StatusBar, StyleSheet, ImageBackground ,TouchableOpacity} from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
//Kaldırılacak Deneme için konmuştur.
import Game from '../game/index'
import Play from './play'

const image = { uri: "https://3pageplus.com/wp-content/uploads/2019/03/change-background-color-on-wix-1024x678.jpg" };
const Main = ({ navigation }) => {

    return (

        <View style={{ flex: 1 }}>
            <ImageBackground source={image} style={styles.image}>

                
        {/**
         * <View>
                    <StatusBar hidden={true} barStyle="dark-content" />
                </View>
         * 
         */}
                <Grid size={1} style={{ top: '20%' }}>
                    <Col style={styles.cols} onPress={() => navigation.navigate('Play')}>
                        <View style={styles.octagon} >
                            <View style={[styles.octagonUp, styles.octagonBar]} />
                            <View style={[styles.octagonFlat, styles.octagonBar]} />
                            <View style={[styles.octagonLeft, styles.octagonBar]} />
                            <View style={[styles.octagonRight, styles.octagonBar]} />
                        </View>

                        <Col style={styles.play}>
                            <Icon name="play" size={50} color='#fff' />
                            <Text style={{ color: '#fff' }}>Oyna</Text>
                        </Col>
                    </Col>

                </Grid>
                <Grid size={1}>
                    <Row>
                        <Col style={styles.cols}>
                            <Icon name="database" size={50} color='#222277' />
                            <Text style={{ color: '#fff' }}>İstatistik</Text>
                        </Col>
                        <Col style={styles.cols}>
                            <Icon name="wechat" size={50} color='#DEAA83' />
                            <Text style={{ color: '#fff' }}>Öneride Bulun</Text>
                        </Col>
                        <Col style={styles.cols}>
                            <Icon name="sign-out" size={50} color='#15C4D5' />
                            <Text style={{ color: '#fff' }}>Çıkış Yap</Text>
                        </Col>
                    </Row>

                </Grid>
                {/**
             * <Grid size={1}>
                <Col style={styles.cols}>
                    <View style={styles.eachCol}>
                        <Button style={styles.buttons} onPress={() => navigation.navigate('Play')}>
                            <Text style={styles.buttonText}>Play</Text>
                        </Button>
                    </View>
                </Col>

            </Grid>
             * 
             */}
            </ImageBackground>


        </View>
    )
}

export default Main


const styles = StyleSheet.create({
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