import express from "express";
import { saveImage } from "../middlewares/images.middleware";
import * as QRCodeImageMiddleware from "../middlewares/qrcode.middleware";

const router = express.Router()

router.post("/qr", QRCodeImageMiddleware.generateQRCode, saveImage);

export default router;