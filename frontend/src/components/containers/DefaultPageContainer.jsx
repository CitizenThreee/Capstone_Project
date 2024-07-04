import { Link } from "react-router-dom";

export default function DefaultPageContainer({text="You are not signed in", link="sign in", href="/signin", color="#eee"}) {
    return(
        <div className="hf-md d-flex justify-content-center align-items-center flex-column pb-5" style={{ backgroundColor: color }}>
            <p className="fs-5 m-1">{text}</p>
            <Link to={href} replace>{link}</Link>
        </div>
    )
}