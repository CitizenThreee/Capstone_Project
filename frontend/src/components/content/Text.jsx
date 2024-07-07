export default function Text({data}) {
    return(
        <>
            {data.size == "title" && <h1 style={{ width: "45rem", maxWidth: "95vw" }}>{data.text}</h1>}
            {data.size == "paragraph" && <p style={{ width: "45rem", maxWidth: "95vw" }}>{data.text}</p>}
        </>
    )
}