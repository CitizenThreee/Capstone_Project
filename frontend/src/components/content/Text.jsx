// A basic text component that renders text based on the size passed in data
export default function Text({data}) {
    return(
        <>
            {data.size == "header" && <h2 style={{ width: "45rem", maxWidth: "95vw" }}>{data.title}</h2>}
            {data.size == "subheader" && <h4 style={{ width: "45rem", maxWidth: "95vw" }}>{data.title}</h4>}
            {data.size == "paragraph" && <p style={{ width: "45rem", maxWidth: "95vw", textAlign: 'justify' }}>{data.title}</p>}
        </>
    )
}