import LocalSquareLogo from "../elements/LocalSquareLogo"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserProfileImage from "../elements/UserProfileImage";
import { useState, useEffect } from "react";
import { MdGroups } from "react-icons/md";
import { HiRectangleGroup } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { VscRequestChanges } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import { GiFamilyTree } from "react-icons/gi";

export default function NavBar({create=true, profile=true, showSearch=false, title="LocalSquare", onSearch, onCreate, setShowFilter, search, group}) {
    const navigate = useNavigate();
    const { currentGroup } = useCurrentGroupContext();
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
                    {title && <h1 className="position-absolute fs-3 fw-medium px-50">{title}</h1>}
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
                {group && <Button className="me-3 p-1 border-0" variant="outline-primary" onClick={() => navigate(`/${currentGroup.id}/settings`)}>
                    <IoMdSettings size={30}/></Button> }
                {group && <Button className="me-3 p-1 border-0" variant="outline-primary" onClick={() => navigate(`/${currentGroup.id}/requests`)}>
                    <VscRequestChanges size={30}/></Button> }
                {group && <Button className="me-3 p-1 border-0" variant="outline-primary" onClick={() => navigate(`/${currentGroup.id}/users`)}>
                    <MdGroups size={30}/></Button> }
                {group && <Button className="me-3 p-1 border-0" variant="outline-primary" onClick={() => navigate(`/${currentGroup.id}/relations`)}>
                    <GiFamilyTree size={30}/></Button> }
                {create && <Button variant="outline-primary" className="me-3" onClick={onCreate}>Create +</Button>}
                {profile && <UserProfileImage></UserProfileImage>}
            </Navbar>
        </>
    )
}