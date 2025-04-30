import express from "express";
import {
  createMeeting,
  getMeetings,
} from "../controllers/meetingControllers.js";

const router = express.Router();

router.post("/", createMeeting);
router.get("/", getMeetings);

export default router;
