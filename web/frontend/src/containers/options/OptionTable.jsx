
const OptionTable = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { P, useState, useCallback, alloptions, useNavigate, fetch, fetchOptions, setEditPageData, setEdit } = fetchContext;

    // const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState('');

    const handleChange = useCallback(() => setActive(!active), [active]);

    const resourceName = {
        singular: 'option',
        plural: 'options',
    };

    const resourceIDResolver = (options, index) => {
        return index;
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } = P.useIndexResourceState(alloptions, { resourceIDResolver });

    const handleEditBtn = async (index) => {

        const fetchSelectedOptionSet = await fetch("/api/options/get")
            .then(response => response.json());

        setEditPageData(fetchSelectedOptionSet.data[index]);
        setEdit(true);
    };

    const handleDeleteBtn = async () => {

        setLoading(true);

        const fetchSelectedOptionSet = await fetch("/api/options/get")
            .then(response => response.json());

        const deleteID = fetchSelectedOptionSet.data[currentIndex]?._id;

        const deleteSelectedOptionSet = await fetch("/api/options/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                deleteID: deleteID
            })
        })
            .then(response => response.json());

        setActive(false);
        setLoading(false);
        await fetchOptions();
    };

    const rowMarkup = alloptions.map(
        ({ optionName, shop, productTagName, products, createdAt, updatedAt }, index) => (
            <P.IndexTable.Row
                id={index}
                key={index}
                selected={selectedResources.includes(index)}
                position={index}
            >
                <P.IndexTable.Cell><b>{optionName}</b></P.IndexTable.Cell>
                <P.IndexTable.Cell><P.Badge status="success">{productTagName}</P.Badge></P.IndexTable.Cell>
                <P.IndexTable.Cell>
                    <b><i>{`${products.length} products assigned`}</i></b>
                    {/* {
                        products.map(({ productTitle, productID }, index) => {
                            return <>
                                <P.Link removeUnderline={true} onClick={() => {
                                    navigate(`https://${shop}/admin/products/${productID.replace("gid://shopify/Product/", "")}`, {
                                        target: "new"
                                    });
                                }}>{productTitle}</P.Link>
                                <br />
                                </>
                            })
                    } */}
                </P.IndexTable.Cell>
                <P.IndexTable.Cell>{createdAt}</P.IndexTable.Cell>
                <P.IndexTable.Cell>
                    <P.Button
                        primary
                        connectedDisclosure={{
                            accessibilityLabel: 'Other save actions',
                            actions: [{ content: 'Edit Option', onAction: () => handleEditBtn(index) }, {
                                content: 'Delete Option', onAction: () => { setCurrentIndex(index); setActive(true); }
                            }],
                        }}
                    >Actions</P.Button>
                </P.IndexTable.Cell>
            </P.IndexTable.Row>
        ),
    );

    return (
        <>
            <P.Card>
                <P.IndexTable
                    resourceName={resourceName}
                    itemCount={alloptions.length}
                    selectedItemsCount={
                        allResourcesSelected ? 'All' : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        { title: 'Option Set Name' },
                        { title: 'Product Tag' },
                        { title: 'Assigned Products' },
                        { title: 'Created at' },
                        { title: 'Actions' },
                    ]}
                >
                    {rowMarkup}
                </P.IndexTable>
            </P.Card>
            <P.Modal
                open={active}
                title="Confirm Delete"
                onClose={handleChange}
                primaryAction={{
                    content: 'Delete',
                    onAction: handleDeleteBtn,
                    destructive: true,
                    loading: loading
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: handleChange,
                    },
                ]}
            >
                <P.Modal.Section>
                    <P.Stack vertical>
                        <P.Stack.Item>
                            <P.TextContainer>
                                <p>Are you sure you want to delete this Option Set?</p>
                            </P.TextContainer>
                        </P.Stack.Item>
                    </P.Stack>
                </P.Modal.Section>
            </P.Modal>
        </>
    )
}

export default OptionTable;