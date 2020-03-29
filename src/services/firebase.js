import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC-LMCCsF-Dlg7Ftkec28hP27fqwfGa_JM",
  authDomain: "plexideas-chat.firebaseapp.com",
  databaseURL: "https://plexideas-chat.firebaseio.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
