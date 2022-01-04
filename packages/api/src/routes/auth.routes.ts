import express from "express";
import * as AuthMiddleware from "../middlewares/auth.middleware";
import * as APIKeyMiddleware from "../middlewares/api-key.middleware";

const router = express.Router()

router.post("/authenticate", AuthMiddleware.authentication);

router.get("/getStatus", AuthMiddleware.authMiddleware, AuthMiddleware.isAuthenticated)

router.post("/generateAPIKey", AuthMiddleware.authMiddleware, APIKeyMiddleware.generateAPIKey);

export default router;