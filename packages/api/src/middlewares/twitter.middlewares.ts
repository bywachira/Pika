import { NextFunction, Request, Response } from "express"
import TwitterService from "../services/twitter.service";

export const generateFromTweet = (req: Request, res: Response, next: NextFunction) => {
    new TwitterService(req.query.twitterURL).generateFromTweet(req.query.fileType).then(Res => {
        res.locals.file_upload = Res;
        res.locals.file_type = 'twitter';
        next();
    }).catch(err => {
        console.log(err)
        res.status(err.status || 500).json({
            message: err.message
        })
    })
}

export const toSvg = async (req: Request, res: Response) => {
    new TwitterService(req.query.twitterURL).htmlToBase64(``).then(image => {
        res.writeHead(200, { "Content-Type": "image/png" })
        res.end(image, "binary")
    })
}