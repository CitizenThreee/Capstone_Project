import { Form } from "react-bootstrap";

export default function ContentFormSwitch({name, title, onChange, value}) {
    return (
        <Form.Group className="d-flex justify-content-between mb-2">
            <Form.Label className="fw-semibold">{title}</Form.Label>
            <Form.Check
                type="switch"
                variant="success"
                checked={value}
                onChange={() => onChange(name, !value)}
            />
        </Form.Group>
    )
}