import CreateGroupContainer from "../components/containers/CreateGroupContainer";
import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import NavBar from "../components/navigation/NavBar";

export default function CreateGroup() {
    return (
        <>
            <NavBar title="Create" create={false}></NavBar>
            <DefaultPageContainer>
                <CreateGroupContainer></CreateGroupContainer>
            </DefaultPageContainer>
        </>
    )
}