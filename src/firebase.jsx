import { initializeApp } from 'firebase/app';
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore"; 
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

export function updateUser (user, name, email, password, fishBag, fishCount, level, money, oxygen) {

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

export async function getAllUsers() {
  let allUsers = []
  const querySnapshot = await getDocs(collection(db, "Users"));
  querySnapshot.forEach((doc) => {
    allUsers.push({name:doc.id,...doc.data()})
  });
  return allUsers;
}

export async function getAllFish() {
  let allFish = []
  const querySnapshot = await getDocs(collection(db, "Fish"));
  querySnapshot.forEach((doc) => {
    allFish.push({name:doc.id,...doc.data()})
  });
  return allFish;
}

export async function getUserDetails(user) {

  const docRef = doc(db, "Users", user);
  const docSnap = await getDoc(docRef);

  return docSnap.data()

}



