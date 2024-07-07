export default function Image({data}) {
    return(
        <>
            <img src={data.url} style={{ width: "45rem", maxWidth: "95vw" }}></img>
        </>
    )
}