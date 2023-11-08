import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const UserNameContext = createContext();

export const UserNameProvider = ({children}) => {
    const [userName, setUserName] = useState("Jordan_Ekford")

    return (
        <>
        < UserNameContext.Provider value={{userName,setUserName}}> {children} </UserNameContext.Provider>
        </>
    )
}