const LijstChild = ({ lijst, lijstFunction }) => {

    return (
        <div className="childOptionValuesDiv" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gridGap: "2%" }}>
            {lijst.map((element, index) => {
                // return <button onClick={() => lijstFunction(index, element)}>{element?.optionValue}</button>

                return <div onClick={() => lijstFunction(index, element)} style={{ backgroundImage: `url("${element?.optionURL}")`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", width: "100%", height: "200px", maxWidth: "100%", border: "2px solid", cursor: "pointer" }}></div>
            })}
        </div>
    )
};

export default LijstChild;