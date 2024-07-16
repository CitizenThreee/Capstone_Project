import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';

export default function SignUpProfileForm({ params }) {
    return (
        <Form className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <Form.Group controlId='formFile' className='mb-3' style={{width: "40%"}}>
                <Image className='rounded-circle mb-3 mx-auto w-100' src={params.userInput.pfp} alt="profile pic"/>
                <Form.Control onChange={params.onChangePfp} type="file"/>
            </Form.Group>
            <Form.Group className='w-100'>
                <FloatingLabel controlId="occupationInput" label="occupation" className="mb-3">
                    <Form.Control value={params.userInput.occupation} onChange={params.onChangeUserInput} name='occupation' type="text" placeholder="builder" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className='w-100'>
                <FloatingLabel controlId="websiteInput" label="website" className="mb-3">
                    <Form.Control value={params.userInput.website} onChange={params.onChangeUserInput} name='website' type="text" placeholder="example.com" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className='w-100'>
                <FloatingLabel controlId="aboutInput" label="about" className="mb-3">
                    <Form.Control value={params.userInput.about} onChange={params.onChangeUserInput} name='about' as="textarea" maxLength={800} style={{resize: "none", height: "100px"}} placeholder='About'/>
                </FloatingLabel>
            </Form.Group>
            <div className='d-flex w-100'>
                <Button className='mx-auto' onClick={() => params.setStage("password")} style={{ width: "30%"}}>continue</Button>
                <Button className='border-0' onClick={() => params.setStage("password")} style={{ backgroundColor: "#fff0", color: "#000", position: "absolute", right: "100px"}}>skip</Button>
            </div>
        </Form>
    )
}