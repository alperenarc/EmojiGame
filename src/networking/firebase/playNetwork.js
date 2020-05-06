import auth, { firebase } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

var emtpyRoom = []
var currentRoomUid = ''
var room = ''
class PlayNetwork {

    getCurrentUsername = () => {
        database().ref(`/users/${auth().currentUser.uid}`).once('value', function (snap) {
            return snap.val().username
        })
    }

    create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    isRoomEmpty = async (callback) => {

        /*await database().ref().child("rooms").orderByChild("isStart").equalTo(false).once("value", function (snapshot) {
            if (!snapshot.exists()) {
                this.createRoom()
            }
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.key;
                emtpyRoom.push(childData);
                if (emtpyRoom.length === 1) {
                    this.joinRoom(emtpyRoom[0])
                }
            });
        });*/

        const rooms = await database().ref().child("rooms").orderByChild("isStart").equalTo(false).once("value");
        if (!rooms.exists()) {
            this.createRoom((res) => {
                callback(res)
            })

        }
        rooms.forEach(function (childSnapshot) {
            var childData = childSnapshot.key;
            emtpyRoom.push(childData);
            /*if (emtpyRoom.length === 1) {
                
            }*/
        });
        if (emtpyRoom.length >= 1) {
            this.joinRoom((res) => {
                callback(res)
            }, [emtpyRoom[0]])
        }

    }

    createRoom = async (callback) => {
        const roomUid = this.create_UUID();
        currentRoomUid = roomUid
        const room = database().ref(`/rooms/${roomUid}`);
        const user = database().ref(`/rooms/${roomUid}/users/${auth().currentUser.uid}`);
        var username = ''
        await database().ref(`/users/${auth().currentUser.uid}`).once('value', function (snap) {
            username = snap.val().username
        })
        await room.set({
            isStart: false,
            currentQuestionIndex: 0
        }, (error) => {
            if (error) {
                // The write failed...
                console.log(error)
                alert("Error")
            } else {
                // Data saved successfully!
                //navigation.navigate('InitialApp')
            }
        });

        await user.set({
            username: username,
            skor: 0
        }, (error) => {
            if (error) {
                // The write failed...
                console.log(error)
                alert("Error")
            } else {
                // Data saved successfully!
                //navigation.navigate('InitialApp')-
            }
        });
        console.warn(roomUid)
        callback(roomUid)
    }

    joinRoom = async (callback = f => f, roomId) => {
        
        currentRoomUid = roomId
        var username = ''
        await database().ref(`/users/${auth().currentUser.uid}`).once('value', function (snap) {
            username = snap.val().username
        })

        const room = database().ref(`/rooms/${roomId}`);
        await room.update({
            isStart: true,
            currentQuestionIndex: 0
        });

        const usersRef = database().ref(`/rooms/${roomId}/users/`).child(auth().currentUser.uid)
        await usersRef.set({
            username: username,
            skor: 0
        });
        console.warn(roomId)
        callback(roomId[0])
    }

    readyForGame = (callback = f => f, currentRoomUid) => {

        database().ref(`/rooms/${currentRoomUid}`).child('isStart').on('value', function (snap) {
            //console.warn(snap.val())
            callback(snap.val())
        })
    }

}

export default new PlayNetwork()