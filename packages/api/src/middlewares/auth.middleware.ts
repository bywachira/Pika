import { NextFunction, Request, response, Response } from "express";
import firebase from "../firebase/index";
import AuthService from "../services/auth.service";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers.authorization;

    if (!headerToken) {
        return res.send({ message: "Create an account or log in", logout: true }).status(401);
    }

    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
        res.send({ message: "Invalid session", logout: true })
    }

    const token = headerToken.split(" ")[1];

    firebase.auth().verifyIdToken(token).then(async result => {
        const account = await new AuthService().getUserByUid(result.uid, result.email)

        res.locals.account = account;

        next()
    }).catch(() => res.send({ message: "Problem logging you in" }).status(403))
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (res.locals.account?.email) {
        return res.status(201).json({
            status: "ok",
            account: res.locals.account,
        })
    } else {
        return res.status(403).json({
            status: "fail",
            error: "Please try logging in again",
            auth: false,
        })
    }
}

export function authentication(req: Request, res: Response, next: NextFunction) {
    new AuthService()
        .authentication(req.body)
        .then(Res => {
            return res.status(200).json(Res)
        }).catch(err => {
            return res.status(400).json({ error: "Bad request" })
        })
}