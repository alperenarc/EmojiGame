import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, ScrollView, KeyboardAwareScrollView, TextInput, ActivityIndicator, Image } from 'react-native';
import FirebaseDB from '../../networking/firebase/index';
import Emoji from 'react-native-emoji';
import { Grid, Row, Col } from 'react-native-easy-grid'
import { useFocusEffect } from '@react-navigation/native'
import EndOfTheGame from '../menu/endOfTheGame'
function Game(props, { navigation }) {
    const [users, SetUsers] = useState();
    const [isLoading, SetIsLoading] = useState(false);
    const [answers, SetAnswers] = useState();
    const [text, SetText] = useState();
    const [currentUsername, SetCurrentUsername] = useState();
    const [currentQuestion, SetCurrentQuestion] = useState();
    const [questionCount, SetQuestionCount] = useState(0);
    const [getQuestionsDone, SetGetQuestionsDone] = useState(false);
    const [roomUid, SetRoomUid] = useState();
    const [isGameOver, SetIsGameOver] = useState(false);
    useEffect(() => {
        SetRoomUid(props.route.params.roomId)
    }, [])
    useFocusEffect(

        React.useCallback(() => {

            if (roomUid) {
                FirebaseDB.fetchUserInformation((res) => {
                    SetUsers(res);
                }, [roomUid])
                FirebaseDB.getRoomAnswers((res) => {

                    SetAnswers(res);
                }, [roomUid])
                FirebaseDB.getCurrentUsername((res) => {
                    SetCurrentUsername(res)
                })
                FirebaseDB.currentQuestion((res) => {
                    if (res === 'Game Over') {
                        SetIsGameOver(true)
                        SetIsLoading(false)
                    } else {
                        SetIsGameOver(false)
                        SetCurrentQuestion(res)
                        SetIsLoading(true)
                    }

                }, [roomUid]);
            }

        }, [roomUid])
    )
    const press = async (text) => {
        FirebaseDB.answered(text, roomUid)
        const percent = await FirebaseDB.checkAnswer(text)
        if (percent >= 75) {
            FirebaseDB.addPointtoUser(roomUid)

            FirebaseDB.currentQuestion((res) => {

                if (res === 'Game Over') {
                    SetIsGameOver(true)
                    SetIsLoading(false)
                } else {
                    SetCurrentQuestion(res)
                    SetIsLoading(true)
                }

            }, [roomUid]);
        }
        SetText()
    }
    const Item = ({ item }) => {
        return (
            <View style={[item.username === currentUsername ? styles.item : styles.itemOther]}>
                <View style={[item.username === currentUsername ? styles.box : styles.boxOther]}>
                    <Text style={styles.title}>{item.answer}</Text>
                </View>
            </View>
        );
    }
    if (isGameOver) {

         props.navigation.navigate('GameOver', { navigation: navigation })
    }
    if (isLoading) {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <StatusBar barStyle="dark-content" />
                </View>
                <Grid>
                    <Row size={1} style={styles.scoreTable}>
                        <Col style={{ flexDirection: 'row' }}>

                            <Col size={3} style={{ height: '100%' }}>
                                <View style={{ margin: 2, padding: 10, }}>
                                    <Text style={{ color: '#7b00fe', textAlign: 'right', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 15 }}>{users[0].username}</Text>
                                </View>

                            </Col>
                            <Col size={1} style={{ height: '100%' }}>
                                <View style={{ margin: 2, padding: 10, }}>
                                    <Text style={{ color: '#7b00fe', textAlign: 'right', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 15 }}>{users[0].skor}</Text>
                                </View>

                            </Col>


                        </Col>
                        <Col style={{ flexDirection: 'row' }}>
                            <Col size={1} style={{ height: '100%' }}>
                                <View style={{ margin: 2, padding: 10, }}>
                                    <Text style={{ color: '#7b00fe', textAlign: 'left', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 15 }}>{users[1].skor}</Text>
                                </View>

                            </Col>
                            <Col size={3} style={{ height: '100%' }}>
                                <View style={{ margin: 2, padding: 10, }}>
                                    <Text style={{ color: '#7b00fe', textAlign: 'left', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 15 }}>{users[1].username}</Text>
                                </View>

                            </Col>
                        </Col>
                    </Row>
                    <Row size={4} style={{ margin: 5, borderWidth: 1, borderRadius: 30, borderColor: '#7b00fe', backgroundColor: '#f5f5f5' }}>

                        {
                            Object.keys(currentQuestion.question).map((obj, i) => {
                                return (
                                    <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        {/**<Emoji name={currentQuestion.question[obj]} style={{ fontSize: 60 }} />*/}
                                        <Image source={{
                                            uri: currentQuestion.question[obj],
                                        }} style={{ width: '60%', height: 100 }} />
                                    </Col>
                                )
                            })}


                    </Row>
                    <Row size={4} style={{ flexDirection: 'column', backgroundColor: '#fff' }}>

                        <Col size={3}>
                            <SafeAreaView style={styles.container}>
                                <FlatList
                                    data={answers}
                                    renderItem={({ item }) => <Item item={item} />}
                                    keyExtractor={item => item.answer}
                                    inverted
                                />


                            </SafeAreaView>
                        </Col>
                        <Col size={1} >
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 20, paddingLeft: 5, marginHorizontal: 5, borderColor: '#7b00fe' }}
                                onChangeText={(text) => SetText(text)}
                                onSubmitEditing={() => press(text)}
                                blurOnSubmit={false}
                                value={text}
                            />
                        </Col>



                    </Row>
                </Grid>
            </View>
        )
    } else {
        return (
            <ActivityIndicator />
        )
    }
}

export default Game

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 2,
        paddingHorizontal: 5,
        marginHorizontal: 3,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 15,
        fontFamily: 'monospace',
        color: '#fff'
    },
    itemOther: {
        padding: 2,
        paddingHorizontal: 5,
        marginHorizontal: 3,
        alignItems: 'flex-start'

    },
    scoreTable: {
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#d5d5d5',


    },
    box: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: '#febd00',
        borderBottomRightRadius: 0
    },
    boxOther: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        backgroundColor: '#fe0083'
    }
});