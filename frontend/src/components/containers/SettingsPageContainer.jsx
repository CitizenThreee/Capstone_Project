import { useUserContext } from "../../context/UserProvider"

export default function SettingsPageContainer({children}) {
    const { user } = useUserContext();

    return (
        <>
            <div className="rounded p-2 d-flex flex-column align-items-center" style={{ backgroundColor: "#ddd", height: "85vh", width: "90%", maxWidth: "500px" }}>
                {children}
            </div>
        </>
    )
}