import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "./firebase";

export const register = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: username });

    // Wait for the auth state to be fully updated
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          unsubscribe();
          resolve(userCredential);
        }
      });
    });
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    console.log("Login function called in auth.js with email:", email);

    // Set persistence to LOCAL
    await setPersistence(auth, browserLocalPersistence);

    console.log("Attempting to sign in with Firebase...");
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(
      "Sign in successful, userCredential:",
      JSON.stringify(userCredential, null, 2)
    );

    // Wait for the auth state to be fully updated
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          unsubscribe();
          resolve(userCredential);
        }
      });
    });
  } catch (error) {
    console.error("Login error in auth.js:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
