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
import { Button, ButtonGroup, CloseButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Content from "../components/content/Content";

export default function GroupRequests() {
    const navigate = useNavigate();
    const { currentGroup, handleSetCurrentGroup } = useCurrentGroupContext();
    const [ requests, setRequests ] = useState([])

    const onAccept = (req) => {
        if(req.userId){
            axios.put(`http://localhost:8080/userGroups/${req._id}`, {
                status: 'approved',
                roles: ['member']
            })
            .then(res => {
                setRequests(requests.filter(item => req._id != item._id));
                handleSetCurrentGroup({...currentGroup, users: [...currentGroup.users, res.data.data]});
            })
            .catch(err => console.log(err))
        }
        else{
            axios.put(`http://localhost:8080/content/${req._id}`, {
                status: 'approved'
            })
            .then(res => {
                setRequests(requests.filter(item => req._id != item._id));
            })
            .catch(err => console.log(err))
        }
    }

    const onReject = (req) => {
        if(req.userId){
            axios.delete(`http://localhost:8080/userGroups/${req._id}`)
                .then(res => {
                    setRequests(requests.filter(item => req._id != item._id))
                })
                .catch(err => console.log(err))
        }
        else{
            axios.delete(`http://localhost:8080/content/${req._id}`)
                .then(res => {
                    setRequests(requests.filter(item => req._id != item._id))
                })
                .catch(err => console.log(err))
        }
    }

    const onUserData = (data) => {
        axios.get(`http://localhost:8080/content/pending/${currentGroup._id}`)
            .then(res => {
                setRequests([...data, ...res.data.data]);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/userGroups/users/pending/${currentGroup._id}`)
            .then(res => {
                onUserData(res.data.data);
            })
            .catch(err => console.log(err))
    }, [])

    const onClose = () => {
        navigate(`/${currentGroup._id}`);
    }

    return(
        <>
            <NavBar create={false} title={currentGroup.name} group={true}></NavBar>
            <DefaultPageContainer offset="60">
                <InnerPageContainer>
                    <CloseButton className="ms-auto me-3 mb-3" onClick={onClose}></CloseButton>
                    {requests.map((req, item) => (
                        <div key={item} className="mb-3">
                            {req.title && <Content data={req} binBtn={false}></Content>}
                            {req.userId  && <UserCard user={req}></UserCard>}
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