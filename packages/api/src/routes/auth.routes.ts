import express from "express";
import * as AuthMiddleware from "../middlewares/auth.middleware";

const router = express.Router()

router.post("/authenticate", AuthMiddleware.authentication);

router.get("/getStatus", AuthMiddleware.authMiddleware, AuthMiddleware.isAuthenticated)

export default router;