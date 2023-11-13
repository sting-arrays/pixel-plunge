import { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, updateUser } from "../../firebase";
import { AuthDetails } from "./AuthDetails";
import { UserNameContext } from "../../contexts/UsernameContext";

export default function Register() {
  const { currentUser, setCurrentUser } = useContext(UserNameContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const registerUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateUser(userName, email, password, 5, 0, 0, 0, 20);
        localStorage.setItem("email", email);
      })
      .then(() => setCurrentUser(email))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form className="my-3" onSubmit={registerUser}>
        <h1 className="mb-3 text-white">Create an account</h1>
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
        <button className="button mt-3" type="submit">
          {" "}
          Register{" "}
        </button>
      </form>
    </>
  );
}
