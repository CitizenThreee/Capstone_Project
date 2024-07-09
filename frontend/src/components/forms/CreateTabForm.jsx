import { useState } from "react";
import { Button, ButtonGroup, CloseButton, Dropdown, Form, FormLabel } from "react-bootstrap";
import ContentFormElement from "./ContentFormElement";

const defaultContent = {
    type: "Post",
    view: [],
    fpost: [],
    rpost: [],
    isContainer: false,
    cType: "Page",
    topTitle: true,
    image: false,
    bottomTitle: false,
    description: false
}

export default function CreateTabForm({ onCreate, onCancel, roles }) {
    const [ name, setName ] = useState("");
    const [ vSelectedRoles, setVSelectedRoles ] = useState([]);
    const [ fpSelectedRoles, setFpSelectedRoles ] = useState([]);
    const [ rpSelectedRoles, setRpSelectedRoles ] = useState([]);
    const [ selectedType, setSelectedType ] = useState("Page");
    const [ content, setContent ] = useState([defaultContent])

    function ToggleVSelectedRoles(e, option) {
        e.preventDefault();
        e.stopPropagation();

        if(vSelectedRoles.includes(option)){
            setVSelectedRoles(vSelectedRoles.filter(role => role != option))
        }
        else { setVSelectedRoles([...vSelectedRoles, option]); }
    }

    function ToggleFpSelectedRoles(e, option) {
        e.preventDefault();
        e.stopPropagation();

        if(fpSelectedRoles.includes(option)){
            setFpSelectedRoles(fpSelectedRoles.filter(role => role != option))
        }
        else { setFpSelectedRoles([...fpSelectedRoles, option]); }
    }

    function ToggleRpSelectedRoles(e, option) {
        e.preventDefault();
        e.stopPropagation();

        if(rpSelectedRoles.includes(option)){
            setRpSelectedRoles(rpSelectedRoles.filter(role => role != option))
        }
        else { setRpSelectedRoles([...rpSelectedRoles, option]); }
    }

    return(
        <>
            <Form className="d-flex flex-column p-2" style={{ width: "100%" }}>
                <Form.Group style={{width: "100%"}}>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" className="mb-3" placeholder="tab name" size="lg"  />
                </Form.Group>
                <Dropdown>
                    <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                        {`Type: ${selectedType}`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item active={selectedType == "Page"} onClick={() => setSelectedType("Page")}> Page </Dropdown.Item>
                        <Dropdown.Item active={selectedType == "Feed"} onClick={() => setSelectedType("Feed")}> Feed </Dropdown.Item>
                        <Dropdown.Item active={selectedType == "Chat"} onClick={() => setSelectedType("Chat")}> Chat </Dropdown.Item>
                        <Dropdown.Item active={selectedType == "Grid"} onClick={() => setSelectedType("Grid")}> Grid </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <FormLabel className="mx-auto fs-3 fw-semibold">Permissions</FormLabel>
                <Form.Group className="d-flex justify-content-between">
                    <FormLabel className="fw-semibold">Can View</FormLabel>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                            {vSelectedRoles.length ? vSelectedRoles.map(item => item + " | ") : "all"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu size="sm">
                            {roles.map((option, index) => (
                                <Dropdown.Item key={index} onClick={(e) => ToggleVSelectedRoles(e, option.name)} active={vSelectedRoles.includes(option.name)} >
                                    {option.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                
                <Form.Group className="d-flex justify-content-between">
                    <FormLabel className="fw-semibold">Can Post Freely</FormLabel>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                            {fpSelectedRoles.length ? fpSelectedRoles.map(item => item + " | ") : "all"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu size="sm">
                            {roles.map((option, index) => (
                                <Dropdown.Item disabled={rpSelectedRoles.includes(option.name)} key={index} onClick={(e) => ToggleFpSelectedRoles(e, option.name)} active={fpSelectedRoles.includes(option.name)} >
                                    {option.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                
                <Form.Group className="d-flex justify-content-between">
                    <FormLabel className="fw-semibold">Must Requested To Post</FormLabel>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                            {rpSelectedRoles.length ? rpSelectedRoles.map(item => item + " | ") : "none"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu size="sm">
                            {roles.map((option, index) => (
                                <Dropdown.Item disabled={fpSelectedRoles.includes(option.name)} key={index} onClick={(e) => ToggleRpSelectedRoles(e, option.name)} active={rpSelectedRoles.includes(option.name)} >
                                    {option.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                
                
                {(selectedType == "Feed" || selectedType == "Grid") && <div className="d-flex flex-column mb-3">
                    <FormLabel className="mx-auto fs-3 fw-semibold">Content</FormLabel>
                    {content.map((item, index) => (
                        <ContentFormElement key={index} index={index} content={content} setContent={setContent} defaultContent={defaultContent} roles={roles}/>
                    ))}
                </div>}
                
                <ButtonGroup style={{width: "100%"}}>
                    <Button variant="outline-danger" onClick={onCancel}>cancel</Button>
                    <Button variant="outline-primary" onClick={() => {
                        onCreate({
                            name: name,
                            view: vSelectedRoles,
                            fPost: fpSelectedRoles,
                            rPost: rpSelectedRoles,
                            type: selectedType,
                            content: content
                        })}}>create</Button>
                </ButtonGroup>
            </Form>
        </>
    )
}