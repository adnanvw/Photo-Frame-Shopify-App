const ParentComponent = ({ currentOptionFunction }) => {

    return (
        <div className="parentOptionDiv">
            <div className="childOptionDiv" onClick={() => currentOptionFunction("Grootte")}>
                <p>1.</p>
                <p>Grootte</p>
            </div>
            <div className="childOptionDiv" onClick={() => currentOptionFunction("Witruimte")}>
                <p>2.</p>
                <p>Witruimte</p>
            </div>
            <div className="childOptionDiv" onClick={() => currentOptionFunction("Beschermende")}>
                <p>3.</p>
                <p>Beschermende laag (+10%)</p>
            </div>
            <div className="childOptionDiv" onClick={() => currentOptionFunction("Montage")}>
                <p>4.</p>
                <p>Montage Kunstprint</p>
            </div>
            <div className="childOptionDiv" onClick={() => currentOptionFunction("Lijst")}>
                <p>5.</p>
                <p>Lijst</p>
            </div>
            <div className="childOptionDiv" onClick={() => currentOptionFunction("Ophangsysteem")}>
                <p>6.</p>
                <p>Ophangsysteem</p>
            </div>
        </div>
    )

};

export default ParentComponent;