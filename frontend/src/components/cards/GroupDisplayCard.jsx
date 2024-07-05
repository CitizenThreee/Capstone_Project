import { useState } from "react"
import { Button, Card } from "react-bootstrap"
import { FaLocationDot } from "react-icons/fa6"

export default function GroupDisplayCard({ data }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <Card as="button" bg="light" border="primary" text="dark" className="mb-2 text-start fw-semibold fs-5" onClick={() => setExpanded(!expanded)} style={{ width: "45rem", maxWidth: "95vw" }}>
                <Card.Header style={{width: "100%"}}>{data && data.name}</Card.Header>
                <Card.Img className="rounded-0" src={data && data.bannerImageURL} style={{height: "130px", objectFit: "cover"}}/>
                <div className="position-absolute hoverview" style={{height: "100%", width: "100%" }}></div>
                {expanded && <Card.Body className="py-1 px-2 d-flex flex-column" style={{ maxHeight: "100%", overflow: "hidden", width: "100%"}}>
                    <div> <FaLocationDot/> <span>{data && data.location}</span> </div>
                    <Card.Body className="p-0 py-2 lh-sm">{data && data.description}</Card.Body>
                    <Button variant="outline-primary" onClick={(e) => {e.stopPropagation()}} className="pt-1 mt-1" style={{zIndex: 1}}>+Join</Button>
                </Card.Body>}
            </Card>
        </>
    )
}