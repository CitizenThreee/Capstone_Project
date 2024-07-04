import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Image } from 'react-bootstrap';

export default function SignUpProfileForm({ setStage, pfp, setPfp, occupation, setOccupation, website, setWebsite, about, setAbout }) {
    return (
        <Form className='d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh" }}>
            <Form.Group controlId='formFile' className='mb-3' style={{width: "40%"}}>
                <Image className='rounded-circle mb-3 mx-auto' src={pfp} alt="profile pic" width={"100%"}/>
                <Form.Control onChange={(e) => { setPfp(URL.createObjectURL(e.target.files[0]))}} type="file"/>
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel controlId="occupationInput" label="occupation" className="mb-3">
                    <Form.Control value={occupation} onChange={(e) => { setOccupation(e.target.value) }} type="text" placeholder="builder" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel controlId="websiteInput" label="website" className="mb-3">
                    <Form.Control value={website} onChange={(e) => { setWebsite(e.target.value) }} type="text" placeholder="example.com" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel controlId="aboutInput" label="about" className="mb-3">
                    <Form.Control value={about} onChange={(e) => { setAbout(e.target.value) }} as="textarea" maxLength={800} style={{resize: "none", height: "100px"}} placeholder='About'/>
                </FloatingLabel>
            </Form.Group>
            <div className='d-flex' style={{width: "100%"}}>
                <Button className='mx-auto' onClick={() => setStage("password")} style={{ width: "30%"}}>continue</Button>
                <Button className='border-0' onClick={() => setStage("password")} style={{ backgroundColor: "#fff0", color: "#000", position: "absolute", right: "100px"}}>skip</Button>
            </div>
        </Form>
    )
}