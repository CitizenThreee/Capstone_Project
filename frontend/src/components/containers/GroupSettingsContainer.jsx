import GroupSettingsForm from "../forms/GroupSettingsForm";

export default function GroupSettingsContainer() {
    return (
        <>
            <div className="rounded p-2 d-flex flex-column align-items-center my-auto overflow-y-auto" style={{ backgroundColor: "#ddd", width: "90%", maxWidth: "500px", maxHeight: "90%" }}>
                <GroupSettingsForm></GroupSettingsForm>
            </div>
        </>
    )
}