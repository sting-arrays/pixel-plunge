import { useContext, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { AuthDetails } from "./AuthDetails"
import { UserNameContext } from "../../contexts/UsernameContext"

export default function Login() {
    const {currentUser, setCurrentUser} = useContext(UserNameContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = (e) => {
       e.preventDefault()
       signInWithEmailAndPassword(auth, email, password)
       .then( userCredential => console.log(userCredential))
       .then ( () => setCurrentUser(email) )
       .catch( error => console.log(error) )
    }

    return (
        <>
        <form onSubmit={signIn}>
            <h1>Login</h1>
            <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}></input>
            <button type="submit"> Login </button>
        </form>
        < AuthDetails />
        </>
    )
}