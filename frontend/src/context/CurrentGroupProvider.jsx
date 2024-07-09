import { createContext, useState, useContext } from "react";

const currentGroupContext = createContext();

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