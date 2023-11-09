import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../firebase"


export const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect( () => {
        const listen = onAuthStateChanged( auth, (user) => {
            if (user) setAuthUser(user)
            else setAuthUser(null)
        })
        return() => {listen()}
    }, [])

    const userSignOut = () => {
        signOut(auth)
        .then( () => console.log("signout sucsess!") )
        .catch( (error) => console.log(error) )
    }

    return (
        <>
           {authUser ? <><p>{`Signed in as ${authUser.email}`}</p><button onClick={userSignOut}>Sign Out</button></>: <p> Signed out</p>}  
        </>
    )
}