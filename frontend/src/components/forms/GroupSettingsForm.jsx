import { useEffect, useState } from "react"
import { Button, ButtonGroup, CloseButton, Dropdown, Form, FormLabel, Image } from "react-bootstrap";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// Group settings form lets the owner change the basic group settings
export default function GroupSettingsForm() {
    const navigate = useNavigate();
    const { currentGroup, handleSetCurrentGroup } = useCurrentGroupContext();
    const [ input, setInput ] = useState({
        name: currentGroup.name,
        banner: currentGroup.banner,
        description: currentGroup.description,
        location: currentGroup.location
    });

    const onChangePhoto = (src) => {
        setInput({
            ...input,
            banner: src
        })
    }

    // Change an input based on the event passed
    const onChangeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // On delete, remove the group data from the database and navigate to the home page
    const onDelete = () => {
        handleSetCurrentGroup({});

        axios.delete(`http://localhost:8080/groups/${currentGroup._id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        navigate("/")
    }

    // When user saves, update the data in the database and navigate to the previous page
    const onSave = () => {
        const newGroupData = {
            name: input.name,
            banner: input.banner,
            description: input.description,
            location: input.location
        }

        handleSetCurrentGroup({...currentGroup, ...newGroupData})
        axios.put(`http://localhost:8080/groups/${currentGroup._id}`, {...newGroupData})
            .then(res => {
                console.log(res);
                navigate(-1);
            })
            .catch(err => console.log(err))
    }

    // When canceled, navigate to the previous page
    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <Form className="w-100">

                {/* Group name input */}
                <Form.Group className="w-100">
                    <Form.Control type="text" name="name" value={input.name} onChange={onChangeInput} 
                        className="mb-3" placeholder="group name" size="lg"/>
                </Form.Group>

                {/* Group banner url */}
                <Form.Group controlId='formFile' className='mb-3 d-flex flex-column'>
                    <Image className='mb-3 mx-auto' src={input.banner ? input.banner : "avatar_placeholder.jpg"} alt="banner" width={"100%"} style={{ objectFit: "cover" }} />
                    <Form.Control onChange={onChangeInput} name="banner" value={input.banner} type="text" placeholder="http://exampleimageurl/image.jpg" size="sm" />
                </Form.Group>

                {/* Group description input */}
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" value={input.description} onChange={onChangeInput} name="description" rows={3} placeholder={input.description} size="sm" maxLength={800} style={{ resize: "none" }} />
                </Form.Group>

                {/* Group location input */}
                <Form.Group className="w-100">
                    <Form.Control type="text" value={input.location} onChange={onChangeInput} name="location"
                        className="mb-3" placeholder="location"/>
                </Form.Group>

                {/* Delete button */}
                <Button variant="danger" className="mb-3 w-100" onClick={onDelete}>Delete Group</Button>

                {/* Save or cancel the updated group data */}
                <ButtonGroup className="w-100">
                    <Button variant="outline-danger" onClick={onCancel}>cancel</Button>
                    <Button variant="outline-success" onClick={onSave}>save</Button>
                </ButtonGroup>
            </Form>
        </>
    )
}