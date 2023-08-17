const LijstOption = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { P, useState, useCallback, option5, valueL, setValueL, setOption5, useEffect } = fetchContext;

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
    //     if (option5.length > 0) {
    //         setCollapse(false);
    //         setDisclosure('down');
    //         setCollapseTitle('Expand');
    //     }
    // }, [option5]);

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

            if (valueL === "Geen") {
                data = {
                    optionValue: `${valueL} lijst`,
                    optionURL: "images/zwarte_images/geen_lijst.jpg"
                };
            } else if (valueL === "Zwarte") {
                data = {
                    optionValue: `${valueL} lijst (${value1})`,
                    optionURL: "images/zwarte_images/zwarte_lijst.jpg"
                };
            } else if (valueL === "Witte") {
                data = {
                    optionValue: `${valueL} lijst (${value1})`,
                    optionURL: "images/zwarte_images/witte_lijst.jpg"
                };

            } else if (valueL === "Walnoten") {
                data = {
                    optionValue: `${valueL} lijst (${value1})`,
                    optionURL: "images/zwarte_images/walnoten_lijst.jpg"
                };
            }

            option5.push(data);
            setValue1('');
            setValue2('');

        } else if (param === "edit") {

            setActive(false);

            let data;

            if (valueL === "Geen") {
                data = {
                    optionValue: `${valueL} lijst`,
                    optionURL: "images/zwarte_images/geen_lijst.jpg"
                };
            } else if (valueL === "Zwarte") {
                data = {
                    optionValue: `${valueL} lijst (${value1})`,
                    optionURL: "images/zwarte_images/zwarte_lijst.jpg"
                };
            } else if (valueL === "Witte") {
                data = {
                    optionValue: `${valueL} lijst (${value1})`,
                    optionURL: "images/zwarte_images/witte_lijst.jpg"
                };

            } else if (valueL === "Walnoten") {
                data = {
                    optionValue: `${valueL} lijst (${value1})`,
                    optionURL: "images/zwarte_images/walnoten_lijst.jpg"
                };
            }

            let optionArr = option5;
            let valueToEdit = option5[indexOf];
            valueToEdit = data;
            optionArr[indexOf] = valueToEdit;

            setOption5(optionArr);
        }
    };

    const handleDeleteValue = (index) => {

        let optionArr = option5;
        let indexForRemoval = index;
        let valueToRemove = [option5[indexForRemoval]];

        optionArr = optionArr.filter(element => !valueToRemove.includes(element));

        setOption5(optionArr);
    };

    const handleRadioBtn = useCallback(
        (_checked, newValue) => setValueL(newValue),
        [],
    );

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
                    <P.Card title="Lijst Option"
                        primaryFooterAction={{ content: 'Add Value', onAction: handleActive }}
                        secondaryFooterActions={[{ content: collapseTitle, onAction: handleCollapse, disclosure: disclosure }]}
                        sectioned>
                        <ins><i>{option5.length} active values</i></ins>
                        <P.Collapsible
                            open={collapse}
                        >
                            <P.Page sectioned>
                                <P.Layout>
                                    <P.Layout.Section>
                                        {
                                            option5.length > 0 ?
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
                                                                    option5.map((ele, index) => {
                                                                        return <tr key={index}>
                                                                            <td>{`${index + 1}`}</td>
                                                                            <td><img style={{ width: "120px", height: "100px" }} src={ele.optionURL} alt={index} /></td>
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
                title="Add values for Lijst Option"
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
                        <P.Stack vertical>
                            <P.RadioButton
                                label="Geen lijst"
                                id="Geen"
                                name="accounts"
                                checked={valueL === 'Geen'}
                                onChange={handleRadioBtn}
                            />
                            <P.RadioButton
                                label="Zwarte lijst"
                                checked={valueL === 'Zwarte'}
                                id="Zwarte"
                                name="accounts"
                                onChange={handleRadioBtn}
                            />
                            <P.RadioButton
                                label="Witte lijst"
                                id="Witte"
                                name="accounts"
                                checked={valueL === 'Witte'}
                                onChange={handleRadioBtn}
                            />
                            <P.RadioButton
                                label="Walnoten lijst"
                                id="Walnoten"
                                name="accounts"
                                checked={valueL === 'Walnoten'}
                                onChange={handleRadioBtn}
                            />
                            <P.TextField
                                label="Enter Value"
                                value={value1}
                                onChange={handleChangeValue}
                                autoComplete="off"
                            />
                        </P.Stack>
                    </P.TextContainer>
                </P.Modal.Section>
            </P.Modal>
        </P.Page>
    )
};

export default LijstOption;