import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { Button, ButtonGroup, CloseButton } from "react-bootstrap";

export default function ProfileSettingsForm(params) {
    return(
        <>
            <Form className="d-flex flex-column align-items-center position-relative" style={{ overflow: "auto" }}>
                <Button variant="link" className="position-absolute start-0 text-danger text-decoration-none" onClick={params.onSignOut}>sign out</Button>
                <CloseButton className="position-absolute end-0 m-2" onClick={params.onClose} />
                <Form.Group controlId='formFile' className='mb-3 d-flex flex-column'>
                    <Image className='rounded-circle mb-3 mx-auto' src={params.pfp} alt="profile pic" width={"150px"} height={"150px"} style={{ objectFit: "cover" }} />
                    <Form.Control onChange={(e) => { params.setPfp(URL.createObjectURL(e.target.files[0])) }} type="file" size="sm" />
                </Form.Group>
                <Row style={{width: "100%"}}>
                    <Form.Group as={Col} xs={12} md={6}>
                        <Form.Control disabled type="text" value={params.fname} className="text-center mb-2" placeholder={params.fname} size="sm" />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6}>
                        <Form.Control disabled type="text" value={params.lname} className="text-center mb-2" placeholder={params.lname} size="sm" />
                    </Form.Group>
                    <Form.Group as={Col} xs={12}>
                        <Form.Control disabled type="email" value={params.email} className="text-center mb-2" placeholder={params.email} size="sm" />
                    </Form.Group>
                    <Form.Group as={Col} xs={12}>
                        <Form.Control type="number" value={params.phone} onChange={(e) => params.setPhone(e.target.value)} className="text-center mb-2" placeholder={params.phone} size="sm" />
                    </Form.Group>
                    <Form.Group as={Col} xs={12}>
                        <Form.Control type="text" value={params.website} onChange={(e) => params.setWebsite(e.target.value)} className="text-center mb-2" placeholder={params.website} size="sm" />
                    </Form.Group>
                    <Form.Group as={Col} xs={12}>
                        <Form.Control type="text" value={params.occupation} onChange={(e) => params.setOccupation(e.target.value)} className="text-center mb-2" placeholder={params.occupation} size="sm" />
                    </Form.Group>
                    <Form.Group as={Col} xs={12}>
                        <Form.Control type="text" value={params.location} onChange={(e) => params.setLocation(e.target.value)} className="text-center mb-2" placeholder={params.location} size="sm" />
                    </Form.Group>
                    <Form.Group as={Col} xs={12}>
                        <Form.Control as="textarea" value={params.about} onChange={(e) => params.setAbout(e.target.value)} rows={3} className="mb-2" placeholder={params.about} size="sm" maxLength={800} style={{ resize: "none" }} />
                    </Form.Group>
                    <ButtonGroup>
                        <Button variant="outline-danger" onClick={params.onCancel}>cancel</Button>
                        <Button variant="outline-primary" onClick={params.onSave}>save</Button>
                    </ButtonGroup>
                </Row>
            </Form>
        </>
    )
}