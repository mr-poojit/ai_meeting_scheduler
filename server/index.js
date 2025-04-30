import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import meetingRoutes from "./routes/meetings.js";
import voiceRoutes from "./routes/voice.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/meetings", meetingRoutes);
app.use("/api/voice", voiceRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
