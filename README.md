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

* [Features](#-features)
* [Architecture & Tech Stack](#️-architecture--tech-stack)
* [Getting Started](#-getting-started)
* [Running the Backend](#-running-the-backend)
* [Running the Flutter App](#-running-the-flutter-app)
* [API Reference](#-api-reference)
* [Data Model](#-data-model)
* [Contributing](#-contributing)
* [License](#-license)

---

## ✨ Features

- **Multiple exam types** — multiple-choice, open-ended, and matching questions
- **Student profiles** — create and update profiles (Gmail validation enforced on client and server)
- **Persistent results** — every exam attempt is saved as a nested document in MongoDB
- **Boleta (transcript)** — aggregated view of all scores, pass rate, and overall average per student
- **Dashboard** — at-a-glance overview of all available exams
- **Offline-first navigation** — auth guard and local state via `SharedPreferences`

---

## 🏛️ Architecture & Tech Stack

The project follows a **Client–Server** architecture with a Flutter frontend communicating over HTTP with a Node.js REST API backed by MongoDB Atlas.
