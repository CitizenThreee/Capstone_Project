import Message from "../content/Message";
import InputBarContainer from "../containers/InputBarContainer";
import { useEffect, useRef, useState } from "react";

const mockChatContent = [
    {
        message: "this is a chat message"
    },
    {
        message: "Hello"
    },
    {
        message: "hi!!"
    },
    {
        message: "hello everyone"
    },
    {
        message: "sup"
    },
]

export default function SingleChatContainer() {
    const scrollRef = useRef(null);
    const [ messages, setMessages ] = useState(mockChatContent);

    const scrollToBotton = () => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    useEffect(scrollToBotton, [messages])

    const onPost = (post) => {
        if(post.title) {
            setMessages([...messages, {message: post.title}])
        }
    }

    return(
        <>
            <div className="d-flex flex-column align-items-center justify-content-between py-3 px-1 rounded-3" style={{ width: "100%", maxWidth: "1000px", backgroundColor: "#f5f5f5", height: "calc(100% - 20px)", marginTop: "20px" }}>
                <div className="overflow-auto mb-1" ref={scrollRef}>
                    {messages.length && messages.map((item, index) => <Message key={index} data={item}></Message> )}
                </div>

                <InputBarContainer onPost={onPost}></InputBarContainer>
            </div>
        </>
    )
}