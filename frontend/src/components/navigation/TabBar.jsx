import { Breadcrumb, BreadcrumbItem, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TabBar({ tabs, currentTab, setCurrentTab, onCreate }) {
    return (
        <>
            <ul className="px-4 d-flex align-items-center mb-0 overflow-x-auto overflow-y-hidden gap-5" style={{backgroundColor: "#ddd", listStyleType: "none", height: "40px"}}>
                {tabs && tabs.map((tab, index) => 
                    <li key={index} className="my-2 pt-1 fs-5 d-flex flex-column align-items-center justify-content-between" style={{height: "100%"}} >
                        <button className="border-0" onClick={() => {setCurrentTab(tab.id)}} style={{backgroundColor: "#fff0"}}>{tab.name}</button>
                        {currentTab.id == tab.id && <div style={{backgroundColor: "green", height: "2px", width: "80%"}}></div>}
                    </li>)}
                <li>
                    <Button variant="outline-primary" className="m-0 px-3" onClick={onCreate} style={{height: "30px", lineHeight: "0"}}>+</Button>
                </li>
                
            </ul>
            
        </>
    )
}