import * as P from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import TitleBarZ from "./TitleBarZ";
import OptionTable from "./OptionTable";
import { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { useAuthenticatedFetch } from "../../../hooks/useAuthenticatedFetch";
import { useNavigate } from '@shopify/app-bridge-react';
import NewOption from "../newoptions/index";
import { useAppBridge } from '@shopify/app-bridge-react';
import { Fullscreen } from '@shopify/app-bridge/actions';

export const ParentContext = createContext();

const OptionSet = () => {

    const app = useAppBridge();
    const fullscreen = Fullscreen.create(app);
    const navigate = useNavigate();

    const fetch = useAuthenticatedFetch();

    const [isFullscreen, setFullscreen] = useState(false);
    const [editPageData, setEditPageData] = useState();
    const [edit, setEdit] = useState(false);
    const [alloptions, setAlloptions] = useState([]);
    const [active, setActive] = useState(false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);
    const handleActionClick = useCallback(() => {
        setFullscreen(false);
        fullscreen.dispatch(Fullscreen.Action.EXIT);
    }, []);

    const fullscreenBarMarkup = (
        <P.FullscreenBar onAction={handleActionClick}>
            <div
                style={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                }}
            >
                <div style={{ marginLeft: '1rem', flexGrow: 1 }}>
                    <p style={{ fontSize: '25px' }} >Option Sets</p>
                </div>
                <P.ButtonGroup>
                    <P.Button onClick={handleActionClick}>Exit FullScreen</P.Button>
                    <P.Button primary onClick={() => {
                        navigate('/newoption');
                    }}>Create Option</P.Button>
                </P.ButtonGroup>
            </div>
        </P.FullscreenBar>
    );

    const toastMarkup = active ? (
        <P.Toast content="Options Fetched" onDismiss={toggleActive} />
    ) : null;

    const fetchOptions = async () => {

        const response = await fetch("/api/options/get")
            .then(response => response.json());

        setAlloptions(response.data);
        setActive(true);
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    return (
        <ParentContext.Provider value={{ P, useState, useCallback, alloptions, TitleBar, useNavigate, fetch, fetchOptions, NewOption, editPageData, setEditPageData, edit, setEdit, fullscreen, Fullscreen, setFullscreen }}>
            {
                edit === false ?
                    <P.Page fullWidth>
                        {isFullscreen && fullscreenBarMarkup}
                        <TitleBarZ useContext={useContext} ParentContext={ParentContext} />
                        <OptionTable useContext={useContext} ParentContext={ParentContext} />

                        <P.Frame>{toastMarkup}</P.Frame>
                    </P.Page> :
                    <NewOption editPageData={editPageData} setEdit={setEdit} fetchOptions={fetchOptions} isFullscreen={isFullscreen} fullscreenBarMarkup={fullscreenBarMarkup} />
            }
        </ParentContext.Provider>
    )
};

export default OptionSet;