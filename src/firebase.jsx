import { initializeApp } from 'firebase/app';
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_APIKEY}`,
  authDomain: `${import.meta.env.VITE_AUTHDOMAIN}`,
  projectId: `${import.meta.env.VITE_PROJECTID}`,
  storageBucket: `${import.meta.env.VITE_STORAGEBUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_MESSAGINGSENDERID}`,
  appId: `${import.meta.env.VITE_APPID}`,
  measurementId: `${import.meta.env.VITE_MEASUREMENTID}`
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function updateUser (user, name, email, password, fishBag, fishCount, level, money, oxygen) {

    return setDoc(doc(db, "Users", user), {
    userName: user,
    name: name,
    email: email,
    Password: password,
    Fish_Bag: fishBag,
    Fish_Count: fishCount,
    Level: level,
    Money: money,
    Oxygen: oxygen

  }).then( () => console.log("this has worked") )

}