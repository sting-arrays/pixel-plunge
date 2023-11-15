import { useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { UserNameContext } from "../../contexts/UsernameContext";

export const AuthDetails = () => {
 const [authUser, setAuthUser] = useState(null);
 const { currentUser, setCurrentUser } = useContext(UserNameContext);

 useEffect(() => {
  const listen = onAuthStateChanged(auth, (user) => {
   if (user) setAuthUser(user);
   else setAuthUser(null);
  });
  return () => {
   listen();
  };
 }, []);

 const userSignOut = () => {
  signOut(auth).then(() => {
   localStorage.removeItem("email");
   setCurrentUser("Guest");
  });
 };

 return (
  <>
   {authUser ? (
    <>
     <p className="text-white my-5">{`Signed in as ${authUser.email}`}</p>
     <button className="button mb-5" onClick={userSignOut}>
      Sign Out
     </button>
    </>
   ) : (
    <p> Signed out</p>
   )}
  </>
 );
};
