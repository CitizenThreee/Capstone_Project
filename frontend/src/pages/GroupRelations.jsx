import { useState } from "react";
import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import GroupSearchContainer from "../components/containers/GroupSearchContainer";
import InnerPageContainer from "../components/containers/InnerPageContainer";
import NavBar from "../components/navigation/NavBar";
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";
import { Dropdown } from "react-bootstrap";
import TabBar from "../components/navigation/TabBar";

export default function GroupRelations() {
    const { currentGroup } = useCurrentGroupContext();
    const [ selectedTypes, setSelectedTypes ] = useState([]);
    const [ parentGroups, setParentGroups ] = useState([]);
    const [ siblingGroups, setSiblingGroups ] = useState([]);
    const [ childGroups, setChildGroups ] = useState([]);

    const types = ["Parents","Siblings","Children"];

    function ToggleSelectedType(e, option) {
        e.stopPropagation();

        if(selectedTypes.includes(option)){
            setSelectedTypes(selectedTypes.filter(type => type != option))
        }
        else { setSelectedTypes([...selectedTypes, option]); }
    }

    return(
        <>
            <NavBar create={false} title={currentGroup.name} group={true}></NavBar>
            <TabBar></TabBar>
            <DefaultPageContainer offset="100">
                <InnerPageContainer>
                    <Dropdown className="mb-5">
                        <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
                            {selectedTypes.length ? selectedTypes.map(item => item + " | ") : "all"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu size="sm">
                            {types.map((option, index) => (
                                <Dropdown.Item key={index} onClick={(e) => ToggleSelectedType(e, option)} active={selectedTypes.includes(option)} >
                                    {option}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {(selectedTypes.includes("Parents") || !selectedTypes.length) && 
                    <div>
                        <h2 className="mb-3">Parent Groups</h2>
                        {parentGroups.length ? <GroupSearchContainer data={parentGroups}></GroupSearchContainer> 
                        : <p className="text-center">No parent groups found</p>}
                    </div>}
                    {(selectedTypes.includes("Siblings") || !selectedTypes.length) && 
                    <div>
                        <h2 className="mb-3">Sibling Groups</h2>
                        {siblingGroups.length ? <GroupSearchContainer data={siblingGroups}></GroupSearchContainer> 
                        : <p className="text-center">No sibling groups found</p>}
                    </div>}
                    {(selectedTypes.includes("Children") || !selectedTypes.length) && 
                    <div>
                        <h2 className="mb-3">Child Groups</h2>
                        {childGroups.length ? <GroupSearchContainer data={childGroups}></GroupSearchContainer> 
                        : <p className="text-center">No child groups found</p>}
                    </div>}
                </InnerPageContainer>
            </DefaultPageContainer>
        </>
    )
}