import { Request, Response } from "express"
import TwitterService from "../services/twitter.service";

export const generateFromTweet = (req: Request, res: Response) => {
    new TwitterService(req.query.twitterURL).generateFromTweet("png").then(Res => {
        res.setHeader("Content-Type", Res.type)
        res.status(200).send(Res.image)
        res.writeHead(200, { "Content-Type": Res.type });

        res.end(Res.image, "binary")
    }).catch(err => {
        res.status(400).json(err)
    })
}

export const toSvg = async (req: Request, res: Response) => {
    new TwitterService(req.query.twitterURL).toSvg(``).then(image => {
        res.writeHead(200, { "Content-Type": "image/png" })
        res.end(image, "binary")
    })
}