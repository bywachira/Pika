import { Request, Response } from "express";
import QRCodeImageService from "../services/qrcode.service";

export const generateQRCode = (req: Request, res: Response) => {
    new QRCodeImageService(req.body.text, req.body.options).generateQRCode()
        .then(Res => {
            return res.status(201).json(Res)
        })
        .catch(err => {
            console.log(err)
            return res.status(err.status || 500).json({
                message: err.message
            })
        })
}