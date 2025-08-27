// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcxNi5CrUp7f60tc-4udN5dUnw6ycqC3E",
  authDomain: "todopro-9b7cf.firebaseapp.com",
  projectId: "todopro-9b7cf",
  storageBucket: "todopro-9b7cf.appspot.com",
  messagingSenderId: "570792437571",
  appId: "1:570792437571:web:36a775540b4b8e2059f1f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

// Export the services you want to use in your app
export { auth, db, storage };
