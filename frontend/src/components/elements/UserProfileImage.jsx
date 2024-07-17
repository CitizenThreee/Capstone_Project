import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/UserProvider";

// The user profile image element
export default function UserProfileImage({w=45, h=45}) {
    const navigate = useNavigate();
    const { user } = useUserContext();

    return(
        <>
            <button className="rounded-circle border-0" onClick={() => navigate('/user')} style={{backgroundColor: "#aaa", padding: "2px"}}>
                <img src={user.pfp ? user.pfp : "/avatar_placeholder.jpg"} width={w} height={h} className="rounded-circle"/>
            </button>
        </>
    )
}