import { useNavigate } from "react-router-dom";
import CreateTabForm from "../forms/CreateTabForm";
import { useState } from "react";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import axios from 'axios';

export default function CreateTabContainer() {
    const navigate = useNavigate();
    const { currentGroup, handleSetCurrentGroup } = useCurrentGroupContext();

    const onCreate = (tab) => {
        console.log(tab);
        axios.post('http://localhost:8080/tabs', { ...tab  })
            .then(res => {
                console.log(res);
                if(res.data.data){
                    handleSetCurrentGroup({...currentGroup, tabs: [...currentGroup.tabs, res.data.data]});
                    navigate(-1);
                }
            })
            .catch(err => console.log(err))
    }

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="rounded p-2 d-flex flex-column align-items-center my-auto overflow-y-auto" style={{ backgroundColor: "#ddd", width: "90%", maxWidth: "500px", maxHeight: "90%" }}>
                <CreateTabForm onCreate={onCreate} onCancel={onCancel}></CreateTabForm>
            </div>
        </>
    )
}