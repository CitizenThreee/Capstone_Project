import NavBar from "../components/navigation/NavBar"
import DefaultPageContainer from "../components/containers/DefaultPageContainer"
import { Col, Row } from "react-bootstrap"
import SignUpContainer from "../components/containers/SignUpContainer"

export default function SignUp() {
    return(
        <>
            <Row className="m-0" style={{ height: "100%", width: "100%"}}>
                <Col md={7} className="d-flex flex-column p-0" style={{ height: "100%" }}>
                    <NavBar create={false} profile={false}></NavBar>
                    <DefaultPageContainer text="Already have an account?" link="sign in" href="/signin" color="#ddd" shrink={true}></DefaultPageContainer>
                </Col>
                <Col md={5} style={{ height: "100%", padding: 0 }}>
                    <SignUpContainer></SignUpContainer>
                </Col>
            </Row>
        </>
    )
}