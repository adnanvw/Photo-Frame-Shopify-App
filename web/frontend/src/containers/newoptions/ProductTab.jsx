import { ResourcePicker } from '@shopify/app-bridge-react';

const ProductTab = ({ useContext, ParentContext }) => {

    const fetchContext = useContext(ParentContext);
    const { P, useState, assignProduct, setAssignProduct, useCallback, fetch, navigate, valueProductTagName, setValueProductTagName } = fetchContext;

    const resourceName = {
        singular: 'assign product',
        plural: 'assigned Products',
    };

    const [loading, setLoading] = useState(false);

    const handleChangeProductTagName = useCallback((newValue) => {
        setValueProductTagName(newValue), []
    });

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        P.useIndexResourceState(assignProduct);
    const [active, setActive] = useState(false);

    const removeProduct = () => {

        let arr = assignProduct;
        let indexForRemoval = selectedResources[0];
        let valueToRemove = [arr[indexForRemoval]];
        arr = arr.filter(element => !valueToRemove.includes(element));
        setAssignProduct(arr);
    }

    const bulkActions = [
        {
            content: 'Delete this product from Option Set',
            onAction: removeProduct
        }
    ];

    // const rowMarkup = assignProduct.map(({ productID, productTitle, productImage, productVendor }, index) => {
    //     return <P.IndexTable.Row
    //         id={index}
    //         key={index}
    //         selected={selectedResources.includes(index)}
    //         position={index}
    //     >
    //         <P.IndexTable.Cell>
    //             <img src={productImage} width="100" height="100" />
    //         </P.IndexTable.Cell>
    //         <P.IndexTable.Cell>{productID}</P.IndexTable.Cell>
    //         <P.IndexTable.Cell>{productTitle}</P.IndexTable.Cell>
    //         <P.IndexTable.Cell>{productVendor}</P.IndexTable.Cell>
    //     </P.IndexTable.Row>
    // })

    const rowMarkup = assignProduct.map(({ node }, index) => {
        return <P.IndexTable.Row
            id={index}
            key={index}
            selected={selectedResources.includes(index)}
            position={index}
        >
            <P.IndexTable.Cell>
                {
                    node.images.edges.map(({ node }, index) => {
                        return <img src={node?.url} width="100" height="100" />
                    })
                }
            </P.IndexTable.Cell>
            <P.IndexTable.Cell>
                <P.Link removeUnderline={true} onClick={() => {
                    navigate(`https://admin.shopify.com/products/${node?.id.replace("gid://shopify/Product/", "")}`, {
                        target: "new"
                    })
                }}>{node?.title}</P.Link>
            </P.IndexTable.Cell>
            <P.IndexTable.Cell>{node?.status}</P.IndexTable.Cell>
            <P.IndexTable.Cell>{node?.vendor}</P.IndexTable.Cell>
            <P.IndexTable.Cell></P.IndexTable.Cell>
        </P.IndexTable.Row>
    })

    const handleActive = () => {
        setActive(true);
    };

    const handleCancel = () => {
        setActive(false);
    };

    const handleSelection = (resource) => {

        for (let i = 0; i < resource.selection.length; i++) {

            const productID = resource.selection[i].id.replace("gid://shopify/Product/", "");
            const productTitle = resource.selection[i].title;
            const productImage = resource.selection[i].images;
            const productVendor = resource.selection[i].vendor;

            assignProduct.push({
                productID: productID,
                productTitle: productTitle,
                productImage: productImage[0].originalSrc,
                productVendor: productVendor
            });
        }

        setActive(false);
    };

    const handleFetchProducts = async () => {

        setLoading(true);

        const response = await fetch("/api/products/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product_tag: valueProductTagName
            })
        })
        .then(response => response.json())
        .then(response => setAssignProduct(response?.data));

        setLoading(false);
    };

    return (
        <>
            <P.Card>
                <P.Page>
                    <P.Layout>
                        <P.Layout.Section>
                            <P.Card title="Enter the Product Tag that will apply to this Option Set" sectioned>
                                <P.TextField
                                    type="text"
                                    value={valueProductTagName}
                                    onChange={handleChangeProductTagName}
                                    autoComplete="off"
                                    helpText="Specify the Product Tag of the option set. It can be seen internally only."
                                />
                                <br />
                                <P.Button primary loading={loading} onClick={handleFetchProducts}>Fetch Products</P.Button>
                            </P.Card>

                            {/* <P.IndexTable
                                resourceName={resourceName}
                                itemCount={assignProduct.length}
                                selectedItemsCount={
                                    allResourcesSelected ? 'All' : selectedResources.length
                                }
                                onSelectionChange={handleSelectionChange}
                                headings={[
                                    { title: 'Product Image' },
                                    { title: 'Product ID' },
                                    { title: 'Product Title' },
                                    { title: 'Product Vendor' },
                                ]}
                                bulkActions={bulkActions}
                            >
                                {rowMarkup}
                            </P.IndexTable> */}
                        </P.Layout.Section>

                        <P.Layout.Section>
                            <P.Page title={`Total ${assignProduct.length} assigned products`}>
                                <P.Card>
                                    <P.IndexTable
                                        resourceName={resourceName}
                                        itemCount={assignProduct.length}
                                        selectedItemsCount={
                                            allResourcesSelected ? 'All' : selectedResources.length
                                        }
                                        onSelectionChange={handleSelectionChange}
                                        headings={[
                                            { title: 'Product Image' },
                                            { title: 'Product Title' },
                                            { title: 'Product Status' },
                                            { title: 'Product Vendor' },
                                        ]}
                                        bulkActions={bulkActions}
                                    >
                                        {rowMarkup}
                                    </P.IndexTable>
                                </P.Card>
                            </P.Page>
                            <br />
                        </P.Layout.Section>

                    </P.Layout>
                </P.Page>
            </P.Card>
            <br />
            {/* <P.Button onClick={handleActive} primary>Add Products</P.Button> */}
            <ResourcePicker resourceType="Product" open={active} onCancel={handleCancel} onSelection={handleSelection} />
        </>
    )


    function sortCurrency(rows, index, direction) {
        return [...rows].sort((rowA, rowB) => {
            const amountA = parseFloat(rowA[index].substring(1));
            const amountB = parseFloat(rowB[index].substring(1));

            return direction === 'descending' ? amountB - amountA : amountA - amountB;
        });
    }
}

export default ProductTab;