export default function Message({data}) {
    return(
        <>
            <div className="p-1 px-2 border mb-3 rounded-2" style={{ width: "45rem", maxWidth: "95vw" }}>
                {data.message}
            </div>
        </>
    )
}