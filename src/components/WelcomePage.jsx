import Title from './WelcomeComponents/Title';
import Instructions from './WelcomeComponents/Instructions';
import StartGame from './WelcomeComponents/StartGame';
import CopyrightGithub from './WelcomeComponents/CopyrightGithub';

export default function WelcomePage() {
    return (
        <div>
            <Title />
            <Instructions />
            <StartGame />
            <CopyrightGithub />
        </div>
    )
}