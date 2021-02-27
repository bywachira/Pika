import express from "express";
import * as AuthMiddleware from "../middlewares/auth.middleware";

const router = express.Router()

router.post("/authenticate", AuthMiddleware.authentication);

export default router;