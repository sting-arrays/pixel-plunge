import Title from './Title';
import Instructions from './Instructions';
import StartGame from './StartGame';
import addMaxUser from '../firebase'
import UserDetailsTest from './UserDetailsTest';

export default function WelcomePage() {
    return (
        <div>
            <Title />
            <Instructions />
            <StartGame />
            <UserDetailsTest />
        </div>
    )
}