import { useNavigate } from "react-router-dom";
import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import SettingsPageContainer from "../components/containers/SettingsPageContainer";
import CreateGroupForm from "../components/forms/CreateGroupForm";
import NavBar from "../components/navigation/NavBar";
import { useUserContext } from "../context/UserProvider";
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";
import { useGroupsContext } from "../context/GroupsProvider";
import axios from 'axios';

// Page for creating a new group
export default function CreateGroup() {
    const navigate = useNavigate();
    const { user, handleSetUser } = useUserContext();
    const { handleSetCurrentGroup } = useCurrentGroupContext();
    const { groups, handleSetGroups } = useGroupsContext();

    // Once created, creates a new userGroup for the user, sets the group context, and navigates to the new group
    const onCreated = (newGroup) => {
        axios.post('http://localhost:8080/userGroups', { userId: user._id, groupId: newGroup._id, status: 'approved', roles: ['owner'] })
            .then(res => {
                handleSetUser({...user, groupProfile: res.data.data });
                handleSetGroups([...groups, newGroup]);
                navigate(`/${newGroup._id}`);
            })
            .catch(err => console.log(err))
    }

    // When a user creates a group, update the database with new group data and call onCreated
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
                handleSetCurrentGroup({...res.data.data, tabs: [], users: []});
                onCreated(res.data.data);
            })
            .catch(err => console.log(err))
    }

    // When user cancels the group creation, navigate to the previous page
    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <NavBar title="Create" create={false}></NavBar>
            <DefaultPageContainer>
                <SettingsPageContainer>
                    <CreateGroupForm onCreate={onCreate} onCancel={onCancel}></CreateGroupForm>
                </SettingsPageContainer>
            </DefaultPageContainer>
        </>
    )
}