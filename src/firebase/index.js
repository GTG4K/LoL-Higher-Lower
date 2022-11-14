import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzw0UTcd-ryGG8ci4k9GWly2ItYNGdRiI",
  authDomain: "lol-higher-lower.firebaseapp.com",
  projectId: "lol-higher-lower",
  storageBucket: "lol-higher-lower.appspot.com",
  messagingSenderId: "648240515656",
  appId: "1:648240515656:web:e569a5f1401f1530e7267d",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage };
