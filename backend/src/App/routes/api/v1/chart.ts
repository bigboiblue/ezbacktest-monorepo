import { Router } from "express";
import { charts } from "./db_models/chart";
import { Chart } from "./chart_typings";
import { createResponse } from "./utility";
const router = Router();



/** URL Format: /chart?user_id=x **/
router.get("/", async (request, response, next) => {
    response.type("application/json");

    const { user_id } = request.query;
    if (!user_id) {
        response.send(createResponse(null, true, "No user_id was provided though query parameters e.g. .../api/v1/chart?user_id=1"));
        response.end();
        return;
    }
    // @ts-ignore
    const chartList: Chart[] = await charts.find({ user_id });
    if (chartList.length === 0) {
        response.send(createResponse(null, true, `Could not find a chart corresponding to the user_id: ${user_id}`));
        return;
    }

    let chart: Chart = null;
    for (const c of chartList) if (c.current === true) chart = c;
    if (chart) response.send(createResponse(chart));
    else response.send(createResponse(chartList[0])); //TODO: Make this chart current by updating DB

    response.end();
});

export default router;
