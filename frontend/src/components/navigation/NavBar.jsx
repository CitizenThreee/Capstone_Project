import LocalSquareLogo from "../elements/LocalSquareLogo"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserProfileImage from "../elements/UserProfileImage";
import { useState, useEffect } from "react";

export default function NavBar({create=true, profile=true, showSearch=false, title="LocalSquare", onSearch, onCreate, setShowFilter, search}) {
    const [width, setWidth] = useState(window.innerWidth);

    //Change width state variable when screen in resized
    useEffect(() => {
        const handleResize = () => { setWidth(window.innerWidth); };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); };
    }, []);

    return(
        <>
            <Navbar className="pe-3 ps-3" style={{ backgroundColor: "#ddd", height: "60px"}}>
                <Navbar.Brand><LocalSquareLogo></LocalSquareLogo></Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <h1 className="position-absolute fs-3 fw-medium px-50">{title}</h1>
                    {showSearch && width > 500 &&
                        <Form className="position-absolute fs-3 fw-medium px-50">
                            <Form.Control
                                type="text"
                                value={search}
                                onChange={(e) => {onSearch(e.target.value)}}
                                onFocus={() => setShowFilter(true)}
                                placeholder="Search"
                                className=" mr-sm-2"
                                style={{width: "30vw"}}
                            />
                        </Form>
                    }
                </Navbar.Collapse>
                {create && <Button className="me-3" onClick={onCreate}>Create +</Button>}
                {profile && <UserProfileImage></UserProfileImage>}
            </Navbar>
        </>
    )
}