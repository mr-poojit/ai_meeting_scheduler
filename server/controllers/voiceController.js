import twilio from "twilio";
import Meeting from "../models/Meeting.js";

const VoiceResponse = twilio.twiml.VoiceResponse;

export const voiceWebhook = (req, res) => {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    input: "speech",
    timeout: 5,
    hints: "name, email, date, time, meeting",
    action: "/api/voice/handle-input",
    method: "POST",
  });

  gather.say(
    "Hi! I am your AI scheduling assistant. Please tell me your name and the date you want to schedule a meeting."
  );

  res.type("text/xml");
  res.send(twiml.toString());
};

export const handleVoiceInput = async (req, res) => {
  const speechText = req.body.SpeechResult;
  console.log("🔈 Received speech:", speechText);

  // Dummy extraction (replace with NLP/LLM later)
  const nameMatch = speechText.match(/(?:I am|This is)\s([A-Za-z]+)/i);
  const dateMatch = speechText.match(/(?:on|for)\s(\w+\s\d+)/i);
  const timeMatch = speechText.match(/(?:at)\s([\d:apm]+)/i);

  const name = nameMatch?.[1] || "Unknown";
  const date = dateMatch?.[1] || "Not Provided";
  const time = timeMatch?.[1] || "Not Provided";

  try {
    const newMeeting = new Meeting({ name, date, time });
    await newMeeting.save();
    const twiml = new VoiceResponse();
    twiml.say(
      `Thank you ${name}, your meeting is scheduled on ${date} at ${time}.`
    );
    res.type("text/xml");
    res.send(twiml.toString());
  } catch (err) {
    console.error("❌ Error saving meeting to MongoDB:", err); // ✅ Logs the actual error

    const twiml = new VoiceResponse();
    twiml.say(
      "Sorry, there was an error scheduling your meeting. Please try again later."
    );

    res.type("text/xml");
    res.send(twiml.toString());
  }
};
