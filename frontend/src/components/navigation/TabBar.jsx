import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";

export default function TabBar({ tabs, setCurrentTab }) {
    
    return (
        <>
            <ul className="px-4 d-flex align-items-center gap-5 mb-0" style={{backgroundColor: "#ddd", listStyleType: "none", height: "40px"}}>
                {tabs && tabs.map((tab, index) => 
                    <li key={index} className="my-2 fs-5" >
                        <button className="border-0" onClick={() => {setCurrentTab(tab.id)}} style={{backgroundColor: "#fff0"}}>{tab.name}</button>
                    </li>)}
            </ul>
        </>
    )
}