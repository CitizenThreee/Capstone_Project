import { useUserContext } from "../../context/UserProvider"

export default function SettingsPageContainer({children}) {
    const { user } = useUserContext();

    return (
        <>
            <div className="rounded p-2 d-flex flex-column align-items-center mt-3" style={{ backgroundColor: "#ddd", width: "90%", maxWidth: "500px" }}>
                {children}
            </div>
        </>
    )
}