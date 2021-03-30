import express from "express";
import * as FontMiddleware from "../middlewares/font.middleware";

const router = express.Router();

router.get(`/fonts`, FontMiddleware.getFonts);

export default router;