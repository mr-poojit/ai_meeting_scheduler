import express from "express";
import { saveMeeting, getMeetings } from "../controllers/meetingController.js";

const router = express.Router();

router.post("/", saveMeeting);
router.get("/", getMeetings);

export default router;
