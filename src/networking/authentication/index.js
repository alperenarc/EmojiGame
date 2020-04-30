import { GoogleSignin } from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/auth';

class Authentication {
    async signInWithGoogle(navigation) {
        try {
            const { idToken, accessToken } = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            await firebase.auth().signInWithCredential(credential).then((result) => {
                if (result.additionalUserInfo.isNewUser) {
                    //go username page
                    navigation.navigate('SelectUsername', {
                        uid: result
                            .user.uid
                    })
                } else {
                    //go app
                    navigation.navigate('InitialApp')
                }
            });


        } catch (error) {
            console.log(error);
        }
    }
}
const auth = new Authentication();
export default auth;