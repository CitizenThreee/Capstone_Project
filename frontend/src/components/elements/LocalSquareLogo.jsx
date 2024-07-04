import { Navigate, useNavigate } from "react-router-dom"

export default function LocalSquareLogo({w=45, h=45}) {
    const navigate = useNavigate();

    return(
        <>
            <button onClick={() => navigate('/')} style={{border: "none", backgroundColor: "#fff0"}}><img src="/localsquare-logo2.png" alt="LocalSquare Logo" width={w} height={h} /></button>
        </>
    )
}