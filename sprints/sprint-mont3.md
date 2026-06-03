# 🏁 Sprint Plan — Third Partial
<!-- Exam Manager · NoSQL Course · Final Partial -->

[![Sprint](https://img.shields.io/badge/sprint-third__partial-534AB7)](.)
[![Release](https://img.shields.io/badge/target-RELEASE_v3.0-1D9E75)](.)
[![Status](https://img.shields.io/badge/status-in__progress-D85A30)](.)
[![Builds on](https://img.shields.io/badge/builds__on-RELEASE_v2.0-378ADD)](.)

> **Tercer Parcial — Agregaciones y Optimización.** Período: 18 de Mayo al 19 de Junio. Builds on `RELEASE v1.0` (schema) + `RELEASE v2.0` (queries).

---

## 📌 Table of Contents

1. [Sprint Overview](#-sprint-overview)
2. [Sprint Goal](#-sprint-goal)
3. [Parameters](#-parameters)
4. [Team](#-team)
5. [User Stories & Acceptance Criteria](#-user-stories--acceptance-criteria)
6. [Weekly Action Plan](#-weekly-action-plan)
7. [Aggregation Pipeline Catalog](#-aggregation-pipeline-catalog)
8. [Definition of Done](#-definition-of-done)
9. [Impediments & Dependencies](#-impediments--dependencies)
10. [AI Copilot Prompts](#-ai-copilot-prompts)

---

## 🧭 Sprint Overview

| Field | Value |
|-------|-------|
| **Partial** | Third Partial — Agregaciones y Optimización |
| **Period** | May 18 – June 19 |
| **Focus** | *"Data Intelligence"* — Aggregation Framework (Pipelines) e Índices |
| **Grade cutoff** | June 17–19 |
| **Target release** | `RELEASE v3.0` |
| **Stack** | MQL · Aggregation Framework · MongoDB Atlas · Node.js · Express · Mongoose · Flutter |

---

## 🎯 Sprint Goal

> Build the Aggregation Framework layer of the Exam Manager: implement pipelines that compute student transcripts (`boleta`) and class-wide statistics, optimize query performance with indexes, and connect everything to the existing Node.js/Express API so the Flutter app can consume real aggregated data.

---

## ⚙️ Parameters

| Parameter | Value |
|-----------|-------|
| Weekly hours | 2 hrs max |
| Active weeks | 3 (S14 → S16) |
| Total hours | ~6 hrs |
| Team size | 5 members |
| Stack | Aggregation Framework · Node.js · Express · Mongoose · Flutter |
| Key deliverable | `/api/boleta/:profileId` + `docs/performance_audit.md` |

---

## 👥 Team

| Initials | Member | Role | Third Partial Focus |
|----------|--------|------|---------------------|
| **ND** | Caballero Ortíz Nancy Denisse | Data Modeler | Schema optimization; support aggregation design |
| **WO** | Ortíz Morales Walther | Query Developer | **Lead** — writes all aggregation pipelines |
| **BM** | Montalvo Hernández Brenda Paola | Integration Specialist | Connects pipelines to Express API |
| **VU** | Meza Uzcanga Vladimir | Data Seeder / QA | Validates pipeline output against seed data |
| **BG** | Gomez Coria Barbara Guadalupe | Scrum Master | Tracks progress; coordinates weekly tasks |

---

## 📖 User Stories & Acceptance Criteria

---

### US-10 — Query Developer

**As a** Query Developer,
**I want to** build an Aggregation Pipeline that computes basic analytics (sums, counts)
**so that** the platform can report student totals in a single database call.

**Acceptance criteria:**
- [ ] Pipeline uses `$match` to filter by `profileId`
- [ ] Pipeline uses `$group` to compute `promedioGeneral` (average score)
- [ ] Pipeline uses `$count` to show total attempts
- [ ] Result verified against manually calculated expected values using seed data
- [ ] Committed to `queries/agg_01_stats.mongodb`

---

### US-11 — Query Developer

**As a** Query Developer,
**I want to** build an Advanced Aggregation Pipeline that transforms data for the UI
**so that** the `boleta` screen shows each student's `calificacion` and pass status.

**Acceptance criteria:**
- [ ] Pipeline uses `$project` to compute `calificacion = (score / maxScore) * 10`
- [ ] Pipeline uses `$addFields` to add `aprobado: calificacion >= 6`
- [ ] Pipeline uses `$sort` to rank exam types from hardest to easiest
- [ ] Pipeline uses `$limit: 3` to return top 3 hardest exam types
- [ ] Pipeline uses `$lookup` to join profile data where needed
- [ ] Committed to `queries/agg_02_reports.mongodb`

---

### US-12 — Integration Specialist

**As an** Integration Specialist,
**I want to** wire the aggregation pipelines to the Express API and add indexes
**so that** the Flutter app receives fast, structured JSON responses.

**Acceptance criteria:**
- [ ] `GET /api/boleta/:profileId` returns `promedioGeneral`, `aprobados`, and `calificaciones[]`
- [ ] `GET /api/stats` returns exam type breakdown with averages and attempt counts
- [ ] Both endpoints return HTTP 200 with valid JSON; HTTP 404 for unknown profileId; HTTP 400 for invalid ObjectId
- [ ] Index created: `db.examresults.createIndex({ profileId: 1 })`
- [ ] `explain("executionStats")` results documented before/after index in `docs/performance_audit.md`
- [ ] API tested with Postman; screenshots saved in `/tests/screenshots/s16/`

---

## 📅 Weekly Action Plan

---

### `S14` · Week 1 — Aggregation Intro: `$match`, `$group`, `$count`
> **Period:** May 18–22 | **Lead:** Query Developer | **Supporting:** Data Modeler

#### Context

Think of the Aggregation Pipeline as a **factory conveyor belt**: each `$stage` receives documents, transforms them, and passes them to the next station. The pipeline built this week powers the `/api/boleta` endpoint — replacing a simple `find()` with computed insights.

**Core stages:**

| Stage | What it does | Exam Manager use case |
|-------|-------------|-----------------------|
| `$match` | Filter documents (like `find()`) | Get only results for a specific student |
| `$group` | Combine documents and compute values | Calculate average score across all exams |
| `$count` | Count matching documents | Total attempts per student |

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Study the 3 core stages — write a 1-paragraph explanation in `docs/aggregation_notes.md` | WO | ⬜ |
| 2 | Write pipeline: `$match` by `profileId` → `$group` average score | WO | ⬜ |
| 3 | Add `$count` to compute total attempts | WO | ⬜ |
| 4 | Data Modeler reviews output — confirm field names match schema | ND | ⬜ |
| 5 | Save screenshots of pipeline output in `/tests/screenshots/s14/` | VU | ⬜ |

**Artifact:** `queries/agg_01_stats.mongodb` — Pipeline de conteo simple

**Business question answered:**
> *"For student X, what is their overall average and how many exams have they attempted?"*

---

### `S15` · Week 2 — Advanced Pipelines: `$project`, `$sort`, `$limit`, `$lookup`
> **Period:** May 25–29 | **Lead:** Query Developer | **Supporting:** Data Seeder / QA

#### Context

This week's pipeline transforms data for the UI and answers class-level questions. `$project` reshapes output, `$sort` ranks results, `$lookup` joins related collections — this is where NoSQL starts to feel like a real analytics engine.

**Core stages:**

| Stage | What it does | Exam Manager use case |
|-------|-------------|-----------------------|
| `$project` | Reshape the output document | Compute `calificacion = score × 10 / maxScore` |
| `$addFields` | Add computed fields | Add `aprobado: true/false` |
| `$sort` | Sort the output | Rank exam types by average score (hardest first) |
| `$limit` | Return only the top N | Show top 3 worst-performing exam types |
| `$lookup` | Join data from another collection | Join `profiles` data into results report |

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Write pipeline: `$group` by `examType` → compute `avgScore` and `totalAttempts` | WO | ⬜ |
| 2 | Add `$project` to compute `calificacion = (score / maxScore) * 10` per result | WO | ⬜ |
| 3 | Add `$addFields` to mark each result `aprobado: true/false` | WO | ⬜ |
| 4 | Add `$sort` by `avgScore` ascending + `$limit: 3` | WO | ⬜ |
| 5 | QA manually counts expected results from `data/seeds.json` and compares | VU | ⬜ |
| 6 | QA documents any discrepancies in `Docs/TROUBLESHOOTING.md` | VU | ⬜ |
| 7 | Save screenshots in `/tests/screenshots/s15/` | VU | ⬜ |

**Artifact:** `queries/agg_02_reports.mongodb` — Reporte complejo formateado

**Business questions answered:**
> *"Which exam type has the lowest average score?"*
> *"For student X, what is their calificacion and did they pass each exam?"*

---

### `S16` · Week 3 — Índices y Performance: `createIndex`, `explain()`
> **Period:** June 1–5 | **Lead:** Integration Specialist | **Supporting:** Query Developer

#### Context

Pipelines that only run in Compass are prototypes. This week you wire them into the Express API and optimize performance with MongoDB indexes. A query without an index does a full collection scan — `explain("executionStats")` lets you measure the difference before and after.

**API Integration:**

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Replace `/api/boleta/:profileId` placeholder with S15 pipeline using Mongoose | BM | ⬜ |
| 2 | Create `GET /api/stats` endpoint using S14 pipeline | BM | ⬜ |
| 3 | Add HTTP 404: `{ error: "Student not found" }` for unknown `profileId` | BM | ⬜ |
| 4 | Add HTTP 400: validate `profileId` is a valid ObjectId before querying | BM | ⬜ |
| 5 | Query Developer reviews Mongoose pipeline matches the Compass version | WO | ⬜ |

**Performance / Indexes:**

| # | Task | Owner | Status |
|---|------|-------|--------|
| 6 | Run `explain("executionStats")` on `/api/boleta` query — capture `totalDocsExamined` (before) | WO | ⬜ |
| 7 | Create index: `db.examresults.createIndex({ profileId: 1 })` | WO | ⬜ |
| 8 | Re-run `explain()` after index — compare `totalDocsExamined` before vs after | WO | ⬜ |
| 9 | Document before/after stats in `docs/performance_audit.md` | WO | ⬜ |
| 10 | Test all endpoints with Postman — save screenshots in `/tests/screenshots/s16/` | VU | ⬜ |

**Artifact:** Updated `lib/exam_api/routes/` · `docs/performance_audit.md` — Análisis antes/después de índices

**Endpoints to verify:**

| Method | Endpoint | Expected response |
|--------|----------|-------------------|
| `GET` | `/api/health` | `{ status: "OK", timestamp: "..." }` |
| `POST` | `/api/profile` | Created profile with `_id` |
| `GET` | `/api/profile/:id` | Full profile document |
| `PUT` | `/api/profile/:id` | Updated profile |
| `POST` | `/api/results` | Saved exam result |
| `GET` | `/api/results/:profileId` | Array of results, newest first |
| `GET` | `/api/boleta/:profileId` | `{ promedioGeneral, aprobados, calificaciones[] }` |
| `GET` | `/api/stats` | `[ { examType, avgScore, totalAttempts } ]` |

---

## 🔬 Aggregation Pipeline Catalog

| ID | File | Stages | Business Question | Status |
|----|------|--------|-------------------|--------|
| AGG-01 | `queries/agg_01_stats.mongodb` | `$match` → `$group` → `$count` | What is student X's average and total attempts? | ⬜ |
| AGG-02 | `queries/agg_02_reports.mongodb` | `$group` → `$project` → `$addFields` → `$sort` → `$limit` | Which exam type is the hardest? What is each student's calificacion? | ⬜ |
| AGG-03 | `/api/boleta/:profileId` (Mongoose) | Same as AGG-02 via Mongoose `.aggregate()` | Same as AGG-02 — exposed as REST endpoint | ⬜ |
| AGG-04 | `/api/stats` (Mongoose) | Same as AGG-01 via Mongoose `.aggregate()` | Same as AGG-01 — exposed as REST endpoint | ⬜ |

---

## ✅ Definition of Done

`RELEASE v3.0` (S14–S16 scope) is complete when ALL of the following are true:

- [ ] `queries/agg_01_stats.mongodb` runs without errors in Compass
- [ ] `queries/agg_02_reports.mongodb` runs without errors in Compass
- [ ] Both pipelines return results matching manually calculated expected values
- [ ] `GET /api/boleta/:profileId` returns correct `promedioGeneral`, `aprobados`, and `calificaciones`
- [ ] `GET /api/stats` returns correct exam type breakdown
- [ ] Both endpoints handle invalid input with HTTP 404/400
- [ ] Index created on `examresults.profileId`; before/after `explain()` documented
- [ ] `docs/performance_audit.md` committed with findings
- [ ] Screenshots organized in `/tests/screenshots/` by week (s14, s15, s16)
- [ ] `.env` is NOT committed or tracked

---

## ⚠️ Impediments & Dependencies

| # | Impediment | Risk | Owner | Mitigation |
|---|------------|------|-------|------------|
| 1 | `RELEASE v2.0` must exist before writing aggregation pipelines | 🔴 High | BM | Verify tag exists before S14 |
| 2 | Mongoose `.aggregate()` syntax differs slightly from Compass | 🟡 Medium | WO + BM | Test in Compass first, then port to Mongoose |
| 3 | Flutter `baseUrl` must point to live API during demo | 🟡 Medium | BM | Use ngrok or deploy API before presentation |
| 4 | Student with 0 results can crash the AGG-02 pipeline | 🟡 Medium | BM | Add `$match` guard before `$group` |

---

## 🤖 AI Copilot Prompts

> System instruction for every AI session:
> *"Act as a Senior NoSQL Mentor. Guide me step by step — do not give me the final pipeline immediately. Explain each stage using a JSON analogy before I write it. Code in English, explanations in Spanish."*

---

### S14 — Aggregation Intro

```
I have a MongoDB collection called 'examresults' with fields:
profileId (ObjectId), examName (String), examType (String),
score (Number), maxScore (Number), date (Date).

Explain the 'Aggregation Pipeline' concept using a factory conveyor belt analogy.
How is it different from a simple find()?
Then guide me to build a pipeline that:
1. Filters results for a specific profileId
2. Computes the average score
3. Counts total attempts
Give me one stage at a time and ask me to test it before moving on.
```

---

### S15 — Advanced Pipelines

```
I need to join data from 'profiles' to 'examresults'.
Explain how $lookup works. Is it similar to SQL JOIN?
Then guide me to build a pipeline that:
1. Groups by examType and computes avgScore and totalAttempts
2. Adds calificacion = (score / maxScore) * 10
3. Adds aprobado = calificacion >= 6
4. Sorts by avgScore ascending
5. Returns only the top 3
Explain $project and $addFields with a JSON analogy in Spanish.
One stage at a time.
```

---

### S16 — Indexes & Performance

```
I have a collection 'examresults' with thousands of documents.
My query filters by profileId on every request.
1. Show me how to run explain("executionStats") to check if my query uses an index.
2. Show me how to create createIndex({ profileId: 1 }).
3. What metrics should I compare before and after?
Explain in Spanish. Commands in English.
```

---

<div align="center">

Sprint plan for **Exam Manager** — NoSQL Course · Third Partial · 2025
<br>
Builds on <a href="../releases/tag/v1.0">RELEASE v1.0</a> · <a href="../releases/tag/v2.0">RELEASE v2.0</a> · Target: <a href="../releases/tag/v3.0">RELEASE v3.0</a>

</div>
