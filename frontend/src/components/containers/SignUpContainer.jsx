import { useState } from 'react';
import SignUpBasicForm from '../forms/SignUpBasicForm';
import SignUpProfileForm from '../forms/SignUpProfileForm';
import SignUpPasswordForm from '../forms/SignUpPasswordForm';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserProvider';

export default function SignUpContainer() {
    const { handleSetUser } = useUserContext();
    const navigate = useNavigate();
    const [stage, setStage] = useState("basic");

    //All the state controls for the form fields and state variables for form validation
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [profilePic, setProfilePic] = useState("/avatar_placeholder.jpg");
    const [occupation, setOccupation] = useState("");
    const [website, setWebsite] = useState("");
    const [about, setAbout] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailValid, setEmailValid] = useState("");
    const [confirmEmailValid, setConfirmEmailValid] = useState("");
    const [firstNameValid, setFirstNameValid] = useState("");
    const [lastNameValid, setLastNameValid] = useState("");
    const [phoneValid, setPhoneValid] = useState("");
    const [locationValid, setLocationValid] = useState("");
    const [passwordValid, setPasswordValid] = useState("");
    const [confirmPasswordValid, setConfirmPasswordValid] = useState("");

    //Setters for all the form field controls. Set the form and reset the validation states when a change is made
    const changeEmail = (value) => { setEmail(value); setEmailValid(""); }
    const changeConfirmEmail = (value) => { setConfirmEmail(value); setConfirmEmailValid(""); }
    const changeFirstName = (value) => { setFirstName(value); setFirstNameValid(""); }
    const changeLastName = (value) => { setLastName(value); setLastNameValid(""); }
    const changePhone = (value) => { setPhone(value); setPhoneValid(""); }
    const changeLocation = (value) => { setLocation(value); setLocationValid(""); }
    const changePassword = (value) => { setPassword(value); setPasswordValid("") }
    const changeConfirmPassword = (value) => { setConfirmPassword(value); setConfirmPasswordValid("") }

    //This will be moved to the backend
    function ValidateBasic(destination) {
        let passed = true;

        if(email.length < 6){ passed=false; setEmailValid("false"); }
        else { setEmailValid("true"); }
        if(email != confirmEmail){ passed=false; setConfirmEmailValid("false"); }
        else { setConfirmEmailValid("true"); }
        if(!firstName.length){ passed=false; setFirstNameValid("false") }
        else { setFirstNameValid("true") }
        if(!lastName.length){ passed=false; setLastNameValid("false") }
        else { setLastNameValid("true") }
        if(phone.length > 12 || phone.length < 8){ passed=false; setPhoneValid("false") }
        else { setPhoneValid("true") }

        setStage(passed ? destination : "basic");
    }

    //This will be moved to the backend
    function ValidatePassword() {
        let passed = true;

        if(password != confirmPassword) { passed=false; setConfirmPasswordValid("false") }
        
        if( passed ) {
            handleSetUser({
                email: email,
                fname: firstName,
                lname: lastName,
                phone: phone,
                pfp: profilePic,
                occupation: occupation,
                website: website,
                about: about
            });
            navigate('/');
        }
    }

    //Parameters for the basic tab validation state variables
    const basicValid = {
        emailValid: emailValid,
        confirmEmailValid: confirmEmailValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        phoneValid: phoneValid,
        locationValid: locationValid
    }

    //Parameters for the basic tab form controls and validation function
    const basicParams = {
        email: email,
        setEmail: changeEmail,
        confirmEmail: confirmEmail,
        setConfirmEmail: changeConfirmEmail,
        firstName: firstName,
        setFirstName: changeFirstName,
        lastName: lastName,
        setLastName: changeLastName,
        phone: phone,
        setPhone: changePhone,
        location: location,
        setLocation: changeLocation,
        validate: ValidateBasic
    }

    //Parameters for the profile form controls
    const profileParams = {
        setStage: setStage,
        pfp: profilePic,
        setPfp: setProfilePic,
        occupation: occupation,
        setOccupation: setOccupation,
        website: website,
        setWebsite: setWebsite,
        about: about,
        setAbout: setAbout
    }

    //Parameters for the password form controls and validation
    const passwordParams = {
        password: password,
        setPassword: changePassword,
        passwordValid: passwordValid,
        confirmPassword: confirmPassword,
        confirmPasswordValid: confirmPasswordValid,
        setConfirmPassword: changeConfirmPassword,
        validate: ValidatePassword
    }

    //Renders a breadcrumb above one of the forms based on what the stage state variable is set to
    return (
        <>
            <div className='ps-5 pe-5 d-flex flex-column' style={{overflow: "auto", height: "100vh", width: "100%", backgroundColor: "#eee"}}>
                <Breadcrumb className='mx-auto mt-3'>
                    <Breadcrumb.Item active={stage=="basic"} onClick={() => setStage("basic")}>basic</Breadcrumb.Item>
                    <Breadcrumb.Item active={stage=="profile"} onClick={() => ValidateBasic("profile")}>profile </Breadcrumb.Item>
                    <Breadcrumb.Item active={stage=="password"} onClick={() => ValidateBasic("password")}>password</Breadcrumb.Item>
                </Breadcrumb>
    
                { stage == "basic" && <SignUpBasicForm {...basicParams} {...basicValid}/> }
                { stage == "profile" && <SignUpProfileForm {...profileParams}/> }
                { stage == "password" && <SignUpPasswordForm {...passwordParams}/> }
            </div>
        </>
    )
}