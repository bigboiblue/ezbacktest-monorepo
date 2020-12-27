import { Router } from "express";
import chartRouter from "./chart";
import scriptRouter from "./script";
const router = Router();

router.use("/chart", chartRouter);
router.use("/script", scriptRouter);

export default router;

