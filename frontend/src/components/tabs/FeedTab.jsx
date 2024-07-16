import { useEffect, useRef, useState } from "react";
import InputBarContainer from "../containers/InputBarContainer";
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import Content from "../content/Content";
import { Button } from "react-bootstrap";

export default function FeedTab({ level }) {
  const { currentTab } = useCurrentTabContext();
  const scrollRef = useRef(null);

  const scrollToBotton = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  useEffect(() => {scrollToBotton()}, [currentTab])

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <div className="overflow-auto mb-1" ref={scrollRef}>
        {currentTab.content.length > 0 && currentTab.content.map((item, index) => 
        <Content key={index} data={item}></Content>)}
      </div>

      <InputBarContainer 
        perms={level < 1 ? {fpost: currentTab.tab.fpost, rpost: currentTab.tab.rpost} 
        : {fpost: currentTab.tab.contentSchema[level-1].fpost, rpost: currentTab.tab.contentSchema[level-1].rpost}} 
        schema={currentTab.tab.contentSchema[level]}>
      </InputBarContainer>
    </div>
  )
}