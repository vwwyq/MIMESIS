import { initializeApp } from "firebase/app";

// Define the Firebase configuration type
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: "mimesis-28163.firebaseapp.com",
  projectId: "mimesis-28163",
  storageBucket: "mimesis-28163.firebasestorage.app",
  messagingSenderId: "976388459097",
  appId: "1:976388459097:web:7592493107070c8ba0ff48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
