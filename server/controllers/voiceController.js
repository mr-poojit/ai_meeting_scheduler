import twilio from "twilio";

const VoiceResponse = twilio.twiml.VoiceResponse;

export const voiceWebhook = (req, res) => {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    input: "speech",
    timeout: 5,
    hints: "name, email, date, time, appointment, meeting",
    action: "/api/voice/handle-input",
    method: "POST",
  });

  gather.say(
    "Hi! I am your AI scheduling assistant. Please tell me your name and the date you want to schedule a meeting."
  );

  res.type("text/xml");
  res.send(twiml.toString());
};
