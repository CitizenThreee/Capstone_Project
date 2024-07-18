import { useEffect, useRef, useState } from "react";
import InputBarContainer from "../containers/InputBarContainer";
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import Content from "../content/Content";
import { useUserContext } from "../../context/UserProvider";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import axios from 'axios';

// The page tab renders page content pulled from the database
export default function PageTab({ level }) {
    const { currentTab, handleSetCurrentTab } = useCurrentTabContext();
    const { user } = useUserContext();
    const { currentGroup } = useCurrentGroupContext();

    // When the user posts content, update the database with the content and update the currentTab data to reflect the post
    const onPost = ({input, type}) => {
        const newContent = {
            ...input,
            type: type,
            status: 'approved',
            authorId: user._id,
            parentId: currentTab.tab._id,
            groupId: currentGroup._id
        }

        axios.post('http://localhost:8080/content', { ...newContent })
            .then(res => {
                if (res.data.data.status == 'approved') {
                    handleSetCurrentTab({ ...currentTab, content: [...currentTab.content, res.data.data] })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex flex-column justify-content-between h-100">
            <div className="overflow-auto mb-1">

                {/* A map of all the page content, the type is passed in 'item' to the content element, which renders
                the correct element (image or text) */}
                {currentTab.content.length > 0 && currentTab.content.map((item, index) =>
                <Content key={index} data={item}></Content>)}

            </div>

            {/* The permissions and content schema are passed to the input bar to be used when deciding if the user can
            post content, or even see the input bar */}
            <InputBarContainer onPost={onPost}
                perms={level < 1 ? { fpost: currentTab.tab.fpost, rpost: currentTab.tab.rpost }
                    : { fpost: currentTab.tab.contentSchema[level - 1].fpost, rpost: currentTab.tab.contentSchema[level - 1].rpost }}
                schema={currentTab.tab.contentSchema[level]}>
            </InputBarContainer>
        </div>
    )
}