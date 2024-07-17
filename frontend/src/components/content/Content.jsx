import { Button } from "react-bootstrap";
import AlertPost from "./AlertPost";
import Image from "./Image";
import Message from "./Message";
import Post from "./Post";
import Text from "./Text";
import { MdDelete } from "react-icons/md";
import axios from 'axios'
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import { useUserContext } from "../../context/UserProvider";

// A generic element that renders the required content element based on the data it is passed
export default function Content({data, binBtn=true}) {
    const { user } = useUserContext();
    const { currentTab, handleSetCurrentTab } = useCurrentTabContext();

    // When a user deletes a content element, remove the data from the database and the current tab data
    const onDelete = () => {
        axios.delete(`http://localhost:8080/content/${data._id}`)
            .then(res => {
                handleSetCurrentTab({...currentTab, content: currentTab.content.filter(item => item._id != data._id)})
            })
            .catch(err => console.log(err))
    }

    // Render the required content element and pass the data on to them
    return (
        <div className="d-flex align-items-center mb-2">
            {data.type == 'alert' && <AlertPost data={data}></AlertPost>}
            {data.type == 'post' && <Post data={data}></Post>}
            {data.type == 'message' && <Message data={data}></Message>}
            {data.type == 'image' && <Image data={data}></Image>}
            {data.type == 'text' && <Text data={data}></Text>}

            {/* If the user is the author of the content, allow them to delete it */}
            {(user.groupProfile && user.groupProfile.userId == data.authorId && binBtn) && 
            <Button className="border-0 ms-2" style={{color: '#bbb', backgroundColor: '#fff0'}} onClick={onDelete}>
                <MdDelete size={25}/>
            </Button>}
        </div>
    )
}