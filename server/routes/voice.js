import express from "express";
import {
  exotelVoicePrompt,
  handleRecordingCallback,
} from "../controllers/voiceController.js";

const router = express.Router();

// Exotel calls this to ask user input
router.post("/voice", exotelVoicePrompt);

// Exotel posts the recorded audio URL here
router.post("/voice/recording", handleRecordingCallback);

export default router;
