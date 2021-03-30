import { NextFunction, Request, Response } from "express";
import FontService from "../services/font.service";

export function getFonts(req: Request, res: Response, next: NextFunction) {
    new FontService().getFonts()
        .then(Res => {
            return res.status(200).json({
                status: "ok",
                fonts: Res
            })
        }).catch(err => {
            return res.status(400).json({
                status: "fail",
                error: "Problem reaching Google fonts"
            })
        })
}