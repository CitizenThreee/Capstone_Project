export default function Text({data}) {
    return(
        <>
            {data.size == "header" && <h2 className="mb-2" style={{ width: "45rem", maxWidth: "95vw" }}>{data.title}</h2>}
            {data.size == "subheader" && <h4 className="mb-2" style={{ width: "45rem", maxWidth: "95vw" }}>{data.title}</h4>}
            {data.size == "paragraph" && <p className="mb-2" style={{ width: "45rem", maxWidth: "95vw", textAlign: 'justify' }}>{data.title}</p>}
        </>
    )
}