import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "movies-3346c.firebaseapp.com",
    projectId: "movies-3346c",
    storageBucket: "movies-3346c.appspot.com",
    messagingSenderId: "106164370502",
    appId: "1:106164370502:web:222bcfbabf3660e021de47"
  };

  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);