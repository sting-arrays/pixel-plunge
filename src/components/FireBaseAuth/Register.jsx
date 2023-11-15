import { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, getAllUsers, updateUser } from "../../firebase";
import { AuthDetails } from "./AuthDetails";
import { UserNameContext } from "../../contexts/UsernameContext";

export default function Register() {
 const { currentUser, setCurrentUser } = useContext(UserNameContext);

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [userName, setUserName] = useState("");
 const [isError, setIsError] = useState(false);
 const [errorMSG, setErrorMSG] = useState("");

 const registerUser = (e) => {
  e.preventDefault();

  getAllUsers()
   .then((response) => {
    for (let i = 0; i < response.length; i++) {
     if (response[i].userName === userName) {
      return Promise.reject({ msg: "Username taken" });
     }
    }
   })
   .then(() => {
    createUserWithEmailAndPassword(auth, email, password);
   })
   .then((userCredential) => {
    updateUser(userName, email, password, 5, 0, 0, 0, 20);
   })
   .then(() => {
    setCurrentUser(email);
    localStorage.setItem("email", email);
    setIsError(false);
   })
   .catch((error) => {
    setIsError(true);
    if (error.msg === "Username taken") {
     setErrorMSG("Username taken");
    }
    if (error.code === "auth/weak-password") {
     setErrorMSG("Password doesn't meet the requirements");
    }
    if (error.code === "auth/email-already-in-use") {
     setErrorMSG("Email already in use");
    }
   });
 };

 return (
  <>
   <form className="my-3" onSubmit={registerUser}>
    <h1 className="mt-2 text-white">Create an account</h1>
    <input
     required
     className="mx-2 rounded px-2"
     type="email"
     aria-label="email input"
     placeholder="Enter email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
    ></input>
    <input
     required
     className="mx-2 rounded px-2"
     aria-label="password input"
     type="password"
     placeholder="Enter password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
    ></input>
    <input
     required
     className="rounded px-2 mx-4"
     aria-label="username input"
     type="userName"
     placeholder="Enter username"
     value={userName}
     onChange={(e) => setUserName(e.target.value)}
    ></input>
    {isError ? <div className="text-white text-[20px] shadow-xl w-[40%] m-auto mt-2 mb-2 bg-red-600 rounded-md">{errorMSG}</div> : null}
    <button className="button mt-3" type="submit">
     {" "}
     Register{" "}
    </button>
   </form>
  </>
 );
}
