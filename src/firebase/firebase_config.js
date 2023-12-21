// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh_hiGH-H-54JS6-PwsftmckD2CuzzD40",
  authDomain: "task-managment-38895.firebaseapp.com",
  projectId: "task-managment-38895",
  storageBucket: "task-managment-38895.appspot.com",
  messagingSenderId: "642843188318",
  appId: "1:642843188318:web:9202a81b9ff1198f4d28cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
