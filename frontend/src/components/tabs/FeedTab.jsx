import { useEffect, useRef, useState } from "react";
import InputBarContainer from "../containers/InputBarContainer";
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import Content from "../content/Content";
import { Button } from "react-bootstrap";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import { useUserContext } from "../../context/UserProvider";

export default function FeedTab({ level }) {
  const { currentTab, handleSetCurrentTab } = useCurrentTabContext();
  const { currentGroup } = useCurrentGroupContext();
  const { user } = useUserContext();
  const scrollRef = useRef(null);

  const scrollToBotton = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  useEffect(() => {scrollToBotton()}, [currentTab])

  const onPost = ({input, type, perms}) => {
    const newContent = {
      ...input,
      type: type,
      status: onCheckStatus(perms),
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

  const onCheckStatus = (perms) => {
    if (perms.fpost.length < 1 && perms.rpost.length < 1) return 'approved'
    for (let i = 0; i < perms.fpost.length; i++) {
      if (user.groupProfile.roles.includes(perms.fpost[i])) {
        return 'approved'
      }
    }

    return 'pending'
  }

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <div className="overflow-auto mb-1" ref={scrollRef}>
        {currentTab.content.length > 0 && currentTab.content.map((item, index) => 
        <Content key={index} data={item}></Content>)}
      </div>

      <InputBarContainer onPost={onPost}
        perms={level < 1 ? {fpost: currentTab.tab.fpost, rpost: currentTab.tab.rpost} 
        : {fpost: currentTab.tab.contentSchema[level-1].fpost, rpost: currentTab.tab.contentSchema[level-1].rpost}} 
        schema={currentTab.tab.contentSchema[level]}>
      </InputBarContainer>
    </div>
  )
}