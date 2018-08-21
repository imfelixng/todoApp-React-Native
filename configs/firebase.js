import firebase from '@firebase/app';
import '@firebase/app';

const config = {
    apiKey: "AIzaSyAoYiVGKrKa3eY0RatKLuHImE1ap7Jj4V0",
    authDomain: "todoapp-ngquangan.firebaseapp.com",
    databaseURL: "https://todoapp-ngquangan.firebaseio.com",
    projectId: "todoapp-ngquangan",
    storageBucket: "todoapp-ngquangan.appspot.com",
    messagingSenderId: "474669384149"
  };
const fbConnect = firebase.initializeApp(config);

export default fbConnect;