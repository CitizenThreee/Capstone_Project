import { createContext, useState, useContext } from "react";

const currentGroupContext = createContext();

// Context for the group's data. Holds the data for the current group, all the group's tabs, and all the group user's data.
// Data Structure: { ...group, tabs: {...tabs}, users: {...userGroups} }
export function CurrentGroupProvider(props) {
    const [currentGroup, setCurrentGroup] = useState({})

    function handleSetCurrentGroup(currentGroup) {
        setCurrentGroup(currentGroup);
    }

    return (
        <currentGroupContext.Provider value={{currentGroup, handleSetCurrentGroup: handleSetCurrentGroup}}>
            {props.children}
        </currentGroupContext.Provider>
    )
}

export function useCurrentGroupContext() {
    return useContext(currentGroupContext);
}