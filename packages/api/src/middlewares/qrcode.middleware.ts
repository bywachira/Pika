import { NextFunction, Request, Response } from "express";
import QRCodeImageService from "../services/qrcode.service";

export const generateQRCode = (req: Request, res: Response, next: NextFunction) => {
    new QRCodeImageService(req.body.text, req.body.options).generateQRCode()
        .then(Res => {
            res.locals.file_upload = Res;
            res.locals.file_type = 'qrcode';
            next();
        })
        .catch(err => {
            console.log(err)
            return res.status(err.status || 500).json({
                message: err.message
            })
        })
}