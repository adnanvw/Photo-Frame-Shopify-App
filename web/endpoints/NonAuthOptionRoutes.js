const NonAuthOptionRoutes = (app, OptionSet, Sessions, shopify, mongoose) => {

    app.get("/api/options/get", async (req, res) => {

        try {
            const fetchOptions = await OptionSet.find();
            res.status(200).send({ msg: "success", data: fetchOptions });

        } catch (error) {
            console.log("ERROR", error);
            res.status(500).send({ msg: "error" });
        }

    });

    app.post("/api/options/delete", async (req, res) => {

        try {

            const deleteObjID = mongoose.Types.ObjectId(req.body.deleteID);
            const deleteOption = await OptionSet.findOneAndDelete({ _id: deleteObjID });

            res.status(200).send({ msg: "success" });

        } catch (error) {
            console.log("ERROR", error);
            res.status(500).send({ msg: "error" });
        }

    });

    app.post("/api/variant/create", async (req, res) => {

        try {

            // console.log("REQQQQQQQ", req.body);
            const { product_id, product_properties, product_rules } = req.body;

            const fetchSession = await Sessions.find();
            const session = fetchSession[0];

            const get_default_variant = await shopify.api.rest.Variant.all({ session, product_id: product_id });

            let variant_price = get_default_variant[0].price;

            console.log("variant_price1", variant_price);

            for (let i = 0; i < product_rules.length; i++) {

                let check_condition;

                switch (product_rules[i].ruleOption) {
                    case 'grootte':

                        if (product_properties.Grootte === product_rules[i].ruleOptionValue) {

                            check_condition = product_rules[i].ruleCondition;

                            if (check_condition === "increasePrice") {
                                variant_price = Number(variant_price) + Number(product_rules[i].ruleConditionValue);
                            } else if (check_condition === "decreasePrice") {
                                variant_price = Number(variant_price) - Number(product_rules[i].ruleConditionValue);
                            }

                        }
                        break;

                    case 'witruimte':
                        if (product_properties.Witruimte === product_rules[i].ruleOptionValue) {

                            check_condition = product_rules[i].ruleCondition;

                            if (check_condition === "increasePrice") {
                                variant_price = Number(variant_price) + Number(product_rules[i].ruleConditionValue);
                            } else if (check_condition === "decreasePrice") {
                                variant_price = Number(variant_price) - Number(product_rules[i].ruleConditionValue);
                            }

                        }
                        break;
                    case 'beschermende':
                        if (product_properties["Beschermende laag"] === product_rules[i].ruleOptionValue) {

                            check_condition = product_rules[i].ruleCondition;

                            if (check_condition === "increasePrice") {
                                variant_price = Number(variant_price) + Number(product_rules[i].ruleConditionValue);
                            } else if (check_condition === "decreasePrice") {
                                variant_price = Number(variant_price) - Number(product_rules[i].ruleConditionValue);
                            }

                        }
                        break;
                    case 'montage':
                        if (product_properties["Montage Kunstprint"] === product_rules[i].ruleOptionValue) {

                            check_condition = product_rules[i].ruleCondition;

                            if (check_condition === "increasePrice") {
                                variant_price = Number(variant_price) + Number(product_rules[i].ruleConditionValue);
                            } else if (check_condition === "decreasePrice") {
                                variant_price = Number(variant_price) - Number(product_rules[i].ruleConditionValue);
                            }

                        }
                        break;
                    case 'lijst':
                        if (product_properties.Lijst === product_rules[i].ruleOptionValue) {

                            check_condition = product_rules[i].ruleCondition;

                            if (check_condition === "increasePrice") {
                                variant_price = Number(variant_price) + Number(product_rules[i].ruleConditionValue);
                            } else if (check_condition === "decreasePrice") {
                                variant_price = Number(variant_price) - Number(product_rules[i].ruleConditionValue);
                            }

                        }
                        break;
                    case 'ophangsysteem':
                        if (product_properties.Ophangsysteem === product_rules[i].ruleOptionValue) {

                            check_condition = product_rules[i].ruleCondition;

                            if (check_condition === "increasePrice") {
                                variant_price = Number(variant_price) + Number(product_rules[i].ruleConditionValue);
                            } else if (check_condition === "decreasePrice") {
                                variant_price = Number(variant_price) - Number(product_rules[i].ruleConditionValue);
                            }

                        }
                        break;
                    default:
                        break;
                }
            }

            console.log("variant_price", variant_price);

            const variant = new shopify.api.rest.Variant({ session });
            variant.product_id = product_id;
            variant.option1 = `Default Title ${Math.round(Math.random() * 9999999)}`;
            variant.price = variant_price;
            await variant.save({
                update: true,
            });

            res.status(200).send({ msg: "success", variant_id: variant?.id });
            // res.status(200).send({ msg: "success" });

        } catch (error) {

            console.log("ERROR", error);
            res.status(500).send({ msg: "error" });
        }

    });

};

export default NonAuthOptionRoutes;