import auth, { firebase } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

var emtpyRoom =[]

class PlayNetwork {

    isRoomEmpty = async () => {
        await database().ref().child("rooms").orderByChild("isStart").equalTo(false).once("value", function (snapshot) {
            if(!snapshot.exists()){
                return false
            }
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.key;
                emtpyRoom.push(childData);
                if(emtpyRoom.length === 1 ){
                    return emtpyRoom
                }
            });
        });
    }
    

}

export default new PlayNetwork()