import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  sendPasswordResetEmail,
  updatePassword,
  confirmPasswordReset,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  ActionCodeSettings,
  User,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyB8H_J68N4F1zDfWXkW6qUmAbGmZU4yGQM',
  authDomain: 'philz-ecommerce.firebaseapp.com',
  projectId: 'philz-ecommerce',
  storageBucket: 'philz-ecommerce.appspot.com',
  messagingSenderId: '677572347837',
  appId: '1:677572347837:web:2fbd509f39255e7180f4d4',
};

const app = initializeApp(config);

export const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

export const sendPasswordReset = async (email: string) =>
  await sendPasswordResetEmail(auth, email);

export const sendSignInLink = async (
  email: string,
  config: ActionCodeSettings
) => await sendSignInLinkToEmail(auth, email, config);

export const signInWithLink = async (email: string, link: string) =>
  await signInWithEmailLink(auth, email, link);

export const updateUserPassword = async (user: User, newPassword: string) =>
  await updatePassword(user, newPassword);

export const signInWithGoogle = async () =>
  await signInWithPopup(auth, googleAuthProvider);

export const signIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);
