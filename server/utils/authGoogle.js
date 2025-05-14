const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  "YOUR_CLIENT_ID",
  "YOUR_CLIENT_SECRET",
  "YOUR_REDIRECT_URL"
);

// Call this in auth route
function getAuthUrl() {
  const SCOPES = ["https://www.googleapis.com/auth/calendar"];
  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
}

const addGoogleEvent = async (accessToken, refreshToken, meeting) => {
  oAuth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const event = {
    summary: meeting.title,
    description: meeting.description,
    start: { dateTime: meeting.startTime },
    end: { dateTime: meeting.endTime },
  };

  await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  console.log("Google event created");
};

module.exports = { getAuthUrl, addGoogleEvent };
