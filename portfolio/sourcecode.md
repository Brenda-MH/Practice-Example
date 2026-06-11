# 📚 Exam Manager — Source Code

Exam management system built with **Flutter** (mobile frontend) and **Node.js + MongoDB** (backend/REST API).

---

## 🗂️ Project Structure

```
flutter_application_1/
├── lib/
│   ├── main.dart                    # App entry point
│   ├── exam_api/                    # Backend (Node.js REST API)
│   │   ├── server.js                # Express server + routes
│   │   ├── models/
│   │   │   ├── profile.model.js     # Mongoose model: User profile
│   │   │   └── examResult.model.js  # Mongoose model: Exam result
│   │   ├── data/
│   │   │   └── seeds.json           # Initial exam data
│   │   ├── seed.js                  # Script to seed the database
│   │   ├── package.json             # Node.js dependencies
│   │   └── .env                     # Environment variables (MongoDB URI)
│   ├── models/                      # Dart models
│   │   ├── exam.dart
│   │   ├── exam_result.dart
│   │   ├── question.dart
│   │   └── student.dart
│   ├── screens/                     # App screens
│   │   ├── dashboard_screen.dart    # Main dashboard
│   │   ├── quiz_screen.dart         # Multiple-choice quiz
│   │   ├── philosophy_exam_screen.dart # Philosophy exam
│   │   ├── matching_exam_screen.dart   # Column-matching exam
│   │   ├── boleta_screen.dart       # Grade report card
│   │   ├── profile_screen.dart      # Student profile
│   │   ├── results_screen.dart      # Exam results
│   │   ├── exams_screen.dart        # Exam list
│   │   ├── questions_screen.dart    # Questions screen
│   │   └── students_screen.dart     # Students list
│   ├── services/                    # Business logic
│   │   ├── api_service.dart         # Backend connection
│   │   ├── profile_service.dart     # Profile & results management
│   │   ├── auth_guard.dart          # Authentication guard
│   │   ├── data_service.dart        # Local data service
│   │   └── app_theme.dart           # Global theme & styles
│   └── widgets/
│       └── common_widgets.dart      # Reusable widgets
├── pubspec.yaml                     # Flutter dependencies
└── android/                         # Android configuration
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile frontend | Flutter 3.10+ / Dart |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Communication | HTTP REST (`http` package) |
| Local persistence | SharedPreferences |

---

## 🚀 Installation & Setup

### Prerequisites
- Flutter SDK `>=3.10.0`
- Node.js `>=18`
- MongoDB Atlas or local instance

---

### 1. Backend (REST API)

```bash
# Navigate to the API folder
cd lib/exam_api

# Install dependencies
npm install

# Set up environment variables
# Edit the .env file with your connection string:
# MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/examdb

# Optional: seed the database with sample data
node seed.js

# Start the server
node server.js
# ✅ Server running at http://localhost:3000
```

---

### 2. Flutter Frontend

```bash
# Install dependencies
flutter pub get

# Run the app
flutter run
```

> ⚠️ Make sure the Node.js server is running before launching the app, as it connects to `http://localhost:3000/api`.

---

## 🔌 REST API — Endpoints

### User Profile

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/profile` | Create a new profile |
| `GET` | `/api/profile/:id` | Get profile by ID |
| `PUT` | `/api/profile/:id` | Update profile |

**Example — Create profile:**
```json
POST /api/profile
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "school": "ITCR",
  "grade": "3°B"
}
```

---

### Exam Results

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/results` | Save an exam result |
| `GET` | `/api/results/:profileId` | Get all results for a student |
| `GET` | `/api/boleta/:profileId` | Get report card with overall average |
| `GET` | `/api/health` | Server health check |

**Example — Save result:**
```json
POST /api/results
{
  "profileId": "664abc123...",
  "examName": "Propositional Logic",
  "examType": "quiz",
  "score": 8,
  "maxScore": 10
}
```

---

## 🗄️ Database Models

### Profile
```js
{
  name:   String (required),
  email:  String (unique, @gmail.com only),
  school: String,
  grade:  String
}
```

### ExamResult
```js
{
  profileId: ObjectId → Profile,
  examName:  String,
  examType:  'quiz' | 'filosofia' | 'matching',
  score:     Number,
  maxScore:  Number,
  date:      Date
}
// Virtuals: percentage, grade (out of 10), passed (>= 60%)
```

---

## 📱 Main Screens

- **Dashboard** — Overview with stats: exams completed, passed, and overall average
- **Quiz Screen** — Multiple-choice exam
- **Philosophy Exam** — Philosophy exam with open/multiple-choice questions
- **Matching Exam** — Column-matching exam
- **Report Card (Boleta)** — Full grade report with scores and overall average
- **Profile** — Student profile registration and editing

---

## 📦 Flutter Dependencies (`pubspec.yaml`)

```yaml
dependencies:
  flutter:
    sdk: flutter
  uuid: ^4.2.1
  intl: ^0.19.0
  shared_preferences: ^2.2.2
  flutter_slidable: ^3.0.0
  http: ^1.1.0
```

---

## 📦 Node.js Dependencies (`package.json`)

```json
{
  "express": "...",
  "mongoose": "...",
  "cors": "...",
  "dotenv": "..."
}
```

---

## 🔐 Environment Variables

Create a `.env` file inside `lib/exam_api/`:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/examdb
PORT=3000
```

---

## 👨‍💻 Author

Project developed for the **Mobile Application Development** course.
