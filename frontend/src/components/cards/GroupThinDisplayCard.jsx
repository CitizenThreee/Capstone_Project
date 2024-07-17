import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import axios from 'axios';
import { useUserContext } from "../../context/UserProvider";

// Card for user's groups
export default function GroupThinDisplayCard({ data }) {
    const navigate = useNavigate();
    const { user, handleSetUser } = useUserContext();
    const { handleSetCurrentGroup } = useCurrentGroupContext();

    // Once the user data has been retrieved, get the data of all the group's users and store it in the currentGroup context
    // then navigate to the group page
    const onUserData = () => {
        axios.get(`http://localhost:8080/userGroups/users/${data._id}`)
            .then(res => {
                handleSetCurrentGroup(prev => ({
                    ...prev, 
                    users: res.data.data
                }));
                navigate(`/${data._id}`);
            })
            .catch(err => console.log(err))
    }

    // Once the tab data has been retrieved, update the user with the relevant userGroup data and call onUserData
    const onTabData = () => {
        axios.get('http://localhost:8080/userGroups/user', { params: { userId: user._id, groupId: data._id } })
            .then(res => {
                handleSetUser({...user, groupProfile: res.data.data });
                onUserData();
            })
            .catch(err => console.log(err))
    }

    // When user selects the group, update the currentGroup with the tab data, and call onTabData
    const onSelect = () => {
        axios.get(`http://localhost:8080/tabs/group/${data._id}`)
            .then(res => {
                onTabData();
                handleSetCurrentGroup({ ...data, tabs: res.data.data ? res.data.data : [] });
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Card as="button" bg="light" border="primary" text="dark" className="mb-2 text-start fw-semibold fs-5 position-relative" onClick={onSelect} style={{ width: "45rem", maxWidth: "95vw" }}>
                <Card.Header className="w-100">{data && data.name}</Card.Header>
                <Card.Img variant="bottom" src={data && data.banner} style={{height: "130px", objectFit: "cover"}}/>
                <div className="position-absolute hoverview d-flex justify-content-center align-items-center h-100 w-100"/>
            </Card>
        </>
    )
}