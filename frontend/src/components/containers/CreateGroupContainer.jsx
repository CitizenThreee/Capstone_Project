import { useNavigate } from "react-router-dom";
import CreateGroupForm from "../forms/CreateGroupForm";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import { useGroupsContext } from "../../context/GroupsProvider";
import axios from 'axios';
import { useUserContext } from "../../context/UserProvider";

export default function CreateGroupContainer() {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { handleSetCurrentGroup } = useCurrentGroupContext();
    const { groups, handleSetGroups } = useGroupsContext();

    const onCreated = (newGroup) => {
        axios.post('http://localhost:8080/userGroups', { userId: user._id, groupId: newGroup._id, status: 'approved', roles: ['owner'] })
            .then(res => {
                console.log(res);
                handleSetGroups([...groups, newGroup]);
                navigate(`/${newGroup._id}`);
            })
            .catch(err => console.log(err))
    }

    const onCreate = (name) => {
        const newGroup = {
            name: name,
            description: "",
            location: "",
            banner: "",
            roles: ['owner', 'admin', 'member']
        }

        axios.post('http://localhost:8080/groups/create', {...newGroup})
            .then(res => {
                console.log(res);
                handleSetCurrentGroup({...res.data.data, tabs: [], users: []});
                onCreated(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="rounded p-2 d-flex flex-column align-items-center my-auto" style={{ backgroundColor: "#ddd", width: "90%", maxWidth: "500px" }}>
                <CreateGroupForm onCreate={onCreate} onCancel={onCancel}></CreateGroupForm>
            </div>
        </>
    )
}