import express from "express";
import { saveImage } from "../middlewares/images.middleware";
import * as TwitterController from "../middlewares/twitter.middlewares";
import { expressClient as client } from "../redis"

const router = express.Router()

router.get("/tweet", TwitterController.generateFromTweet, saveImage);
router.get("/toSvg", client.route({
    expire: 2592000
}), TwitterController.toSvg);

export default router;
