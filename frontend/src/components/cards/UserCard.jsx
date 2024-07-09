import { useState } from "react"
import { Button, Card } from "react-bootstrap"


export default function UserCard({user}) {
    const [ expanded, setExpanded ] = useState();

    return (
        <>
            <Card as="button" bg="light" text="dark" className="text-start fw-semibold" onClick={() => setExpanded(!expanded)} style={{ width: "45rem", maxWidth: "95vw" }}>
                <Card.Header className="fs-5 p-2" style={{width: "100%"}}>
                    <div>
                        <img className="float-start rounded-circle me-2" src={user.pfp ? user.pfp : "/avatar_placeholder.jpg"} height={"30px"}></img>
                        <p className="float-start m-0">{user.fname && user.fname + " " + user.lname}</p>
                        <p className="float-end m-0">{user.occupation && user.occupation}</p>
                    </div>
                </Card.Header>
                <div className="position-absolute hoverview" style={{height: "100%", width: "100%" }}></div>
                {expanded && <Card.Body className="py-1 px-2 d-flex flex-column" style={{ maxHeight: "100%", overflow: "hidden", width: "100%"}}>
                    <Card.Text className="p-0 pt-2 lh-sm">{user && `Phone: ${user.phone}`}</Card.Text>
                    <Card.Text className="p-0 lh-sm">{user && `Email: ${user.email}`}</Card.Text>
                    <Card.Text className="p-0 lh-sm">{user && `Group Roles: ${user.roles}`}</Card.Text>
                    <Card.Text className="p-0 pb-2 lh-sm">{user && user.about}</Card.Text>
                </Card.Body>}
            </Card>
        </>
    )
}