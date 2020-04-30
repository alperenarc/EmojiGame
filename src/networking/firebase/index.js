import auth, { firebase } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'



var currentUsername = '';
var roomUid = '4c1a9ce4-5745-40c3-8dd7-37bb1fdaf407';
var answers = [];
var isExistUsername = false;
var users = []
var questions = [];
var currentQuestion = [];
var correctAnswer = '';
var score = 0;
var currentQuestionIndex = 0;
class Firebase {


    async registerUser(username, navigation) {
        // Get the users ID

        const uid = auth().currentUser.uid;
        // Create a reference
        const ref = database().ref(`/users/${uid}`);
        let isExist = this.checkUsernameExist(username)
        if (!isExist) {
            alert("Username is Exist")
        } else {
            await ref.set({
                username: username
            }, (error) => {
                if (error) {
                    // The write failed...
                    console.log(error)
                    alert("Error")
                } else {
                    // Data saved successfully!
                    navigation.navigate('InitialApp')
                }
            });
        }



    }

    checkUsernameExist = async (username) => {
        isExistUsername = false;
        await database().ref().child("users").orderByChild("username").equalTo(username).on("value", function (snapshot) {
            if (snapshot.exists()) {
                console.log("exist")
                isExistUsername = true
            } else {
                console.log("not exist")
            }
        });
        console.warn(isExistUsername)
        return isExistUsername;
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

    answerCorrect = async () => {
        await this.currentQuestion()
    }
    checkAnswer = async (input) => {

        var usersAnswer = this.convertString(input);

        usersAnswer = usersAnswer.replace(new RegExp(/\s/g), "");
        correctAnswer = correctAnswer.replace(new RegExp(/\s/g), "").toUpperCase();

        var i;
        var say = 0
        for (i = 0; i < correctAnswer.length; i++) {
            if (usersAnswer[i] === correctAnswer[i]) {
                say++
            }
        }
        return (say * 100) / correctAnswer.length


    }
    convertString = (phrase) => {
        var maxLength = 100;

        var returnString = phrase.toLowerCase();
        //Convert Characters
        returnString = returnString.replace(/ö/g, 'o');
        returnString = returnString.replace(/ç/g, 'c');
        returnString = returnString.replace(/ş/g, 's');
        returnString = returnString.replace(/ı/g, 'i');
        returnString = returnString.replace(/ğ/g, 'g');
        returnString = returnString.replace(/ü/g, 'u');

        // if there are other invalid chars, convert them into blank spaces
        returnString = returnString.replace(/[^a-z0-9\s-]/g, "");
        // convert multiple spaces and hyphens into one space       
        returnString = returnString.replace(/[\s-]+/g, " ");
        // trims current string
        returnString = returnString.replace(/^\s+|\s+$/g, "");
        // cuts string (if too long)
        if (returnString.length > maxLength)
            returnString = returnString.substring(0, maxLength);
        // add hyphens
        returnString = returnString.replace(/\s/g, "");

        //console.warn(returnString.toUpperCase());

        return returnString.toUpperCase();
    }
    createTimeNow = () => {
        var time = new Date().getTime();
        console.warn(time);
        return time
    }
    answered = async (answer) => {
        
        const answerUid = this.createTimeNow()
        await database().ref(`/users/${auth().currentUser.uid}`).once('value', function (snap) {
            currentUsername = snap.val().username
        })
        const answers = database().ref(`/rooms/${roomUid}/answers/${answerUid}`);

        await answers.set({

            answer: answer,
            username: currentUsername,

        }, (error) => {
            if (error) {
                // The write failed...
                alert("Error")
            }
        });
    }

    getRoomAnswers = async (callback) => {

        await database().ref(`/rooms/${roomUid}/answers/`)
            .on('value', function (snap) {
                answers = []
                snap.forEach(function (childSnapshot) {

                    var childData = childSnapshot.val();
                    answers.push(childData)

                });
                callback(answers)

            });

    }

    getCurrentUsername = async (callback) => {
        await database().ref(`/users/${auth().currentUser.uid}`).once('value', function (snap) {
            callback(snap.val().username)
        })
    }
    fetchUserInformation = async (callback) => {

        await database().ref(`/rooms/${roomUid}/users`).on('value', function (snap) {
            users = []
            snap.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                users.push(childData)
            });

            callback(users)
        })
    }
    addPointtoUser = async () => {

        await this.nextQuestion()
        const ref = database().ref(`/rooms/${roomUid}/users/${auth().currentUser.uid}`);
        await ref.update({

            skor: score + 1

        }, (error) => {
            if (error) {
                // The write failed...
                alert("Error")
            }
        });
        score += 1
    }
    nextQuestion = async () => {
        const ref = database().ref(`/rooms/${roomUid}`);
        await ref.update({

            currentQuestionIndex: currentQuestionIndex + 1

        }, (error) => {
            if (error) {
                // The write failed...
                alert("Error")
            }
        });
    }
    getCurrentQuestionIndex = async (callback) => {
        await database().ref(`/rooms/${roomUid}`).child('currentQuestionIndex').on('value', function (snap) {
            currentQuestionIndex = snap.val()
            callback(currentQuestionIndex)
        })
    }
    getRandomQuestions = async (callback) => {
        await database().ref(`/questions/`).on('value', function (snap) {

            questions = []
            snap.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                questions.push(childData)
            });
            callback(true)
        })
    }
    currentQuestion = async (callback = f => f) => {

        await this.getRandomQuestions(() => {
            this.getCurrentQuestionIndex((res) => {
                currentQuestion = []
                currentQuestion = questions[res]
                correctAnswer = currentQuestion.correctAnswer;
                callback(currentQuestion)
            })
        })
    }
}

export default new Firebase()