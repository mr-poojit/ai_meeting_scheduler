import axios from "axios";
import qs from "querystring";

export const sendSMS = async (to, message) => {
  const exotelSid = "your_exotel_sid";
  const exotelToken = "your_exotel_token";
  const exophone = "your_exophone";

  const auth = Buffer.from(`${exotelSid}:${exotelToken}`).toString("base64");

  const data = {
    From: exophone,
    To: to,
    Body: message,
  };

  try {
    await axios.post(
      `https://${exotelSid}.exotel.in/v1/Accounts/${exotelSid}/Sms/send.json`,
      qs.stringify(data),
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("SMS sent");
  } catch (error) {
    console.error("SMS Error:", error.response?.data || error.message);
  }
};
