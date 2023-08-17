const WitruimteChild = ({ witruimte, witruimteFunction }) => {

    return (
        <div className="childOptionValuesDiv" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gridGap: "2%" }}>
            {witruimte.map((element, index) => {
                return <button style={{ cursor: "pointer" }} onClick={() => witruimteFunction(index, element)}>{element?.optionValue}</button>
            })}
        </div>
    )
};

export default WitruimteChild;