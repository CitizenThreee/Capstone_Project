import NavBar from "../components/navigation/NavBar";
import { useUserContext } from "../context/UserProvider";
import SettingsPageContainer from "../components/containers/SettingsPageContainer";
import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import ProfileSettingsForm from "../components/forms/ProfileSettingsForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
    const { user, handleSetUser } = useUserContext();
    const navigate = useNavigate();

    const [ pfp, setPfp] = useState();
    const [ fname, setFname] = useState();
    const [ lname, setLname] = useState();
    const [ email, setEmail] = useState();
    const [ phone, setPhone] = useState();
    const [ website, setWebsite] = useState();
    const [ occupation, setOccupation] = useState();
    const [ about, setAbout] = useState();
    const [ location, setLocation] = useState();

    function SetDefaults() {
        setPfp(user.pfp);
        setFname(user.fname);
        setLname(user.lname);
        setEmail(user.email);
        setPhone(user.phone);
        setWebsite(user.website);
        setOccupation(user.occupation);
        setAbout(user.about);
        setLocation(user.location);
    }

    useEffect(() => {
        SetDefaults();
    }, [user])

    const changePfp = (x) => { setPfp(x); }
    const changeFname = (x) => { setFname(x); }
    const changeLname = (x) => { setLname(x); }
    const changeEmail = (x) => { setEmail(x); }
    const changePhone = (x) => { setPhone(x); }
    const changeWebsite = (x) => { setWebsite(x); }
    const changeOccupation = (x) => { setOccupation(x); }
    const changeAbout = (x) => { setAbout(x); }
    const changeLocation = (x) => { setLocation(x); }

    const onSave = () => {
        handleSetUser({
            pfp: pfp,
            fname: user.fname,
            lname: user.lname,
            email: email,
            phone: phone,
            website: website,
            occupation: occupation,
            location: location,
            about: about
        });
    }

    const onClose = () => {
        navigate(-1)
    }

    const onSignOut = () => {
        handleSetUser({});
        navigate("/signin")
    }

    const profileParams = {
        pfp: pfp,
        setPfp: changePfp,
        fname: fname,
        setFname: changeFname,
        lname: lname,
        setLname: changeLname,
        email: email,
        setEmail: changeEmail,
        phone: phone,
        setPhone: changePhone,
        website: website,
        setWebsite: changeWebsite,
        occupation: occupation,
        setOccupation: changeOccupation,
        about: about,
        setAbout: changeAbout,
        location: location,
        setLocation: changeLocation,
        onCancel: SetDefaults,
        onSave: onSave,
        onSignOut: onSignOut,
        onClose: onClose
    }

    return(
        <>
            <NavBar title={`${user.fname} ${user.lname}`} create={false} profile={false}></NavBar>
            <DefaultPageContainer text="" link="">
                <SettingsPageContainer>
                    <ProfileSettingsForm {...profileParams}></ProfileSettingsForm>
                </SettingsPageContainer>
            </DefaultPageContainer>
        </>
    )
}