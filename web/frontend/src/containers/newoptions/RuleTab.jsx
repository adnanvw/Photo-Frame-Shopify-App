const RuleTab = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { P, useState, useEffect, useCallback, option1, option2, option3, option4, option5, option6, ruleSets, setRuleSets } = fetchContext;

    const [active, setActive] = useState(false);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [params, setParams] = useState('');
    const [indexOf, setIndexOf] = useState();
    const [collapse, setCollapse] = useState(true);
    const [collapseTitle, setCollapseTitle] = useState('Collapse');
    const [disclosure, setDisclosure] = useState('up');
    const [checked, setChecked] = useState(false);

    const handleChange = useCallback(() => setActive(!active), [active]);
    const handleChangeName = useCallback((newValue) => setValue1(newValue), []);
    const handleChangeValue = useCallback((newValue) => setValue2(newValue), []);
    const handleCheckboxChange = useCallback((newChecked) => setChecked(newChecked), []);
    const handleChangeValueAnd = useCallback((newValue) => setValue3(newValue), []);

    let arr = [];
    let arrIDK = [];
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState('');
    const [selectedCombine, setSelectedCombine] = useState("");
    const [selectedCondition, setselectedCondition] = useState('');
    const [selectedIDK, setselectedIDK] = useState('');

    const handleSelectChange = useCallback((value) => setSelected(value), []);
    const handleSelectChangeOther = useCallback((value) => setSelectedOther(value), []);
    const handleSelectChangeCondition = useCallback((value) => setselectedCondition(value), []);
    const handleSelectChangeCombine = useCallback((value) => setSelectedCombine(value), []);
    const handleSelectConditionHide = useCallback((value) => setselectedIDK(value), []);
    const handleSelectConditionHideOption = useCallback((value) => setSelectedOtherHide(value), []);

    const handleEditValue = (index, element) => {

        setParams("edit");
        setIndexOf(index);
        setSelected(element?.ruleOption);
        setSelectedOther(element?.ruleValues);
        setselectedCondition(element?.ruleCondition);
        setValue1(element?.ruleName);
        setValue2(element?.ruleConditionValue);
        setActive(true);
    };

    const handleDeleteValue = (index) => {

        let optionArr = ruleSets;
        let indexForRemoval = index;
        let valueToRemove = [ruleSets[indexForRemoval]];

        optionArr = optionArr.filter(element => !valueToRemove.includes(element));

        setRuleSets(optionArr);
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

    const options = [
        { label: 'Grootte', value: 'grootte' },
        { label: 'Witruimte', value: 'witruimte' },
        { label: 'Beschermende laag (+10%)', value: 'beschermende' },
        { label: 'Montage Kunstprint', value: 'montage' },
        { label: 'Lijst', value: 'lijst' },
        { label: 'Ophangsysteem', value: 'ophangsysteem' },
    ];

    const optionThen = [
        { label: 'Increase Price', value: 'increasePrice' },
        { label: 'Decrease Price', value: 'decreasePrice' },
        { label: 'Hide options or values', value: 'hideOptionValue' }
    ];

    const optionAND = [
        { label: 'Is Not Empty', value: 'notempty' },
        { label: 'Is Empty', value: 'empty' },
    ];

    const handleActive = () => {
        setParams("new");
        setActive(true);
    };

    useEffect(() => {
        if (checked === false) {
            setValue3("");
            setSelectedCombine("");
        } else if (checked === true) {
            setValue3("");
        }
    }, [checked]);

    useEffect(() => {
        if (selectedCondition !== "hideOptionValue") {
            setselectedIDK("");
            setSelectedOtherHide("");
        }
    }, [selectedCondition]);


    const handleSaveValue = (param) => {

        if (param === "new") {

            setActive(false);

            let data = {
                ruleName: value1,
                ruleOption: selected,
                ruleOptionValue: selectedOther,
                ruleAndOption: selectedCombine,
                ruleAndOptionValue: value3,
                ruleCondition: selectedCondition,
                ruleConditionValue: value2,
                ruleHiddenConditionOption: selectedIDK,
                ruleHiddenConditionOptionValue: selectedOtherHide
            };

            ruleSets.push(data);

            setSelected('');
            setSelectedOther('');
            setselectedCondition('');
            setValue1('');
            setValue2('');
            setValue3('');
            setSelectedCombine('');
            setselectedIDK('');
            setSelectedOtherHide('');

        } else if (param === "edit") {

            setActive(false);

            let data = {
                ruleName: value1,
                ruleOption: selected,
                ruleValues: selectedOther,
                ruleCondition: selectedCondition,
                ruleConditionValue: value2
            }

            let optionArr = ruleSets;
            let valueToEdit = ruleSets[indexOf];

            valueToEdit = data;

            optionArr[indexOf] = valueToEdit;

            setRuleSets(optionArr);
        }
    };

    switch (selected) {
        case 'grootte':
            arr = [];

            for (let i = 0; i < option1.length; i++) {
                arr.push({
                    label: `${option1[i].optionValue}`, value: `${option1[i].optionValue}`
                });
            }

            break;
        case 'witruimte':
            arr = [];

            for (let i = 0; i < option2.length; i++) {
                arr.push({
                    label: `${option2[i].optionValue}`, value: `${option2[i].optionValue}`
                });
            }

            break;
        case 'beschermende':
            arr = [];

            for (let i = 0; i < option3.length; i++) {
                arr.push({
                    label: `${option3[i].optionRadio}`, value: `${option3[i].optionRadio}`
                });
            }

            break;
        case 'montage':
            arr = [];

            for (let i = 0; i < option4.length; i++) {
                arr.push({
                    label: `${option4[i].optionValue}`, value: `${option4[i].optionValue}`
                });
            }

            break;
        case 'lijst':
            arr = [];

            for (let i = 0; i < option5.length; i++) {
                arr.push({
                    label: `${option5[i].optionValue}`, value: `${option5[i].optionValue}`
                });
            }

            break;
        case 'ophangsysteem':
            arr = [];

            for (let i = 0; i < option6.length; i++) {
                arr.push({
                    label: `${option6[i].optionValue}`, value: `${option6[i].optionValue}`
                });
            }

            break;
        default:
            break;
    }

    switch (selectedIDK) {
        case 'grootte':
            arrIDK = [];

            for (let i = 0; i < option1.length; i++) {
                arrIDK.push({
                    label: `${option1[i].optionValue}`, value: `${option1[i].optionValue}`
                });
            }

            break;
        case 'witruimte':
            arrIDK = [];

            for (let i = 0; i < option2.length; i++) {
                arrIDK.push({
                    label: `${option2[i].optionValue}`, value: `${option2[i].optionValue}`
                });
            }

            break;
        case 'beschermende':
            arrIDK = [];

            for (let i = 0; i < option3.length; i++) {
                arrIDK.push({
                    label: `${option3[i].optionRadio}`, value: `${option3[i].optionRadio}`
                });
            }

            break;
        case 'montage':
            arrIDK = [];

            for (let i = 0; i < option4.length; i++) {
                arrIDK.push({
                    label: `${option4[i].optionValue}`, value: `${option4[i].optionValue}`
                });
            }

            break;
        case 'lijst':
            arrIDK = [];

            for (let i = 0; i < option5.length; i++) {
                arrIDK.push({
                    label: `${option5[i].optionValue}`, value: `${option5[i].optionValue}`
                });
            }

            break;
        case 'ophangsysteem':
            arrIDK = [];

            for (let i = 0; i < option6.length; i++) {
                arrIDK.push({
                    label: `${option6[i].optionValue}`, value: `${option6[i].optionValue}`
                });
            }

            break;
        default:
            break;
    }

    // const [selectedOther, setSelectedOther] = useState(arr[0]?.value);
    const [selectedOther, setSelectedOther] = useState();
    const [selectedOtherHide, setSelectedOtherHide] = useState();
    // const [selectedOtherHide, setSelectedOtherHide] = useState(arrIDK[0]?.value);

    console.log("ruleSets", ruleSets);

    return (
        <>
            <P.Page>
                <P.Layout>
                    <P.Layout.Section>
                        <P.Card
                            title="Rule Sets"
                            primaryFooterAction={{ content: 'Add Value', onAction: handleActive }}
                            secondaryFooterActions={[{ content: collapseTitle, onAction: handleCollapse, disclosure: disclosure }]}
                            sectioned
                        >
                            <ins><i>{ruleSets.length} active rules</i></ins>
                            <P.Collapsible open={collapse}>
                                {
                                    ruleSets.map((element, index) => {
                                        return <P.Page sectioned>
                                            <P.Layout>
                                                <P.Layout.Section>
                                                    <P.Card title={`Rule ${index + 1}: ${element?.ruleName}`} sectioned>
                                                        <p><span style={{ color: "red" }}><b>IF</b></span> value <b>{element?.ruleOptionValue}</b> of Option <b><i>{element?.ruleOption?.toUpperCase()}</i></b> is selected</p>
                                                        {
                                                            element?.ruleAndOptionValue !== "" ?
                                                            <p><span style={{ color: "blue" }}><b>AND</b></span> value is <b><u>{element?.ruleAndOptionValue?.toUpperCase()}</u></b> of Option <b><i>{element?.ruleAndOption?.toUpperCase()}</i></b></p> :
                                                            <p></p>
                                                        }
                                                        <p><span style={{ color: "green" }}><b>THEN</b></span> <b><u>{element?.ruleCondition?.toUpperCase()}</u></b> of the painting by amount <b>{element?.ruleConditionValue}</b></p>
                                                        <br />
                                                        <P.ButtonGroup>
                                                            <P.Button onClick={() => handleEditValue(index, element)}>Edit Value</P.Button>
                                                            <P.Button onClick={() => handleDeleteValue(index)} destructive>Delete</P.Button>
                                                        </P.ButtonGroup>
                                                    </P.Card>
                                                </P.Layout.Section>
                                            </P.Layout>
                                        </P.Page>
                                    })
                                }
                            </P.Collapsible>

                            <br />
                        </P.Card>
                    </P.Layout.Section>
                </P.Layout>
                <P.Modal
                    open={active}
                    onClose={handleChange}
                    title="Add Rule Sets"
                    primaryAction={{
                        content: 'Add Rule',
                        onAction: () => handleSaveValue(params),
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: handleChange,
                        },
                    ]}
                >
                    <P.Modal.Section>
                        <P.TextField
                            label="Enter Rule Name"
                            value={value1}
                            onChange={handleChangeName}
                            autoComplete="off"
                        />

                        <br />

                        <P.TextContainer>

                            <P.Badge status="attention">IF</P.Badge>

                            <div className="priceOptionContainer">
                                <P.Select
                                    placeholder={'Select an Option'}
                                    requiredIndicator={true}
                                    label="Select Option"
                                    options={options}
                                    onChange={handleSelectChange}
                                    value={selected}
                                />
                                <P.Select
                                    placeholder={'Select a Value'}
                                    requiredIndicator={true}
                                    label="Select Option's Value"
                                    options={arr}
                                    onChange={handleSelectChangeOther}
                                    value={selectedOther}
                                />
                            </div>

                            <div style={checked === true ? { display: "block" } : { display: "none" }}>
                                <P.Badge status="critical">AND</P.Badge>
                            </div>

                            <div style={checked === true ? { display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "5%" } : { display: "none" }} className="priceCombinedContainer">
                                <P.Select
                                    placeholder={'Select an Option'}
                                    label="Select Option"
                                    options={options}
                                    onChange={handleSelectChangeCombine}
                                    value={selectedCombine}
                                />
                                <P.Select
                                    placeholder={'Select a Value'}
                                    label="Select Option's Value"
                                    options={optionAND}
                                    onChange={handleChangeValueAnd}
                                    value={value3}
                                />
                            </div>
                            <P.Checkbox
                                label="Check if above Option has a combined rule"
                                checked={checked}
                                onChange={handleCheckboxChange}
                            />

                            <br />

                            <P.Badge status="info">THEN</P.Badge>

                            {
                                selectedCondition === "hideOptionValue" ?

                                    <div className="priceConditionContainer">
                                        <P.Select
                                            placeholder={'Select an Option'}
                                            requiredIndicator={true}
                                            label="Select Price Condition"
                                            options={optionThen}
                                            onChange={handleSelectChangeCondition}
                                            value={selectedCondition}
                                        />
                                    </div> :
                                    <div className="priceConditionContainer">
                                        <P.Select
                                            placeholder={'Select an Option'}
                                            requiredIndicator={true}
                                            label="Select Price Condition"
                                            options={optionThen}
                                            onChange={handleSelectChangeCondition}
                                            value={selectedCondition}
                                        />

                                        <P.TextField
                                            placeholder={'Select a Value'}
                                            requiredIndicator={true}
                                            type="number"
                                            label="Enter Price Condition Value"
                                            value={value2}
                                            onChange={handleChangeValue}
                                            autoComplete="off"
                                        />
                                    </div>
                            }

                            {selectedCondition === "hideOptionValue" ?
                                <div className="hiddenOptionContainer">
                                    <P.Select
                                        placeholder={'Select an Option'}
                                        requiredIndicator={true}
                                        label="Select Option to Disable"
                                        options={options}
                                        onChange={handleSelectConditionHide}
                                        value={selectedIDK}
                                    />

                                    <P.Select
                                        placeholder={'Select a Value'}
                                        requiredIndicator={true}
                                        label="Select Value to Disable"
                                        options={arrIDK}
                                        onChange={handleSelectConditionHideOption}
                                        value={selectedOtherHide}
                                    />
                                </div> :
                                <></>
                            }
                        </P.TextContainer>
                    </P.Modal.Section>
                </P.Modal>
            </P.Page>
        </>
    )
}

export default RuleTab;