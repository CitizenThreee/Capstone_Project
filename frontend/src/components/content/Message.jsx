import { useEffect, useState } from "react";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider"
import { useUserContext } from "../../context/UserProvider";

export default function Message({data, w="40px", h="40px"}) {
    const { currentGroup } = useCurrentGroupContext();
    const [ author, setAuthor ] = useState({});
    const { user } = useUserContext();

    useEffect(() => {
        const authorList = currentGroup.users.filter(u => u.userId._id == data.authorId);
        setAuthor(authorList.length > 0 && {...authorList[0].userId});
    }, [])

    return(
        <>
            <div className={`p-1 px-2 border rounded-2 d-flex gap-4 align-items-center ${author._id == user._id && 'flex-row-reverse'}`} 
            style={{ width: "45rem", maxWidth: "95vw", backgroundColor: (author._id == user._id ? '#dde' : '#eee') }}>
                <img src={author.pfp ? author.pfp : "/avatar_placeholder.jpg"} width={w} height={h} className="rounded-circle"/>
                <p className="m-0" style={{textAlign: 'justify'}}>{data.title}</p>
            </div>
        </>
    )
}