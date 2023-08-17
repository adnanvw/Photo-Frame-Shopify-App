const WitruimteOption = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { P, useState, useCallback, option2, setOption2, useEffect } = fetchContext;

    const [collapse, setCollapse] = useState(true);
    const [disclosure, setDisclosure] = useState('up');
    const [collapseTitle, setCollapseTitle] = useState('Collapse');
    const [active, setActive] = useState(false);
    const handleChange = useCallback(() => setActive(!active), [active]);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const handleChangeValue = useCallback((newValue) => setValue1(newValue), []);
    const handleChangeUrl = useCallback((newValue) => setValue2(newValue), []);
    const [params, setParams] = useState('');
    const [indexOf, setIndexOf] = useState();

    // useEffect(() => {
    //     if (option2.length > 0) {
    //         setCollapse(false);
    //         setDisclosure('down');
    //         setCollapseTitle('Expand');
    //     }
    // }, [option2]);

    const handleActive = () => {
        setParams("new");
        setActive(true)
    };

    const handleCollapse = () => {
        if (collapse === false) {
            setCollapse(true);
            setDisclosure('up');
            setCollapseTitle('Collapse');
        } else {
            setCollapse(false);
            setDisclosure('down');
            setCollapseTitle('Expand');
        }
    }

    const handleSaveValue = (param) => {

        if (param === "new") {

            setActive(false);

            let data;

            if (value1 == 0) {

                data = {
                    optionValue: `Geen witruimte`,
                };
            } else {

                data = {
                    optionValue: `${value1} cm witruimte`,
                };
            }

            option2.push(data);
            setValue1('');
            setValue2('');

        } else if (param === "edit") {

            setActive(false);

            let data;

            if (value1 == 0) {

                data = {
                    optionValue: `Geen witruimte`,
                };
            } else {

                data = {
                    optionValue: `${value1} cm witruimte`,
                };
            }

            let optionArr = option2;
            let valueToEdit = option2[indexOf];
            valueToEdit = data;
            optionArr[indexOf] = valueToEdit;
            setOption2(optionArr);
        }

    };

    const handleDeleteValue = (index) => {

        let optionArr = option2;
        let indexForRemoval = index;
        let valueToRemove = [option2[indexForRemoval]];

        optionArr = optionArr.filter(element => !valueToRemove.includes(element));

        setOption2(optionArr);
    };

    const handleEditValue = (index, element) => {
        setParams("edit");
        setIndexOf(index);
        setValue1(element?.optionValue);
        setValue2(element?.optionURL);
        setActive(true);
    };

    return (
        <P.Page>
            <P.Layout>
                <P.Layout.Section>
                    <P.Card title="Witruimte Option"
                        primaryFooterAction={{ content: 'Add Value', onAction: handleActive }}
                        secondaryFooterActions={[{ content: collapseTitle, onAction: handleCollapse, disclosure: disclosure }]}
                        sectioned>
                        <ins><i>{option2.length} active values</i></ins>
                        <P.Collapsible
                            open={collapse}
                        >
                            <P.Page sectioned>
                                <P.Layout>
                                    <P.Layout.Section>
                                        {
                                            option2.length > 0 ?
                                                <P.Card sectioned>
                                                    <div className="tableContainer">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>SrNo.</th>
                                                                    <th>Value</th>
                                                                    <th>Edit</th>
                                                                    <th>Delete</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    option2.map((ele, index) => {
                                                                        return <tr key={index}>
                                                                            <td>{`${index + 1}`}</td>
                                                                            <td>{ele.optionValue}</td>
                                                                            <td> <P.Button onClick={() => handleEditValue(index, ele)}>Edit Value</P.Button></td>
                                                                            <td><P.Button onClick={() => handleDeleteValue(index)} destructive>Delete</P.Button></td>
                                                                        </tr>
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </P.Card> :
                                                <div></div>
                                        }
                                    </P.Layout.Section>
                                </P.Layout>
                            </P.Page>
                        </P.Collapsible>
                    </P.Card>
                </P.Layout.Section>
            </P.Layout>
            <P.Modal
                open={active}
                onClose={handleChange}
                title="Add values for Witruimte Option"
                primaryAction={{
                    content: 'Add Option',
                    onAction: () => handleSaveValue(params)
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: handleChange,
                    },
                ]}
            >
                <P.Modal.Section>
                    <P.TextContainer>
                        <P.TextField
                            label="Enter Whitespace value. The value that you enter will be applied in centimeters. 0 will be added as 'Geen Witruimte'."
                            type="number"
                            value={value1}
                            onChange={handleChangeValue}
                            autoComplete="off"
                        />
                        {/* <P.TextField
                            label="Enter Background URL"
                            value={value2}
                            onChange={handleChangeUrl}
                            autoComplete="off"
                        /> */}
                    </P.TextContainer>
                </P.Modal.Section>
            </P.Modal>
        </P.Page>
    )
};

export default WitruimteOption;