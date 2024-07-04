import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

export default function SignUpPasswordForm({ password, setPassword, confirmPassword, setConfirmPassword, passwordValid, confirmPasswordValid, validate }) {
    return (
        <Form className='d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh" }}>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel controlId="passwordInput" label="password" className="mb-3">
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel controlId="passwordConfirmInput" label="confirm password" className="mb-3">
                    <Form.Control isInvalid={confirmPasswordValid=="false"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="password" />
                    <Form.Control.Feedback type="invalid">
                        Passwords must match
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Button onClick={validate} style={{ width: "30%"}}>sign up</Button>
        </Form>
    )
}