import "./App.css";
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from "react-router-dom";
import GamePage from "./components/GamePage";
import Fishidex from "./components/StartGameComponents/Fishidex";
import LeaderBoard from "./components/StartGameComponents/LeaderBoard";
import Upgrades from "./components/StartGameComponents/Upgrades";

function App() {
 return (
  <div>
   <Routes>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/game" element={<GamePage />} />
    <Route path="/fishidex" element={<Fishidex />} />
    <Route path="/leaderboard" element={<LeaderBoard />} />
    <Route path="/upgrades" element={<Upgrades />} />
   </Routes>
  </div>
 );
}

export default App;
