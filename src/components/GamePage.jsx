import { Link } from "react-router-dom";
import { AppBridge } from "../PhaserApp/AppBridge";
import Fishidex from "./StartGameComponents/Fishidex";
import LeaderBoard from "./StartGameComponents/LeaderBoard";
import Upgrades from "./StartGameComponents/Upgrades";
import WelcomePage from "./WelcomePage";



export default function GamePage() {
    return(
        <>
            <AppBridge width={800} height={600} />
            <Link to='/fishidex' element={ <Fishidex /> }> Fishidex </Link>
            <Link to='/leaderboard' element={ <LeaderBoard /> }> Leader Board </Link>
            <Link to='/upgrades' element={ <Upgrades /> }> Upgrades </Link>
            <Link to='/' element={<WelcomePage />}> Home </Link>
        </>
    )
}