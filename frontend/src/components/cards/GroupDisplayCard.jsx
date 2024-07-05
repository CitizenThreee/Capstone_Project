import { Button, Card } from "react-bootstrap"

export default function GroupDisplayCard() {
    return (
        <>
            <Card style={{ height: "20rem", maxWidth: "35rem" }}>
                <Card.Img variant="top" src="/headshot.JPG" style={{height: "130px", objectFit: "cover"}}/>
                <Card.Body className="py-1 px-2 d-flex flex-column" style={{ maxHeight: "100%", overflow: "hidden"}}>
                    <Card.Title className="mb-1">Group</Card.Title>
                    <Card.Body className="p-0 lh-sm" style={{ height: "30%", overflow: "auto"}}>Some description text. leehdf eheapf ahevahe aeliulav ehfaf eyldeuyav euafldjkfeu avjljeua vuelafjf description text. leehdf eheapf ahevahe aeliulav ehfaf eyldeuyav euafldjkfeu avjljeua vuelafjf description text. leehdf eheapf ahevahe aeliulav ehfaf eyldeuyav euafldjkfeu avjljeua vuelafjf</Card.Body>
                    <Button className="pt-1 mt-1">+Join</Button>
                </Card.Body>
            </Card>
        </>
    )
}