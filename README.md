# Exam Manager 📝
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Flutter](https://img.shields.io/badge/Flutter-%3E%3D3.10.0-02569B?logo=flutter)
![Dart](https://img.shields.io/badge/Dart-%3E%3D3.0.0-0175C2?logo=dart)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-green)

> A Flutter-based exam management platform that lets students take multiple-choice, open-ended, and matching exams — with every response persisted as a single nested document in MongoDB via a Node.js REST API. Designed for academic environments where tracking individual student performance across different exam formats is essential.

---

## 👥 Team

| Role | Full Name | Responsibility |
|---|---|---|
| Data Modeler | Caballero Ortíz Nancy Denisse | Database schema design and entity relationships |
| Query Developer | Ortíz Morales Walther | MongoDB queries and aggregation pipelines |
| Integration Specialist | Montalvo Hernnadez Brenda Paola | Flutter ↔ API integration and HTTP service layer |
| Data Seeder / QA | Meza Uzcanga Vladimir | Test data generation and quality assurance |
| Scrum Master | Gomez Coria Barbara Guadalupe | Sprint planning, team coordination and delivery |

---

## 📖 Table of Contents

* [Features](#-features)
* [Architecture & Tech Stack](#️-architecture--tech-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Running the Backend](#-running-the-backend)
* [Running the Flutter App](#-running-the-flutter-app)
* [API Reference](#-api-reference)
* [Data Model](#-data-model)
* [Contributing](#-contributing)
* [License](#-license)

---

## ✨ Features

- **Multiple exam types** — supports multiple-choice, open-ended, and matching questions in the same platform, each with its own dedicated screen and scoring logic
- **Student profiles** — students create a profile with name, email, school and grade; Gmail validation (`@gmail.com`) is enforced on both the Flutter client and the Express server to prevent invalid registrations
- **Persistent results** — every exam attempt is saved as a nested document in MongoDB, preserving score, max score, exam type and submission timestamp
- **Boleta (transcript)** — a dedicated aggregation endpoint computes the overall average, number of passed exams, and a 0–10 `calificacion` for each result per student
- **Dashboard** — at-a-glance overview of all available exams, allowing students to navigate directly to any exam type from a single screen
- **Offline-first navigation** — an auth guard checks for a locally stored profile ID via `SharedPreferences` before granting access to protected screens, so the app stays functional even without a live server connection
- **Profile persistence** — once a profile is created, its MongoDB `_id` is cached locally so subsequent app launches skip registration and go straight to the dashboard

---

## 🏛️ Architecture & Tech Stack

The project follows a **Client–Server** architecture with a Flutter frontend communicating over HTTP with a Node.js REST API backed by MongoDB Atlas. The Flutter layer handles all UI, local state, and validation logic, while the Express server acts as the single source of truth for stored data.

```
┌─────────────────────────┐        HTTP/JSON        ┌──────────────────────────┐
│   Flutter App (client)  │ ──────────────────────► │  Express API  (server)   │
│                         │                          │  lib/exam_api/server.js  │
│  • Screens / Widgets    │ ◄────────────────────── │                          │
│  • Services (Dart)      │                          │  Mongoose ODM            │
│  • SharedPreferences    │                          │  MongoDB Atlas           │
└─────────────────────────┘                          └──────────────────────────┘
```

| Layer | Technology | Purpose |
|---|---|---|
| Mobile / Web Frontend | Flutter ≥ 3.10 · Dart ≥ 3.0 | Cross-platform UI |
| UI Components | Material Design 3 · `flutter_slidable` | Widgets and swipe actions |
| HTTP Client | `http` ^1.1.0 | REST calls to the backend |
| Local Storage | `shared_preferences` ^2.2.2 | Caching profile ID between sessions |
| Unique IDs | `uuid` ^4.2.1 | Client-side ID generation |
| Dates & i18n | `intl` ^0.19.0 | Date formatting |
| Backend Runtime | Node.js + Express ^4.18 | REST API server |
| Database | MongoDB (Mongoose ^8.0) | Document storage |
| Environment Config | `dotenv` | Secrets and connection strings |
| Dev Server | `nodemon` ^3.0 | Auto-restart during development |

---

## 📁 Project Structure

```
exam_app/
├── lib/
│   ├── main.dart                  # App entry point
│   ├── models/                    # Dart data classes
│   │   ├── exam.dart
│   │   ├── exam_result.dart
│   │   ├── question.dart
│   │   └── student.dart
│   ├── screens/                   # One file per screen
│   │   ├── dashboard_screen.dart
│   │   ├── quiz_screen.dart
│   │   ├── matching_exam_screen.dart
│   │   ├── philosophy_exam_screen.dart
│   │   ├── boleta_screen.dart
│   │   ├── profile_screen.dart
│   │   ├── results_screen.dart
│   │   ├── exams_screen.dart
│   │   ├── questions_screen.dart
│   │   └── students_screen.dart
│   ├── services/                  # Business logic & API calls
│   │   ├── api_service.dart       # HTTP client (profile + results)
│   │   ├── data_service.dart      # Local exam data
│   │   ├── profile_service.dart   # SharedPreferences wrapper
│   │   └── auth_guard.dart        # Route protection
│   ├── widgets/
│   │   └── common_widgets.dart    # Reusable UI components
│   └── exam_api/                  # Node.js backend
│       ├── server.js              # Express app + all routes
│       ├── seed.js                # DB seeder script
│       ├── models/
│       │   ├── profile.model.js
│       │   └── examResult.model.js
│       └── data/
│           └── seeds.json         # 50 sample student profiles
├── pubspec.yaml
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

| Tool | Version | Install |
|---|---|---|
| Flutter SDK | ≥ 3.10.0 | [flutter.dev](https://flutter.dev/docs/get-started/install) |
| Dart SDK | ≥ 3.0.0 | Included with Flutter |
| Node.js | ≥ 18.x | [nodejs.org](https://nodejs.org) |
| npm | ≥ 9.x | Included with Node.js |
| MongoDB Atlas account | — | [mongodb.com/atlas](https://www.mongodb.com/atlas) or use a local instance |

### Clone the repository

```bash
git clone https://github.com/Brenda-MH/Practice-Example.git
cd Practice-Example
```

---

## 🖥 Running the Backend

The REST API lives in `lib/exam_api/`. It must be running before launching the Flutter app, since the app calls it on startup to sync the student profile.

```bash
cd lib/exam_api
npm install
```

Create a `.env` file with your MongoDB connection string:

```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/exam_db
```

> **Tip:** You can get your `MONGO_URI` from the MongoDB Atlas dashboard under **Database → Connect → Drivers**.

Seed the database with 50 sample student profiles (optional but recommended for testing):

```bash
node seed.js
# Console will print: ✅ Seeded X students
```

Start the server:

```bash
# Production
npm start

# Development — restarts automatically on file changes
npm run dev
```

The API will be available at `http://localhost:3000`. Verify it is running:

```bash
curl http://localhost:3000/api/health
# → {"status":"OK","timestamp":"2026-05-13T..."}
```

---

## 📱 Running the Flutter App

Make sure the backend is running first, then from the **project root**:

```bash
flutter pub get
flutter run
```

> **Note:** The app expects the backend at `http://localhost:3000/api`. If you deploy the API to a remote server, update `baseUrl` in `lib/services/api_service.dart`.

To target a specific device:

```bash
flutter devices                  # list all connected devices and emulators
flutter run -d chrome            # run as a web app
flutter run -d emulator-5554     # run on an Android emulator
flutter run -d <ios-device-id>   # run on a physical iOS device
```

To build a release web bundle:

```bash
flutter build web
# Output → build/web/
```

---

## 📡 API Reference

All endpoints are prefixed with `/api`. The server responds with `Content-Type: application/json` on every route.

### Profiles

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/profile` | Create a new student profile |
| `GET` | `/profile/:id` | Fetch a profile by MongoDB `_id` |
| `PUT` | `/profile/:id` | Update an existing profile |

**Request body (POST / PUT):**
```json
{
  "name": "Ana Martínez",
  "email": "ana.martinez@gmail.com",
  "school": "UNAM",
  "grade": "3er Semestre"
}
```

**Success response (201 Created):**
```json
{
  "_id": "6634a1f2b4e2c10012abcd01",
  "name": "Ana Martínez",
  "email": "ana.martinez@gmail.com",
  "school": "UNAM",
  "grade": "3er Semestre"
}
```

> Only `@gmail.com` addresses are accepted. Duplicate emails return `400 { "error": "Este correo ya está registrado" }`.

### Exam Results

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/results` | Save an exam result |
| `GET` | `/results/:profileId` | List all results for a student (newest first) |
| `GET` | `/boleta/:profileId` | Get aggregated transcript with average and pass rate |

**POST `/results` body:**
```json
{
  "profileId": "6634a1f2b4e2c10012abcd01",
  "examName": "Filosofía — Unidad 2",
  "examType": "multiple-choice",
  "score": 8,
  "maxScore": 10
}
```

**GET `/boleta/:profileId` response:**
```json
{
  "totalExamenes": 5,
  "promedioGeneral": 78.4,
  "aprobados": 4,
  "examenes": [
    {
      "examName": "Filosofía — Unidad 2",
      "examType": "multiple-choice",
      "score": 8,
      "maxScore": 10,
      "porcentaje": 80,
      "calificacion": 8.0,
      "date": "2026-04-21T19:45:00.000Z"
    }
  ]
}
```

### Health Check

```bash
GET /api/health
# → { "status": "OK", "timestamp": "2026-05-13T12:00:00.000Z" }
```

---

## 🗃 Data Model

An **Exam** contains questions that can be multiple-choice, open-ended, or matching. The student's response is saved as a single nested document.

### Profile

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated by MongoDB |
| `name` | String | Required |
| `email` | String | Required · unique · must be `@gmail.com` |
| `school` | String | Optional |
| `grade` | String | Optional (e.g. "3er Semestre") |

### ExamResult

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `profileId` | ObjectId | References a `Profile` |
| `examName` | String | Human-readable exam name |
| `examType` | String | `multiple-choice`, `open-ended`, or `matching` |
| `score` | Number | Points obtained |
| `maxScore` | Number | Maximum possible points |
| `date` | Date | Defaults to `Date.now` |

```
Profile
  └─ _id, name, email (unique), school, grade

ExamResult
  └─ profileId  →  ref: Profile
  └─ examName, examType
  └─ score, maxScore, date
  └─ (virtual) porcentaje = score / maxScore × 100
  └─ (virtual) calificacion = score / maxScore × 10
```

The `/api/boleta/:profileId` endpoint runs a MongoDB **aggregation pipeline** that groups all results by `profileId`, computes `promedioGeneral` (average percentage), counts `aprobados` (results ≥ 60%), and pushes all individual exam details into a single response document.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps to keep the codebase clean:

1. Fork the project.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code restructuring
4. Push to your branch: `git push origin feature/your-feature`.
5. Open a Pull Request against `main` and fill in the PR template.

Please make sure your code passes `flutter analyze` and the backend starts without errors before submitting.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
