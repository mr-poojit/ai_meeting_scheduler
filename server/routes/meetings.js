import express from "express";
import { saveMeeting, getMeetings } from "../controllers/meetingControllers.js";

const router = express.Router();

router.post("/", saveMeeting);
router.get("/", getMeetings);

export default router;
