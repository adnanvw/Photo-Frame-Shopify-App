const MontageOption = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { P, useState, useCallback, option4, valueM, setValueM, setOption4, useEffect } = fetchContext;

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
    //     if (option4.length > 0) {
    //         setCollapse(false);
    //         setDisclosure('down');
    //         setCollapseTitle('Expand');
    //     }
    // }, [option4]);

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

            if (valueM === "Geen") {

                data = {
                    optionValue: `Geen montage. Slechts de print.`,
                    optionURL: ''
                };

            } else if (valueM === "AluminiumMat") {
                data = {
                    optionValue: `${value1} mm ${valueM} (${value2})`,
                    optionURL: '/images/montage_images/aluminium_mat.jpg'
                };
            } else if (valueM === "AluminiumGlanzend") {
                data = {
                    optionValue: `${value1} mm ${valueM} (${value2})`,
                    optionURL: '/images/montage_images/aluminium_glanzend.jpg'
                };
            } else if (valueM === "RolledPoster") {
                data = {
                    optionValue: `${value1} mm ${valueM} (${value2})`,
                    optionURL: '/images/montage_images/rolled_poster.jpg'
                };
            } else if (valueM === "AcrylPlexiglas") {
                data = {
                    optionValue: `${value1} mm ${valueM} (${value2})`,
                    optionURL: '/images/montage_images/acrylPlexi_glas.jpg'
                };
            }

            option4.push(data);
            setValue1('');
            setValue2('');

        } else if (param === "edit") {

            setActive(false);

            let data;

            if (valueM === "Geen") {

                data = {
                    optionValue: `Geen montage. Slechts de print.`,
                    optionURL: ''
                };

            } else if (valueM === "AluminiumMat") {
                data = {
                    optionValue: `${value1} mm ${valueM} (${value2})`,
                    optionURL: '/images/montage_images/aluminium_mat.jpg'
                };
            } else if (valueM === "AluminiumGlanzend") {
                data = {
                    optionValue: `${value1} mm ${valueM} (${value2})`,
                    optionURL: '/images/montage_images/aluminium_glanzend.jpg'
                };
            } else if (valueM === "RolledPoster") {
                data = {
                    optionValue: `${value1} mm ${valueM} (${value2})`,
                    optionURL: '/images/montage_images/rolled_poster.jpg'
                };
            } else if (valueM === "AcrylPlexiglas") {
                data = {
                    optionValue: `${value1} mm ${valueM} (${value2})`,
                    optionURL: '/images/montage_images/acrylPlexi_glas.jpg'
                };
            }

            let optionArr = option4;
            let valueToEdit = option4[indexOf];
            valueToEdit = data;
            optionArr[indexOf] = valueToEdit;

            setOption4(optionArr);
        }
    };

    const handleDeleteValue = (index) => {

        let optionArr = option4;
        let indexForRemoval = index;
        let valueToRemove = [option4[indexForRemoval]];

        optionArr = optionArr.filter(element => !valueToRemove.includes(element));

        setOption4(optionArr);
    };

    const handleRadioBtn = useCallback(
        (_checked, newValue) => setValueM(newValue),
        [],
    );

    const handleEditValue = (index, element) => {
        setParams("edit");
        setIndexOf(index);
        setValue1(element?.optionValue);
        setValue2(element?.optionURL);
        setActive(true);
    };

    console.log("OPTION$", option4);

    return (
        <P.Page>
            <P.Layout>
                <P.Layout.Section>
                    <P.Card title="Montage Kunstprint Option"
                        primaryFooterAction={{ content: 'Add Value', onAction: handleActive }}
                        secondaryFooterActions={[{ content: collapseTitle, onAction: handleCollapse, disclosure: disclosure }]}
                        sectioned>
                        <ins><i>{option4.length} active values</i></ins>
                        <P.Collapsible
                            open={collapse}
                        >
                            <P.Page sectioned>
                                <P.Layout>
                                    <P.Layout.Section>
                                        {
                                            option4.length > 0 ?
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
                                                                    option4.map((ele, index) => {
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
                title="Add values for Montage Option"
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
                            type="number"
                            label="Enter Value in mm"
                            value={value1}
                            onChange={handleChangeValue}
                            autoComplete="off"
                        />
                        <P.Stack vertical>
                            <P.RadioButton
                                label="Geen montage"
                                id="Geen"
                                name="accounts"
                                checked={valueM === 'Geen'}
                                onChange={handleRadioBtn}
                            />
                            <P.RadioButton
                                label="Aluminium mat"
                                checked={valueM === 'AluminiumMat'}
                                id="AluminiumMat"
                                name="accounts"
                                onChange={handleRadioBtn}
                            />
                            {/* <P.RadioButton
                                label="Dibond"
                                id="Dibond"
                                name="accounts"
                                checked={valueM === 'Dibond'}
                                onChange={handleRadioBtn}
                            /> */}
                            <P.RadioButton
                                label="Aluminium glanzend"
                                id="AluminiumGlanzend"
                                name="accounts"
                                checked={valueM === 'AluminiumGlanzend'}
                                onChange={handleRadioBtn}
                            />
                            <P.RadioButton
                                label="Rolled poster"
                                id="RolledPoster"
                                name="accounts"
                                checked={valueM === 'RolledPoster'}
                                onChange={handleRadioBtn}
                            />
                            <P.RadioButton
                                label="Acryl Plexi glas"
                                id="AcrylPlexiglas"
                                name="accounts"
                                checked={valueM === 'AcrylPlexiglas'}
                                onChange={handleRadioBtn}
                            />
                        </P.Stack>
                        <P.TextField
                            label="Enter Value"
                            value={value2}
                            onChange={handleChangeUrl}
                            autoComplete="off"
                        />
                    </P.TextContainer>
                </P.Modal.Section>
            </P.Modal>
        </P.Page>
    )
};

export default MontageOption;