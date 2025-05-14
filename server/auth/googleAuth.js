import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);

const getGoogleAuthURL = () => {
  const scopes = ["https://www.googleapis.com/auth/calendar"];

  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
};

const getGoogleTokens = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  return tokens;
};

export { getGoogleAuthURL, getGoogleTokens, oAuth2Client };
