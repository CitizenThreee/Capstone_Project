import GroupThinDisplayCard from "../cards/GroupThinDisplayCard"

export default function UserGroupsContainer({data}) {
    return (
        <>
            <div className="d-flex flex-column align-items-center py-3 px-1 mt-3 rounded-3 overflow-auto" style={{ width: "100%", maxWidth: "1000px", backgroundColor: "#f5f5f5" }}>
                <h2 className="mb-3">Your Groups:</h2>
                {data.length && data.map((group, id) => (
                    <div key={id} className="mb-3 mx-2">
                        <GroupThinDisplayCard data={group}></GroupThinDisplayCard>
                    </div>
                ))}
            </div>
        </>
    )
}