import { Router } from "express";
import chartRouter from "./chart";
const router = Router();

router.use("/chart", chartRouter);

export default router;

