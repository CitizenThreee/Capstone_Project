import { createContext, useState, useContext } from "react";

const currentTabContext = createContext();

export function CurrentTabProvider(props) {
    const [currentTab, setCurrentTab] = useState({tab: {}, content: []})

    function handleSetCurrentTab(groups) {
        setCurrentTab(groups);
    }

    return (
        <currentTabContext.Provider value={{currentTab, handleSetCurrentTab: handleSetCurrentTab}}>
            {props.children}
        </currentTabContext.Provider>
    )
}

export function useCurrentTabContext() {
    return useContext(currentTabContext);
}