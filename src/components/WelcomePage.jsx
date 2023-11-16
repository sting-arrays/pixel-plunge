import Title from "./WelcomeComponents/Title";
import Instructions from "./WelcomeComponents/Instructions";
import StartGame from "./WelcomeComponents/StartGame";
import UserDetailsTest from "./UserDetailsTest";
import CopyrightGithub from "./WelcomeComponents/CopyrightGithub";
import Login from "../components/FireBaseAuth/Login.jsx";
import Register from "../components/FireBaseAuth/Register.jsx";
import UserHandler from "./UserHandler.jsx";
import Credits from "./WelcomeComponents/Credits.jsx";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="tracking-[.2em] p-5 rounded-md">
      <Title />
      <Instructions />
      <StartGame />
      <UserHandler />
      <CopyrightGithub />
      <Link className='text-black mt-4 hover:text-white' to='/credits'>Credits</Link>
    </div>
  );
}
