import { useContext, useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, updateUser } from "../../firebase"
import { AuthDetails } from "./AuthDetails"
import { UserNameContext } from "../../contexts/UsernameContext"

export default function Register() {
    const {currentUser, setCurrentUser} = useContext(UserNameContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")

    const registerUser = (e) => {
       e.preventDefault()
       createUserWithEmailAndPassword(auth, email, password)
       .then( userCredential => {
            updateUser(userName, email, password, 5, 0, 0, 0, 20)}
            )
       .then ( () => setCurrentUser(email) )
       .catch( error => console.log(error) )
    }

    return (
        <>
        <form onSubmit={registerUser}>
            <h1>Create an account</h1>
            <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}></input>
            <input type="userName" placeholder="Enter username" value={userName} onChange={e => setUserName(e.target.value)}></input>
            <button type="submit"> Register </button>
        </form>
        < AuthDetails />
        </>
    )
}