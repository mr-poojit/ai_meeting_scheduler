import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  participants: String,
  agenda: String,
  confirmedAt: String,
});

export default mongoose.model("Meeting", MeetingSchema);
