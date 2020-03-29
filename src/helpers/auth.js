import { auth } from "../services/firebase";

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
};

export function login(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
};

export function signInWithGoogle() {

  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
};

export function logout() {
  auth().signOut();
};
