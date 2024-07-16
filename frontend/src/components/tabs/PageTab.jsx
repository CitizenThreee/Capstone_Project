import { useEffect, useRef, useState } from "react";
import InputBarContainer from "../containers/InputBarContainer";
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import Content from "../content/Content";
import { useUserContext } from "../../context/UserProvider";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";

export default function PageTab({ level }) {
    const { currentTab, handleSetCurrentTab } = useCurrentTabContext();
    const { user } = useUserContext();
    const { currentGroup } = useCurrentGroupContext();

    //useEffect(() => console.log(currentTab.content), [currentTab])

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
                {currentTab.content.length > 0 && currentTab.content.map((item, index) =>
                    <Content key={index} data={item}></Content>)}
            </div>

            <InputBarContainer onPost={onPost}
                perms={level < 1 ? { fpost: currentTab.tab.fpost, rpost: currentTab.tab.rpost }
                    : { fpost: currentTab.tab.contentSchema[level - 1].fpost, rpost: currentTab.tab.contentSchema[level - 1].rpost }}
                schema={currentTab.tab.contentSchema[level]}>
            </InputBarContainer>
        </div>
    )
}