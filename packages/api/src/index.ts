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

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors())


app.use("/api/generate", twitterRoutes);
app.use("/api/generate", htmlImageRoutes);
app.use("/api/generate", qrImageRoutes);
app.use("/api", authRoutes);

const port: any = process.env.PORT || 8900;

mongoose.connect(config.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log("📀[database]: connected to the database successfully")
})


app.listen(port, () => {
    console.log([`⚡️[server]: server is running on localhost ${port}`])
})

export default app;
