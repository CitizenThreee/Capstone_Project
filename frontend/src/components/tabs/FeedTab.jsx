import { useEffect, useRef, useState } from "react";
import InputBarContainer from "../containers/InputBarContainer";
import AlertPost from "../content/AlertPost";

const mockFeedContent = [
    {
        "type": "alert",
        "level": "emergency",
        "title": "Tornado Warning",
        "description": "Tornado sighted, seek shelter immediately."
    },
    {
      "type": "alert",
      "level": "warning",
      "title": "High Wind Warning",
      "description": "Strong winds expected in the area, secure loose items."
    },
    {
      "type": "alert",
      "level": "warning",
      "title": "Heat Advisory",
      "description": "High temperatures expected, stay hydrated and avoid outdoor activities."
    },
    {
        "type": "alert",
        "level": "warning",
        "title": "Severe Thunderstorm Watch",
        "description": "Conditions are favorable for severe thunderstorms."
    },
    {
      "type": "alert",
      "level": "emergency",
      "title": "Flash Flood Warning",
      "description": "Flash flooding imminent, move to higher ground immediately."
    },
    
    {
      "type": "alert",
      "level": "emergency",
      "title": "Amber Alert",
      "description": "Child abduction reported, check local media for details."
    },
    {
        "type": "alert",
        "level": "warning",
        "title": "Air Quality Alert",
        "description": "Poor air quality due to pollution, limit outdoor activities."
    },
    {
      "type": "alert",
      "level": "warning",
      "title": "Winter Weather Advisory",
      "description": "Snow and ice expected, drive with caution."
    },
    {
      "type": "alert",
      "level": "emergency",
      "title": "Earthquake Alert",
      "description": "Significant earthquake detected, expect aftershocks."
    },
    {
      "type": "alert",
      "level": "emergency",
      "title": "Hurricane Warning",
      "description": "Hurricane approaching, follow evacuation orders."
    }
  ]

export default function FeedTab() {
    const scrollRef = useRef(null);
    const [ feed, setFeed ] = useState(mockFeedContent);

    const scrollToBotton = () => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    useEffect(scrollToBotton, [feed])

    const onPost = (post) => {
        if(post.title) {
            setFeed([ ...feed, {
                type: "alert", 
                level: "warning",
                title: post.title,
                description: post.description
            }])
        }
    }

    return(
        <>
            <div className="d-flex flex-column align-items-center justify-content-between py-3 px-1 rounded-3" style={{ width: "100%", maxWidth: "1000px", backgroundColor: "#f5f5f5", height: "calc(100% - 20px)", marginTop: "20px" }}>
                <div className="overflow-auto mb-1" ref={scrollRef}>
                    {feed.length && feed.map((item, index) => {
                        if (item.type == "alert") { return (<AlertPost data={item} key={index}></AlertPost>); }
                    })}
                </div>
                
                <InputBarContainer onPost={onPost} description={true}></InputBarContainer>
            </div>
        </>
    )
}