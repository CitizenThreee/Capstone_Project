import { useNavigate } from 'react-router-dom';
import SignInForm from '../forms/SignInForm';
import { useUserContext } from '../../context/UserProvider';
import { useState } from 'react';
import { useUserGroupsContext } from '../../context/UserGroupsProvider';

const groups = [
    {
      name: "Tech Innovators",
      description: "A group for tech enthusiasts to share ideas and work on projects together.",
      location: "San Francisco",
      bannerImageURL: "https://static.vecteezy.com/system/resources/previews/000/693/934/original/dark-blue-technology-and-high-tech-abstract-background-vector.jpg"
    },
    {
      name: "Cycling Club",
      description: "Weekly cycling trips and events for cyclists of all levels.",
      location: "Portland",
      bannerImageURL: "https://omgnepal.com/wp-content/uploads/2020/07/Best-Beginner-Road-Bikes-gear-patrol-full-lead.jpg"
    },
    {
      name: "Gaming Guild",
      description: "Connect with fellow gamers for multiplayer sessions and game nights.",
      location: "Boston",
      bannerImageURL: "https://miro.medium.com/v2/resize:fit:4192/1*yj9_ugyJn6XQ5Da9IqCXyg.jpeg"
    }
  ]

export default function SignInContainer() {
    const { handleSetUser } = useUserContext();
    const { handleSetUserGroups } = useUserGroupsContext();
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
                location: "",
                about: mockData.about
            });
            console.log(groups);
            handleSetUserGroups(groups);
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