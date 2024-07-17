import { Link } from "react-router-dom";

// A generic default page container that places content and children in the right place
export default function DefaultPageContainer({text="", link="", href="/signin", color="#eee", offset="60", children}) {
    return(
        <div className={`d-flex align-items-center flex-column overflow-hidden`} style={{ backgroundColor: color, height: ("calc(100vh - " + offset + "px)") }}>
            {text && <div className="py-3 d-flex flex-column align-items-center my-auto">
                <p className="fs-5 m-1">{text}</p>
                <Link to={href} replace>{link}</Link>
            </div>}
            
            {children}
        </div>
    )
}