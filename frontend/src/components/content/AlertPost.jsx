import Alert from 'react-bootstrap/Alert';

// Element for alerts with conditional title and description
export default function AlertPost({ data }) {
    return(
        <>
            <Alert variant={data.level == "warning" ? "warning" : "danger"} style={{ width: "45rem", maxWidth: "95vw" }}>
                {data.title && <h5>{data.title}</h5>}
                {data.description && <p>{data.description}</p>}
            </Alert>
        </>
    )
}