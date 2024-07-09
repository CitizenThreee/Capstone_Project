import { useNavigate } from "react-router-dom";
import CreateTabForm from "../forms/CreateTabForm";
import { useState } from "react";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";

const roles = [
    { name: "owner" },
    { name: "admin" },
    { name: "member" }
]

export default function CreateTabContainer() {
    const navigate = useNavigate();
    const { currentGroup, handleSetCurrentGroup } = useCurrentGroupContext();

    const onCreate = (tab) => {
        handleSetCurrentGroup({...currentGroup, tabs: [...currentGroup.tabs, tab]});
    }

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="rounded p-2 d-flex flex-column align-items-center my-auto overflow-y-auto" style={{ backgroundColor: "#ddd", width: "90%", maxWidth: "500px", maxHeight: "90%" }}>
                <CreateTabForm onCreate={onCreate} onCancel={onCancel} roles={roles}></CreateTabForm>
            </div>
        </>
    )
}