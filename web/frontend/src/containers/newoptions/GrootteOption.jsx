const GrootteOption = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { P, useState, useCallback, option1, setOption1, useEffect } = fetchContext;

    const [collapse, setCollapse] = useState(true);
    const [disclosure, setDisclosure] = useState('up');
    const [collapseTitle, setCollapseTitle] = useState('Collapse');
    const [active, setActive] = useState(false);
    const handleChange = useCallback(() => setActive(!active), [active]);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const handleChangeValue = useCallback((newValue) => setValue1(newValue), []);
    const handleChangeUrl = useCallback((newValue) => setValue2(newValue), []);
    const handleChangeOptionUrl = useCallback((newValue) => setValue3(newValue), [])
    const [params, setParams] = useState('');
    const [indexOf, setIndexOf] = useState();

    // useEffect(() => {
    //     if (option1.length > 0) {
    //         setCollapse(false);
    //         setDisclosure('down');
    //         setCollapseTitle('Expand');
    //     }
    // }, [option1]);

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
    };

    const handleSaveValue = (param) => {

        if (param === "new") {

            setActive(false);

            let data = {
                optionValue: `${value1} cm`,
                // optionURL: value2,
                optionOPTIONURL: value3
            };

            option1.push(data);
            setValue1('');
            // setValue2('');
            setValue3('');

        } else if (param === "edit") {

            setActive(false);

            let data = {
                optionValue: `${value1} cm`,
                // optionURL: value2,
                optionOPTIONURL: value3
            };

            let optionArr = option1;
            let valueToEdit = option1[indexOf];

            valueToEdit = data;

            optionArr[indexOf] = valueToEdit;

            setOption1(optionArr);
        }

    };

    const handleDeleteValue = (index) => {

        let optionArr = option1;
        let indexForRemoval = index;
        let valueToRemove = [option1[indexForRemoval]];

        optionArr = optionArr.filter(element => !valueToRemove.includes(element));

        setOption1(optionArr);
    };

    const handleEditValue = (index, element) => {
        setParams("edit");
        setIndexOf(index);
        setValue1(element?.optionValue);
        // setValue2(element?.optionURL);
        setActive(true);
    };

    return (
        <P.Page>
            <P.Layout>
                <P.Layout.Section>
                    <P.Card title="Grootte Option"
                        primaryFooterAction={{ content: 'Add Value', onAction: handleActive }}
                        secondaryFooterActions={[{ content: collapseTitle, onAction: handleCollapse, disclosure: disclosure }]}
                        sectioned>
                        <ins><i>{option1.length} active values</i></ins>
                        <P.Collapsible
                            open={collapse}
                        >
                            <P.Page sectioned>
                                <P.Layout>
                                    <P.Layout.Section>
                                        {
                                            option1.length > 0 ?
                                                <P.Card sectioned>
                                                    <div className="tableContainer">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>SrNo.</th>
                                                                    <th>Image</th>
                                                                    <th>Value</th>
                                                                    <th>Edit</th>
                                                                    <th>Delete</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    option1.map((ele, index) => {
                                                                        return <tr key={index}>
                                                                            <td>{`${index + 1}`}</td>
                                                                            <td><img style={{ width: "200px", height: "150px" }} src={ele.optionOPTIONURL} alt={index} /></td>
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
                title="Add values for Grootte Option"
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
                            label="Enter Value"
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
                        <P.TextField
                            label="Enter OPTION Background URL"
                            value={value3}
                            onChange={handleChangeOptionUrl}
                            autoComplete="off"
                        />
                    </P.TextContainer>
                </P.Modal.Section>
            </P.Modal>
        </P.Page>

    )

};

export default GrootteOption;