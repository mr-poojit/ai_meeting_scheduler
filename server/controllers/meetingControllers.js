import Meeting from "../models/Meeting.js";

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
