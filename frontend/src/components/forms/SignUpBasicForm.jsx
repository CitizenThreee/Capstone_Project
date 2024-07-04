import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

export default function SignUpBasicForm({ 
    email, setEmail, confirmEmail, setConfirmEmail, 
    firstName, setFirstName, lastName, setLastName, 
    phone, setPhone, location, setLocation, emailValid, 
    confirmEmailValid, firstNameValid, lastNameValid, 
    phoneValid, locationValid, validate }) {

    return (
        <Form className='d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh" }}>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel controlId='suEmail' label="email address" className="mb-3">
                    <Form.Control isValid={emailValid=="true"} isInvalid={emailValid=="false"} type="email" 
                        value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel label="confirm email" className="mb-3">
                    <Form.Control isValid={confirmEmailValid=="true"} isInvalid={confirmEmailValid=="false"} id="suConfirmEmail" type="email" 
                        value={confirmEmail} onChange={(e) => {setConfirmEmail(e.target.value)}} placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                        Emails do not match
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel label="first name" className="mb-3">
                    <Form.Control isValid={firstNameValid=="true"} isInvalid={firstNameValid=="false"} id="sufName" type='text' 
                        value={firstName} onChange={(e) => {setFirstName(e.target.value)}} placeholder="first name" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel label="last name" className="mb-3">
                    <Form.Control isValid={lastNameValid=="true"} isInvalid={lastNameValid=="false"} id="sulName" type='text' 
                        value={lastName} onChange={(e) => {setLastName(e.target.value)}} placeholder="last name" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel label="phone number" className="mb-3">
                    <Form.Control isValid={phoneValid=="true"} isInvalid={phoneValid=="false"} id="suNumber" type='number' 
                        value={phone} onChange={(e) => {setPhone(e.target.value)}} placeholder="02101201201" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel label="location" className="mb-3">
                    <Form.Control isValid={locationValid=="true"} isInvalid={locationValid=="false"} id="suLocation" 
                        value={location} onChange={(e) => {setLocation(e.target.value)}} placeholder="location" />
                </FloatingLabel>
            </Form.Group>
            
            <Button onClick={() => validate("profile")} style={{ width: "30%"}}>continue</Button>
        </Form>
    )
}