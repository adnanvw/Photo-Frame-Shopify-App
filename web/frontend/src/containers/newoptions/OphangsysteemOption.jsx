const OphangsysteemOption = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { P, useState, useCallback, option6, valueO, setValueO, setOption6, useEffect } = fetchContext;

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
    //     if (option6.length > 0) {
    //         setCollapse(false);
    //         setDisclosure('down');
    //         setCollapseTitle('Expand');
    //     }
    // }, [option6]);

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

            if (valueO === "Geen") {
                data = {
                    optionValue: `${valueO} ophangsysteem`,
                    optionURLBefore: '/images/ophangsysteem_images/geen.jpg',
                    optionURLAfter: '/images/ophangsysteem_images/geen.jpg',
                };
            } else if (valueO === "Ophang") {
                data = {
                    optionValue: `${valueO} met haak (${value1})`,
                    optionURLBefore: '/images/ophangsysteem_images/simple-before.jpeg',
                    optionURLAfter: '/images/ophangsysteem_images/simple-after.jpeg',
                };
            } else {
                data = {
                    optionValue: `${valueO} frame (${value1})`,
                    optionURLBefore: '/images/ophangsysteem_images/dibond-before.jpg',
                    optionURLAfter: '/images/ophangsysteem_images/dibond-after.jpg',
                };
            }

            option6.push(data);
            setValue1('');
            setValue2('');

        } else if (param === "edit") {

            setActive(false);

            let data;

            if (valueO === "Geen") {
                data = {
                    optionValue: `${valueO} ophangsysteem`,
                    optionURLBefore: '/images/ophangsysteem_images/geen.jpg',
                    optionURLAfter: '/images/ophangsysteem_images/geen.jpg',
                };
            } else if (valueO === "Ophang") {
                data = {
                    optionValue: `${valueO} met haak (${value1})`,
                    optionURLBefore: '/images/ophangsysteem_images/simple-before.jpeg',
                    optionURLAfter: '/images/ophangsysteem_images/simple-after.jpeg',
                };
            } else {
                data = {
                    optionValue: `${valueO} frame (${value1})`,
                    optionURLBefore: '/images/ophangsysteem_images/dibond-before.jpg',
                    optionURLAfter: '/images/ophangsysteem_images/dibond-after.jpg',
                };
            }

            let optionArr = option6;
            let valueToEdit = option6[indexOf];
            valueToEdit = data;
            optionArr[indexOf] = valueToEdit;

            setOption6(optionArr);
        }
    };

    const handleDeleteValue = (index) => {

        let optionArr = option6;
        let indexForRemoval = index;
        let valueToRemove = [option6[indexForRemoval]];

        optionArr = optionArr.filter(element => !valueToRemove.includes(element));

        setOption6(optionArr);
    };

    const handleRadioBtn = useCallback(
        (_checked, newValue) => setValueO(newValue),
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
                    <P.Card title="Ophangsysteem Option"
                        primaryFooterAction={{ content: 'Add Value', onAction: handleActive }}
                        secondaryFooterActions={[{ content: collapseTitle, onAction: handleCollapse, disclosure: disclosure }]}
                        sectioned>
                        <ins><i>{option6.length} active values</i></ins>
                        <P.Collapsible
                            open={collapse}
                        >
                            <P.Page sectioned>
                                <P.Layout>
                                    <P.Layout.Section>
                                        {
                                            option6.length > 0 ?
                                                <P.Card sectioned>
                                                    <div className="tableContainer">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>SrNo.</th>
                                                                    <th>BeforeHoverImage</th>
                                                                    <th>AfterHoverImage</th>
                                                                    <th>Value</th>
                                                                    <th>Edit</th>
                                                                    <th>Delete</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    option6.map((ele, index) => {
                                                                        return <tr key={index}>
                                                                            <td>{`${index + 1}`}</td>
                                                                            <td><img style={{ width: "120px", height: "100px" }} src={ele.optionURLBefore} alt={index} /></td>
                                                                            <td><img style={{ width: "120px", height: "100px" }} src={ele.optionURLAfter} alt={index} /></td>
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
                            {/* }) */}
                            {/* } */}
                        </P.Collapsible>
                    </P.Card>
                </P.Layout.Section>
            </P.Layout>
            <P.Modal
                open={active}
                onClose={handleChange}
                title="Add values for Ophangsysteem Option"
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
                                label="Geen ophangsysteem"
                                id="Geen"
                                name="accounts"
                                checked={valueO === 'Geen'}
                                onChange={handleRadioBtn}
                            />
                            {/* Ophangsysteem simpel */}
                            <P.RadioButton
                                label="Ophangsysteem simpel"
                                checked={valueO === 'Ophang'}
                                id="Ophang"
                                name="accounts"
                                onChange={handleRadioBtn}
                            />
                            <P.RadioButton
                                label="Zelf klevende dibond rail"
                                id="Aluminium"
                                name="accounts"
                                checked={valueO === 'Aluminium'}
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

export default OphangsysteemOption;