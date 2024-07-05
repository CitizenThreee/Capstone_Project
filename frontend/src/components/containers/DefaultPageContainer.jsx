import { Link } from "react-router-dom";

export default function DefaultPageContainer({text="You are not signed in", link="sign in", href="/signin", color="#eee", children}) {
    return(
        <div className="hf-md d-flex align-items-center flex-column" style={{ backgroundColor: color }}>
            {text && <div className="py-3 d-flex flex-column align-items-center my-auto">
                <p className="fs-5 m-1">{text}</p>
                <Link to={href} replace>{link}</Link>
            </div>}
            
            {children}
        </div>
    )
}