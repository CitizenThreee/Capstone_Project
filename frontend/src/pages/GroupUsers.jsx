import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import InnerPageContainer from "../components/containers/InnerPageContainer";
import NavBar from "../components/navigation/NavBar";
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";
import UserCard from "../components/cards/UserCard";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Page where users can find the other members of a group
export default function GroupUsers() {
    const navigate = useNavigate();
    const { currentGroup } = useCurrentGroupContext();

    // When closed navigates to the main group page
    const onClose = () => {
        navigate(`/${currentGroup._id}`);
    }

    return(
        <>
            <NavBar create={false} title={currentGroup.name} group={true}></NavBar>
            <DefaultPageContainer offset="60">
                <InnerPageContainer>
                    <CloseButton className="ms-auto me-3 mb-3" onClick={onClose}></CloseButton>

                    {/* Map of all the users. Renders a UserCard for each user in the group with status of 'approved' */}
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