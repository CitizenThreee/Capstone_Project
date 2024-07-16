import NavBar from "../components/navigation/NavBar";
import TabBar from "../components/navigation/TabBar";
import { useEffect, useState } from "react";
import FeedTab from "../components/tabs/FeedTab";
import PageTab from "../components/tabs/PageTab";
import SingleChatTab from "../components/tabs/SingleChatTab";
import DefaultPageContainer from "../components/containers/DefaultPageContainer"
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";
import axios from 'axios';
import InnerPageContainer from "../components/containers/InnerPageContainer";
import { useUserContext } from "../context/UserProvider";
import { useCurrentTabContext } from "../context/CurrentTabProvider";
import { useNavigate } from "react-router-dom";

export default function Group() {
    const navigate = useNavigate();
    const { currentGroup } = useCurrentGroupContext();
    const { currentTab, handleSetCurrentTab } = useCurrentTabContext();

    const onChangeTab = (tab) => {
        axios.get(`http://localhost:8080/content/tab/${tab._id}`)
            .then(res => {
                handleSetCurrentTab({tab: tab, content: res.data.data});
                navigate(`/${currentGroup._id}`);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        !currentTab.name && onChangeTab(currentGroup.tabs.length ? currentGroup.tabs[0] : {})
    }, [])

    return(
        <>
            <NavBar title={currentGroup.name} create={false} group={true}></NavBar>
            <TabBar tabs={currentGroup.tabs} onChangeTab={onChangeTab} currentTab={currentTab} ></TabBar>
            <DefaultPageContainer offset="100">
                <InnerPageContainer>
                    {currentTab.tab.type == "page" && <PageTab level={0} />}
                    {currentTab.tab.type == "feed" && <FeedTab level={0} />}
                    {currentTab.tab.type == "chat" && <SingleChatTab level={0} />}
                </InnerPageContainer>
            </DefaultPageContainer>
        </>
    )
}