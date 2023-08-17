
const TitleBarZ = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { valueOptionName, option1, option2, option3, option4, option5, option6, assignProduct, setValueOptionName, valueProductTagName, setValueProductTagName, TitleBar, disabled, fetch, setActive, ruleSets, setEdit, fetchOptions, useState, navigate } = fetchContext;

    const [loading, setLoading] = useState(false);

    const handleSaveOption = async () => {

        setLoading(true);

        const payload = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                optionSetName: valueOptionName,
                productTagName: valueProductTagName,
                options: {
                    Grootte: option1,
                    Witruimte: option2,
                    Beschermende: option3,
                    Montage: option4,
                    Lijst: option5,
                    Ophangsysteem: option6
                },
                rules: ruleSets,
                products: assignProduct
            })
        };

        const response = await fetch("/api/options/save", payload)
            .then(response => response.json());

        setValueOptionName('');
        setValueProductTagName('');
        setActive(true);
        setLoading(false);

        navigate('/options');
    };

    const primaryAction = { content: 'Save Changes', onAction: handleSaveOption, disabled: disabled, loading: loading };
    const secondaryActions = [
        { content: 'Activate this Option Set', disabled: disabled, destructive: true }
    ];

    return (
        <TitleBar
            title="Option Sets"
            breadcrumbs={[{ content: "Go back", url: "/", onAction: () => { setEdit(false); fetchOptions(); } }]}
            primaryAction={primaryAction}
            // secondaryActions={secondaryActions}
        />
    )
};

export default TitleBarZ;