import { NextFunction, Request, Response } from 'express';
import ImageServices from '../services/image.service';

export const getImages = (req: Request, res: Response, next: NextFunction) => {
    new ImageServices(res.locals.account.id, null).getImages(
        // @ts-ignore
        res.locals.account.id, req.query.limit, req.query.cursor, req.query.jump)
        .then(Res => {
            res.status(200).json(Res);
        })
        .catch(err => {
            console.log(err)
            return res.status(err.status || 500).json({
                message: err.message
            })
        })
}

export const getImage = (req: Request, res: Response, next: NextFunction) => {
    new ImageServices(res.locals.account.id, null).getImage(res.locals.account.id, req.params.image_id)
        .then(Res => {
            res.status(200).json(Res)
        })
        .catch(err => {
            console.log(err);
            return res.status(err.status || 500).json({
                message: err.message
            })
        })
}

export const deleteImage = (req: Request, res: Response, next: NextFunction) => {
    new ImageServices(res.locals.account.id, null).deleteImage(res.locals.account.id, req.params.image_id)
        .then(Res => {
            res.status(200).json(Res)
        })
        .catch(err => {
            console.log(err);
            return res.status(err.status || 500).json({
                message: err.message
            })
        })
}

export const saveImage = (req: Request, res: Response, next: NextFunction) => {
    new ImageServices(res.locals.account.id, res.locals.file_upload.upload).saveImage()
        .then(Res => {
            res.status(201).json(Res)
        })
        .catch(err => {
            console.log(err);
            return res.status(err.status || 500).json({
                message: err.message
            })
        })
}