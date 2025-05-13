import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import meetingRoutes from "./routes/meetings.js";
import voiceRoutes from "./routes/voice.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "your_secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/meetings", meetingRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
