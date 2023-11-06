import GamePage from "../GamePage";
import { Link } from "react-router-dom";

export default function Fishidex() {
    return(
        <div>
            <p>This is fishidex!</p>
            <Link className='button' to='/game' element={<GamePage />}> Back to Game </Link>
        </div>
            
    )
}