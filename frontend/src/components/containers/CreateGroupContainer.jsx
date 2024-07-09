import { useNavigate } from "react-router-dom";
import CreateGroupForm from "../forms/CreateGroupForm";
import DefaultPageContainer from "./DefaultPageContainer";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import { useUserGroupsContext } from "../../context/UserGroupsProvider";

export default function CreateGroupContainer() {
    const navigate = useNavigate();
    const { handleSetCurrentGroup } = useCurrentGroupContext();
    const { userGroups, handleSetUserGroups } = useUserGroupsContext();

    const onCreate = (name) => {
        const newGroup = {
            id: userGroups.length,
            name: name,
            description: "",
            location: "",
            bannerImageURL: "",
        }

        handleSetCurrentGroup({...newGroup, tabs: []})
        handleSetUserGroups([...userGroups, newGroup])
        navigate(`/${newGroup.id}`)
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