

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// //const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
// };


const firebaseConfig = {
  apiKey: "AIzaSyBuKOTAXTNjveorvGyesJwqr0A5ddtPodc",
  authDomain: "adilshop-5f67d.firebaseapp.com",
  projectId: "adilshop-5f67d",
  storageBucket: "adilshop-5f67d.appspot.com",
  messagingSenderId: "337689519955",
  appId: "1:337689519955:web:c834be74f9b78edcf1a3a6",
  measurementId: "G-SX6SBCNE86"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;