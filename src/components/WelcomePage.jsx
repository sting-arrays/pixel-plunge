import Title from "./WelcomeComponents/Title";
import Instructions from "./WelcomeComponents/Instructions";
import StartGame from "./WelcomeComponents/StartGame";
import UserDetailsTest from "./UserDetailsTest";
import CopyrightGithub from "./WelcomeComponents/CopyrightGithub";
import Login from "../components/FireBaseAuth/Login.jsx"
import Register from "../components/FireBaseAuth/Register.jsx"
import UserHandler from "./UserHandler.jsx";

export default function WelcomePage() {

 return (
    <div className='bg-blue-400 text-[20px] tracking-[.2em] p-5 rounded-md'>
    <Title />
    <Instructions />
    <StartGame />
    <UserHandler />
    <CopyrightGithub />
    </div>
 );

}
