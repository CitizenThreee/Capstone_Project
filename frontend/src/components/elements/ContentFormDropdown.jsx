import { Dropdown, FormLabel } from "react-bootstrap";

export default function ContentFormDropdown({title, value, children}) {
    return (
        <div className="d-flex justify-content-between mb-2">
            <FormLabel className="fw-semibold">{title}</FormLabel>
            <Dropdown>
                <Dropdown.Toggle className="text-capitalize" size="sm" variant="success" id="dropdown-basic">
                    {value}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {children}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}