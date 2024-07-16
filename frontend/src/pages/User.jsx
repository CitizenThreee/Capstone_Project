import NavBar from "../components/navigation/NavBar";
import { useUserContext } from "../context/UserProvider";
import SettingsPageContainer from "../components/containers/SettingsPageContainer";
import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import ProfileSettingsForm from "../components/forms/ProfileSettingsForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function User() {
    const { user, handleSetUser } = useUserContext();
    const navigate = useNavigate();
    const [ userInputs, setUserInputs] = useState({
        pfp: user.pfp,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        website: user.website,
        occupation: user.occupation,
        about: user.about,
        location: user.location
    });

    const onChangeUserInput = (e) => {
        setUserInputs({...userInputs, [e.target.name]: e.target.value})
    }

    const onChangePfp = (e) => {
        setUserInputs({...userInputs, pfp: URL.createObjectURL(e.target.files[0])})
    }

    const onSave = () => {
        axios.put(`http://localhost:8080/users/${user._id}`, {...userInputs})
            .then(res => {
                if(res.data.data){
                    handleSetUser({
                        ...user,
                        pfp: userInputs.pfp,
                        fname: user.fname,
                        lname: user.lname,
                        email: userInputs.email,
                        phone: userInputs.phone,
                        website: userInputs.website,
                        occupation: userInputs.occupation,
                        location: userInputs.location,
                        about: userInputs.about
                    });
                    navigate(-1);
                }
            })
            .catch(err => console.log(err))
    }

    const onCancel = () => {
        onClose();
    }

    const onClose = () => {
        navigate(-1)
    }

    const onSignOut = () => {
        handleSetUser({});
        navigate("/signin")
    }

    const params = {
        userInputs: userInputs,
        onChangeUserInput: onChangeUserInput,
        onChangePfp: onChangePfp,
        onCancel: onCancel,
        onSave: onSave,
        onSignOut: onSignOut,
        onClose: onClose
    }

    return(
        <>
            <NavBar title={`${user.fname} ${user.lname}`} create={false} profile={false}></NavBar>
            <DefaultPageContainer text="" link="">
                <SettingsPageContainer>
                    <ProfileSettingsForm params={params}></ProfileSettingsForm>
                </SettingsPageContainer>
            </DefaultPageContainer>
        </>
    )
}