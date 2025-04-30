import express from "express";
import {
  voiceWebhook,
  handleVoiceInput,
} from "../controllers/voiceController.js";

const router = express.Router();

router.post("/twilio/voice", voiceWebhook);
router.post("/handle-input", handleVoiceInput);

export default router;
