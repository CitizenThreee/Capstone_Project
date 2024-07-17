import { useEffect, useRef, useState } from "react";
import InputBarContainer from "../containers/InputBarContainer";
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import Content from "../content/Content";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import { useUserContext } from "../../context/UserProvider";
import axios from 'axios';

// The feed tab provides a feed of content to the user
export default function FeedTab({ level }) {
  const { currentTab, handleSetCurrentTab } = useCurrentTabContext();
  const { currentGroup } = useCurrentGroupContext();
  const { user } = useUserContext();
  const scrollRef = useRef(null);

  // Scroll to the bottom of the page when the page loads or the currentTab is changed
  // This means it will also scroll to the bottom when new data is posted
  const scrollToBotton = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }
  useEffect(() => {scrollToBotton()}, [currentTab])
  
  // When a user posts content in the feed, update the database with the new content, and update
  // the current tab to reflect the change. The status is also checked to see whether to post it directly
  // or set the status to 'pending', meaning it will be sent to the request page for admins to approve or reject
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

  // Checks if the user has the correct roles needed to post, or if they will need to send a request to post
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

        {/* A map of all the content in the tab */}
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