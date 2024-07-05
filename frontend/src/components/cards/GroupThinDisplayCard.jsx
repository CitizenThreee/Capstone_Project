import { Card } from "react-bootstrap"

export default function GroupThinDisplayCard({ data }) {
    return (
        <>
            <Card as="button" bg="light" border="primary" text="dark" className="mb-2 text-start fw-semibold fs-5 position-relative" style={{ width: "45rem", maxWidth: "95vw" }}>
                <Card.Header style={{width: "100%"}}>{data && data.name}</Card.Header>
                <Card.Img variant="bottom" src={data && data.bannerImageURL} style={{height: "130px", objectFit: "cover"}}/>
                <div className="position-absolute hoverview d-flex justify-content-center align-items-center" style={{height: "100%", width: "100%"}}/>
            </Card>
        </>
    )
}