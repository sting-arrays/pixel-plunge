import { Link } from "react-router-dom";

export default function StartGame() {
    return(
        <>
            <Link className='button' to='/game'> Start Game </Link>
        </>
    )
}