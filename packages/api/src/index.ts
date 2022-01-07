import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
// import session from "express-session";
// import * as connectMongo from "connect-mongo";
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import config from "./config";
import twitterRoutes from "./routes/twitter.routes"
// import SpacesService from "./services/spaces.service";
import htmlImageRoutes from "./routes/html-image.routes";
import qrImageRoutes from "./routes/qrcode.routes";
import authRoutes from "./routes/auth.routes";
import thirdPartyRoutes from "./routes/third-party.routes";
import { verifyAPIKey } from "./middlewares/api-key.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import imagesRoutes from './routes/images.routes';
import { redisClient } from "./redis";

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors())

const apiLimiter = rateLimit({
    windowMs: 5000,
    max: 5,
    standardHeaders: true,
    store: new RedisStore({
        client: redisClient
    }),
})

function rateLimit429Handler(err: any, req: Request, res: Response, next: NextFunction) {
    let code = err.code;
    if (code === 429) {
        res.status(429).json({
            message: "Too many API requests. Please try again later."
        })
    }
}

app.use(rateLimit429Handler);

app.use("/api/generate", authMiddleware, twitterRoutes);
app.use("/api/generate", authMiddleware, htmlImageRoutes);
app.use("/api/generate", authMiddleware, qrImageRoutes);
app.use("/api", authMiddleware, imagesRoutes);
app.use("/public-api", apiLimiter, verifyAPIKey, imagesRoutes);
app.use("/public-api/generate", apiLimiter, verifyAPIKey, twitterRoutes);
app.use("/public-api/generate", apiLimiter, verifyAPIKey, htmlImageRoutes);
app.use("/public-api/generate", apiLimiter, verifyAPIKey, qrImageRoutes);
app.use("/api/third-party", thirdPartyRoutes);
app.use("/api", authRoutes);

const port: any = process.env.PORT || 8900;

// mongoose.connect(config.database, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }, () => {
//     console.log("📀[database]: connected to the database successfully")
// })


app.listen(port, () => {
    console.log([`⚡️[server]: server is running on localhost ${port}`])
})

export default app;
