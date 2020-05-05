import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import FirebaseDB from '../../networking/firebase/index';
import Emoji from 'react-native-emoji';
import { Grid, Row, Col } from 'react-native-easy-grid'
import { useFocusEffect } from '@react-navigation/native'
function Game(props) {
    const [users, SetUsers] = useState();
    const [isLoading, SetIsLoading] = useState(false);
    const [answers, SetAnswers] = useState();
    const [text, SetText] = useState();
    const [currentUsername, SetCurrentUsername] = useState();
    const [currentQuestion, SetCurrentQuestion] = useState();
    const [questionCount, SetQuestionCount] = useState(0);
    const [getQuestionsDone, SetGetQuestionsDone] = useState(false);
    const [roomUid, SetRoomUid] = useState();
    useEffect(() => {
        SetRoomUid(props.route.params.roomId[0])
        //console.warn(roomUid)
    }, [])
    useFocusEffect(

        React.useCallback(() => {

            if (roomUid) {
                //console.warn('Çalıştı')
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
                    SetCurrentQuestion(res)
                    SetIsLoading(true);
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

                SetCurrentQuestion(res)
                //SetQuestionCount(questionCount + 1)
                SetIsLoading(true);

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
    if (isLoading) {


        return (
            <View style={{ flex: 1 }}>

                <Grid>
                    <Row size={1} style={styles.scoreTable}>
                        <Col style={{ flexDirection:'row' }}>

                            <Text>{users[0].username}</Text>
                            <Text>{users[0].skor}</Text>
                        </Col>
                        <Col style={{ flexDirection:'row' }}>
                            <Text>{users[1].username}</Text>
                            <Text>{users[1].skor}</Text>

                        </Col>
                    </Row>
                    <Row size={3}>

                        {
                            Object.keys(currentQuestion.question).map((obj, i) => {
                                return (
                                    <Col>
                                        <Emoji name={currentQuestion.question[obj]} style={{ fontSize: 60 }} />
                                    </Col>
                                )
                            })}


                    </Row>
                    <Row size={8}>
                        <Col>
                            <SafeAreaView style={styles.container}>
                                <FlatList
                                    data={answers}
                                    renderItem={({ item }) => <Item item={item} />}
                                    keyExtractor={item => item.answer}
                                />


                            </SafeAreaView>

                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
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
        flex: 1
    },
    item: {
        padding: 2,
        paddingHorizontal:5,
        marginHorizontal: 3,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 15,
        fontFamily: 'monospace',
        color:'#fff'
    },
    itemOther: {
        padding: 2,
        paddingHorizontal:5,
        marginHorizontal: 3,
        alignItems: 'flex-start'

    },
    scoreTable: {
        padding: 10
    },
    box:{
        paddingHorizontal:8,
        paddingVertical:5,
        borderRadius:20,
        backgroundColor:'#febd00',
        borderBottomRightRadius:0
    },
    boxOther:{
        paddingHorizontal:8,
        paddingVertical:5,
        borderRadius:20,
        borderBottomLeftRadius:0,
        backgroundColor:'#fe0083'
    }
});