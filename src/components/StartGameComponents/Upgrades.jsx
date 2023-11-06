import GamePage from "../GamePage";
import { Link } from "react-router-dom";

export default function Upgrades() {
    return(
        <div>
            <p>This is the upgrades page</p>
            <Link className='button' to='/game' element={<GamePage />}> Back to Game </Link>
        </div> 
    )
}