import Login from "./FireBaseAuth/Login";
import Register from "./FireBaseAuth/Register";
import { AuthDetails } from "./FireBaseAuth/AuthDetails";
import { useContext } from 'react';
import { UserNameContext } from "../contexts/UsernameContext";


export default function UserHandler() {

    const { currentUser } = useContext(UserNameContext);
    console.log('hello')

    return (
        <>
        {currentUser === 'Guest' ? <Login />  : null }
        {currentUser === 'Guest' ? <Register /> :  null}
        {currentUser !== 'Guest' ? <AuthDetails /> : null}
        </>
    )
}