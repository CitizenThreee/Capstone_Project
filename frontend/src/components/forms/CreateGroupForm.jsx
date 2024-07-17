import { useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

// A basic form for creating a group, consisting of a name input field, and cancel and create buttons
export default function CreateGroupForm({ onCreate, onCancel }) {
    const [ name, setName ] = useState();

    return(
        <>
            <Form className="d-flex flex-column align-items-center position-relative p-2 w-100">
                <Form.Group className="w-100">
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} className="mb-3" placeholder="group name" size="lg"  />
                </Form.Group>
                <ButtonGroup className="w-100">
                    <Button variant="outline-danger" onClick={onCancel}>cancel</Button>
                    <Button variant="outline-primary" onClick={() => onCreate(name)}>create</Button>
                </ButtonGroup>
            </Form>
        </>
    )
}