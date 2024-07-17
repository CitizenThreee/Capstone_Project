import NavBar from "../components/navigation/NavBar"
import DefaultPageContainer from "../components/containers/DefaultPageContainer"
import { Col, Row } from "react-bootstrap"
import SignInContainer from "../components/containers/SignInContainer"

// Sign in page. User can swap to the sign up page if they don't have an account
export default function SignIn() {
    return(
        <>
            <Row className="m-0">
                <Col md={7} className="d-flex flex-column p-0">
                    <NavBar create={false} profile={false}></NavBar>
                    <DefaultPageContainer text="Don't have an account?" link="sign up" href="/signup" color="#ddd" shrink={true}>
                    </DefaultPageContainer>
                </Col>
                <Col md={5} className="p-0">
                    <SignInContainer></SignInContainer>
                </Col>
            </Row>
        </>
    )
}