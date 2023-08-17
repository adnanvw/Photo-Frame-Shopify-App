import mongoose from "mongoose";

const OptionSetSchema = new mongoose.Schema({
    shop: String,
    status: String,
    optionName: String,
    productTagName: String,
    options: Array,
    rules: Array,
    products: Array,
    createdAt: String,
    updatedAt: String
});

const OptionSet = mongoose.model('OptionSets', OptionSetSchema);

export default OptionSet;