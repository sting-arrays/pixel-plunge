import { updateUser } from '../firebase'
import { useState } from "react";

export default function UserDetailsTest() {
    const [user, setUser] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fishBag, setFishBag] = useState(0)
    const [fishCount, setFishCount] = useState(0)
    const [level, setLevel] = useState(0)
    const [money, setMoney] = useState(0)
    const [oxygen, setOxygen] = useState(0)

    function clearFields() {
        setUser("")
        setName("")
        setEmail("")
        setPassword("")
        setFishBag(0)
        setFishCount(0)
        setLevel(0)
        setMoney(0)
        setOxygen(0)
    }

    return (
    <>
    <h2>Testing firebase updates</h2>

    <form onSubmit={ (event) => {event.preventDefault(); clearFields(); updateUser(user, name, email, password, fishBag, fishCount, level, money, oxygen) } }>

        <label>User Name:</label>
        <input required value={user} onChange={ event => setUser(event.target.value) }/>
        
        <label>Name:</label>
        <input required value={name} onChange={ event => setName(event.target.value) }/>
        
        <label>Email:</label>
        <input required value={email} onChange={ event => setEmail(event.target.value) }/>

        <label>Password:</label>
        <input required value={password} onChange={ event => setPassword(event.target.value) }/>

        {/* these may not be reeded: */}
        <label>Fish Bag</label>
        <input required value={fishBag} onChange={ event => setFishBag(event.target.value) }/>

        <label>Fish Count:</label>
        <input required value={fishCount} onChange={ event => setFishCount(event.target.value) }/>

        <label>Level:</label>
        <input required value={level} onChange={ event => setLevel(event.target.value) }/>

        <label>Money:</label>
        <input required value={money} onChange={ event => setMoney(event.target.value) }/>

        <label>Oxygen:</label>
        <input required value={oxygen} onChange={ event => setOxygen(event.target.value) }/>

        <button type="submit">Submit</button>
    </form>

    </>
    )
}