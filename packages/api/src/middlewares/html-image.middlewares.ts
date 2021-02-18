import { Request, Response } from "express";
import HTMLImageService from "../services/html-image.service";

export const generateFromHTML = (req: Request, res: Response) => {
    const meta = req.body;

    new HTMLImageService(meta.html, meta.css, meta.head_content, meta.file_type).generateFromHTML()
        .then(Res => {
            return res.status(201).json(Res)
        })
        .catch(err => {
            return res.status(err.status || 500).json({
                message: err.message
            })
        })
}