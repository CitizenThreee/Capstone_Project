import NavBar from "../components/navigation/NavBar"
import DefaultPageContainer from "../components/containers/DefaultPageContainer"
import { useUserContext } from "../context/UserProvider"
import GroupDisplayCard from "../components/cards/GroupDisplayCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

export default function Home() {
    const { user } = useUserContext();
    const [search, setSearch] = useState("")
    
    return(
        <>
            <div>
                <NavBar create={user.email ? true : false} search={user.email} title=""></NavBar>
                <DefaultPageContainer text={user.email ? "" : "You are not signed in"} link={user.email ? "" : "sign in"}>
                    <div className="d-flex flex-wrap justify-content-center py-3 px-1" style={{width: "100%"}}>
                        {Array.from({ length: 12 }).map((_, id) => (
                            <div key={id} className="mb-3 mx-2">
                                <GroupDisplayCard></GroupDisplayCard>
                            </div>
                        ))}
                    </div>
                </DefaultPageContainer> 
            </div>
        </>
    )
}