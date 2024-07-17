import { createContext, useState, useContext } from "react";

const groupsContext = createContext();

// Context for all the group data. Holds the data for all groups fetched from the database.
// Data Structure: { ...groups }
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