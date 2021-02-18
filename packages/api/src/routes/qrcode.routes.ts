import express from "express";
import * as QRCodeImageMiddleware from "../middlewares/qrcode.middleware";

const router = express.Router()

router.post("/qr", QRCodeImageMiddleware.generateQRCode);

export default router;