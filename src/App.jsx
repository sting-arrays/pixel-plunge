import "./App.css";
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from "react-router-dom";
import GamePage from "./components/GamePage";
import Fishidex from "./components/StartGameComponents/Fishidex";
import LeaderBoard from "./components/StartGameComponents/LeaderBoard";
import Upgrades from "./components/StartGameComponents/Upgrades";
import Login from "./components/FireBaseAuth/Login";
import Register from "./components/FireBaseAuth/Register";
import { useEffect, useContext } from "react";
import { UserNameContext } from "./contexts/UsernameContext";
import Credits from "./components/WelcomeComponents/Credits";

function App() {
  const { currentUser, setCurrentUser } = useContext(UserNameContext);

  useEffect(() => {
    const loggedIn = localStorage.getItem("email");
    if (loggedIn) {
      setCurrentUser(loggedIn);
    }
  }, []);

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
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </div>
  );
}

export default App;
