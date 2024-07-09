import CreateTabContainer from "../components/containers/CreateTabContainer";
import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import NavBar from "../components/navigation/NavBar";

export default function CreateTab() {
    return( 
        <>
            <NavBar title="Create" create={false}></NavBar>
            <DefaultPageContainer>
                <CreateTabContainer></CreateTabContainer>
            </DefaultPageContainer>
        </>
    )
}