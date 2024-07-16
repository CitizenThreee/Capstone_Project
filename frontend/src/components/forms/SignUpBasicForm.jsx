import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function SignUpBasicForm({params}) {
    return (
        <Form className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <Form.Group className='w-100'>
                <FloatingLabel controlId='suEmail' label="email address" className="mb-3">
                    <Form.Control isValid={params.validation.email=='true'} isInvalid={params.validation.email=='false'} type="email" 
                        value={params.userInput.email} onChange={params.onChangeUserInput} name='email' placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className='w-100'>
                <FloatingLabel label="confirm email" className="mb-3">
                    <Form.Control isValid={params.validation.cEmail=='true'} isInvalid={params.validation.cEmail=='false'} id="suConfirmEmail" type="email" 
                        value={params.userInput.cEmail} onChange={params.onChangeUserInput} name='cEmail' placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                        Emails do not match
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className='w-100'>
                <FloatingLabel label="first name" className="mb-3">
                    <Form.Control isValid={params.validation.fname=="true"} isInvalid={params.validation.fname=="false"} id="sufName" type='text' 
                        value={params.userInput.fname} onChange={params.onChangeUserInput} name='fname' placeholder="first name" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className='w-100'>
                <FloatingLabel label="last name" className="mb-3">
                    <Form.Control isValid={params.validation.lname=="true"} isInvalid={params.validation.lname=="false"} id="sulName" type='text' 
                        value={params.userInput.lname} onChange={params.onChangeUserInput} name='lname' placeholder="last name" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className='w-100'>
                <FloatingLabel label="phone number" className="mb-3">
                    <Form.Control isValid={params.validation.phone=="true"} isInvalid={params.validation.phone=="false"} id="suNumber" type='number' 
                        value={params.userInput.phone} onChange={params.onChangeUserInput} name='phone' placeholder="02101201201" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className='w-100'>
                <FloatingLabel label="location" className="mb-3">
                    <Form.Control isValid={params.validation.location=="true"} isInvalid={params.validation.location=="false"} id="suLocation" 
                        value={params.userInput.location} onChange={params.onChangeUserInput} name='location' placeholder="location" />
                </FloatingLabel>
            </Form.Group>
            
            <Button onClick={() => params.onValidate('profile')} style={{ width: "30%"}}>continue</Button>
        </Form>
    )
}