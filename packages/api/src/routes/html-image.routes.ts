import express from "express";
import * as HTMLImageMiddleware from "../middlewares/html-image.middlewares";
import { saveImage } from "../middlewares/images.middleware";
import { expressClient as client } from "../redis";

const router = express.Router()

router.post("/html", HTMLImageMiddleware.generateFromHTML, saveImage);

export default router;