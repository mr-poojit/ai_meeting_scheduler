import Meeting from "../models/Meeting.js";
import { sendSMS } from "../services/smsService.js";
import { sendEmail } from "../services/emailService.js";
import { createCalendarEvent } from "../services/calendarService.js";

export const scheduleMeeting = async (req, res) => {
  const { name, email, phone, title, description, startTime, endTime } =
    req.body;

  await sendSMS(
    phone,
    `Hi ${name}, your meeting "${title}" is confirmed at ${startTime}`
  );

  await sendEmail(
    email,
    "Meeting Confirmation",
    `<p>Hi ${name},<br>Your meeting <b>${title}</b> is confirmed from <b>${startTime}</b> to <b>${endTime}</b>.</p>`
  );

  await createCalendarEvent(tokens, {
    title,
    description,
    startTime,
    endTime,
  });

  res
    .status(200)
    .json({ message: "Meeting scheduled with confirmations sent!" });
};

export const createMeeting = async (req, res) => {
  try {
    const { name, email, date, time } = req.body;
    const newMeeting = new Meeting({ name, email, date, time });
    await newMeeting.save();
    res.status(201).json({ message: "Meeting scheduled", meeting: newMeeting });
  } catch (error) {
    res.status(500).json({ message: "Error creating meeting", error });
  }
};

export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meetings", error });
  }
};
