import mongoose from "mongoose";

const SessionsSchema = new mongoose.Schema({
    id: String,
    shop: String,
    state: String,
    isOnline: Boolean,
    scope: String,
    accessToken: String,
});

const Sessions = mongoose.model('shopify_sessions', SessionsSchema);

export default Sessions;
