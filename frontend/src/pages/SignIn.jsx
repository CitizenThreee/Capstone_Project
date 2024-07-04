import NavBar from "../components/navigation/NavBar"
import DefaultPageContainer from "../components/containers/DefaultPageContainer"
import { Col, Row } from "react-bootstrap"
import SignInContainer from "../components/containers/SignInContainer"

export default function SignIn() {
    return(
        <>
            <Row className="m-0" style={{ height: "100%", width: "100%"}}>
                <Col md={7} className="d-flex flex-column p-0" style={{ height: "100%" }}>
                    <NavBar create={false} profile={false}></NavBar>
                    <DefaultPageContainer text="Don't have an account?" link="sign up" href="/signup" color="#ddd" shrink={true}></DefaultPageContainer>
                </Col>
                <Col md={5} className="p-0" style={{ height: "100%" }}>
                    <SignInContainer></SignInContainer>
                </Col>
            </Row>
        </>
    )
}