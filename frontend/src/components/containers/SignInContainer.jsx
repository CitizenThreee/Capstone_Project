import { useNavigate } from 'react-router-dom';
import SignInForm from '../forms/SignInForm';
import { useUserContext } from '../../context/UserProvider';
import { useState } from 'react';
import axios from 'axios';

export default function SignInContainer() {
    const { handleSetUser } = useUserContext();

    const navigate = useNavigate();

    const [ validation, setValidation ] = useState(true);

    const onReset = () => {
        setValidation(true);
    }

    const onSignin = ({ email, password }) => {
        axios.post('http://localhost:8080/users/signin', {
            email: email,
            password: password
        })
        .then(res => {
            handleSetUser({...res.data.data, groupIds: [], groupProfile: {}});
            navigate('/');
        })
        .catch(err => {
            if(err.response.status == 404){
                setValidation(false);
            }
            console.log(err);
        })
    }

    const signinProps = {
        validation: validation,
        onReset: onReset,
        onSignin: onSignin
    }

    return (
        <>
            <div className='pe-5 ps-5' style={{backgroundColor: "#eee"}}>
                <SignInForm {...signinProps} ></SignInForm>
            </div>
            
        </>
    )
}