import { createContext, useState, useContext } from "react";

const currentTabContext = createContext();

// Context for the tab's data. Holds the data for the current tab as well as all that tab's content.
// Data Structure: { tab: {...tab}, content: {...content} }
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