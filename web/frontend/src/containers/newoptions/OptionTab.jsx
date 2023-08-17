import GrootteOption from "./GrootteOption";
import WitruimteOption from "./WitruimteOption";
import BeschermendeOption from "./BeschermendeOption";
import MontageOption from "./MontageOption";
import LijstOption from "./LijstOption";
import OphangsysteemOption from "./OphangsysteemOption";

const OptionTab = ({ useContext, ParentContext }) => {

    return (
        <>
            <GrootteOption useContext={useContext} ParentContext={ParentContext} />
            <WitruimteOption useContext={useContext} ParentContext={ParentContext} />
            <BeschermendeOption useContext={useContext} ParentContext={ParentContext} />
            <MontageOption useContext={useContext} ParentContext={ParentContext} />
            <LijstOption useContext={useContext} ParentContext={ParentContext} />
            <OphangsysteemOption useContext={useContext} ParentContext={ParentContext} />
        </>
    )
}

export default OptionTab;