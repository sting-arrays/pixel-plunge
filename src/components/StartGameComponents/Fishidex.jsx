import GamePage from "../GamePage";
import { Link } from "react-router-dom";
import { getAllFish } from "../../firebase";
import { useEffect, useState, useContext } from "react";
import { UserNameContext } from "../../contexts/UsernameContext";

export default function Fishidex() {

    const [ allFish, setAllFish ] = useState([])
    const { currentUser, setCurentUser } = useContext(UserNameContext);

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
                if(currentUser === 'Guest') {
                    return (
                        <div key={fish.name}>
                            <li><img src={fish.image} alt='fish swimming in the sea and having a great time'/></li>
                            <li>{fish.name}</li>
                            <li>{fish.facts}</li>
                        </div>
                    )
                } return (
                    <div key={fish.name}>
                            <li><img src={fish.grey_image} alt='fish swimming in the sea and having a great time'/></li>
                            <li>{fish.name}</li>
                            <li>{fish.facts}</li>
                    </div>
                )
                }
                
            )}
            </ul>
            <Link className='button' to='/game' element={<GamePage />}> Back to Game </Link>
        </div>
            
    )
}