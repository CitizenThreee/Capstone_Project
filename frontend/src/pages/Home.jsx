import NavBar from "../components/navigation/NavBar"
import DefaultPageContainer from "../components/containers/DefaultPageContainer"
import { useUserContext } from "../context/UserProvider"

export default function Home() {
    const { user } = useUserContext();
    
    return(
        <>
            <div>
                <NavBar></NavBar>
                <DefaultPageContainer text={user.email ? "You don't have any groups" : "You are not signed in"} link={user.email ? "" : "sign in"}></DefaultPageContainer>
            </div>
        </>
    )
}