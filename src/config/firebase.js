import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import secrets from './secrets'

const config = {
  apiKey: secrets.apiKey,
  authDomain: "rpg-messenger-96f71.firebaseapp.com",
  databaseURL: "https://rpg-messenger-96f71.firebaseio.com",
  projectId: "rpg-messenger-96f71",
  storageBucket: "rpg-messenger-96f71.appspot.com",
  messagingSenderId: secrets.messagingSenderId,
}

const app = firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()

export const firestore = app.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)
