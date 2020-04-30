import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TextInput, Keyboard } from 'react-native';
import FirebaseDB from './src/Network/Firebase'

function App() {
  const [answers, SetAnswers] = useState();
  const [text, SetText] = useState();
  const [isLoading, SetIsLoading] = useState(true);
  const currentUsername = 'alperen_arc';

  useEffect(() => {

    FirebaseDB.getRoomAnswers((res) => {
      SetAnswers(res);
      SetIsLoading(false);
    })
  }, [])
  const press = (text) => {
    FirebaseDB.answered(text)
  }
  const Item = ({ item }) => {
    return (
      <View style={[item.username === currentUsername ? styles.item : styles.itemOther]}>
        <Text style={styles.title}>{item.username}</Text>
        <Text note style={styles.title}>{item.answer}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={answers}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.answer}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => SetText(text)}
        onSubmitEditing={() => press(text)}
        blurOnSubmit={false}
      />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  itemOther: {
    backgroundColor: 'red',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
  },
});




/**
 * 
 * Firebase.js
 */


import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

var currentUsername = 'alperen_arc';
var currentUserUid = '7d05eb17-51c4-40d3-ae49-bada6a248e9a';
var roomUid = '4c1a9ce4-5745-40c3-8dd7-37bb1fdaf407';
var answers = [];

class Firebase {

    create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    checkAnswer = () => {

    }

    answered = async (answer) => {
        const answerUid = this.create_UUID();
        const answers = database().ref(`/rooms/${roomUid}/answers/${answerUid}`);

        await answers.set({

            answer: answer,
            username: currentUsername

        }, (error) => {
            if (error) {
                // The write failed...
                alert("Error")
            }
        });
    }

    getRoomAnswers = async (callback) => {

        await database().ref(`/rooms/${roomUid}/answers/`).on('value', function (snap) {
            answers = []
            snap.forEach(function (childSnapshot) {

                var childData = childSnapshot.val();
                answers.push(childData)

            });
            callback(answers)

        });

    }

}

export default new Firebase()