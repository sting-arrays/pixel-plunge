import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getDocs, collection, updateDoc, query, orderBy } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
 apiKey: `${import.meta.env.VITE_APIKEY}`,
 authDomain: `${import.meta.env.VITE_AUTHDOMAIN}`,
 projectId: `${import.meta.env.VITE_PROJECTID}`,
 storageBucket: `${import.meta.env.VITE_STORAGEBUCKET}`,
 messagingSenderId: `${import.meta.env.VITE_MESSAGINGSENDERID}`,
 appId: `${import.meta.env.VITE_APPID}`,
 measurementId: `${import.meta.env.VITE_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

//adding register user functionality:
// createUserWithEmailAndPassword(auth, email, password)
//   .then( userCredential => {const user = userCredential.user})
//   .catch( error => console.log(error) )

export function updateUser(user, email, password, fishBag, fishCount, level, money, oxygen) {
 return setDoc(doc(db, "Users", email), {
  userName: user,
  email: email,
  Password: password,
  Fish_Bag: fishBag,
  Fish_Count: fishCount,
  Level: level,
  Money: money,
  Oxygen: oxygen,
 }).then(() => console.log("this has worked"));
}

export async function getAllUsers() {
 let allUsers = [];
 const querySnapshot = await getDocs(collection(db, "Users"));
 querySnapshot.forEach((doc) => {
  allUsers.push({ name: doc.id, ...doc.data() });
 });
 return allUsers;
}

export async function getAllFish() {
 let allFish = [];
 const querySnapshot = await getDocs(collection(db, "Fish"));
 querySnapshot.forEach((doc) => {
  allFish.push({ name: doc.id, ...doc.data() });
 });
 return allFish;
}

export async function getUserDetails(user) {
 const docRef = doc(db, "Users", user);
 const docSnap = await getDoc(docRef);

 return docSnap.data();
}

export async function upgradeOxygen(user, newValue, newMoney) {
 const docRef = doc(db, "Users", user);
 await updateDoc(docRef, {
  Oxygen: newValue,
  Money: newMoney,
 });
}
export async function upgradeFishNet(user, newValue, newMoney) {
 const docRef = doc(db, "Users", user);
 await updateDoc(docRef, {
  Fish_Bag: newValue,
  Money: newMoney,
 });
}

