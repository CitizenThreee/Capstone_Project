import { Breadcrumb, BreadcrumbItem, Button } from "react-bootstrap";
import { useUserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useCurrentGroupContext } from "../../context/CurrentGroupProvider";
import { useCurrentTabContext } from "../../context/CurrentTabProvider";
import axios from 'axios';

// The tab bar renders all the tabs in the current group, and handles changing and deleting those tabs
export default function TabBar({ create=true }) {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { currentGroup, handleSetCurrentGroup } = useCurrentGroupContext();
    const { currentTab, handleSetCurrentTab } = useCurrentTabContext();

    // Called when a user switches tabs, gets the content data from the new tab and navigates to the new tab
    const onChangeTab = (tab) => {
        axios.get(`http://localhost:8080/content/tab/${tab._id}`)
            .then(res => {
                handleSetCurrentTab({ tab: tab, content: res.data.data });
                navigate(`/${currentGroup._id}`);
            })
            .catch(err => console.log(err))
    }

    // Called when the user creates a new tab, navigates to the create page ( appends /create to the path )
    const onCreate = () => {
        navigate('create');
    }
    
    // Called when the user deletes a tab, deletes the tab from the database and navigates to the first tab
    const onDelete = (tabid) => {
        axios.delete(`http://localhost:8080/tabs/${tabid}`)
            .then(res => {
                handleSetCurrentGroup({...currentGroup, tabs: currentGroup.tabs.filter(tab => tab._id != tabid)});
                onChangeTab(currentGroup.tabs.length ? currentGroup.tabs[0] : {});
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <ul className="px-4 d-flex align-items-center mb-0 overflow-x-auto overflow-y-hidden gap-5" style={{backgroundColor: "#ddd", listStyleType: "none", height: "40px"}}>
                
                {/* Map of list items that hold the tab name and pass the tab data to onChangeTab when pressed */}
                {currentGroup.tabs && currentGroup.tabs.map((tab, index) => 
                    <li key={index} className="my-2 pt-1 fs-5 d-flex flex-column align-items-center justify-content-between h-100">
                        <div className="d-flex">
                            <button className="border-0" onClick={() => {onChangeTab(tab)}} style={{backgroundColor: "#fff0"}}>{tab.name}</button>
                            
                            {/* Renders a delete button if the user is the owner of the group */}
                            {(user.groupProfile.roles.includes('owner') && currentTab.tab._id == tab._id) && 
                            <button className="border-0 ms-2" style={{backgroundColor: '#0000', color: '#aaa'}} onClick={() => onDelete(tab._id)}>
                                <MdDelete size={20} className="mb-1"/>
                            </button>}
                        </div>
                        
                        {currentTab.tab._id == tab._id && <div style={{backgroundColor: "green", height: "2px", width: "80%"}}></div>}
                        
                    </li>)}

                {/* Renders a create tab button at the end of the list if the user is the owner of the group */}
                {(create && user.groupProfile.roles.includes('owner')) && <li>
                    <Button variant="outline-primary" className="m-0 px-3" onClick={onCreate} style={{height: "30px", lineHeight: "0"}}>+</Button>
                </li>}
            </ul>
        </>
    )
}