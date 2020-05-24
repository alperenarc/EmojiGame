import React, { useState } from 'react'
import { StyleSheet,TouchableOpacity } from 'react-native'
import { Container, Content, Item, Input, Icon, Button, Text } from 'native-base'
import FirebaseDB from '../../networking/firebase/index'

const selectUsername = ({ navigation }) => {

    const [username, setUserName] = useState('')

    handleText = (text) => {
        setUserName(text)
    }
    const submitUser = async () => {
        if(username != ''){
            FirebaseDB.registerUser(username, navigation)
        } else {
            console.log("empty area")
        }
    }
    return (
        <Container style={styles.containerView}>
            <Content>
                <Text style={styles.customText}>Kullanıcı Adı Giriniz</Text>
                <Item style={{marginTop: 32, marginBottom: 32}}>
                    <Icon active name="md-person" style={{ color: '#ff5a5f' }} />
                    <Input placeholder='Kullanıcı Adı Giriniz' onChangeText={(text) => handleText(text)} />
                </Item>
                <TouchableOpacity bordered style={styles.buttons} onPress={() => submitUser()}>
                    <Text style={{ color: '#fff' }}>Kaydet</Text>
                </TouchableOpacity>
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
    },
    buttons: {
        backgroundColor: '#DADADA',
        borderRadius: 18,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
})

export default selectUsername;