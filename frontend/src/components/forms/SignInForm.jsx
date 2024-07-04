import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

export default function SignInForm({email, password, setEmail, setPassword, emailCorrect, passwordCorrect, validate}) {
    return (
        <Form className='d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh" }}>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel controlId="emailInput" label="email address" className="mb-3">
                    <Form.Control isInvalid={emailCorrect=="false"} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <FloatingLabel controlId="passwordInput" label="password" className="mb-3">
                    <Form.Control isInvalid={passwordCorrect=="false"} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                    <Form.Control.Feedback type="invalid">
                        Email or password incorrect
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Button onClick={validate} style={{ width: "30%"}}>sign in</Button>
        </Form>
    )
}