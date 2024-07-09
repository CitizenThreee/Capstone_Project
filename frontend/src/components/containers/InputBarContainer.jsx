import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export default function InputBarContainer({title=true, description=false, onPost}) {
    const [ input, setInput ] = useState({
        title: "",
        description: ""
    });

    return (
        <>
            <div className="rounded-2" style={{ width: "45rem", zIndex: "50" }}>
                <Form.Group className="fs-3 fw-medium d-flex mb-1">
                    {title && <Form.Control
                        type="text"
                        value={input.title}
                        onChange={(e) => setInput({...input, title: e.target.value})}
                        placeholder="Message"
                    />}
                    <Button variant="outline-primary ms-2" onClick={() => { onPost(input); setInput({title: "", description: ""}) }}>
                        Send
                    </Button>
                </Form.Group>
                {description && <Form.Control
                    as="textarea"
                    value={input.description}
                    onChange={(e) => setInput({...input, description: e.target.value})}
                    placeholder="Description"
                    className=" mr-sm-2"
                />}
            </div>
        </>
    )
}