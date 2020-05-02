import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import FirebaseDB from '../../networking/firebase/index';
import Emoji from 'react-native-emoji';
import { Grid, Row, Col } from 'react-native-easy-grid'
import { useFocusEffect } from '@react-navigation/native'
function Game() {
    const [users, SetUsers] = useState();
    const [isLoading, SetIsLoading] = useState(false);
    const [answers, SetAnswers] = useState();
    const [text, SetText] = useState();
    const [currentUsername, SetCurrentUsername] = useState();
    const [currentQuestion, SetCurrentQuestion] = useState();
    const [questionCount, SetQuestionCount] = useState(0);
    const [getQuestionsDone, SetGetQuestionsDone] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            FirebaseDB.fetchUserInformation((res) => {
                SetUsers(res);

            })
            FirebaseDB.getRoomAnswers((res) => {
                SetAnswers(res);
            })
            FirebaseDB.getCurrentUsername((res) => {
                SetCurrentUsername(res)
            })

            FirebaseDB.currentQuestion((res) => {
                SetCurrentQuestion(res)
                SetIsLoading(true);
                //SetQuestionCount(questionCount + 1)

            });
            /*FirebaseDB.currentQuestion((res) => {
                SetCurrentQuestion(res)
                SetIsLoading(true);
            })
            FirebaseDB.answerCorrect();*/
        }, [])
    )
    const press = async (text) => {
        FirebaseDB.answered(text)
        const percent = await FirebaseDB.checkAnswer(text)
        if (percent >= 75) {
            FirebaseDB.addPointtoUser()

            FirebaseDB.currentQuestion((res) => {

                SetCurrentQuestion(res)
                //SetQuestionCount(questionCount + 1)
                SetIsLoading(true);

            });
        }
        SetText()
    }
    const Item = ({ item }) => {
        return (
            <View style={[item.username === currentUsername ? styles.item : styles.itemOther]}>
                <Text style={styles.title}>{item.username} : {item.answer}</Text>

            </View>
        );
    }
    if (isLoading) {


        return (
            <View style={{ flex: 1 }}>
                
                <Grid>
                    <Row size={1}>
                        <Col>

                            <Text>{users[0].username}</Text>
                            <Text>{users[0].skor}</Text>
                        </Col>
                        <Col>
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
        backgroundColor: '#f9c2ff',
        padding: 5,
        marginVertical: 3,
        marginHorizontal: 3,
    },
    title: {
        fontSize: 15,
    },
    itemOther: {
        backgroundColor: 'red',
        padding: 5,
        marginVertical: 3,
        marginHorizontal: 3,
    },
});