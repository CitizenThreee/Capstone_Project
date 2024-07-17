import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import InnerPageContainer from "../components/containers/InnerPageContainer";
import NavBar from "../components/navigation/NavBar";
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";
import UserCard from "../components/cards/UserCard";
import { Button, ButtonGroup, CloseButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Content from "../components/content/Content";

// Page that holds the user and content requests the group receives to be accepted or rejected
// by either an admin or the owner of the group
export default function GroupRequests() {
    const navigate = useNavigate();
    const { currentGroup, handleSetCurrentGroup } = useCurrentGroupContext();
    const [ requests, setRequests ] = useState([])

    // When the request is accepted, update the status of the relevant data to 'approved'
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

    // When the request is rejected, delete the relevant data from the database
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

    // Called once the userGroup data has been collected. Sets the requests state variable with the userGroup
    // data and the content data with 'pending' status
    const onUserData = (data) => {
        axios.get(`http://localhost:8080/content/pending/${currentGroup._id}`)
            .then(res => {
                setRequests([...data, ...res.data.data]);
            })
            .catch(err => console.log(err))
    }

    // Gets the pending userGroup data and passes it to the onUserData function
    useEffect(() => {
        axios.get(`http://localhost:8080/userGroups/users/pending/${currentGroup._id}`)
            .then(res => {
                onUserData(res.data.data);
            })
            .catch(err => console.log(err))
    }, [])

    // When the group requests page is closed, navigate back to the main group page
    const onClose = () => {
        navigate(`/${currentGroup._id}`);
    }

    return(
        <>
            <NavBar create={false} title={currentGroup.name} group={true}></NavBar>
            <DefaultPageContainer offset="60">
                <InnerPageContainer>
                    <CloseButton className="ms-auto me-3 mb-3" onClick={onClose}></CloseButton>

                    {/* Map of the requests. Renders a UserCard if the data is from a user, and a Content element if
                    the data is from a content element, then renders reject and accept buttons bellow the elements */}
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