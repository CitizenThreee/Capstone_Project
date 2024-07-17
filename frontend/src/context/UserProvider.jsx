import { createContext, useState, useContext } from "react";

const userContext = createContext();

// Context for the user's data. Holds the user profile data, the user's groupIds, and the user's group profile data.
// Data Structure: { ...user, groupIds: {...groupIds}, groupProfile: {...userGroup} }
export function UserProvider(props) {
    const [user, setUser] = useState({})

    function handleSetUser(user) {
        setUser(user);
    }

    return (
        <userContext.Provider value={{user, handleSetUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export function useUserContext() {
    return useContext(userContext);
}