import Message from "../content/Message";
import InputBarContainer from "../containers/InputBarContainer";
import { useEffect, useRef, useState } from "react";
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import io from 'socket.io-client';
import axios from 'axios';
import { useUserContext } from "../../context/UserProvider";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import Content from "../content/Content";

const socket = io('http://localhost:8080');

export default function SingleChatTab() {
    const scrollRef = useRef(null);
    const { currentTab, handleSetCurrentTab } = useCurrentTabContext();
    const { user } = useUserContext();
    const { currentGroup } = useCurrentGroupContext();

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message)
            handleSetCurrentTab(prev => ({...prev, content: [...prev.content, {...message}]}));
        });

        socket.emit('joinRoom', currentTab.tab._id);

        return () => {
            socket.emit('leaveRoom', currentTab.tab._id)
            socket.off('message');
        };
    }, [currentTab.tab._id]);

    const scrollToBotton = () => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    useEffect(scrollToBotton, [currentTab.content])

    const onPost = ({input}) => {
        const newContent = {
            ...input,
            type: 'message',
            status: 'approved',
            authorId: user._id,
            parentId: currentTab.tab._id,
            groupId: currentGroup._id
        }

        axios.post('http://localhost:8080/content', { ...newContent })
            .then(res => {
                if (res.data.data.status == 'approved') {
                    socket.emit('message', { room: currentTab.tab._id, message: newContent });
                    handleSetCurrentTab({ ...currentTab, content: [...currentTab.content, res.data.data] })
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <>
            <div className="d-flex flex-column align-items-center justify-content-between py-3 px-1 rounded-3 w-100" style={{ maxWidth: "1000px", backgroundColor: "#f5f5f5", height: "calc(100% - 20px)", marginTop: "20px" }}>
                <div className="overflow-auto mb-1" ref={scrollRef}>
                    {currentTab.content.length > 0 && currentTab.content.map((item, index) => <Content key={index} data={item} binBtn={false}></Content> )}
                </div>

                <InputBarContainer onPost={onPost}></InputBarContainer>
            </div>
        </>
    )
}