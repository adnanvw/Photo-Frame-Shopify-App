const MontageChild = ({ montage, montageFunction }) => {

    return (
        <div className="childOptionValuesDiv" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gridGap: "2%" }}>
            {montage.map((element, index) => {
                // return <button onClick={() => montageFunction(index, element)}>{element?.optionValue}</button>

                return <div onClick={() => montageFunction(index, element)} style={{ backgroundImage: `url("${element?.optionURL}")`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", width: "100%", height: "200px", maxWidth: "100%", border: "2px solid", cursor: "pointer" }}></div>
            })}
        </div>
    )
};

export default MontageChild;