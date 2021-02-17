import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import twitterRoutes from "./routes/twitter.routes"
import SpacesService from "./services/spaces.service";

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors())

app.use("/api/generate", twitterRoutes)

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
