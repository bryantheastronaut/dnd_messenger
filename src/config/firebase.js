import firebase from 'firebase'
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

export default app