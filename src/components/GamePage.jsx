import { Link } from "react-router-dom";
import { AppBridge } from "../PhaserApp/AppBridge";
import Fishidex from "./StartGameComponents/Fishidex";
import LeaderBoard from "./StartGameComponents/LeaderBoard";
import Upgrades from "./StartGameComponents/Upgrades";
import WelcomePage from "./WelcomePage";

export default function GamePage() {
  const userName = "Jordan_Ekford";

  return (
    <>
      <AppBridge width={800} height={600} userName={userName} />
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
