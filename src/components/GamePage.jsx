import { Link } from "react-router-dom";
import { AppBridge } from "../PhaserApp/AppBridge";
import Fishidex from "./StartGameComponents/Fishidex";
import LeaderBoard from "./StartGameComponents/LeaderBoard";
import Upgrades from "./StartGameComponents/Upgrades";
import WelcomePage from "./WelcomePage";
import { useContext, useEffect } from "react";
import { UserNameContext } from "../contexts/UsernameContext";

export default function GamePage() {
  const { currentUser, setCurrentUser } = useContext(UserNameContext);

  useEffect(() => {
    const loggedIn = localStorage.getItem('email')
    if(loggedIn) {
        setCurrentUser(loggedIn);
    }
},[]);

  return (
    <>
      <AppBridge width={800} height={600} email={currentUser} />
      <div className="nav-bar">
        <Link className="button" to="/fishidex" element={<Fishidex />}>
          {" "}
          Fishidex{" "}
        </Link>
        <Link className="button" to="/leaderboard" element={<LeaderBoard />}>
          {" "}
          Leader Board{" "}
        </Link>
        <Link className="button" to="/upgrades" element={<Upgrades />}>
          {" "}
          Upgrades{" "}
        </Link>
        <Link className="button" to="/" element={<WelcomePage />}>
          {" "}
          Home{" "}
        </Link>
      </div>
    </>
  );
}
