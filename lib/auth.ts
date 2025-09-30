import { auth, db } from "./firebase"
import { signInAnonymously, onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc, increment } from "firebase/firestore"

export interface User {
  id: string
  username: string
  referralCode: string
  balance: number
  referredBy?: string
  lastLoginDate?: string
  createdAt: string
}

export function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = ""
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    if (userDoc.exists()) {
      return userDoc.data() as User
    }
    return null
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

export async function getUserByReferralCode(referralCode: string): Promise<User | null> {
  try {
    const q = query(collection(db, "users"), where("referralCode", "==", referralCode))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as User
    }
    return null
  } catch (error) {
    console.error("Error getting user by referral code:", error)
    return null
  }
}

export async function getCurrentUser(): Promise<User | null> {
  if (typeof window === "undefined") return null

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      unsubscribe()
      if (firebaseUser) {
        const user = await getUserById(firebaseUser.uid)
        resolve(user)
      } else {
        resolve(null)
      }
    })
  })
}

export async function createAnonymousUser(referralCode?: string): Promise<User> {
  try {
    // Sign in anonymously with Firebase Auth
    const userCredential = await signInAnonymously(auth)
    const firebaseUser = userCredential.user

    // Check if referral code is valid and add bonus to referrer
    if (referralCode) {
      const referrer = await getUserByReferralCode(referralCode)
      if (referrer) {
        await updateDoc(doc(db, "users", referrer.id), {
          balance: increment(0.001),
        })
      }
    }

    const newUser: User = {
      id: firebaseUser.uid,
      username: `User${Date.now().toString().slice(-6)}`,
      referralCode: generateReferralCode(),
      balance: 0,
      createdAt: new Date().toISOString(),
    }

    // Only add referredBy if it exists
    if (referralCode) {
      newUser.referredBy = referralCode
    }

    await setDoc(doc(db, "users", firebaseUser.uid), newUser)

    return newUser
  } catch (error) {
    console.error("Error creating anonymous user:", error)
    throw error
  }
}

export async function getOrCreateAnonymousUser(): Promise<User> {
  const currentUser = await getCurrentUser()
  if (currentUser) {
    return currentUser
  }
  return createAnonymousUser()
}

export async function checkDailyReward(): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false

  const today = new Date().toDateString()
  const lastLogin = user.lastLoginDate

  if (lastLogin === today) {
    return false // Already claimed today
  }

  try {
    // Add daily reward
    await updateDoc(doc(db, "users", user.id), {
      balance: increment(0.001),
      lastLoginDate: today,
    })
    return true
  } catch (error) {
    console.error("Error claiming daily reward:", error)
    return false
  }
}

export async function updateUserBalance(amount: number): Promise<void> {
  const user = await getCurrentUser()
  if (!user) return

  try {
    await updateDoc(doc(db, "users", user.id), {
      balance: increment(amount),
    })
  } catch (error) {
    console.error("Error updating balance:", error)
  }
}

export async function logout(): Promise<void> {
  try {
    await auth.signOut()
  } catch (error) {
    console.error("Error signing out:", error)
  }
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const user = await getUserById(firebaseUser.uid)
      callback(user)
    } else {
      callback(null)
    }
  })
}
