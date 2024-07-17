import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

// Sign up password form
export default function SignUpPasswordForm({ params }) {
    return (
        <Form className='d-flex flex-column justify-content-center align-items-center vh-100'>

            {/* Password input */}
            <Form.Group className='w-100'>
                <FloatingLabel controlId="passwordInput" label="password" className="mb-3">
                    <Form.Control value={params.userInput.password} onChange={params.onChangeUserInput} name='password' type="password" placeholder="password" />
                </FloatingLabel>
            </Form.Group>

            {/* Confirm password input */}
            <Form.Group className='w-100' style={{width: "100%"}}>
                <FloatingLabel controlId="passwordConfirmInput" label="confirm password" className="mb-3">
                    <Form.Control isInvalid={params.validation.password=="false"} value={params.userInput.cPassword} onChange={params.onChangeUserInput} name='cPassword' type="password" placeholder="password" />
                    
                    {/* Input feedback renders if validation is false */}
                    <Form.Control.Feedback type="invalid">
                        Passwords must match
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Button onClick={params.onValidate} style={{ width: "30%"}}>sign up</Button>
        </Form>
    )
}