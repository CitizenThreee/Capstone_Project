import { Card } from "react-bootstrap";

export default function Post({ data={} }) {
    return (
        <>
            <Card style={{ width: "45rem", maxWidth: "95vw" }}>
                {data.tTitle && <Card.Header>{data.tTitle}</Card.Header>}
                {data.image && <Card.Img src={data.image}/>}
                <Card.Body>
                    {data.bTitle && <Card.Title>{data.bTitle}</Card.Title>}
                    {data.description && <Card.Text>{data.description}</Card.Text>}
                </Card.Body>
            </Card>
        </>
    )
}