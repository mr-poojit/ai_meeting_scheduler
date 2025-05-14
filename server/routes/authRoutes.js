import express from "express";
import { google } from "googleapis";
import { getGoogleTokens, oAuth2Client } from "../auth/googleAuth.js"; // Make sure these are properly defined
import { sendEmail } from "../utils/emailService.js";

const router = express.Router();

// STEP 1: Redirect to Google Login
router.get("/google", (req, res) => {
  const url = getGoogleAuthURL();
  res.redirect(url);
});

// STEP 2: Google Callback
router.get("/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokens = await getGoogleTokens(code);
    oAuth2Client.setCredentials(tokens);

    // Create calendar instance
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    // Insert event
    await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: "Test Meeting",
        description: "This is a test meeting from AI scheduler",
        start: {
          dateTime: "2025-05-15T10:00:00.000Z", // Adjust time
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: "2025-05-15T10:30:00.000Z", // Adjust time
          timeZone: "Asia/Kolkata",
        },
        attendees: [{ email: "your-email@example.com" }], // optional
      },
    });

    // Send email confirmation
    await sendEmail(
      "user@example.com", // Replace with user's actual email
      "Meeting Scheduled",
      "✅ Your meeting has been scheduled successfully and added to your calendar."
    );

    res.send("✅ Google Auth + Calendar Event Created!");
  } catch (error) {
    console.error("❌ Error during Google Auth/Calendar:", error.message);
    res.status(500).send("Auth failed");
  }
});

export default router;
