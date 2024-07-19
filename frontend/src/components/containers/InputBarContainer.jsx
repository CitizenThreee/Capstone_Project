import { useEffect, useState } from "react";
import { Form, InputGroup, Button, Dropdown } from "react-bootstrap";
import { IoIosWarning } from "react-icons/io";
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import { useUserContext } from "../../context/UserProvider";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import axios from 'axios'

// Default inputs for the input bar
const defaultInputs = {
    type: 'text',
    title: '',
    subtitle: '',
    image: '',
    description: '',
    level: 'warning',
    size: 'header',
}

// Input bar for submiting content to tabs
export default function InputBarContainer({perms={fpost: [], rpost: []}, schema={}, onPost}) {
    const { currentTab, handleSetCurrentTab } = useCurrentTabContext();
    const { user } = useUserContext();
    const { currentGroup } = useCurrentGroupContext();
    const [ input, setInput ] = useState({ ...defaultInputs });
    
    // When an input is changed, change the state variable to match
    const onChangeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // When the size is changed, set it to the selected size
    const onChangeSize = (size) => {
        setInput({
            ...input,
            size: size
        })
    }

    // Check if the user has permission to post in the tab
    const onCheckPermissions = () => {
        if(perms.fpost.length < 1 && perms.rpost.length < 1) return true
        for(let i = 0; i < user.groupProfile.roles.length; i++){
            if(perms.fpost.includes(user.groupProfile.roles[i]) || perms.rpost.includes(user.groupProfile.roles[i])){
                return true
            }
        }

        return false
    }

    // If the user doesn't have permissions to post data, return an empty component
    if(!onCheckPermissions()) return (<></>)

    // The input bar is a selection of controlled form inputs that are conditionally rendered based
    // on the tab's content schema
    return (
        <>
            <div className="rounded-2" style={{ width: "45rem", zIndex: "50" }}>
                <Form.Group className="fs-3 fw-medium d-flex mb-1">
                    <InputGroup>

                        {/* Toggle between posting warning and danger alerts */}
                        {schema.type == 'alert' && <Button className="d-flex" variant={input.level} onClick={() => 
                            setInput({...input, level: input.level == 'warning' ? 'danger' : 'warning'})}>
                            !!!!
                        </Button>}

                        {/* Toggle between posting image or text element */}
                        {currentTab.tab.type == 'page' && <Button className="d-flex" variant="outline-primary" onClick={() => 
                            setInput({...input, type: input.type == 'text' ? 'image' : 'text'})}>
                            {input.type}
                        </Button>}
                        
                        {/* Toggle between image and text input */}
                        {input.type == 'image' 
                        ? <Form.Control type="text" value={input.image} name="image" onChange={onChangeInput} placeholder="https://imageexampleurl.com/image.jpg"/>
                        : <Form.Control type="text" value={input.title} name="title" onChange={onChangeInput} placeholder="Text"/>}

                        {/* Toggle between text types if tab is a 'page' */}
                        {(currentTab.tab.type == 'page' && input.type == 'text') && <Dropdown>
                            <Dropdown.Toggle className="text-capitalize" variant="outline-primary">
                                {input.size}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item active={input.size == 'header'} onClick={() => onChangeSize('header')}>Header</Dropdown.Item>
                                <Dropdown.Item active={input.size == 'subheader'} onClick={() => onChangeSize('subheader')}>Subheader</Dropdown.Item>
                                <Dropdown.Item active={input.size == 'paragraph'} onClick={() => onChangeSize('paragraph')}>Paragraph</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>}

                    </InputGroup>
                    
                    {/* Send button calls onPost function provided in params */}
                    <Button variant="outline-primary ms-2" onClick={() => {
                        onPost({input: {...input}, type: currentTab.tab.type != 'page' ? schema.type : input.type , perms: {...perms}});
                        setInput({ ...defaultInputs });
                    }}>
                        Send
                    </Button>
                </Form.Group>

                {schema.img && <Form.Control size="sm" value={input.image} onChange={onChangeInput} name="image" placeholder="Image URL"/>}

                {/* Description text area for posts */}
                {schema.description && <Form.Control as="textarea" value={input.description} onChange={onChangeInput} name="description" placeholder="Description" className="mr-sm-2"/>}
            </div>
        </>
    )
}