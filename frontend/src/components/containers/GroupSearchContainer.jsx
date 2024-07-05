import GroupDisplayCard from "../cards/GroupDisplayCard"

export default function GroupSearchContainer({data}) {
    return (
        <>
            <div className="d-flex flex-column align-items-center py-3 px-1 mt-3 rounded-3" style={{ width: "100%", maxWidth: "1000px", backgroundColor: "#f5f5f5" }}>
                {data.length && data.map((group, id) => (
                    <div key={id} className="mb-3 mx-2">
                        <GroupDisplayCard data={group}></GroupDisplayCard>
                    </div>
                ))}
            </div>
        </>
    )
}