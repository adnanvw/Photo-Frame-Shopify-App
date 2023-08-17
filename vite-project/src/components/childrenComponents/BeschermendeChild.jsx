const BeschermendeChild = ({ beschermende, beschermendeFunction }) => {

    return (
        <div className="childOptionValuesDiv" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gridGap: "2%" }}>
            {beschermende.map((element, index) => {
                return <button style={{ cursor: "pointer" }} onClick={() => beschermendeFunction(index, element)}>{element?.optionValue}</button>
            })}
        </div>
    )
};

export default BeschermendeChild;