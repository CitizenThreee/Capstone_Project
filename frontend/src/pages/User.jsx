import NavBar from "../components/navigation/NavBar";
import { useUserContext } from "../context/UserProvider";
import SettingsPageContainer from "../components/containers/SettingsPageContainer";
import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import ProfileSettingsForm from "../components/forms/ProfileSettingsForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Page where the user can update their profile details such as profile pic, phone, location, about section
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

    // When the user changes one of the inputs, update the input based on the 'name' prop received from the event (e)
    const onChangeUserInput = (e) => {
        setUserInputs({...userInputs, [e.target.name]: e.target.value})
    }

    // When the user changes their pfp, create a temp url and set the relevant input to the value
    const onChangePfp = (e) => {
        setUserInputs({...userInputs, pfp: URL.createObjectURL(e.target.files[0])})
    }

    // When the user saves their changes, update the database and the user context to reflect the changes
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

    // If the user signs out, reset the user context and navigate to the sign in page
    const onSignOut = () => {
        handleSetUser({});
        navigate("/signin")
    }

    // All the parameters for the profile settings form that the page contains
    const params = {
        userInputs: userInputs,
        onChangeUserInput: onChangeUserInput,
        onChangePfp: onChangePfp,
        onSave: onSave,
        onSignOut: onSignOut
    }

    return(
        <>
            <NavBar title={`${user.fname} ${user.lname}`} create={false} profile={false}></NavBar>
            <DefaultPageContainer text="" link="">
                <SettingsPageContainer>
                    <ProfileSettingsForm params={params}/>
                </SettingsPageContainer>
            </DefaultPageContainer>
        </>
    )
}