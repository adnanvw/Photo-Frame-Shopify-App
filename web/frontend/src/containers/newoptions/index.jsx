import * as P from "@shopify/polaris";
import { useState, useCallback, useContext, createContext, useEffect } from 'react';
import OptionName from "./OptionName";
import AddOptions from "./AddOptions";
import { TitleBar } from "@shopify/app-bridge-react";
import TitleBarZ from "./TitleBarZ";
import { useAuthenticatedFetch } from "../../../hooks/useAuthenticatedFetch";
import { useNavigate } from '@shopify/app-bridge-react';

export const ParentContext = createContext();

const NewOption = ({ editPageData, setEdit, fetchOptions, isFullscreen, fullscreenBarMarkup }) => {

    const fetch = useAuthenticatedFetch();

    const navigate = useNavigate();

    const [value, setValue] = useState('');
    const [valueB, setValueB] = useState('');
    const [valueM, setValueM] = useState('');
    const [valueL, setValueL] = useState('');
    const [valueO, setValueO] = useState('');

    const [disabled, setDisabled] = useState(true);
    const [option, setOption] = useState([]);
    const [valueOptionName, setValueOptionName] = useState('');
    const [valueProductTagName, setValueProductTagName] = useState('');
    const [valueValueName, setValueValueName] = useState('');
    const [valueBgImgName, setValueBgImgName] = useState('');
    const [active, setActive] = useState(false);

    const [option1, setOption1] = useState([]);
    const [option2, setOption2] = useState([]);
    const [option3, setOption3] = useState([]);
    const [option4, setOption4] = useState([]);
    const [option5, setOption5] = useState([]);
    const [option6, setOption6] = useState([]);
    const [ruleSets, setRuleSets] = useState([]);
    const [assignProduct, setAssignProduct] = useState([]);

    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const toastMarkup = active ? (
        <P.Toast content="Option Set Saved!" onDismiss={toggleActive} />
    ) : null;

    useEffect(() => {

        if (editPageData !== undefined) {

            setValueOptionName(editPageData?.optionName);
            setValueProductTagName(editPageData?.productTagName);
            setOption1(editPageData?.options[0].Grootte);
            setOption2(editPageData?.options[0].Witruimte);
            setOption3(editPageData?.options[0].Beschermende);
            setOption4(editPageData?.options[0].Montage);
            setOption5(editPageData?.options[0].Lijst);
            setOption6(editPageData?.options[0].Ophangsysteem);
            setRuleSets(editPageData?.rules);
            setAssignProduct(editPageData?.products);
        }

    }, []);

    return (
        <ParentContext.Provider value={{ P, useState, useEffect, useCallback, setDisabled, TitleBar, disabled, fetch, valueOptionName, option, valueValueName, setActive, setValueOptionName, setValueValueName, valueBgImgName, setValueBgImgName, setOption, option1, option2, option3, option4, option5, option6, assignProduct, value, setValue, valueB, setValueB, valueM, setValueM, valueProductTagName, setValueProductTagName, ruleSets, setRuleSets, valueL, setValueL, valueO, setValueO, setOption1, setOption2, setOption3, setOption4, setOption5, setOption6, setEdit, fetchOptions, setAssignProduct, navigate }}>
            <P.Page>
                {isFullscreen && fullscreenBarMarkup}
                <TitleBarZ useContext={useContext} ParentContext={ParentContext} />
                <P.Layout>
                    <P.Layout.Section>
                        <OptionName useContext={useContext} ParentContext={ParentContext} />
                    </P.Layout.Section>
                </P.Layout>

                <br />
                <br />

                <P.Layout>
                    <P.Layout.Section>
                        <AddOptions useContext={useContext} ParentContext={ParentContext} />
                    </P.Layout.Section>
                </P.Layout>

                <P.Frame>
                    {toastMarkup}
                </P.Frame>
            </P.Page>
        </ParentContext.Provider>

    )

};

export default NewOption;