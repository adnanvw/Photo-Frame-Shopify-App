const OptionName = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { valueOptionName, setValueOptionName, P, useCallback, setDisabled } = fetchContext;

    const handleChangeOptionName = useCallback((newValue) => {
        setValueOptionName(newValue), []
    });

    if (valueOptionName !== '') {
        setDisabled(false);
    } else if (valueOptionName === '') {
        setDisabled(true);
    }

    return (
        <>
            <P.Card title="Option set name" sectioned>
                <P.TextField
                    type="text"
                    value={valueOptionName}
                    onChange={handleChangeOptionName}
                    autoComplete="off"
                    helpText="Specify the name of the option set. It can be seen internally only."
                />
            </P.Card>
        </>

    )

};

export default OptionName;