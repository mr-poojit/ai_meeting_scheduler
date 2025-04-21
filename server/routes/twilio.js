import express from "express";
import { voiceWebhook } from "../controllers/voiceController.js";

const router = express.Router();

router.post("/twilio/voice", voiceWebhook);

export default router;
