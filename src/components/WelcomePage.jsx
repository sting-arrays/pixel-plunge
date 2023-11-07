import Title from "./WelcomeComponents/Title";
import Instructions from "./WelcomeComponents/Instructions";
import StartGame from "./WelcomeComponents/StartGame";
import addMaxUser from "../firebase";
import UserDetailsTest from "./UserDetailsTest";
import CopyrightGithub from "./WelcomeComponents/CopyrightGithub";

export default function WelcomePage() {
 return (
  <div>
   <Title />
   <Instructions />
   <StartGame />
   <UserDetailsTest />
   <CopyrightGithub />
  </div>
 );
}
