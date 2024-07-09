

export default function InnerPageContainer({children}) {
    return (
        <>
            <div className="d-flex flex-column align-items-center py-3 px-1 rounded-3 overflow-auto" 
            style={{ width: "100%", maxWidth: "1000px", backgroundColor: "#f5f5f5", height: ("calc(100% - 20px)"), marginTop: "20px" }}>
                {children}
            </div>
        </>
    )
}