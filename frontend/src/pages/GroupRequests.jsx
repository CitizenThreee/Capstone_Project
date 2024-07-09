import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import InnerPageContainer from "../components/containers/InnerPageContainer";
import AlertPost from "../components/content/AlertPost";
import Message from "../components/content/Message";
import Comment from "../components/content/Comment";
import Post from "../components/content/Post";
import NavBar from "../components/navigation/NavBar";
import TabBar from "../components/navigation/TabBar";
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";
import UserCard from "../components/cards/UserCard";
import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";

const mockRequests = [
    {
        id: "0",
        reqType: "content",
        type: "Post",
        tTitle: "This is a post",
        description: "this is the post's description"
    },
    {
        id: "1",
        reqType: "join",
        fname: "Eliot",
        lname: "Jobs",
        pfp: "",
        occupation: "Architect",
        email: "ejobs@hotmail.co.nz",
        phone: "0238573832",
        about: "This is me, Eliot Jobs."
    }
]

export default function GroupRequests() {
    const { currentGroup } = useCurrentGroupContext();
    const [ requests, setRequests ] = useState(mockRequests)

    const onAccept = (req) => {
        setRequests(requests.filter(item => req.id != item.id))
        //Update content status with "approved"
    }

    const onReject = (req) => {
        setRequests(requests.filter(item => req.id != item.id))
        //Remove content from database
    }

    return(
        <>
            <NavBar create={false} title={currentGroup.name} group={true}></NavBar>
            <TabBar></TabBar>
            <DefaultPageContainer offset="100">
                <InnerPageContainer>
                    {requests.map((req, item) => (
                        <div key={item} className="mb-3">
                            {(req.reqType == "content" && req.type == "Post") && <Post data={req}></Post>}
                            {(req.reqType == "content" && req.type == "Message") && <Message data={req}></Message>}
                            {(req.reqType == "content" && req.type == "Alert") && <AlertPost data={req}></AlertPost>}
                            {(req.reqType == "content" && req.type == "Comment") && <Comment data={req}></Comment>}
                            {req.reqType == "join" && <UserCard user={req}></UserCard>}
                            <ButtonGroup>
                                <Button variant="outline-danger" onClick={() => onReject(req)}>reject</Button>
                                <Button variant="outline-success" onClick={() => onAccept(req)}>accept</Button>
                            </ButtonGroup>
                        </div>
                    ))}
                </InnerPageContainer>
            </DefaultPageContainer>
        </>
    )
}