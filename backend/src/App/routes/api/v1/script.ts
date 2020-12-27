import { Router } from "express";
import { scripts } from "./db_models/script";
import { Script } from "./typings/script";
const router = Router();

router.get("/", async (request, response, next) => {
    const { user_id, name } = request.body;
    response.type("application/json");
    try {
        // TODO: Replace this (and all other mongodb requests) with proper user authentication
        const script: Script = await scripts.findOne({ user_id, name });
        response.send({ type: "script", function: script.function });
    } catch {
        response.status(404).send({ type: "error", error: `Could not find the script associated with the user id: ${user_id} and the script name: ${name}` });
    }
});

router.post("/", async (request, response, next) => {
    // TODO: do some validation on request
    const req: Script = request.body;
    const document = { user_id: req.user_id, name: req.name, function: req.function };
    const result = await scripts.insertMany(document);

    response.type("application/json");
    response.status(200);
    response.send({ type: "status", status: "Added script successfully" });
});


export default router;
