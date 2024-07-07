import NavBar from "../components/navigation/NavBar";
import { useParams } from "react-router-dom";
import { useUserGroupsContext } from "../context/UserGroupsProvider";
import TabBar from "../components/navigation/TabBar";
import { useEffect, useState } from "react";
import FeedContainer from "../components/tabs/FeedContainer";
import GridContainer from "../components/tabs/GridContainer";
import PageContainer from "../components/tabs/PageContainer";
import SingleChatContainer from "../components/tabs/SingleChatContainer";
import DefaultPageContainer from "../components/containers/DefaultPageContainer"

const tabs = [
    {
        id: 1,
        name: "home",
        type: "page"
    },
    {
        id: 2,
        name: "alerts",
        type: "feed"
    },
    {
        id: 3,
        name: "chat",
        type: "chat"
    },
    {
        id: 4,
        name: "activities",
        type: "grid"
    }
]

export default function Group() {
    const { groupId } = useParams();
    const { userGroups } = useUserGroupsContext();
    const [ currentTab, setCurrentTab ] = useState(tabs[0])
    const [ currentTabComponent, setCurrentTabComponent ] = useState()

    const changeTab = (id) => { setCurrentTab(tabs.find(tab => tab.id == id)) }

    useEffect(() => {
        let tab;

        switch(currentTab.type){
            case "page":
                tab = <PageContainer tabId={currentTab.id}></PageContainer>
                break;
            case "feed":
                tab = <FeedContainer tabId={currentTab.id}></FeedContainer>
                break;
            case "chat":
                tab = <SingleChatContainer tabId={currentTab.id}></SingleChatContainer>
                break;
            case "grid":
                tab = <GridContainer tabId={currentTab.id}></GridContainer>
                break;
        }

        setCurrentTabComponent(tab);
    }, [currentTab])

    return(
        <>
            <NavBar title={userGroups.length && userGroups.find(group => group.id == groupId).name} create={false}></NavBar>
            <TabBar tabs={tabs} setCurrentTab={changeTab}></TabBar>
            <DefaultPageContainer offset="100">
                {currentTabComponent}
            </DefaultPageContainer>
        </>
    )
}