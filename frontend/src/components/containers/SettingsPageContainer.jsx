// Generic settings container that renders any children elements within the container
export default function SettingsPageContainer({children}) {
    return (
        <>
            <div className="rounded p-2 d-flex flex-column align-items-center my-3 overflow-auto" style={{ backgroundColor: "#ddd", width: "90%", maxWidth: "500px", maxHeight: "100%"}}>
                {children}
            </div>
        </>
    )
}