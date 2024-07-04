import LocalSquareLogo from "../elements/LocalSquareLogo"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserProfileImage from "../elements/UserProfileImage";

export default function NavBar({create=true, profile=true}) {
    return(
        <>
            <Navbar className="pe-3 ps-3" style={{ backgroundColor: "#ddd", height: "10vh"}}>
                <Navbar.Brand><LocalSquareLogo></LocalSquareLogo></Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <h1 className="position-absolute fs-3 fw-medium" style={{ left: "50%", transform: "translateX(-50%)" }}>LocalSquare</h1>
                </Navbar.Collapse>
                {create && <Button className="justify-content-end me-3">Create +</Button>}
                {profile && <UserProfileImage></UserProfileImage>}
            </Navbar>
        </>
    )
}