import mongoose from "mongoose";

export const chartSchema = new mongoose.Schema({
    user_id: { type: Number, required: true }, // User ID that this chart is attached to
    name: { type: String, required: true }, // Chart configuration name
    current: { type: Boolean, required: true }, // Is this chart currently in use?
    sectors: [{
        position: { type: Number, required: true },
        size: { type: Number, required: true },
        indicators: [{
            link: { type: String, required: true },
            params: { type: Object, required: false },
            z_index: { type: Number, required: true },
        }],
        theming: { // SECTOR THEMING: None are required, since it will default to global theming
            bg_color: { type: String, required: false },
            font_color: { type: String, required: false },
            axis_line_color: { type: String, required: false },
            axis_bg_color: { type: String, required: false },
            x_axis_margin: { type: Number, required: false },
            y_axis_margin: { type: Number, required: false },
            grid_enabled: { type: Boolean, required: false },
            grid_color: { type: String, required: false },
        },
    }],
    theming: { // GLOBAL THEMING: None of these are also required, since there will be a hardcoded default
        bg_color: { type: String, required: false },
        font_color: { type: String, required: false },
        axis_line_color: { type: String, required: false },
        axis_bg_color: { type: String, required: false },
        x_axis_margin: { type: Number, required: false },
        y_axis_margin: { type: Number, required: false },
        grid_enabled: { type: Boolean, required: false },
        grid_color: { type: String, required: false },
    },
}, { versionKey: false });

export const charts = mongoose.model("chart", chartSchema);
