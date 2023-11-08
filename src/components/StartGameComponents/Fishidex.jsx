import GamePage from "../GamePage";
import { Link } from "react-router-dom";
import { getAllFish } from "../../firebase";
import { useEffect, useState } from "react";
import Cod from "../../assets/Fish/1.png"
import Darth_Fisher from "../../assets/Fish/2.png"
import Dory from "../../assets/Fish/3.png"
import Jaws from "../../assets/Fish/4.png"

export default function Fishidex() {

    const [ allFish, setAllFish ] = useState([])

    useEffect (() => {
        getAllFish()
        .then((response) => {
            setAllFish(response);
        })
    },[])


    if(allFish.length === 0) {
        return <p>is loading ...</p>
    }
    
    return(
        <div>
            <p>This is fishidex!</p>
            <ul>
            {allFish.map((fish) => {
                return (
                    <div key={fish.name}>
                        <li><img src={fish.image} alt='fish swimming in the sea and having a great time'/></li>
                        <li>{fish.name}</li>
                        <li>{fish.facts}</li>
                    </div>
                )}
            )}
            </ul>
            <Link className='button' to='/game' element={<GamePage />}> Back to Game </Link>
        </div>
            
    )
}