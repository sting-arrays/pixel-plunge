import "./App.css";
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from "react-router-dom";
import GamePage from "./components/GamePage";
import Fishidex from "./components/StartGameComponents/Fishidex";
import LeaderBoard from "./components/StartGameComponents/LeaderBoard";
import Upgrades from "./components/StartGameComponents/Upgrades";
import Login from "./components/FireBaseAuth/Login";
import Register from "./components/FireBaseAuth/Register";


function App() {
 return (
  <div>
   <Routes>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/game" element={<GamePage />} />
    <Route path="/fishidex" element={<Fishidex />} />
    <Route path="/leaderboard" element={<LeaderBoard />} />
    <Route path="/upgrades" element={<Upgrades />} />
   </Routes>
  </div>
 );
}

export default App;
