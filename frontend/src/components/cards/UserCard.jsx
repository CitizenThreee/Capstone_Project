import { useState } from "react"
import { Button, Card } from "react-bootstrap"

// Expandable card for user details. Used in the group users page
export default function UserCard({user}) {
    const [ expanded, setExpanded ] = useState();

    return (
        <>
            <Card as="button" bg="light" text="dark" className="text-start fw-semibold" onClick={() => setExpanded(!expanded)} style={{ width: "45rem", maxWidth: "95vw" }}>
                <Card.Header className="fs-5 p-2 w-100">
                    <div>
                        <img className="float-start rounded-circle me-2" src={user.userId.pfp ? user.userId.pfp : "/avatar_placeholder.jpg"} height={"30px"}></img>
                        <p className="float-start m-0">{user.userId.fname && user.userId.fname + " " + user.userId.lname}</p>
                        <p className="float-end m-0">{user.userId.occupation && user.userId.occupation}</p>
                    </div>
                </Card.Header>
                <div className="position-absolute hoverview h-100 w-100"></div>

                {/* Additional details that are conditionally rendered based on the 'expanded' state variable */}
                {expanded && <Card.Body className="py-1 px-2 d-flex flex-column w-100" style={{ maxHeight: "100%", overflow: "hidden" }}>
                    <Card.Text className="p-0 pt-2 lh-sm">{user.showPhone && `Phone: ${user.userId.phone}`}</Card.Text>
                    <Card.Text className="p-0 lh-sm">{user.showEmail && `Email: ${user.userId.email}`}</Card.Text>
                    <Card.Text className="p-0 lh-sm text-capitalize">{user && `Group Roles: ${user.roles}`}</Card.Text>
                    <Card.Text className="p-0 pb-2 lh-sm">{user.showAbout && user.userId.about}</Card.Text>
                </Card.Body>}
            </Card>
        </>
    )
}