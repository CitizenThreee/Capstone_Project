// A basic image component
export default function Image({data}) {
    return(
        <>
            <img src={data.image} style={{ width: "45rem", maxWidth: "95vw" }}></img>
        </>
    )
}