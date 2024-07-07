import Alert from 'react-bootstrap/Alert';

export default function AlertPost({ data }) {
    return(
        <>
            <Alert variant={data.level == "warning" ? "warning" : "danger"} style={{ width: "45rem", maxWidth: "95vw" }}>
                {data && data.title}
            </Alert>
        </>
    )
}