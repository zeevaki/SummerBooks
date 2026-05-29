import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function registerWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

const GUEST_EMAIL = "guest@gmail.com";
const GUEST_PASSWORD = "guest123";

export async function loginAsGuest() {
  return signInWithEmailAndPassword(auth, GUEST_EMAIL, GUEST_PASSWORD);
}

export async function forgotPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export async function signOut() {
  return firebaseSignOut(auth);
}
