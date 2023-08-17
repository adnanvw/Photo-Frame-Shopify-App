const OptionRoutes = (app, OptionSet, shopify) => {

    app.post("/api/options/save", async (req, res) => {

        try {

            const session = res.locals.shopify.session;

            const checkIfOptionExists = await OptionSet.findOne({ optionName: req.body.optionSetName });

            if (checkIfOptionExists) {

                const updateOption = await OptionSet.findOneAndUpdate({ optionName: req.body.optionSetName }, req.body, { upsert: false });

            } else {

                const saveOptionSet = new OptionSet({
                    shop: session.shop,
                    optionName: req.body.optionSetName,
                    productTagName: req.body.productTagName,
                    options: req.body.options,
                    rules: req.body.rules,
                    products: req.body.products,
                    createdAt: new Date().toGMTString(),
                    updatedAt: new Date().toGMTString()
                });

                await saveOptionSet.save();
            }

            res.status(200).send({ msg: "success" });

        } catch (error) {

            console.log("ERROR", error);
            res.status(500).send({ msg: "error" });

        }

    });

    app.post("/api/products/get", async (req, res) => {

        try {

            const session = res.locals.shopify.session;
            const client = new shopify.api.clients.Graphql({ session });

            const data = await client.query({
                data: `query {
                  products(first: 100, query: "tag:${req.body?.product_tag}") {
                    edges {
                      node {
                        id
                        title
                        vendor
                        status
                        images(first:1) {
                            edges {
                                node {
                                    id
                                    url
                                }
                            }
                        }
                      }
                    }
                  }
                }`,
            });

            res.status(200).send({ msg: "success", data: data.body.data.products.edges });

        } catch (error) {
            console.log("ERROR", error.response);
            res.status(500).send({ msg: "error" });
        }

    });

};

export default OptionRoutes;