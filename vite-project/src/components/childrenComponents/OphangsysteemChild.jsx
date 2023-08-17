const OphangsysteemChild = ({ ophangsysteem, ophangsysteemFunction }) => {

    return (
        <div className="childOptionValuesDiv" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gridGap: "2%" }}>
            {ophangsysteem.map((element, index) => {
                console.log("ELEMENT", element);
                let className = "ophangsysteemContainer" + index

                return <div className={className} onMouseOver={(index) => {


                    if (index?.target?.classList[0].includes("0")) {
                        console.log("INDEX00000000000000")
                        document.querySelector(".ophangsysteemContainer0").style.backgroundImage = `url("/images/ophangsysteem_images/geen.jpg")`;
                    } else if (index?.target?.classList[0].includes("1")) {
                        console.log("INDEX111111111111111111")

                        document.querySelector(".ophangsysteemContainer1").style.backgroundImage = `url("/images/ophangsysteem_images/simple-after.jpeg")`;

                    } else if (index?.target?.classList[0].includes("2")) {
                        document.querySelector(".ophangsysteemContainer2").style.backgroundImage = `url("/images/ophangsysteem_images/dibond-after.jpg")`;

                    }

                }} onMouseOut={(index) => {

                    if (index?.target?.classList[0].includes("0")) {
                        console.log("INDEX00000000000000")
                        document.querySelector(".ophangsysteemContainer0").style.backgroundImage = `url("/images/ophangsysteem_images/geen.jpg")`;
                    } else if (index?.target?.classList[0].includes("1")) {
                        console.log("INDEX111111111111111111")

                        document.querySelector(".ophangsysteemContainer1").style.backgroundImage = `url("/images/ophangsysteem_images/simple-before.jpeg")`;

                    } else if (index?.target?.classList[0].includes("2")) {
                        document.querySelector(".ophangsysteemContainer2").style.backgroundImage = `url("/images/ophangsysteem_images/dibond-before.jpg")`;

                    }

                }} onClick={() => ophangsysteemFunction(index, element)} style={{ backgroundImage: `url("${element?.optionURLBefore}")`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", width: "100%", height: "200px", maxWidth: "100%", border: "2px solid", cursor: "pointer" }}></div>
            })}
        </div>
    )
}

export default OphangsysteemChild;