import { useState } from "react"
import { CloseButton, Form } from "react-bootstrap"

export default function FilterBarContainer({ onClose, onChangeFilters }) {
    const [ members, setMembers ] = useState(0);
    const [ distance, setDistance ] = useState(0);
    const [ type, setType ] = useState(0);
    const [ sort, setSort ] = useState(0);

    return(
        <>
            <div className="d-flex flex-column" style={{ position: "sticky", top: -5, zIndex: 2}}>
                <div className="rounded-3 mx-auto mt-2 d-flex align-items-center justify-content-between px-3 border border-dark w-100" style={{height: "40px", maxWidth: "1000px", backgroundColor: "#f5f5f5dd"}}>
                    <Form className="d-flex justify-content-evenly" style={{width: "90%"}}>
                        <Form.Group className="d-flex align-items-center" controlId="filterDistance" >
                            <Form.Label column className="me-2">Distance</Form.Label>
                            <Form.Select disabled size="sm" value={distance} onChange={(e) => setDistance(e.target.value)}>
                                    <option value="0">All</option>
                                    <option value="1">10km</option>
                                    <option value="2">30km</option>
                                    <option value="3">60km</option>
                                    <option value="4">100km</option>
                                    <option value="5">200km</option>
                            </Form.Select>
                        </Form.Group>
                        
                        {/*<Dropdown>
                            <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                                {members.map(item => item + " | ")}
                            </Dropdown.Toggle>
                            <Dropdown.Menu size="sm">
                                {membersCounts.map((option, index) => (
                                    <Dropdown.Item key={index} onClick={(e) => ToggleMemberCounts(e, option)} active={ members.includes(option)} >
                                        {option}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>*/}

                        <Form.Group className="d-flex align-items-center" controlId="filterTypes" >
                            <Form.Label column className="me-2">Type</Form.Label>
                            <Form.Select disabled size="sm" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="0">All</option>
                                    <option value="1">Community</option>
                                    <option value="2">Group</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center" controlId="filterMembers" >
                            <Form.Label column className="me-2">Members</Form.Label>
                            <Form.Select size="sm" value={members} onChange={(e) => setMembers(e.target.value)}>
                                    <option value="0">All</option>
                                    <option value="1">10+</option>
                                    <option value="2">50+</option>
                                    <option value="3">100+</option>
                                    <option value="4">500+</option>
                                    <option value="5">1000+</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center" controlId="filterSort" >
                            <Form.Label column className="me-2">Sort</Form.Label>
                            <Form.Select size="sm" value={sort} onChange={(e) => setSort(e.target.value)}>
                                    <option value="0">A - Z</option>
                                    <option value="1">Z - A</option>
                                    <option value="2">Most Members</option>
                                    <option value="3">Least Members</option>
                                    <option value="4">Newest</option>
                                    <option value="5">Oldest</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    
                        
                    <CloseButton className="float-end" onClick={onClose}/> 
                </div>
            </div>
        </>
    )
}