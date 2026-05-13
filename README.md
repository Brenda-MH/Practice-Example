# Exam Manager 📝
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Flutter](https://img.shields.io/badge/Flutter-%3E%3D3.10.0-02569B?logo=flutter)
![Dart](https://img.shields.io/badge/Dart-%3E%3D3.0.0-0175C2?logo=dart)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-green)

> A Flutter-based exam management platform that lets students take multiple-choice, open-ended, and matching exams — with every response persisted as a single nested document in MongoDB via a Node.js REST API.

---

## 👥 Team

| Role | Full Name |
|---|---|
| Data Modeler | Caballero Ortíz Nancy Denisse |
| Query Developer | Ortíz Morales Walther |
| Integration Specialist | Montalvo Hernnadez Brenda Paola |
| Data Seeder / QA | Meza Uzcanga Vladimir |
| Scrum Master | Gomez Coria Barbara Guadalupe |

---

## 📖 Table of Contents
* [Features](#-features) · [Architecture](#️-architecture--tech-stack) · [Getting Started](#-getting-started) · [Backend](#-running-the-backend) · [Flutter App](#-running-the-flutter-app) · [API Reference](#-api-reference) · [Data Model](#-data-model) · [Contributing](#-contributing)

---

## ✨ Features

- **Multiple exam types** — multiple-choice, open-ended, and matching, each with its own screen and scoring logic
- **Student profiles** — Gmail-only validation (`@gmail.com`) enforced on both client and server
- **Persistent results** — every attempt saved as a nested document in MongoDB with score, type, and timestamp
- **Boleta (transcript)** — aggregated average, pass rate, and 0–10 `calificacion` per student
- **Dashboard** — central hub to navigate to any exam type in one tap
- **Offline-first** — profile ID cached via `SharedPreferences`; auth guard protects all routes

---

## 🏛️ Architecture & Tech Stack

```
┌─────────────────────────┐        HTTP/JSON        ┌──────────────────────────┐
│   Flutter App (client)  │ ──────────────────────► │  Express API  (server)   │
│  Screens · Services     │ ◄────────────────────── │  Mongoose · MongoDB Atlas│
└─────────────────────────┘                          └──────────────────────────┘
```

| Layer | Technology |
|---|---|
| Frontend | Flutter ≥ 3.10 · Dart ≥ 3.0 · Material Design 3 |
| HTTP / Storage | `http` ^1.1.0 · `shared_preferences` ^2.2.2 |
| Backend | Node.js · Express ^4.18 · `dotenv` · `nodemon` |
| Database | MongoDB Atlas · Mongoose ^8.0 |

---

## ⚡ Getting Started

**Prerequisites:** Flutter ≥ 3.10, Dart ≥ 3.0, Node.js ≥ 18, npm ≥ 9, MongoDB Atlas account (or local instance).

```bash
git clone https://github.com/Brenda-MH/Practice-Example.git
cd Practice-Example
```

---

## 🖥 Running the Backend

```bash
cd lib/exam_api
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/exam_db
```

```bash
node seed.js   # optional — loads 50 sample student profiles
npm start      # production
npm run dev    # development (auto-restart)
```

Verify:
```bash
curl http://localhost:3000/api/health
# → {"status":"OK","timestamp":"..."}
```

---

## 📱 Running the Flutter App

```bash
flutter pub get
flutter run                   # default device
flutter run -d chrome         # web
flutter run -d emulator-5554  # Android emulator
```

> The app expects the backend at `http://localhost:3000/api`. Update `baseUrl` in `lib/services/api_service.dart` if deploying remotely.

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/profile` | Create a student profile |
| `GET` | `/api/profile/:id` | Fetch a profile |
| `PUT` | `/api/profile/:id` | Update a profile |
| `POST` | `/api/results` | Save an exam result |
| `GET` | `/api/results/:profileId` | List results (newest first) |
| `GET` | `/api/boleta/:profileId` | Aggregated transcript |
| `GET` | `/api/health` | Health check |

**POST `/api/results` body:**
```json
{
  "profileId": "<mongo_id>",
  "examName": "Filosofía — Unidad 2",
  "examType": "multiple-choice",
  "score": 8,
  "maxScore": 10
}
```

---

## 🗃 Data Model

An **Exam** contains questions that can be multiple-choice, open-ended, or matching. The student's response is saved as a single nested document.

```
Profile       →  _id · name · email (unique, @gmail.com) · school · grade
ExamResult    →  profileId · examName · examType · score · maxScore · date
```

`/api/boleta` runs a MongoDB aggregation pipeline computing `promedioGeneral`, `aprobados` (≥ 60%), and `calificacion` (score × 10 / maxScore) for each result.

---

## 🤝 Contributing

1. Fork → `git checkout -b feature/your-feature`
2. Commit with [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`)
3. `git push origin feature/your-feature` → open a PR against `main`

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
