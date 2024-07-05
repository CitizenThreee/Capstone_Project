import { createContext, useState, useContext } from "react";

const userGroupsContext = createContext();

export function UserGroupsProvider(props) {
    const [userGroups, setUserGroups] = useState({})

    function handleSetUserGroups(userGroups) {
        setUserGroups(userGroups);
    }

    return (
        <userGroupsContext.Provider value={{userGroups, handleSetUserGroups: handleSetUserGroups}}>
            {props.children}
        </userGroupsContext.Provider>
    )
}

export function useUserGroupsContext() {
    return useContext(userGroupsContext);
}