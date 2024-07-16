import { useEffect, useRef, useState } from "react";
import InputBarContainer from "../containers/InputBarContainer";
import AlertPost from "../content/AlertPost";
import Image from "../content/Image"
import Text from "../content/Text"
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import Content from "../content/Content";
import { Button } from "react-bootstrap";

export default function PageTab({ level }) {
    const { currentTab } = useCurrentTabContext();

    //useEffect(() => console.log(currentTab.content), [currentTab])

    return (
        <div className="d-flex flex-column justify-content-between h-100">
            <div className="overflow-auto mb-1">
                {currentTab.content.length > 0 && currentTab.content.map((item, index) =>
                    <Content key={index} data={item}></Content>)}
            </div>

            <InputBarContainer
                perms={level < 1 ? { fpost: currentTab.tab.fpost, rpost: currentTab.tab.rpost }
                    : { fpost: currentTab.tab.contentSchema[level - 1].fpost, rpost: currentTab.tab.contentSchema[level - 1].rpost }}
                schema={currentTab.tab.contentSchema[level]}>
            </InputBarContainer>
        </div>
    )
}