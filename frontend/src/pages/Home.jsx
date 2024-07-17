import NavBar from "../components/navigation/NavBar"
import DefaultPageContainer from "../components/containers/DefaultPageContainer"
import { useUserContext } from "../context/UserProvider"
import { useEffect, useState } from "react";
import FilterBarContainer from "../components/containers/FilterBarContainer";
import { useGroupsContext } from "../context/GroupsProvider";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import InnerPageContainer from "../components/containers/InnerPageContainer";
import GroupThinDisplayCard from "../components/cards/GroupThinDisplayCard";
import GroupDisplayCard from "../components/cards/GroupDisplayCard";

// Home page that holds the containers for the user's groups and the group search
export default function Home() {
    const navigate = useNavigate();
    const { user, handleSetUser } = useUserContext();
    const { groups, handleSetGroups } = useGroupsContext();
    const [ filteredGroups, setFilteredGroups ] = useState([]);
    const [ search, setSearch ] = useState("");
    //const [ filters, setFilters ] = useState({});
    const [ showFilter, setShowFilter ] = useState(false);
    
    // Called when the search bar value is updated, filters the groups based on the search value
    const onSearch = (value) => {
        setSearch(value);
        if(value){
            setFilteredGroups(groups.filter(group => group.name.toLowerCase().includes(value.toLowerCase())))
        }
        else{
            setFilteredGroups([...groups])
        }
    }

    // When the search bar is focused, sets the showFilter, displaying all the groups and sets the 
    // filtered groups array to the default
    const onFocus = () => {
        setShowFilter(true);
        setFilteredGroups([...groups]);
    }

    // When the filter bar is closed, sets the search to '' and changes showFilter, displaying the
    // user's groups
    const onClose = () => {
        setShowFilter(false);
        setSearch('');
    }

    // Gets the user and group data from the database and populates the respective contexts
    useEffect(() => {
        if(user.email){
            axios.get('http://localhost:8080/userGroups/groupsIds', {
                params: { userId: user._id }
            })
            .then(res => {
                handleSetUser({...user, groupIds: res.data.data})
            })
            .catch(err => console.log(err))
    
            axios.get('http://localhost:8080/groups')
            .then(res => {
                handleSetGroups(res.data.data)})
            .catch(err => console.log(err))
        }
    }, [])

    return(
        <>
            <div>
                <NavBar create={user.email ? true : false} showSearch={user.email} onFocus={onFocus} search={search} onSearch={onSearch}/>

                <div style={{overflow: "auto", backgroundColor: "#eee"}}>
                    <DefaultPageContainer text={user.email ? "" : "You are not signed in"} link={user.email ? "" : "sign in"}>

                        {/* Filter and map of all filtered groups */}
                        {showFilter && <FilterBarContainer onClose={onClose}></FilterBarContainer>}
                        {user.email && showFilter && <InnerPageContainer>
                            {filteredGroups.map((group, id) => (
                                <div key={id} className="mb-3 mx-2">
                                    <GroupDisplayCard data={group}/>
                                </div>
                            ))}
                        </InnerPageContainer>}

                        {/* Map of all user's groups */}
                        {user.email && !showFilter && <InnerPageContainer>
                            <h2 className="mb-3">Your Groups:</h2>
                            {groups.filter(group => user.groupIds.includes(group._id)).map((group, id) => (
                                <div key={id} className="mb-3 mx-2">
                                    <GroupThinDisplayCard data={group}/>
                                </div>
                            ))}
                        </InnerPageContainer>}
                        
                    </DefaultPageContainer>
                </div>
                
            </div>
        </>
    )
}