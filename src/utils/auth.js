import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "./firebase";

export const register = async (email, password, username) => {
  try {
    console.log("Attempting to register user with email:", email);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User created successfully, updating profile...");
    // Update the user's profile with the username
    await updateProfile(user, {
      displayName: username,
    });

    console.log("User registered successfully:", user);
    return user;
  } catch (error) {
    console.error("Registration error in auth.js:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
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

    return userCredential;
  } catch (error) {
    console.error("Login error in auth.js:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
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
