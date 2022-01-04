import { NextFunction, Request, response, Response } from 'express';
import APIKeyService from '../services/api-key.service';

export function generateAPIKey(req: Request, res: Response, next: NextFunction) {
    const accountID = res.locals.account.id;

    console.log(accountID)

    new APIKeyService().generateAPIKey(accountID)
        .then(Res => {
            res.status(201).json({
                api_key: Res
            });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        })
}

export function verifyAPIKey(req: Request, res: Response, next: NextFunction) {
    const apiKey: any = req.headers['x-api-key'];

    new APIKeyService().verifyAPIKey(apiKey)
        .then(Res => {
            res.locals.account = {
                id: Res.acc_id
            }

            next();
        })
        .catch(err => {
            res.status(403).json({ error: err.message });
        })
}
