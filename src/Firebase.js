// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebaseStorage from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnxKTDrsF59qRmvHtvey0wHlj4x6lz8rQ",
  authDomain: "audio-editor-df3f1.firebaseapp.com",
  projectId: "audio-editor-df3f1",
  storageBucket: "audio-editor-df3f1.appspot.com",
  messagingSenderId: "268175984653",
  appId: "1:268175984653:web:11c5cf7d6421407abced44"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const storage = firebaseStorage;