import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Item, Input, Icon, Button, Text } from 'native-base'
import FirebaseDB from '../../networking/firebase/index'

const selectUsername = ({ navigation }) => {

    const [username, setUserName] = useState('')

    handleText = (text) => {
        setUserName(text)
    }
    submitUser = async () => {
        if(username != ''){
            FirebaseDB.registerUser(username, navigation)
        } else {
            console.log("empty area")
        }
    }
    return (
        <Container style={styles.containerView}>
            <Content>
                <Text style={styles.customText}>Pick a Username</Text>
                <Item style={{marginTop: 32, marginBottom: 32}}>
                    <Icon active name="md-person" style={{ color: '#ff5a5f' }} />
                    <Input placeholder='Pick a Username' onChangeText={(text) => handleText(text)} />
                </Item>
                <Button bordered style={styles.customButton} onPress={() => this.submitUser()}>
                    <Text style={{ color: '#ff5a5f' }}>Submit</Text>
                </Button>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    customButton: {
        borderColor: '#ff5a5f', 
        justifyContent: 'center',
        width: '100%'
    },
    customText: {
        color: '#ff5a5f',
        fontSize: 32,
        marginTop: 80
    }
})

export default selectUsername;