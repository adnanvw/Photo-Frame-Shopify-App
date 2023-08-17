
const TitleBarZ = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const TitleBar = fetchContext.TitleBar;
    const fullscreen = fetchContext.fullscreen;
    const Fullscreen = fetchContext.Fullscreen;
    const setFullscreen = fetchContext.setFullscreen;

    const handleFullScreen = () => {
        setFullscreen(true);
        fullscreen.dispatch(Fullscreen.Action.ENTER);
    };

    const primaryAction = { content: 'Create Option', url: '/newoption' };
    const secondaryActions = [
        { content: 'Enter FullScreen', onAction: handleFullScreen }
    ];

    return (
        <TitleBar
            title="Option Sets"
            primaryAction={primaryAction}
            // secondaryActions={secondaryActions}
        />
    )
};

export default TitleBarZ;