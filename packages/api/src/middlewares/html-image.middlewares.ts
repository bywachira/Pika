import { NextFunction, Request, Response } from "express";
import HTMLImageService from "../services/html-image.service";

export const generateFromHTML = (req: Request, res: Response, next: NextFunction) => {
    const meta = req.body;

    new HTMLImageService(meta.html, meta.css, meta.head_content, meta.file_type).generateFromHTML()
        .then(Res => {
            res.locals.file_upload = Res;
            res.locals.file_type = 'html';
            next();
        })
        .catch(err => {
            return res.status(err.status || 500).json({
                message: err.message
            })
        })
}