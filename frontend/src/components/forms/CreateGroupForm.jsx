import { useState } from "react";
import { Button, ButtonGroup, CloseButton, Form } from "react-bootstrap";

export default function CreateGroupForm({ onCreate, onCancel }) {
    const [ name, setName ] = useState();

    return(
        <>
            <Form className="d-flex flex-column align-items-center position-relative p-2" style={{ width: "100%" }}>
                <Form.Group style={{width: "100%"}}>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} className="mb-3" placeholder="group name" size="lg"  />
                </Form.Group>
                <ButtonGroup style={{width: "100%"}}>
                    <Button variant="outline-danger" onClick={onCancel}>cancel</Button>
                    <Button variant="outline-primary" onClick={() => onCreate(name)}>create</Button>
                </ButtonGroup>
            </Form>
        </>
    )
}