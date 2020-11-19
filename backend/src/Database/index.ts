import mongoose from "mongoose";

const MONGO_IP = "database"; //docker-compose adds service link as ip in hosts
const MONGO_PORT = "27017";
const DB_URL = `mongodb://${MONGO_IP}:${MONGO_PORT}`;

mongoose.connect(`${DB_URL}/ezbacktest`, { useNewUrlParser: true, useUnifiedTopology: true });

