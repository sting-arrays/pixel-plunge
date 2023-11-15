import { useEffect, useState } from "react";
import { getAllUsers } from "../../firebase";
import GamePage from "../GamePage";
import { Link } from "react-router-dom";

export default function LeaderBoard() {
    let counter = 1;
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        getAllUsers().then( result => {
            setUsers(result.sort( (a,b) => b.Fish_Count - a.Fish_Count).slice(0,10)); 
            setLoading(false); 
        })
    }, [])

    if(loading) return <p>is loading...</p>
 
    return(
        <div className='absolute'>
            <img className='relative' alt="Pixel Plunge" src="/scroll-leaderboard-2.png" />
            <p className='relative text-[35px] mt-[-90%]'>Leaderboard</p>
            <ul className="relative text-[35px] mt-[10%]">
            {users.map( user => { 
                return(
                    <li key={user.userName}>
                        <p className='text-[20px]'>{counter++ + ' - ' + user.userName}</p>
                        <div></div>
                        <p className='text-[14px] mb-2'>Fish Caught: {user.Fish_Count}</p>
                    </li>
                )
            })}
            </ul>
            <Link className='button relative  mt-[4%]' to='/game' element={<GamePage />}> Back to Game </Link>
        </div>  
    )
}