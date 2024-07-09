import NavBar from "../components/navigation/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useUserGroupsContext } from "../context/UserGroupsProvider";
import TabBar from "../components/navigation/TabBar";
import { useEffect, useState } from "react";
import FeedTab from "../components/tabs/FeedTab";
import GridTab from "../components/tabs/GridTab";
import PageTab from "../components/tabs/PageTab";
import SingleChatTab from "../components/tabs/SingleChatTab";
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
    const navigate = useNavigate();
    const { userGroups } = useUserGroupsContext();
    const [ currentTab, setCurrentTab ] = useState(tabs[0])
    const [ currentTabComponent, setCurrentTabComponent ] = useState()

    const changeTab = (id) => { setCurrentTab(tabs.find(tab => tab.id == id)) }

    const onCreate = () => {
        navigate("create");
    }

    useEffect(() => {
        let tab;

        switch(currentTab.type){
            case "page":
                tab = <PageTab tabId={currentTab.id}></PageTab>
                break;
            case "feed":
                tab = <FeedTab tabId={currentTab.id}></FeedTab>
                break;
            case "chat":
                tab = <SingleChatTab tabId={currentTab.id}></SingleChatTab>
                break;
            case "grid":
                tab = <GridTab tabId={currentTab.id}></GridTab>
                break;
        }

        setCurrentTabComponent(tab);
    }, [currentTab])

    return(
        <>
            <NavBar title={userGroups.length && userGroups.find(group => group.id == groupId).name} create={false} group={true}></NavBar>
            <TabBar tabs={tabs} setCurrentTab={changeTab} currentTab={currentTab} onCreate={onCreate}></TabBar>
            <DefaultPageContainer offset="100">
                {currentTabComponent}
            </DefaultPageContainer>
        </>
    )
}