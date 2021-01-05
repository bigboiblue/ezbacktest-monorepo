import { Router } from "express";
import { scripts } from "./db_models/script";
import { Script } from "./typings/script";
const router = Router();

router.post("/get", async (request, response, next) => {
    response.type("application/json");
    if (request.body.names) { // If getting more than one script at a time
        const { user_ids, names } = request.body;
        try {
            const ret: Script[] = await scripts.find({ user_id: { $in: user_ids }, name: { $in: names } });
            response.send({ type: "scripts", scripts: ret });
        } catch {
            response.status(404).send({ type: "error", error: `Could not find the scripts associated with the user ids: ${user_ids.toString()} and the script names: ${names.toString()}` });
        }
    } else {
        const { user_id, name } = request.body;
        try {
        // TODO: Replace this (and all other mongodb requests) with proper user authentication
            const ret: Script = await scripts.findOne({ user_id, name });
            response.send({
                type: "script", function: ret.function, name: ret.name, user_id: ret.user_id,
            });
        } catch {
            response.status(404).send({ type: "error", error: `Could not find the script associated with the user id: ${user_id} and the script name: ${name}` });
        }
    }
});


router.post("/add", async (request, response, next) => {
    // TODO: do some validation on request
    const req: Script = request.body;
    const document = { user_id: req.user_id, name: req.name, function: req.function };
    const { user_id, name } = document;

    // Inserts if doesn't exist, and updates if it does exist
    const result = await scripts.updateOne({ user_id, name }, { $set: { ...document } }, { upsert: true });

    response.type("application/json");
    response.status(200);
    response.send({ type: "status", status: "Added / Updated script successfully" });
});


export default router;
