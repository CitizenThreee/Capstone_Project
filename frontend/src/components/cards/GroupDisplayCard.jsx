import { useEffect, useState } from "react"
import { Button, Card } from "react-bootstrap"
import { FaLocationDot } from "react-icons/fa6"
import axios from 'axios'
import { useUserContext } from "../../context/UserProvider"

// Expandable card for group 
export default function GroupDisplayCard({ data }) {
    const { user } = useUserContext();
    const [ expanded, setExpanded ] = useState(false);
    const [ userGroup, setUserGroup ] = useState({});

    // Gets the user's data for that group when rendered, and sets a state variable with the data
    useEffect(() => {
        axios.get('http://localhost:8080/userGroups/user', {
            params: { userId: user._id, groupId: data._id }
        })
        .then(res => {
            setUserGroup(res.data.data)
        })
        .catch(err => { if(err.response.status == 500) console.log(err) })
    }, [])

    // When a user requests to join a group the function creates a new userGroup in the database
    // and updates the userGroup to reflect the pending status of the request
    const onJoin = (e) => {
        e.stopPropagation();
        axios.post('http://localhost:8080/userGroups', {
            userId: user._id,
            groupId: data._id
        })
        .then(res => {
            setUserGroup(res.data.data)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <Card bg="light" border="primary" text="dark" className="mb-2 text-start fw-semibold" onClick={() => setExpanded(!expanded)} style={{ width: "45rem", maxWidth: "95vw" }}>
                <Card.Header className="fs-5 w-100" >{data && data.name}</Card.Header>
                <Card.Img className="rounded-0" src={data && data.banner} style={{height: "130px", objectFit: "cover"}}/>
                <div className="position-absolute hoverview h-100 w-100"></div>
                
                {/* When the card is expanded, renders extra details about the group */}
                {expanded && <Card.Body className="py-1 px-2 d-flex flex-column w-100" style={{ maxHeight: "100%", overflow: "hidden"}}>
                    <div> <FaLocationDot/> <span>{data && data.location}</span> </div>
                    <Card.Body className="p-0 py-2 lh-sm">{data && data.description}</Card.Body>
                    
                    {/* Renders either a join button, or pending/joined disabled button based on the user's status with the group */}
                    {(userGroup && userGroup.status)
                    ? <Button disabled variant="outline-primary">{userGroup.status == 'pending' ? '...Pending' : 'Joined'}</Button>
                    : <Button variant="outline-primary" onClick={onJoin} className="pt-1 mt-1" style={{zIndex: 1}}>+Join</Button>}

                </Card.Body>}
            </Card>
        </>
    )
}