import express from "express";
import { voiceWebhook } from "../controllers/voiceController.js";

const router = express.Router();
router.post("/webhook", voiceWebhook);

export default router;
