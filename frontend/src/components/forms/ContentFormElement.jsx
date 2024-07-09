import { Dropdown, Form } from "react-bootstrap";


export default function ContentFormElement({ index, content, setContent, defaultContent, roles }) {

    function ChangeIsContainer() {
        if(content[index].isContainer){
            setContent(content.filter((item, i) => i <= index).map(
                (item, i) => i == index ? {...item, isContainer: false} : item
            ))
        }
        else { 
            setContent([...content, defaultContent].map(
                (item, i) => i == index ? {...item, isContainer: true} : item)
            ) 
        }
    }

    function ChangeTopTitle() {
        setContent(content.map( (item, i) => i == index ? {...item, topTitle: !content[index].topTitle} : item ))
    }

    function ChangeImage() {
        setContent(content.map( (item, i) => i == index ? {...item, image: !content[index].image} : item ))
    }

    function ChangeBottomTitle() {
        setContent(content.map( (item, i) => i == index ? {...item, bottomTitle: !content[index].bottomTitle} : item ))
    }

    function ChangeDescription() {
        setContent(content.map( (item, i) => i == index ? {...item, description: !content[index].description} : item ))
    }

    function ToggleCanView(e, option) {
        e.preventDefault();
        e.stopPropagation();

        if(content[index].view.includes(option)){
            setContent(content.map((item, i) => i == index ? {...item, view: item.view.filter(role => role != option)} : item));
        }
        else { setContent(content.map((item, i) => i == index ? {...item, view: [...item.view, option]} : item)); }
    }

    function ToggleCanFreePost(e, option) {
        e.preventDefault();
        e.stopPropagation();

        if(content[index].fpost.includes(option)){
            setContent(content.map((item, i) => i == index ? {...item, fpost: item.fpost.filter(role => role != option)} : item));
        }
        else { setContent(content.map((item, i) => i == index ? {...item, fpost: [...item.fpost, option]} : item)); }
    }

    function ToggleCanReqPost(e, option) {
        e.preventDefault();
        e.stopPropagation();

        if(content[index].rpost.includes(option)){
            setContent(content.map((item, i) => i == index ? {...item, rpost: item.rpost.filter(role => role != option)} : item));
        }
        else { setContent(content.map((item, i) => i == index ? {...item, rpost: [...item.rpost, option]} : item)); }
    }

    //If the parent container type is "Page", the child content can't be specified, so just return a placeholder box with some info
    if(index > 0 && content[index - 1].cType == ("Page")) return (
        <div className="mb-3 p-2 d-flex justify-content-center" style={{ backgroundColor: "#eee" }}>
            <p>Page elements can't have custom content types</p>
        </div>)

    //Otherwise return a dynamic form based on the user selections
    return (
        <Form className="mb-3 p-2" style={{ backgroundColor: "#eee" }}>
            <Form.Group className="mb-2 rounded" >
                <Dropdown>
                    <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                        {`Type: ${content[index].type}`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item active={content[index].type == "Post"} onClick={() => setContent(content.map((item, i) => i == index ? { ...item, type: "Post" } : item))}>Post</Dropdown.Item>
                        <Dropdown.Item active={content[index].type == "Alert"} onClick={() => setContent(content.map((item, i) => i == index ? { ...item, type: "Alert" } : item))}>Alert</Dropdown.Item>
                        <Dropdown.Item active={content[index].type == "Comment"} onClick={() => setContent(content.map((item, i) => i == index ? { ...item, type: "Comment" } : item))}>Comment</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Form.Group>
            <Form.Group className="d-flex justify-content-between">
                <Form.Label>Is Container</Form.Label>
                <Form.Check
                    type="switch"
                    variant="success"
                    checked={content[index].isContainer}
                    onChange={ChangeIsContainer}
                />
            </Form.Group>
            
            {content[index].isContainer && 
                <div>
                    <Form.Group className="mb-2 rounded d-flex justify-content-between" >
                        <Form.Label>Container Type</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                                {content[index].cType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item active={content[index].cType == "Page"} onClick={() => setContent(content.map((item, i) => i == index ? { ...item, cType: "Page" } : item))}>Page</Dropdown.Item>
                                <Dropdown.Item active={content[index].cType == "Feed"} onClick={() => setContent(content.map((item, i) => i == index ? { ...item, cType: "Feed" } : item))}>Feed</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between">
                        <Form.Label className="fw-semibold">Can View</Form.Label>
                        <Dropdown className="mb-3">
                            <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                                {content[index].view.length ? content[index].view.map(item => item + " | ") : "all"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu size="sm">
                                {roles.map((option, i) => (
                                    <Dropdown.Item key={i} onClick={(e) => ToggleCanView(e, option.name)} active={content[index].view.includes(option.name)} >
                                        {option.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between">
                        <Form.Label className="fw-semibold">Can Post Freely</Form.Label>
                        <Dropdown className="mb-3">
                            <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                                {content[index].fpost.length ? content[index].fpost.map(item => item + " | ") : "all"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu size="sm">
                                {roles.map((option, i) => (
                                    <Dropdown.Item disabled={content[index].rpost.includes(option.name)} key={i} onClick={(e) => ToggleCanFreePost(e, option.name)} active={content[index].fpost.includes(option.name)} >
                                        {option.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between">
                        <Form.Label className="fw-semibold">Must Request To Post</Form.Label>
                        <Dropdown className="mb-3">
                            <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                                {content[index].rpost.length ? content[index].rpost.map(item => item + " | ") : "none"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu size="sm">
                                {roles.map((option, i) => (
                                    <Dropdown.Item disabled={content[index].fpost.includes(option.name)} key={i} onClick={(e) => ToggleCanReqPost(e, option.name)} active={content[index].rpost.includes(option.name)} >
                                        {option.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                </div>
            }

            {["Alert", "Post", "Comment"].includes(content[index].type) && <Form.Group className="d-flex justify-content-between">
                <Form.Label>Top Title</Form.Label>
                <Form.Check
                    type="switch"
                    checked={content[index].topTitle}
                    onChange={ChangeTopTitle}
                />
            </Form.Group>}
            {["Alert", "Post"].includes(content[index].type) && <Form.Group className="d-flex justify-content-between">
                <Form.Label>Image</Form.Label>
                <Form.Check
                    type="switch"
                    checked={content[index].image}
                    onChange={ChangeImage}
                />
            </Form.Group>}
            {["Alert", "Post" ].includes(content[index].type) && <Form.Group className="d-flex justify-content-between">
                <Form.Label>Bottom Title</Form.Label>
                <Form.Check
                    type="switch"
                    checked={content[index].bottomTitle}
                    onChange={ChangeBottomTitle}
                />
            </Form.Group>}
            {["Alert", "Post", "Comment"].includes(content[index].type) && <Form.Group className="d-flex justify-content-between">
                <Form.Label>Description</Form.Label>
                <Form.Check
                    type="switch"
                    checked={content[index].description}
                    onChange={ChangeDescription}
                />
            </Form.Group>}
        </Form>
        
    )
} 