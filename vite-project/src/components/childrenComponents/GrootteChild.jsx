const GrootteChild = ({ grootte, grootteFunction }) => {

    return (
        <>
            {
                grootte === '' ? <h2>EMPTY</h2> :
                    <div className="childOptionValuesDiv" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gridGap: "2%" }}>
                        {grootte.map((element, index) => {
                            return <div onClick={() => grootteFunction(index, element)} style={{ backgroundImage: `url("${element?.optionOPTIONURL}")`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", width: "100%", height: "200px", maxWidth: "100%", border: "2px solid", cursor: "pointer" }}></div>
                        })}
                    </div>
            }
        </>
    )
};

export default GrootteChild;