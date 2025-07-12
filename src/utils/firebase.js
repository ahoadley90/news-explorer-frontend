import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFhPHfeFN5GlhUUBMDRVY39hx1Bfr6js8",
  authDomain: "news-explorer-6fd26.firebaseapp.com",
  projectId: "news-explorer-6fd26",
  storageBucket: "news-explorer-6fd26.firebasestorage.app",
  messagingSenderId: "739535782659",
  appId: "1:739535782659:web:ee0a6a3b061ab9f5681f36",
  measurementId: "G-3KF32SH481",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
