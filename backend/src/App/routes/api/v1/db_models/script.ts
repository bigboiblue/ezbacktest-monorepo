import mongoose from "mongoose";

export const scriptSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true }, // Script name
    function: { type: String, required: true }, // Calculate function in string form
}, { versionKey: false });

export const scripts = mongoose.model("script", scriptSchema);
