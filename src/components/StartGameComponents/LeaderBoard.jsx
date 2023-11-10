import { useEffect, useState } from "react";
import { getAllUsers } from "../../firebase";
import GamePage from "../GamePage";
import { Link } from "react-router-dom";

export default function LeaderBoard() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        getAllUsers().then( result => {
            setUsers(result.sort( (a,b) => b.Fish_Count - a.Fish_Count).slice(0,10)); 
            setLoading(false); 
        })
    }, [])

    if(loading) return <p>is loading...</p>

    console.log(users)
 
    return(
        <div>
            <p>This is the leader board!</p>
            <ul>
            {users.map( (user) => { 
                return(
                    <li key={user.userName}>
                        Name: {user.userName}
                        <div></div>
                        Fish Caught: {user.Fish_Count}
                    </li>
                )
            })}
            </ul>
            <Link className='button' to='/game' element={<GamePage />}> Back to Game </Link>
        </div>  
    )
}