import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
// import session from "express-session";
// import * as connectMongo from "connect-mongo";
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

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors())


app.use("/api/generate", authMiddleware, twitterRoutes);
app.use("/api/generate", authMiddleware, htmlImageRoutes);
app.use("/api/generate", authMiddleware, qrImageRoutes);
app.use("/api", authMiddleware, imagesRoutes);
app.use("/public-api", verifyAPIKey, imagesRoutes);
app.use("/public-api/generate", verifyAPIKey, twitterRoutes);
app.use("/public-api/generate", verifyAPIKey, htmlImageRoutes);
app.use("/public-api/generate", verifyAPIKey, qrImageRoutes);
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
