import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function SignInForm({ onSignin, onReset, validation }) {
    const [ userInput, setUserInput ] = useState({email: "", password: ""})

    const onChangeUserInput = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        });

        onReset();
    }

    return (
        <Form className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <Form.Group className='w-100'>
                <FloatingLabel controlId="emailInput" label="email address" className="mb-3">
                    <Form.Control isInvalid={!validation} value={userInput.email} 
                    onChange={onChangeUserInput} name='email' type="email" placeholder="email" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className='w-100'>
                <FloatingLabel controlId="passwordInput" label="password" className="mb-3">
                    <Form.Control isInvalid={!validation} value={userInput.password} 
                    onChange={onChangeUserInput} name='password' type="password" placeholder="password" />
                    <Form.Control.Feedback type="invalid">
                        Email or password incorrect
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Button onClick={() => onSignin({email: userInput.email, password: userInput.password})} style={{ width: "30%"}}>sign in</Button>
        </Form>
    )
}