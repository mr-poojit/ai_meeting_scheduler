import Meeting from "../models/Meeting.js";
import axios from "axios";

export const exotelVoicePrompt = (req, res) => {
  const exoml = `<?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say>Hello! Thank you for calling AI Meeting Scheduler! Please tell me your name, date, and time for the meeting after the beep.</Say>
    <Record timeout="10" maxDuration="30" action="/api/voice/recording" />
  </Response>`;

  res.type("text/xml");
  res.send(exoml);
};

export const handleRecordingCallback = async (req, res) => {
  const recordingUrl = req.body.RecordingUrl;

  console.log("🎙️ Received Recording URL:", recordingUrl);

  const mockTranscription =
    "My name is Raj, schedule a meeting on April 30 at 5 PM";

  const nameMatch = mockTranscription.match(/name is (\w+)/i);
  const dateMatch = mockTranscription.match(/on ([\w\s]+)/i);
  const timeMatch = mockTranscription.match(/at ([\d:\s\w]+)/i);

  const name = nameMatch?.[1] || "Unknown";
  const date = dateMatch?.[1] || "Not provided";
  const time = timeMatch?.[1] || "Not provided";

  try {
    const newMeeting = new Meeting({ name, date, time });
    await newMeeting.save();
    res.status(200).send("Meeting scheduled successfully.");
  } catch (error) {
    console.error("Error scheduling meeting:", error.message || error);
    res.status(500).send("Failed to schedule meeting.");
  }
};
