import Title from "./WelcomeComponents/Title";
import Instructions from "./WelcomeComponents/Instructions";
import StartGame from "./WelcomeComponents/StartGame";
import UserDetailsTest from "./UserDetailsTest";
import CopyrightGithub from "./WelcomeComponents/CopyrightGithub";
import Login from "../components/FireBaseAuth/Login.jsx"
import Register from "../components/FireBaseAuth/Register.jsx"

export default function WelcomePage() {
 return (
  <div>
   <Title />
   <Instructions />
   <StartGame />
   <Login />
   <Register />
   <CopyrightGithub />
  </div>
 );
}
