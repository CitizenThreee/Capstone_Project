import { useEffect, useState } from "react";
import { Form, InputGroup, Button, Dropdown } from "react-bootstrap";
import { IoIosWarning } from "react-icons/io";
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import { useUserContext } from "../../context/UserProvider";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import axios from 'axios'

const defaultInputs = {
    type: 'text',
    title: '',
    subtitle: '',
    image: '',
    description: '',
    level: 'warning',
    size: 'header',
}

export default function InputBarContainer({perms={}, schema={}}) {
    const { currentTab, handleSetCurrentTab } = useCurrentTabContext();
    const { user } = useUserContext();
    const { currentGroup } = useCurrentGroupContext();
    const [ input, setInput ] = useState({ ...defaultInputs });
    
    const onChangeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const onChangeSize = (size) => {
        setInput({
            ...input,
            size: size
        })
    }

    const onCheckStatus = () => {
        if(perms.fpost.length < 1 && perms.rpost.length < 1) return 'approved'
        for(let i = 0; i < perms.fpost.length; i++){
            if(user.groupProfile.roles.includes(perms.fpost[i])){
                return 'approved'
            }
        }

        return 'pending'
    }

    const onCheckPermissions = () => {
        if(perms.fpost.length < 1 && perms.rpost.length < 1) return true
        for(let i = 0; i < user.groupProfile.roles.length; i++){
            if(perms.fpost.includes(user.groupProfile.roles[i]) || perms.rpost.includes(user.groupProfile.roles[i])){
                return true
            }
        }

        return false
    }

    const onPost = () => {
        const newContent = {
            ...input,
            type: schema.type != 'page' ? schema.type : input.type, 
            status: schema.type == 'page' ? 'approved' : onCheckStatus(),
            authorId: user._id,
            parentId: currentTab.tab._id,
            groupId: currentGroup._id
        }

        axios.post('http://localhost:8080/content', { ...newContent })
            .then(res => {
                if(res.data.data.status == 'approved'){
                    handleSetCurrentTab({...currentTab, content: [ ...currentTab.content, res.data.data ]})
                }
            })
            .catch(err => console.log(err))
    }

    if(!onCheckPermissions()) return (<></>)

    return (
        <>
            <div className="rounded-2" style={{ width: "45rem", zIndex: "50" }}>
                <Form.Group className="fs-3 fw-medium d-flex mb-1">
                    <InputGroup>
                        {schema.type == 'alert' && <Button className="d-flex" variant={input.level} onClick={() => 
                            setInput({...input, level: input.level == 'warning' ? 'danger' : 'warning'})}>
                            !!!!
                        </Button>}
                        {schema.type == 'page' && <Button className="d-flex" variant="outline-primary" onClick={() => 
                            setInput({...input, type: input.type == 'text' ? 'image' : 'text'})}>
                            {input.type}
                        </Button>}
                        
                        {input.type == 'image' 
                        ? <Form.Control type="text" value={input.image} name="image" onChange={onChangeInput} placeholder="https://imageexampleurl.com/image.jpg"/>
                        : <Form.Control type="text" value={input.title} name="title" onChange={onChangeInput} placeholder="Text"/>}

                        {(schema.type == 'page' && input.type == 'text') && <Dropdown>
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
                    
                    <Button variant="outline-primary ms-2" onClick={() => {
                        onPost();
                        setInput({ ...defaultInputs });
                    }}>
                        Send
                    </Button>
                </Form.Group>
                {schema.description && <Form.Control as="textarea" value={input.description} onChange={onChangeInput} name="description" placeholder="Description" className="mr-sm-2"/>}
            </div>
        </>
    )
}