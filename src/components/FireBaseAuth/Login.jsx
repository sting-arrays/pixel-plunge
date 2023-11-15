import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthDetails } from "./AuthDetails";
import { UserNameContext } from "../../contexts/UsernameContext";

export default function Login() {
 const { currentUser, setCurrentUser } = useContext(UserNameContext);

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isError, setIsError] = useState(false);

 const signIn = (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    localStorage.setItem("email", email);
   })
   .then(() => {
    setCurrentUser(email);
    setIsError(false);
    setEmail('')
    setPassword('')
   })
   .catch(() => {
    setIsError(true);
   });
 };

 return (
  <>
   <form className="my-2" onSubmit={signIn}>
    <h1 className="my-1 text-white">Login</h1>
    <input
     className="mx-2.5 px-2 rounded"
     aria-label="email input"
     type="email"
     placeholder="Enter email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
    ></input>
    <input
     className="mx-2.5 px-2 rounded"
     aria-label="password input"
     type="password"
     placeholder="Enter password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
    ></input>
    {isError ? <div className="text-white shadow-xl w-[40%] text-[20px] m-auto mt-2 mb-2 bg-red-600 rounded-md">Invalid Login Credentials</div> : null}
    <button className="mx-2 button" type="submit">
     {" "}
     Login
    </button>
   </form>
  </>
 );
}
