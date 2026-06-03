# 📋 Sprint Backlog — Exam Manager
<!-- NoSQL Course · All Partials · 2025 -->

[![P1](https://img.shields.io/badge/P1-RELEASE_v1.0-378ADD)](.)
[![P2](https://img.shields.io/badge/P2-RELEASE_v2.0-1D9E75)](.)
[![P3](https://img.shields.io/badge/P3-RELEASE_v3.0-534AB7)](.)

> **Living document.** Every task across all three partials is tracked here. Update status as work is completed. Owner initials: ND · WO · BM · VU · BG

**Status legend:** ⬜ Pending · 🔄 In Progress · ✅ Done · ❌ Cancelled

---

## 📌 Table of Contents

1. [First Partial — P1](#-first-partial--release-v10)
2. [Second Partial — P2](#-second-partial--release-v20)
3. [Third Partial — P3](#-third-partial--release-v30)
4. [Summary](#-summary)

---

## 🔵 First Partial — RELEASE v1.0

### 🎯 Goal

> Design and implement the NoSQL data model (JSON/BSON) for the Exam Manager platform, configure the MongoDB Atlas environment, and generate sufficient seed data to demonstrate a fully working schema that supports multiple-choice, open-ended, and matching exam types — each persisted as a single nested document.

---

### ⚙️ Parameters

| Parameter | Value |
|-----------|-------|
| Period | Feb 6 – Mar 20 |
| Grading window | Mar 18–20 |
| Final release | `RELEASE v1.0` |
| Stack | JSON · BSON · MongoDB Compass · Mermaid.js |

---

### ⏱️ Hours

| Parameter | Value |
|-----------|-------|
| Weekly hours | 2 hrs max |
| Active weeks | 7 (S1–S7) |
| Total hours | ~14 hrs |
| Team size | 5 members |

---

### 📖 User Stories & Acceptance Criteria

#### US-01 — Data Modeler
**As a** Data Modeler, **I want to** define the exam schema with polymorphic question types
**so that** the system can store multiple-choice, open-ended, and matching questions in a single collection.

**Acceptance criteria:**
- [ ] Mermaid diagram includes `Profile`, `ExamResult`, and all three question-type structures
- [ ] Embedding vs Referencing decision is documented and justified in `docs/schema.md`
- [ ] Every field is defined in `docs/dictionary.md` with name, BSON type, and description

#### US-02 — Integration Specialist
**As an** Integration Specialist, **I want to** connect the project to MongoDB Atlas
**so that** the team can work against a real database from Week 4 onward.

**Acceptance criteria:**
- [ ] Free-tier Atlas cluster is active and reachable
- [ ] `MONGO_URI` is stored in `.env` and `.env` is listed in `.gitignore`
- [ ] A test document can be inserted from Compass without errors
- [ ] `scripts/01_create_collections.js` runs successfully

#### US-03 — Data Seeder / QA
**As a** Data Seeder, **I want to** generate 50+ realistic test documents
**so that** the Query Developer can validate MQL queries against real data.

**Acceptance criteria:**
- [ ] `data/seeds.json` contains at least 50 student profiles with valid `@gmail.com` emails
- [ ] Results cover all three exam types with varied scores
- [ ] All documents are inserted via `insertMany` and visible in Compass

#### US-04 — Query Developer
**As a** Query Developer, **I want** both collections created and populated
**so that** I can start writing and testing MQL queries from Week 5.

**Acceptance criteria:**
- [ ] Collections `profiles` and `examresults` exist in Atlas
- [ ] At least one sample query (`find`, `findOne`) runs without errors in Compass

---

### 📅 Action Plan & Task Breakdown

#### S1 · Feb 6 — Setup & Tooling

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P1-S1-01 | Create GitHub repo with required folder structure | BM | ⬜ |
| P1-S1-02 | Add `README.md` with signed Student Pledge | All | ⬜ |
| P1-S1-03 | Install VS Code, MongoDB Compass, and Git | All | ⬜ |
| P1-S1-04 | Create `.gitignore` (node_modules, .env, .DS_Store) | BM | ⬜ |

**Artifact:** `README.md` — Initial Commit

#### S2 · Feb 9–13 — JSON / BSON Syntax

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P1-S2-01 | Model `Profile` object with all required fields | ND | ⬜ |
| P1-S2-02 | Model `ExamResult` with a nested response sub-document | ND | ⬜ |
| P1-S2-03 | Create `portfolio/me.json` as a real-world JSON exercise | ND | ⬜ |
| P1-S2-04 | Identify BSON types for each field (String, ObjectId, Date, Number) | ND | ⬜ |

**Artifact:** `portfolio/me.json`

#### S3 · Feb 16–20 — Schema Design

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P1-S3-01 | Decide and document Embedding vs Referencing strategy | ND | ⬜ |
| P1-S3-02 | Draw ER diagram using Mermaid.js | ND | ⬜ |
| P1-S3-03 | Write `docs/schema.md` with design rationale | ND | ⬜ |
| P1-S3-04 | Write `docs/dictionary.md` with all field definitions | ND | ⬜ |

**Artifact:** `docs/schema.mmd` · `docs/dictionary.md`

#### S4 · Feb 23–27 — MongoDB Compass & Atlas

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P1-S4-01 | Create free-tier cluster on MongoDB Atlas | BM | ⬜ |
| P1-S4-02 | Set up `.env` file with `MONGO_URI` | BM | ⬜ |
| P1-S4-03 | Create collections `profiles` and `examresults` in Compass | BM | ⬜ |
| P1-S4-04 | Write and commit `scripts/01_create_collections.js` | BM | ⬜ |

**Artifact:** `scripts/01_create_collections.js`

#### S5 · Mar 2–6 — CRUD: Create (insertMany)

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P1-S5-01 | Generate 50+ fictional student profiles | VU | ⬜ |
| P1-S5-02 | Generate exam results covering all 3 question types | VU | ⬜ |
| P1-S5-03 | Insert all documents using `insertMany` in Compass | VU | ⬜ |
| P1-S5-04 | Capture screenshots and save to `/tests/screenshots/s5/` | VU | ⬜ |

**Artifact:** `data/seeds.json` (50+ documents)

#### S6 · Mar 9–13 — Architecture Defense

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P1-S6-01 | Review that the repo is clean and complete | BM | ⬜ |
| P1-S6-02 | Confirm `.env` is NOT tracked by Git | BM | ⬜ |
| P1-S6-03 | Add final screenshots to `/tests/screenshots/` | VU | ⬜ |
| P1-S6-04 | Create `RELEASE v1.0` tag on GitHub | BM | ⬜ |
| P1-S6-05 | Prepare data model presentation slides | All | ⬜ |

**Artifact:** `RELEASE v1.0` tag

#### S7 · Mar 17–20 — Partial Exam & Retrospective

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P1-S7-01 | Final project presentation in class | All | ⬜ |
| P1-S7-02 | Grade submission window (Mar 18–20) | All | ⬜ |
| P1-S7-03 | Write retrospective → `docs/retrospective_p1.md` | BG | ⬜ |

---

### 📅 Weekly Plan — Max 2 hrs/week

| Week | Dates | Focus | Lead | Hours |
|------|-------|-------|------|-------|
| S1 | Feb 6 | Setup & Tooling | BM | 2 hrs |
| S2 | Feb 9–13 | JSON / BSON Syntax | ND | 2 hrs |
| S3 | Feb 16–20 | Schema Design | ND | 2 hrs |
| S4 | Feb 23–27 | Atlas & Compass | BM | 2 hrs |
| S5 | Mar 2–6 | Seed Data | VU | 2 hrs |
| S6 | Mar 9–13 | Defense Prep | All | 2 hrs |
| S7 | Mar 17–20 | Presentation | All | 2 hrs |

---

### ⚠️ Impediments & Dependencies

| # | Impediment | Impact | Owner | Mitigation |
|---|------------|--------|-------|------------|
| 1 | Atlas cluster must be ready before S5 | Seeder cannot insert without a connection | BM | Complete S4 before Mar 2 |
| 2 | Mermaid schema (S3) must be approved before S4 | Collections should not be created before schema is final | ND | Review in S3 session |
| 3 | Feb 16 is a public holiday | S3 tasks must be redistributed across Tue–Thu | BG | Scrum Master re-assigns |
| 4 | `MONGO_URI` must never be pushed to GitHub | Risk of credential exposure | BM | `.gitignore` check every commit |

---

### ✅ Definition of Done — P1

P1 is complete when ALL of the following are true:

- [ ] `README.md` contains a signed Student Pledge
- [ ] Mermaid ER diagram committed at `docs/schema.mmd`
- [ ] Atlas cluster is live; `MONGO_URI` is in `.env` (never in GitHub)
- [ ] 50+ documents inserted and visible in Compass
- [ ] `RELEASE v1.0` tag exists on `main`
- [ ] Screenshots saved in `/tests/screenshots/`
- [ ] All code, variable names, and comments written in English

---

## 🟢 Second Partial — RELEASE v2.0

### 🎯 Goal

> Implement the full MQL query layer for the Exam Manager: write comparison, logical, update, and delete queries against the seed data. Wire them into a Node.js/Express REST API with Mongoose models so the Flutter app can perform all CRUD operations against MongoDB Atlas.

---

### ⚙️ Parameters

| Parameter | Value |
|-----------|-------|
| Period | Mar 23 – May 15 |
| Grading window | May 13–15 |
| Final release | `RELEASE v2.0` |
| Stack | MQL · Node.js · Express · Mongoose · MongoDB Atlas |

---

### ⏱️ Hours

| Parameter | Value |
|-----------|-------|
| Weekly hours | 2 hrs max |
| Active weeks | 6 (S8–S13) |
| Total hours | ~12 hrs |
| Team size | 5 members |

---

### 📖 User Stories & Acceptance Criteria

#### US-05 — Query Developer
**As a** Query Developer, **I want to** write `find()` queries with projection and sort
**so that** the team can retrieve student profiles and exam results in a structured way.

**Acceptance criteria:**
- [ ] `find()` and `findOne()` queries work on both collections
- [ ] At least one query uses projection to limit returned fields
- [ ] At least one query uses `.sort()` to order results
- [ ] Committed to `queries/01_simple_find.mongodb`

#### US-06 — Query Developer
**As a** Query Developer, **I want to** filter documents using comparison and logical operators
**so that** the API can answer specific business questions about student performance.

**Acceptance criteria:**
- [ ] Queries use `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`
- [ ] Queries use `$and`, `$or`, `$not`, `$nor` for combined conditions
- [ ] Committed to `queries/02_filters.mongodb` and `queries/03_logic.mongodb`

#### US-07 — Query Developer
**As a** Query Developer, **I want to** write update and delete scripts
**so that** the database can be maintained and corrected without manual Compass edits.

**Acceptance criteria:**
- [ ] `updateOne` and `updateMany` use `$set`, `$inc`, and `$push`
- [ ] `deleteOne` and `deleteMany` handle cleanup scenarios
- [ ] Scripts committed to `scripts/update_data.js`

#### US-08 — Integration Specialist
**As an** Integration Specialist, **I want to** build a REST API with Express and Mongoose
**so that** the Flutter app can perform CRUD operations via HTTP.

**Acceptance criteria:**
- [ ] All 6 endpoints respond correctly (see API Reference)
- [ ] `POST /api/profile` validates `@gmail.com` email format
- [ ] `GET /api/results/:profileId` returns results sorted newest first
- [ ] Placeholder exists for `GET /api/boleta/:profileId`
- [ ] API tested with Postman; screenshots saved

#### US-09 — Data Seeder / QA
**As a** Data Seeder / QA, **I want to** validate all queries against seed data
**so that** results are provably correct before the partial exam.

**Acceptance criteria:**
- [ ] Every query result manually verified against `data/seeds.json`
- [ ] All API endpoints tested with valid and invalid inputs
- [ ] Test screenshots organized in `/tests/screenshots/` by week

---

### 📅 Action Plan & Task Breakdown

#### S8 · Mar 23–27 — Simple Queries

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P2-S8-01 | Write `find()` and `findOne()` queries for `profiles` | WO | ⬜ |
| P2-S8-02 | Write `find()` queries for `examresults` | WO | ⬜ |
| P2-S8-03 | Commit to `queries/01_simple_find.mongodb` | WO | ⬜ |
| P2-S8-04 | Save screenshots in `/tests/screenshots/s8/` | VU | ⬜ |

**Artifact:** `queries/01_simple_find.mongodb`

#### S9 · Mar 30 – Apr 3 — Comparison Filters

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P2-S9-01 | Write queries using `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte` | WO | ⬜ |
| P2-S9-02 | Write queries using `$in` and `$nin` | WO | ⬜ |
| P2-S9-03 | Commit to `queries/02_filters.mongodb` | WO | ⬜ |
| P2-S9-04 | QA validates results match expected values from seeds | VU | ⬜ |

**Artifact:** `queries/02_filters.mongodb`

#### S10 · Apr 6–10 — Logical Operators

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P2-S10-01 | Write queries using `$and`, `$or`, `$not`, `$nor` | WO | ⬜ |
| P2-S10-02 | Combine comparison + logical operators in complex queries | WO | ⬜ |
| P2-S10-03 | Commit to `queries/03_logic.mongodb` | WO | ⬜ |
| P2-S10-04 | Save screenshots in `/tests/screenshots/s10/` | VU | ⬜ |

**Artifact:** `queries/03_logic.mongodb`

#### S11 · Apr 13–17 — Update & Delete

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P2-S11-01 | Write `updateOne` and `updateMany` using `$set`, `$inc`, `$push` | WO | ⬜ |
| P2-S11-02 | Write `deleteOne` and `deleteMany` for cleanup scenarios | WO | ⬜ |
| P2-S11-03 | Write and commit `scripts/update_data.js` | WO | ⬜ |
| P2-S11-04 | QA validates documents before and after updates | VU | ⬜ |

**Artifact:** `scripts/update_data.js`

#### S12 · Apr 27 – May 1 — Express API Setup

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P2-S12-01 | Initialize Node.js project inside `lib/exam_api/` | BM | ⬜ |
| P2-S12-02 | Install Express, Mongoose, dotenv, nodemon | BM | ⬜ |
| P2-S12-03 | Create `Profile` and `ExamResult` Mongoose models | BM | ⬜ |
| P2-S12-04 | Implement `POST /api/profile` and `GET /api/profile/:id` | BM | ⬜ |
| P2-S12-05 | Implement `GET /api/health` endpoint | BM | ⬜ |
| P2-S12-06 | Test endpoints with Postman — save screenshots | VU | ⬜ |

**Artifact:** `lib/exam_api/` — Initial Express API

#### S13 · May 4–15 — API Completion & RELEASE v2.0

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P2-S13-01 | Implement `PUT /api/profile/:id` | BM | ⬜ |
| P2-S13-02 | Implement `POST /api/results` | BM | ⬜ |
| P2-S13-03 | Implement `GET /api/results/:profileId` (newest first) | BM | ⬜ |
| P2-S13-04 | Add placeholder for `GET /api/boleta/:profileId` | BM | ⬜ |
| P2-S13-05 | Update `README.md` with API Reference table | BM | ⬜ |
| P2-S13-06 | Final `.env` security check | BM | ⬜ |
| P2-S13-07 | Create `RELEASE v2.0` tag on GitHub | BM | ⬜ |
| P2-S13-08 | Write retrospective → `docs/retrospective_p2.md` | BG | ⬜ |

**Artifact:** `RELEASE v2.0` tag

---

### 📅 Weekly Plan — Max 2 hrs/week

| Week | Dates | Focus | Lead | Hours |
|------|-------|-------|------|-------|
| S8 | Mar 23–27 | Simple queries | WO | 2 hrs |
| S9 | Mar 30 – Apr 3 | Comparison filters | WO | 2 hrs |
| S10 | Apr 6–10 | Logical operators | WO | 2 hrs |
| S11 | Apr 13–17 | Update & Delete | WO | 2 hrs |
| S12 | Apr 27 – May 1 | Express API setup | BM | 2 hrs |
| S13 | May 4–15 | API completion + release | BM | 2 hrs |

---

### ⚠️ Impediments & Dependencies

| # | Impediment | Impact | Owner | Mitigation |
|---|------------|--------|-------|------------|
| 1 | `RELEASE v1.0` must exist before S8 | No seed data to query without P1 | BM | Verify tag before Mar 23 |
| 2 | Mongoose models must match P1 schema exactly | Mismatched fields cause silent validation errors | ND + BM | Cross-check `dictionary.md` before S12 |
| 3 | Flutter `baseUrl` must point to live API | App cannot test without running server | BM | Keep `npm run dev` running during QA sessions |

---

### ✅ Definition of Done — P2

P2 is complete when ALL of the following are true:

- [ ] `queries/01_simple_find.mongodb`, `02_filters.mongodb`, `03_logic.mongodb` run without errors
- [ ] `scripts/update_data.js` runs without errors
- [ ] All 6 API endpoints respond with correct HTTP status codes
- [ ] Placeholder exists for `/api/boleta/:profileId`
- [ ] `RELEASE v2.0` tag exists on `main`
- [ ] Screenshots organized in `/tests/screenshots/` by week
- [ ] `.env` is NOT committed or tracked

---

## 🟣 Third Partial — RELEASE v3.0

### 🎯 Goal

> Build the Aggregation Framework layer of the Exam Manager: implement pipelines that compute student transcripts (`boleta`) and class-wide statistics, optimize query performance with indexes, and connect everything to the Express API so the Flutter app can consume real aggregated data.

---

### ⚙️ Parameters

| Parameter | Value |
|-----------|-------|
| Period | May 18 – June 19 |
| Grading window | June 17–19 |
| Final release | `RELEASE v3.0` |
| Stack | Aggregation Framework · Node.js · Express · Mongoose · Flutter |

---

### ⏱️ Hours

| Parameter | Value |
|-----------|-------|
| Weekly hours | 2 hrs max |
| Active weeks | 3 (S14–S16) |
| Total hours | ~6 hrs |
| Team size | 5 members |

---

### 📖 User Stories & Acceptance Criteria

#### US-10 — Query Developer
**As a** Query Developer, **I want to** build an Aggregation Pipeline with `$match`, `$group`, `$count`
**so that** the platform can report each student's average and total attempts in a single call.

**Acceptance criteria:**
- [ ] Pipeline uses `$match` to filter by `profileId`
- [ ] Pipeline uses `$group` to compute `promedioGeneral`
- [ ] Pipeline uses `$count` to show total attempts
- [ ] Result verified against manually calculated expected values
- [ ] Committed to `queries/agg_01_stats.mongodb`

#### US-11 — Query Developer
**As a** Query Developer, **I want to** build an Advanced Pipeline with `$project`, `$sort`, `$limit`, `$lookup`
**so that** the `boleta` screen shows each student's `calificacion` and pass status.

**Acceptance criteria:**
- [ ] `$project` computes `calificacion = (score / maxScore) * 10`
- [ ] `$addFields` adds `aprobado: calificacion >= 6`
- [ ] `$sort` ranks exam types from hardest to easiest
- [ ] `$limit: 3` returns top 3 hardest exam types
- [ ] Committed to `queries/agg_02_reports.mongodb`

#### US-12 — Integration Specialist
**As an** Integration Specialist, **I want to** wire aggregation pipelines to the API and add indexes
**so that** the Flutter app receives fast, structured JSON responses.

**Acceptance criteria:**
- [ ] `GET /api/boleta/:profileId` returns `promedioGeneral`, `aprobados`, `calificaciones[]`
- [ ] `GET /api/stats` returns exam type breakdown
- [ ] HTTP 404 for unknown `profileId`; HTTP 400 for invalid ObjectId
- [ ] Index created on `examresults.profileId`
- [ ] `explain("executionStats")` before/after documented in `docs/performance_audit.md`
- [ ] Screenshots saved in `/tests/screenshots/s16/`

---

### 📅 Action Plan & Task Breakdown

#### S14 · May 18–22 — Aggregation Intro: `$match`, `$group`, `$count`

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P3-S14-01 | Study `$match`, `$group`, `$count` — write explanation in `docs/aggregation_notes.md` | WO | ⬜ |
| P3-S14-02 | Write pipeline: `$match` by `profileId` → `$group` average score | WO | ⬜ |
| P3-S14-03 | Add `$count` to compute total attempts | WO | ⬜ |
| P3-S14-04 | Data Modeler reviews output — confirm field names match schema | ND | ⬜ |
| P3-S14-05 | Commit pipeline to `queries/agg_01_stats.mongodb` | WO | ⬜ |
| P3-S14-06 | Save screenshots in `/tests/screenshots/s14/` | VU | ⬜ |

**Artifact:** `queries/agg_01_stats.mongodb`

#### S15 · May 25–29 — Advanced Pipelines: `$project`, `$sort`, `$limit`, `$lookup`

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P3-S15-01 | Write pipeline: `$group` by `examType` → `avgScore` + `totalAttempts` | WO | ⬜ |
| P3-S15-02 | Add `$project` to compute `calificacion = (score / maxScore) * 10` | WO | ⬜ |
| P3-S15-03 | Add `$addFields` to mark `aprobado: calificacion >= 6` | WO | ⬜ |
| P3-S15-04 | Add `$sort` by `avgScore` ascending + `$limit: 3` | WO | ⬜ |
| P3-S15-05 | Commit pipeline to `queries/agg_02_reports.mongodb` | WO | ⬜ |
| P3-S15-06 | QA manually validates results against `data/seeds.json` | VU | ⬜ |
| P3-S15-07 | Log any discrepancies in `Docs/TROUBLESHOOTING.md` | VU | ⬜ |
| P3-S15-08 | Save screenshots in `/tests/screenshots/s15/` | VU | ⬜ |

**Artifact:** `queries/agg_02_reports.mongodb`

#### S16 · June 1–5 — Índices y Performance + API Integration

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P3-S16-01 | Wire `/api/boleta/:profileId` with Mongoose aggregation pipeline | BM | ⬜ |
| P3-S16-02 | Create `GET /api/stats` endpoint | BM | ⬜ |
| P3-S16-03 | Add HTTP 404: `{ error: "Student not found" }` for unknown `profileId` | BM | ⬜ |
| P3-S16-04 | Add HTTP 400: validate `profileId` is a valid ObjectId | BM | ⬜ |
| P3-S16-05 | Query Developer reviews Mongoose pipeline matches Compass version | WO | ⬜ |
| P3-S16-06 | Run `explain("executionStats")` before index — capture `totalDocsExamined` | WO | ⬜ |
| P3-S16-07 | Create index: `db.examresults.createIndex({ profileId: 1 })` | WO | ⬜ |
| P3-S16-08 | Re-run `explain()` after index — compare results | WO | ⬜ |
| P3-S16-09 | Document before/after stats in `docs/performance_audit.md` | WO | ⬜ |
| P3-S16-10 | Test all 8 endpoints with Postman — save screenshots in `/tests/screenshots/s16/` | VU | ⬜ |

**Artifact:** Updated `lib/exam_api/routes/` · `docs/performance_audit.md`

---

### 📅 Weekly Plan — Max 2 hrs/week

| Week | Dates | Focus | Lead | Hours |
|------|-------|-------|------|-------|
| S14 | May 18–22 | Aggregation Intro | WO | 2 hrs |
| S15 | May 25–29 | Advanced Pipelines | WO | 2 hrs |
| S16 | Jun 1–5 | Indexes + API Integration | BM | 2 hrs |

---

### ⚠️ Impediments & Dependencies

| # | Impediment | Impact | Owner | Mitigation |
|---|------------|--------|-------|------------|
| 1 | `RELEASE v2.0` must exist before S14 | No data to aggregate without v2.0 | BM | Verify tag before May 18 |
| 2 | Mongoose `.aggregate()` differs slightly from Compass | Pipeline may fail in API | WO + BM | Test in Compass first, then port |
| 3 | Flutter `baseUrl` must point to live API during demo | App shows empty screens | BM | Use ngrok before presentation |
| 4 | Student with 0 results can crash AGG-02 pipeline | `/api/boleta` returns 500 | BM | Add `$match` guard before `$group` |

---

### ✅ Definition of Done — P3

P3 is complete when ALL of the following are true:

- [ ] `queries/agg_01_stats.mongodb` runs without errors in Compass
- [ ] `queries/agg_02_reports.mongodb` runs without errors in Compass
- [ ] Both pipelines return results matching manually calculated expected values
- [ ] `GET /api/boleta/:profileId` returns correct `promedioGeneral`, `aprobados`, `calificaciones`
- [ ] `GET /api/stats` returns correct exam type breakdown
- [ ] Both endpoints handle invalid input with HTTP 404/400
- [ ] Index created on `examresults.profileId`
- [ ] `docs/performance_audit.md` committed with before/after `explain()` findings
- [ ] Screenshots organized in `/tests/screenshots/` by week
- [ ] `.env` is NOT committed or tracked

---

## 📊 Summary

### Tasks by Partial

| Partial | Weeks | Total Tasks | ✅ Done | ⬜ Pending |
|---------|-------|-------------|---------|-----------|
| P1 — RELEASE v1.0 | S1–S7 | 22 | 0 | 22 |
| P2 — RELEASE v2.0 | S8–S13 | 24 | 0 | 24 |
| P3 — RELEASE v3.0 | S14–S16 | 22 | 0 | 22 |
| **Total** | **S1–S16** | **68** | **0** | **68** |

### Tasks by Owner

| Member | Initials | P1 | P2 | P3 | Total |
|--------|----------|----|----|----|-------|
| Caballero Ortíz Nancy Denisse | ND | 8 | 0 | 1 | 9 |
| Ortíz Morales Walther | WO | 0 | 10 | 10 | 20 |
| Montalvo Hernández Brenda Paola | BM | 8 | 11 | 4 | 23 |
| Meza Uzcanga Vladimir | VU | 5 | 4 | 4 | 13 |
| Gomez Coria Barbara Guadalupe | BG | 1 | 1 | 0 | 2 |
| All | — | 5 | 0 | 0 | 5 |

---

<div align="center">

Sprint Backlog for **Exam Manager** — NoSQL Course · All Partials · 2025
<br>
<a href="../releases/tag/v1.0">RELEASE v1.0</a> · <a href="../releases/tag/v2.0">RELEASE v2.0</a> · <a href="../releases/tag/v3.0">RELEASE v3.0</a>

</div>
