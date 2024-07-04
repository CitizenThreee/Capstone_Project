import { useNavigate } from "react-router-dom"

export default function UserProfileImage({w=45, h=45}) {
    const navigate = useNavigate();

    return(
        <>
            <button className="rounded-circle" onClick={() => navigate('/user')} style={{border: "none", backgroundColor: "#eee"}}>
                <img src="/avatar_placeholder.jpg" alt="LocalSquare Logo" width={w} height={h} className="rounded-circle"/>
            </button>
        </>
    )
}