import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: "1:1028957213351:web:ad64192e8931e4414f4182",
  // measurementId: "G-YVVVT7JQWQ",
};

// Initialize Firebase
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
  }

  // Auth API
  // ------------------------------------------------------------

  // Create User
  handleCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Sign In
  handleSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Sign Out
  handleSignOut = () => this.auth.signOut();

  // Rest Password
  handlePasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // Update Password
  handlePasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // User API
  // ------------------------------------------------------------

  user = (uid) => this.db.ref(`${uid}`);

  users = () => this.db.ref(`users`);
}

export default Firebase;
