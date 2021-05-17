import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCHiP6vJEF8pUnszuc56hKjJrn4wA6gRg",
  authDomain: "todo-list-firebase-1f4f3.firebaseapp.com",
  projectId: "todo-list-firebase-1f4f3",
  storageBucket: "todo-list-firebase-1f4f3.appspot.com",
  messagingSenderId: "441710428681",
  appId: "1:441710428681:web:aede943ebea68355442ed8",
  measurementId: "G-B7J6B35GQG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
export default db;
