import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import axios from 'axios';
import { useUserContext } from "../../context/UserProvider";

export default function GroupThinDisplayCard({ data }) {
    const navigate = useNavigate();
    const { user, handleSetUser } = useUserContext();
    const { handleSetCurrentGroup } = useCurrentGroupContext();

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

    const onTabData = () => {
        axios.get('http://localhost:8080/userGroups/user', { params: { userId: user._id, groupId: data._id } })
            .then(res => {
                handleSetUser({...user, groupProfile: res.data.data });
                onUserData();
            })
            .catch(err => console.log(err))
    }

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