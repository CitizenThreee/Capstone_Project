import { useState } from 'react';
import SignUpBasicForm from '../forms/SignUpBasicForm';
import SignUpProfileForm from '../forms/SignUpProfileForm';
import SignUpPasswordForm from '../forms/SignUpPasswordForm';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserProvider';
import axios from 'axios';

// Container for the sign up page
export default function SignUpContainer() {
    const { handleSetUser } = useUserContext();
    const navigate = useNavigate();
    const [stage, setStage] = useState("basic");

    const [ validation, setValidation ] = useState({
        email: null,
        cEmail: null,
        fname: null,
        lname: null,
        phone: null,
        location: null,
        password: null
    });

    const [ userInput, setUserInput ] = useState({
        email: "",
        cEmail: "",
        fname: "",
        lname: "",
        phone: "",
        location: "",
        pfp: "",
        occupation: "",
        website: "",
        about: "",
        password: "",
        cPassword: ""
    })

    // Change a validation value
    const onChangeValidation = ({name, value}) => {
        setValidation(prev => ({ ...prev, [name]: value }))
    }

    // Change a user input
    const onChangeUserInput = (e) => {
        setUserInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Change the user pfp
    const onChangePfp = (e) => {
        setUserInput(prev => ({ ...prev, pfp: URL.createObjectURL(e.target.files[0]) }))
    }

    // Check the user inputs and set validation. Change the stage if the validation passes
    function ValidateBasic(destination) {
        let passed = true;

        if(userInput.email.length < 6){ passed=false; onChangeValidation({name: "email", value: "false"}); }
        else { onChangeValidation({name: "email", value: "true"}); }
        if(userInput.email != userInput.cEmail || !userInput.email){ passed=false; onChangeValidation({name: "cEmail", value: "false"}); }
        else { onChangeValidation({name: "cEmail", value: "true"}); }
        if(!userInput.fname.length){ passed=false; onChangeValidation({name: "fname", value: "false"}) }
        else { onChangeValidation({name: "fname", value: "true"}); }
        if(!userInput.lname.length){ passed=false; onChangeValidation({name: "lname", value: "false"}) }
        else { onChangeValidation({name: "lname", value: "true"}); }
        if(userInput.phone.length > 12 || userInput.phone.length < 8){ passed=false; onChangeValidation({name: "phone", value: "false"}) }
        else { onChangeValidation({name: "phone", value: "true"}); }
        if(!userInput.location.length) { passed=false; onChangeValidation({name: "location", value: "false"})}
        else { onChangeValidation({name: "location", value: "true"}); }

        setStage(passed ? destination : "basic");
    }

    // Validate the user's inputed password (check if the two passwords match) and if
    // passed, update the database with the new user
    function ValidatePassword() {
        let passed = true;

        if(userInput.password != userInput.cPassword) { passed=false; onChangeValidation({name: "password", value: "false"}) }
        
        if( passed ) {
            const userData = {
                email: userInput.email,
                fname: userInput.fname,
                lname: userInput.lname,
                phone: userInput.phone,
                pfp: userInput.pfp,
                occupation: userInput.occupation,
                website: userInput.website,
                about: userInput.about,
                location: userInput.location
            }

            axios.post('http://localhost:8080/users', { ...userData, password: userInput.password })
            .then(res => {
                handleSetUser({...userData, groupIds: [], groupProfile: {}});
                navigate('/');
            })
            .catch(err => console.log(err));
        }
    }

    //Parameters for the basic tab form controls and validation function
    const basicParams = {
        userInput: userInput,
        onChangeUserInput: onChangeUserInput,
        validation: validation,
        onValidate: ValidateBasic
    }

    //Parameters for the profile form controls
    const profileParams = {
        userInput: userInput,
        onChangeUserInput: onChangeUserInput,
        onChangePfp: onChangePfp,
        setStage: setStage
    }

    //Parameters for the password form controls and validation
    const passwordParams = {
        userInput: userInput,
        onChangeUserInput: onChangeUserInput,
        validation: validation,
        onValidate: ValidatePassword
    }

    //Renders a breadcrumb above one of the forms based on what the stage state variable is set to
    return (
        <>
            <div className='ps-5 pe-5 d-flex flex-column vh-100 w-100' style={{overflow: "auto", backgroundColor: "#eee"}}>
                <Breadcrumb className='mx-auto mt-3'>
                    <Breadcrumb.Item active={stage=="basic"} onClick={() => setStage("basic")}>basic</Breadcrumb.Item>
                    <Breadcrumb.Item active={stage=="profile"} onClick={() => ValidateBasic("profile")}>profile </Breadcrumb.Item>
                    <Breadcrumb.Item active={stage=="password"} onClick={() => ValidateBasic("password")}>password</Breadcrumb.Item>
                </Breadcrumb>
    
                { stage == "basic" && <SignUpBasicForm params={basicParams}/> }
                { stage == "profile" && <SignUpProfileForm params={profileParams}/> }
                { stage == "password" && <SignUpPasswordForm params={passwordParams}/> }
            </div>
        </>
    )
}