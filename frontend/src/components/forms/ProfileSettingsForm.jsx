import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { Button, ButtonGroup, CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// The profile settings form lets the user update their profile
export default function ProfileSettingsForm({params}) {
    const navigate = useNavigate();

    // When the user cancels or closes the window, navigate to the last page
    const onClose = () => {
        navigate(-1)
    }

    return(
        <>
            <Form className="d-flex flex-column align-items-center position-relative" style={{ overflow: "auto" }}>

                {/* Sign out button */}
                <Button variant="link" className="position-absolute start-0 text-danger text-decoration-none" onClick={params.onSignOut}>
                    sign out
                </Button>

                {/* Close page */}
                <CloseButton className="position-absolute end-0 m-2" onClick={onClose}/>

                {/* Profile pic */}
                <Form.Group controlId='formFile' className='mb-3 d-flex flex-column'>
                    <Image className='rounded-circle mb-3 mx-auto' src={params.userInputs.pfp} alt="profile pic" width={"150px"} height={"150px"} style={{ objectFit: "cover" }} />
                    <Form.Control onChange={params.onChangePfp} type="file" size="sm" />
                </Form.Group>
                <Row className="w-100">

                    {/* User first name */}
                    <Form.Group as={Col} xs={12} md={6}>
                        <Form.Control disabled type="text" value={params.userInputs.fname} className="text-center mb-2" placeholder={params.fname} size="sm" />
                    </Form.Group>

                    {/* User last name */}
                    <Form.Group as={Col} xs={12} md={6}>
                        <Form.Control disabled type="text" value={params.userInputs.lname} className="text-center mb-2" placeholder={params.lname} size="sm" />
                    </Form.Group>

                    {/* User email */}
                    <Form.Group as={Col} xs={12}>
                        <Form.Control disabled type="email" value={params.userInputs.email} className="text-center mb-2" placeholder={params.email} size="sm" />
                    </Form.Group>

                    {/* User phone number */}
                    <Form.Group as={Col} xs={12}>
                        <Form.Control type="number" value={params.userInputs.phone} onChange={params.onChangeUserInput} name="phone" className="text-center mb-2" placeholder={"phone"} size="sm" />
                    </Form.Group>

                    {/* User website */}
                    <Form.Group as={Col} xs={12}>
                        <Form.Control type="text" value={params.userInputs.website} onChange={params.onChangeUserInput} name="website" className="text-center mb-2" placeholder={"website"} size="sm" />
                    </Form.Group>

                    {/* User occupation */}
                    <Form.Group as={Col} xs={12}>
                        <Form.Control type="text" value={params.userInputs.occupation} onChange={params.onChangeUserInput} name="occupation" className="text-center mb-2" placeholder={"occupation"} size="sm" />
                    </Form.Group>

                    {/* User location */}
                    <Form.Group as={Col} xs={12}>
                        <Form.Control type="text" value={params.userInputs.location} onChange={params.onChangeUserInput} name="location" className="text-center mb-2" placeholder={"location"} size="sm" />
                    </Form.Group>

                    {/* User about section */}
                    <Form.Group as={Col} xs={12}>
                        <Form.Control as="textarea" value={params.userInputs.about} onChange={params.onChangeUserInput} name="about" rows={3} className="mb-2" placeholder={"about"} size="sm" maxLength={800} style={{ resize: "none" }} />
                    </Form.Group>

                    {/* Save and cancel buttons */}
                    <ButtonGroup>
                        <Button variant="outline-danger" onClick={onClose}>cancel</Button>
                        <Button variant="outline-primary" onClick={params.onSave}>save</Button>
                    </ButtonGroup>
                </Row>
            </Form>
        </>
    )
}