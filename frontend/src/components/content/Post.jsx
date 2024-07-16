import { Card } from "react-bootstrap";

export default function Post({ data={} }) {
    return (
        <>
            <Card className="mb-2" style={{ width: "45rem", maxWidth: "95vw" }}>
                {data.title && <Card.Header>{data.title}</Card.Header>}
                {data.image && <Card.Img src={data.image}/>}
                <Card.Body>
                    {data.description && <Card.Text>{data.description}</Card.Text>}
                </Card.Body>
            </Card>
        </>
    )
}