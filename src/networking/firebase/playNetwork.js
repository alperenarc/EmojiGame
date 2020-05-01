import auth, { firebase } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

var emtpyRoom = []
let currentRoomUid = ''
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

    isRoomEmpty = async () => {
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
            this.createRoom()
            //console.warn('Room created')
        }
        rooms.forEach(function (childSnapshot) {
            var childData = childSnapshot.key;
            emtpyRoom.push(childData);
            /*if (emtpyRoom.length === 1) {
                
            }*/
        });
        if (emtpyRoom.length >= 1) {
            console.warn(emtpyRoom[0])
            this.joinRoom(emtpyRoom[0])
        }


    }

    createRoom = async () => {
        const roomUid = this.create_UUID();
        currentRoomUid = roomUid
        console.warn(currentRoomUid)
        const room = database().ref(`/rooms/${roomUid}`);
        const user = database().ref(`/rooms/${roomUid}/users/${auth().currentUser.uid}`);
        var username = ''
        await database().ref(`/users/${auth().currentUser.uid}`).once('value', function (snap) {
            username = snap.val().username
        })
        await room.set({
            isStart: false
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
        
    }

    joinRoom = async (roomId) => {
        currentRoomUid = roomId
        console.warn(currentRoomUid)
        var username = ''
        await database().ref(`/users/${auth().currentUser.uid}`).once('value', function (snap) {
            username = snap.val().username
        })
        const room = database().ref(`/rooms/${roomId}`);
        await room.set({
            isStart: true
        });
        const user = database().ref(`/rooms/${roomId}/users/${auth().currentUser.uid}`);
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
                console.warn('GAAMxE')
                
            }
        });
    }

    readyForGame = async (callback = f => f) => {
       
        await database().ref(`/rooms/${currentRoomUid}`).child('isStart').on('value', function (snap) {
            console.warn(currentRoomUid)
            callback(snap.val())
        })
    }

}

export default new PlayNetwork()