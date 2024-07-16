import { Button } from "react-bootstrap";
import AlertPost from "./AlertPost";
import Comment from "./Comment";
import Image from "./Image";
import Message from "./Message";
import Post from "./Post";
import Text from "./Text";
import { MdDelete } from "react-icons/md";
import axios from 'axios'
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import { useUserContext } from "../../context/UserProvider";

export default function Content({data, binBtn=true}) {
    const { user } = useUserContext();
    const { currentTab, handleSetCurrentTab } = useCurrentTabContext();

    const onDelete = () => {
        axios.delete(`http://localhost:8080/content/${data._id}`)
            .then(res => {
                handleSetCurrentTab({...currentTab, content: currentTab.content.filter(item => item._id != data._id)})
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex align-items-center">
            {data.type == 'alert' && <AlertPost data={data}></AlertPost>}
            {data.type == 'post' && <Post data={data}></Post>}
            {data.type == 'message' && <Message data={data}></Message>}
            {data.type == 'comment' && <Comment data={data}></Comment>}
            {data.type == 'image' && <Image data={data}></Image>}
            {data.type == 'text' && <Text data={data}></Text>}
            {(user.groupProfile && user.groupProfile.userId == data.authorId && binBtn) && 
            <Button className="border-0 ms-2" style={{color: '#bbb', backgroundColor: '#fff0'}} onClick={onDelete}>
                <MdDelete size={25}/>
            </Button>}
        </div>
    )
}