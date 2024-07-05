import { useNavigate } from 'react-router-dom';
import SignInForm from '../forms/SignInForm';
import { useUserContext } from '../../context/UserProvider';
import { useState } from 'react';

export default function SignInContainer() {
    const { handleSetUser } = useUserContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailCorrect, setEmailCorrent] = useState("");
    const [passwordCorrect, setPasswordCorrect] = useState("");

    const mockData = {
        email: "albeisly@gmail.com",
        password: "abc123",
        fname: "Aedan",
        lname: "Beisly",
        phone: "02102608347",
        pfp: "/headshot.JPG",
        occupation: "Software Engineer",
        website: "CitizenThreee.github.io",
        about: "This is me!"
    }

    const changeEmail = (value) => { setEmail(value); setEmailCorrent(""); setPasswordCorrect(""); }
    const changePassword = (value) => { setPassword(value); setEmailCorrent(""); setPasswordCorrect(""); }
    
    function Validate(){
        if(mockData.email != email || mockData.password != password){ setEmailCorrent("false"); setPasswordCorrect("false"); }
        else {
            handleSetUser({
                email: mockData.email,
                fname: mockData.fname,
                lname: mockData.lname,
                phone: mockData.phone,
                pfp: mockData.pfp,
                occupation: mockData.occupation,
                website: mockData.website,
                about: mockData.about
            });
            navigate('/');
        }
    }

    const signinProps = {
        email: email,
        password: password,
        setEmail: changeEmail,
        setPassword: changePassword,
        emailCorrect: emailCorrect,
        passwordCorrect: passwordCorrect,
        validate: Validate
    }

    return (
        <>
            <div className='pe-5 ps-5' style={{backgroundColor: "#eee"}}>
                <SignInForm {...signinProps} ></SignInForm>
            </div>
            
        </>
    )
}