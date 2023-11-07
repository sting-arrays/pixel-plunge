
import Title from './Title';
import Instructions from './Instructions';
import StartGame from './StartGame';
import addMaxUser from '../firebase'
import UserDetailsTest from './UserDetailsTest';
import CopyrightGithub from './WelcomeComponents/CopyrightGithub';

export default function WelcomePage() {
    return (
        <div>
            <Title />
            <Instructions />
            <StartGame />
            <UserDetailsTest />
            <CopyrightGithub />
        </div>
    )
}