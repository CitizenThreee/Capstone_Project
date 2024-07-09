import { useState } from "react";
import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import GroupUsersContainer from "../components/containers/GropuUsersContainer";
import InnerPageContainer from "../components/containers/InnerPageContainer";
import NavBar from "../components/navigation/NavBar";
import TabBar from "../components/navigation/TabBar";
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";

const users = [
    {
        fname: "John",
        lname: "Baker",
        email: "johnbaker@gmail.com",
        phone: "0210228437",
        pfp: "",
        occupation: "Builder",
        website: "www.johnbuilds.com",
        about: "I am a builder, this is my about section"
    }
]

export default function GroupUsers() {
    const { currentGroup } = useCurrentGroupContext();
    return(
        <>
            <NavBar create={false} title={currentGroup.name} group={true}></NavBar>
            <TabBar></TabBar>
            <DefaultPageContainer offset="100">
                <InnerPageContainer>
                    <GroupUsersContainer users={users}> 
                    </GroupUsersContainer>
                </InnerPageContainer>
            </DefaultPageContainer>
        </>
    )
}