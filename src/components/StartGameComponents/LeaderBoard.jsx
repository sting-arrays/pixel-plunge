import GamePage from "../GamePage";
import { Link } from "react-router-dom";

export default function LeaderBoard() {
    return(
        <div>
            <p>This is the leader board!</p>
            <Link className='button' to='/game' element={<GamePage />}> Back to Game </Link>
        </div>  
    )
}