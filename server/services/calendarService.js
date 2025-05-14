import { google } from "googleapis";

export const createCalendarEvent = async (tokens, meeting) => {
  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials(tokens);

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

  console.log("Event created in Google Calendar");
};
