# 📅 AI Meeting Scheduler with Voice & Manual Booking

This is an AI-powered meeting scheduler that supports **both manual form-based scheduling** and **voice-based booking via phone calls** using **Exotel**. It uses **React** for the frontend, **FastAPI** for the backend, and **MongoDB** to store meeting data.

---

## 🚀 Features

- 📞 Voice-based scheduling via Exotel
- 📝 Manual form-based scheduling via web UI
- 🤖 Natural Language Processing for smart meeting handling
- 🧠 AI agent (in progress)
- 💾 MongoDB for persistent meeting storage
- 🌐 REST API for integration with other services

---

## 🧱 Tech Stack

| Layer     | Technology                |
| --------- | ------------------------- |
| Frontend  | React (TypeScript)        |
| Backend   | FastAPI (Python)          |
| Voice API | Exotel (India-based)      |
| Database  | MongoDB                   |
| Tunneling | Ngrok (for local testing) |

---

## 📂 Folder Structure

```
ai-meeting-scheduler/
│
├── backend/               # FastAPI backend
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── routers/
│       └── meeting.py
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   └── BookingForm.tsx
│   │   └── api/
│   │       └── meeting.ts
│
├── README.md
└── requirements.txt       # Python backend dependencies
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-meeting-scheduler.git
cd ai-meeting-scheduler
```

### 2. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

> Make sure MongoDB is running locally or use Atlas and update `MONGO_URI` in `database.py`.

### 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

### 4. Exotel Webhook

- Configure your **Exotel applet** to hit:

```
https://<your-ngrok-url>/voice-webhook
```

- Ngrok (for testing locally):

```bash
ngrok http 8000
```

---

## 🖼️ Screenshots

### Manual Booking Form

![Manual Booking](./Screenshot_2025-05-11_192327.png)

### API Working (Postman)

![Postman API](./Screenshot_2025-05-11_192453.png)

### Exotel Voice Request Triggered

![Voice Webhook](./Screenshot_2025-05-11_192505.png)

---

## 📬 API Endpoints

### Schedule a Meeting (Manual)

```http
POST /schedule-meeting
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "date": "2025-05-15",
  "time": "14:00"
}
```

### Voice Booking Webhook (Exotel)

```http
POST /voice-webhook
```

Handles voice-to-text transcription and schedules meeting based on user voice input.

---

## 🛠️ To-Do

- [x] Manual form-based scheduling
- [x] Voice-based booking with Exotel
- [x] Store data in MongoDB
- [x] Webhook integration for Exotel
- [ ] AI Agentic model for natural dialog flow (in progress)
- [x] Add SMS/email confirmation
- [x] Add calendar sync (Google/Outlook)

---

## 📃 License

MIT License

---

## 👨‍💻 Author

Made with ❤️ by [Your Name](https://github.com/your-username)
