import firebase from "firebase/app"
import "firebase/auth"
import "firebase/analytics"
import "firebase/firestore";
import "firebase/storage";

import { useContext } from 'react';

import { getUserData } from './spotify';
import { User } from '../context/UserContext';

const dev = process.env.NODE_ENV === "production";
const root = (dev ? 'https://spotify-trivia.vercel.app/' : 'http://localhost:3000')
const redirect_uri = `${root}/auth`;

var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
  };

const authFunctionUrl = 'https://us-central1-spotify-trivia-57e16.cloudfunctions.net/makeCustomToken?';



const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();


export const signInWithSpotify = async (user, dispatch, redirect) => {
  console.log(user.id)
  const fetchToken = await fetch(`${authFunctionUrl}spotifyToken=${user.id}`);
  const { customToken } = await fetchToken.json();
  await auth.signInWithCustomToken(customToken)
    .then((user) => {
      return dispatch({
        type: "LOGIN",
        payload: user
      })
    })
    .catch((error)=> {
      console.log(error)
    })
  window.location.href = `${redirect}`;
}

export const checkAuth = (cb) => {
  return auth.onAuthStateChanged(cb)
 }

export const signOutSpotify = async() => {
   await auth.signOut().then((user) => {
    window.location.href = `/`;
   }).catch((error) => {
     console.error("Something bad happened");
   });
 }