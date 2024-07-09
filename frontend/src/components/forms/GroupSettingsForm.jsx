import { useEffect, useState } from "react"
import { Button, ButtonGroup, CloseButton, Dropdown, Form, FormLabel, Image } from "react-bootstrap";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const mockRoles = [
    "Builder", "JOP", "Board Member", "Councilor"
]

export default function GroupSettingsForm({ data }) {
    const navigate = useNavigate();
    const [ roles, setRoles ] = useState(mockRoles);
    const [ name, setName ] = useState("");
    const [ banner, setBanner ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ location, setLocation ] = useState("");
    const { currentGroup, handleSetCurrentGroup } = useCurrentGroupContext();

    function ResetForm() {
        setName(currentGroup.name);
        setBanner(currentGroup.bannerImageURL);
        setDescription(currentGroup.description);
        setLocation(currentGroup.location);
    }

    useEffect(() => {
        ResetForm();
    }, [currentGroup])

    const onChangeName = (name) => {
        setName(name);
        //Update database with new data
    }

    const onChangePhoto = (src) => {
        setBanner(src);
        //Update database with new data
    }

    const onChangeDescription = (desc) => {
        setDescription(desc);
        //Update database with new data
    }

    const onDelete = () => {
        handleSetCurrentGroup({});
        navigate("/")
    }

    const onSave = () => {
        handleSetCurrentGroup({...currentGroup, name: name, bannerImageURL: banner, description: description, locaiton: location})
        //update database with new data
    }

    const onCancel = () => {
        ResetForm();
    }

    return (
        <>
            <Form style={{width: "100%"}}>
                <Form.Group style={{width: "100%"}}>
                    <Form.Control type="text" value={name} onChange={(e) => onChangeName(e.target.value)} 
                        className="mb-3" placeholder="group name" size="lg"/>
                </Form.Group>
                <Form.Group controlId='formFile' className='mb-3 d-flex flex-column'>
                    <Image className='mb-3 mx-auto' src={banner ? banner : "avatar_placeholder.jpg"} alt="banner" width={"100%"} style={{ objectFit: "cover" }} />
                    <Form.Control onChange={(e) => { onChangePhoto(URL.createObjectURL(e.target.files[0])) }} type="file" size="sm" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" value={description} onChange={(e) => onChangeDescription(e.target.value)} rows={3} placeholder={currentGroup.description} size="sm" maxLength={800} style={{ resize: "none" }} />
                </Form.Group>
                <Form.Group style={{width: "100%"}}>
                    <Form.Control type="text" value={location} onChange={(e) => onChangeName(e.target.value)} 
                        className="mb-3" placeholder="group name"/>
                </Form.Group>
                <Button variant="danger" className="mb-3" style={{width: "100%"}} onClick={onDelete}>Delete Group</Button>
                <ButtonGroup style={{width: "100%"}}>
                    <Button variant="outline-danger" onClick={onCancel}>cancel</Button>
                    <Button variant="outline-success" onClick={onSave}>save</Button>
                </ButtonGroup>
            </Form>
        </>
    )
}