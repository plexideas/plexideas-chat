import firebase from 'firebase';

const config = {
  apiKey: "YOUR FIREBASE CREDENTIAL",
  authDomain: "YOUR FIREBASE CREDENTIAL",
  databaseURL: "YOUR FIREBASE CREDENTIAL"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
