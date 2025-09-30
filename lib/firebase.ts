import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBEFLX4Uy4jTzoSyEdzYzOSEd2lqn8ifbE",
  authDomain: "axtargetbotwebsite.firebaseapp.com",
  projectId: "axtargetbotwebsite",
  storageBucket: "axtargetbotwebsite.firebasestorage.app",
  messagingSenderId: "808698399196",
  appId: "1:808698399196:web:61b6be0721b94f24c3a719",
  measurementId: "G-VLWZG4Q5TD",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
export const db = getFirestore(app)
export const auth = getAuth(app)

// Initialize Analytics only on client side
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null

export default app
