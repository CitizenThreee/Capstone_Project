import NavBar from "../components/navigation/NavBar"
import DefaultPageContainer from "../components/containers/DefaultPageContainer"
import { Col, Row } from "react-bootstrap"
import SignUpContainer from "../components/containers/SignUpContainer"

// Sign up page. User can switch to the sign in page if they have an account
export default function SignUp() {
    return(
        <>
            <Row className="m-0">
                <Col md={7} className="d-flex flex-column p-0">
                    <NavBar create={false} profile={false}/>
                    <DefaultPageContainer text="Already have an account?" link="sign in" href="/signin" color="#ddd" shrink={true}></DefaultPageContainer>
                </Col>
                <Col md={5} className="p-0">
                    <SignUpContainer/>
                </Col>
            </Row>
        </>
    )
}