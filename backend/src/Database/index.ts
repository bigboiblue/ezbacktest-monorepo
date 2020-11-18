import mongoose, { Mongoose } from "mongoose";

const MONGO_IP = "mongodb"; //docker-compose adds service link as ip in hosts
const MONGO_PORT = "27017";
const DB_URL = `mongodb://${MONGO_IP}:${MONGO_PORT}`;

mongoose.connect(`${DB_URL}/ezbacktest`, { useNewUrlParser: true, useUnifiedTopology: true });

// const OHLCSchema = new mongoose.Schema({
//     time: { type: Date, required: true },
//     open: { type: Number, required: true },
//     high: { type: Number, required: true },
//     low: { type: Number, required: true },
//     close: { type: Number, required: true },
//     volume: { type: Number, required: true },
// },
// { versionKey: false });

// export const ohlc = mongoose.model("ohlcs", OHLCSchema);

