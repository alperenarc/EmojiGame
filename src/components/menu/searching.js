import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native';
import { Col, Grid, Row } from 'react-native-easy-grid'
const Searching = () => {


    return (

        <View style={styles.container}> 
            {
                /**
                 * 
                 * <View style={styles.container}>
                <Grid style={styles.container}>
                    <Row style={{ width: 200, height: 100, backgroundColor: '#fff',justifyContent:'center',alignItems:'center' }}>
                        <LottieView style={{ width: 100 }} source={require('../../animations/love.json')} autoPlay loop />
                    </Row>
                    <Row style={{ width: 200,height: 50, backgroundColor: '#fff',justifyContent:'center',alignItems:'center' }}>
                        <Text style={styles.texts}>OYUNCU ARANIYOR...</Text>
                    </Row>
                    <Row style={{ width: 200,height: 100, backgroundColor: '#fff',justifyContent:'center',alignItems:'center' }}>
                        <Col style={{ backgroundColor: '#fff'}}>
                            <LottieView style={{ width: 100 }} source={require('../../animations/laugh.json')} autoPlay loop />
                        </Col>
                        <Col style={{ backgroundColor: '#fff' }}>
                            <LottieView style={{ width: 100 }} source={require('../../animations/suprised.json')} autoPlay loop />
                        </Col>
                    </Row>
                </Grid>
    
            </View>
                 */
            }
            
                <LottieView style={{ width: 300 }} source={require('../../animations/vs.json')} autoPlay loop />
                <Text style={styles.texts}>OYUNCU ARANIYOR</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texts: {
        fontWeight: 'bold',
        color: '#7b00fe',
        fontSize: 32,

    }
})

export default Searching

