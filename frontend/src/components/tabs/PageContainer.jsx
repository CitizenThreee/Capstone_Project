import { useRef, useState } from "react";
import InputBarContainer from "../containers/InputBarContainer";
import AlertPost from "../content/AlertPost";
import Image from "../content/Image"
import Text from "../content/Text"

const mockData = [
    {
        type: "text",
        size: "title",
        text: "This is a title"
    },
    {
        type: "image",
        url: "https://farm4.staticflickr.com/3394/3171232661_5dd251801e_b.jpg"
    },
    {
        type: "text",
        size: "paragraph",
        text: "This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph.This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph."
    },
    {
        type: "text",
        size: "paragraph",
        text: "This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph.This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph."
    },
    {
        type: "text",
        size: "paragraph",
        text: "This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph.This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph."
    },
]

export default function PageContainer() {
    const scrollRef = useRef(null);
    const [ elements, setElements ] = useState(mockData);

    const onPost = (element) => {
        
    }

    return(
        <>
            <div className="d-flex flex-column align-items-center justify-content-between py-3 px-1 rounded-3" style={{ width: "100%", maxWidth: "1000px", backgroundColor: "#f5f5f5", height: "calc(100% - 20px)", marginTop: "20px" }}>
                <div className="overflow-auto mb-1" ref={scrollRef}>
                    {elements.length && elements.map(item => {
                        if (item.type == "image") { return (<Image data={item}></Image>); }
                        if (item.type == "text") { return (<Text data={item}></Text>); }
                    })}
                </div>
                
                <InputBarContainer onPost={onPost} description={true}></InputBarContainer>
            </div>
        </>
    )
}