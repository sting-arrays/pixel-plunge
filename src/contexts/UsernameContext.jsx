import { createContext, useState } from "react";

export const UserNameContext = createContext();

export const UserNameProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState("Guest")

    return (
        < UserNameContext.Provider value={{currentUser, setCurrentUser}}> {children} </UserNameContext.Provider>
    )
}