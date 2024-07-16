import { createContext, useState, useContext } from "react";

const groupsContext = createContext();

export function GroupsProvider(props) {
    const [groups, setGroups] = useState([])

    function handleSetGroups(groups) {
        setGroups(groups);
    }

    return (
        <groupsContext.Provider value={{groups, handleSetGroups: handleSetGroups}}>
            {props.children}
        </groupsContext.Provider>
    )
}

export function useGroupsContext() {
    return useContext(groupsContext);
}