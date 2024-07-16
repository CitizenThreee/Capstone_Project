import { useState } from "react";
import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import InnerPageContainer from "../components/containers/InnerPageContainer";
import NavBar from "../components/navigation/NavBar";
import TabBar from "../components/navigation/TabBar";
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";
import UserCard from "../components/cards/UserCard";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function GroupUsers() {
    const navigate = useNavigate();
    const { currentGroup } = useCurrentGroupContext();

    const onClose = () => {
        navigate(`/${currentGroup._id}`);
    }

    return(
        <>
            <NavBar create={false} title={currentGroup.name} group={true}></NavBar>
            <DefaultPageContainer offset="60">
                <InnerPageContainer>
                    <CloseButton className="ms-auto me-3 mb-3" onClick={onClose}></CloseButton>
                    {currentGroup.users && currentGroup.users.map((user, index) => (
                        <div className="mb-3" key={index}>
                            <UserCard user={user}></UserCard>
                        </div>
                    ))}
                </InnerPageContainer>
            </DefaultPageContainer>
        </>
    )
}