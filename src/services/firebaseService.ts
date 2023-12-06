// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { child, getDatabase, ref } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAPnhdmY4roxisTau_dZ8J4usqdX-mvVxI',
  authDomain: 'ajs-playgrou.firebaseapp.com',
  databaseURL: 'https://ajs-playgrou-default-rtdb.firebaseio.com',
  projectId: 'ajs-playgrou',
  storageBucket: 'ajs-playgrou.appspot.com',
  messagingSenderId: '450339890811',
  appId: '1:450339890811:web:eb632e9a40f7b3011f64de',
  measurementId: 'G-FKHJ9T1N5M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const dbRef = ref(getDatabase(app));
const rootRef = child(dbRef, '/family-feud-v1');
export const questionsRef = child(rootRef, '/questions');
export const playersRef = child(rootRef, '/players');
