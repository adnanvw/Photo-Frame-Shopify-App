import ProductTab from "./ProductTab";
import RuleTab from "./RuleTab";
import OptionTab from "./OptionTab";

const AddOptions = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { P, useState, useCallback, assignProduct } = fetchContext;

    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    let PageMarkup;

    const tabs = [
        {
            id: 'add-options',
            content: 'Options',
            panelID: 'add-options',
        },
        {
            id: 'add-rules',
            content: 'Rules',
            panelID: 'add-rules',
        },
        {
            id: 'add-products',
            content: 'Products',
            panelID: 'add-products',
        },
    ];

    switch (tabs[selected].content) {
        case 'Options':
            PageMarkup = <OptionTab useContext={useContext} ParentContext={ParentContext} />;
            break;
        case 'Rules':
            PageMarkup = <RuleTab useContext={useContext} ParentContext={ParentContext} />;
            break;
        case 'Products':
            PageMarkup = <ProductTab useContext={useContext} ParentContext={ParentContext} />;
            break;
        default:
            PageMarkup = <OptionTab useContext={useContext} ParentContext={ParentContext} />;
            break;
    }

    return (
        <P.Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            <P.Page>
                <P.Layout>
                    <P.Layout.Section>
                        {PageMarkup}
                    </P.Layout.Section>
                </P.Layout>
            </P.Page>
        </P.Tabs>
    )
};

export default AddOptions;