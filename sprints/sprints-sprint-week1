# 📋 Sprint Plan — First Partial
> **Project:** Exam Manager &nbsp;|&nbsp; **Period:** Feb 6 – Mar 20 &nbsp;|&nbsp; **Team:** 5 members &nbsp;|&nbsp; **Pace:** 2 hrs/week (~14 hrs total)

---

## 🎯 Sprint Goal

> Design and implement the NoSQL data model (JSON/BSON) for the Exam Manager platform, configure the MongoDB Atlas environment, and generate sufficient seed data to demonstrate a fully working schema that supports multiple-choice, open-ended, and matching exam types — each persisted as a single nested document.

---

## ⚙️ Sprint Parameters

| Parameter | Value |
|-----------|-------|
| Weekly hours | 2 hrs max |
| Total hours | ~14 hrs |
| Team size | 5 members |
| Final release | `RELEASE v1.0` |
| Grading window | Mar 18–20 |
| Stack | JSON · BSON · MongoDB Compass · Mermaid.js |

---

## 👥 Team

| Role | Member |
|------|--------|
| Data Modeler | Caballero Ortíz Nancy Denisse |
| Query Developer | Ortíz Morales Walther |
| Integration Specialist | Montalvo Hernández Brenda Paola |
| Data Seeder / QA | Meza Uzcanga Vladimir |
| Scrum Master | Gomez Coria Barbara Guadalupe |

---

## 📖 User Stories & Acceptance Criteria

### US-01 — Data Modeler
**As a** Data Modeler, **I want to** define the exam schema with polymorphic question types  
**so that** the system can store multiple-choice, open-ended, and matching questions in a single collection.

**Acceptance criteria:**
- [ ] Mermaid diagram includes `Profile`, `ExamResult`, and all three question-type structures
- [ ] Embedding vs Referencing decision is documented and justified in `docs/schema.md`
- [ ] Every field is defined in `docs/dictionary.md` with name, BSON type, and description

---

### US-02 — Integration Specialist
**As an** Integration Specialist, **I want to** connect the project to MongoDB Atlas  
**so that** the team can work against a real database from Week 4 onward.

**Acceptance criteria:**
- [ ] Free-tier Atlas cluster is active and reachable
- [ ] `MONGO_URI` is stored in `.env` and `.env` is listed in `.gitignore`
- [ ] A test document can be inserted from Compass without errors
- [ ] `scripts/01_create_collections.js` runs successfully

---

### US-03 — Data Seeder / QA
**As a** Data Seeder, **I want to** generate 50+ realistic test documents  
**so that** the Query Developer can validate MQL queries against real data.

**Acceptance criteria:**
- [ ] `data/seeds.json` contains at least 50 student profiles with valid `@gmail.com` emails
- [ ] Results cover all three exam types with varied scores
- [ ] All documents are inserted via `insertMany` and visible in Compass

---

### US-04 — Query Developer
**As a** Query Developer, **I want** both collections created and populated  
**so that** I can start writing and testing MQL queries from Week 5.

**Acceptance criteria:**
- [ ] Collections `profiles` and `examresults` exist in Atlas
- [ ] At least one sample query (`find`, `findOne`) runs without errors in Compass

---

## 📅 Weekly Action Plan

### `S1` · Feb 6 — Setup & Tooling
> **Lead role:** Integration Specialist

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Create GitHub repo with required folder structure | Integration Specialist | ⬜ |
| 2 | Add `README.md` with signed Student Pledge | All | ⬜ |
| 3 | Install VS Code, MongoDB Compass, and Git | All | ⬜ |
| 4 | Create `.gitignore` (node_modules, .env, .DS_Store) | Integration Specialist | ⬜ |

**Artifact:** `README.md` — Initial Commit

---

### `S2` · Feb 9–13 — JSON / BSON Syntax
> **Lead role:** Data Modeler

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Model `Profile` object with all required fields | Data Modeler | ⬜ |
| 2 | Model `ExamResult` with a nested response sub-document | Data Modeler | ⬜ |
| 3 | Create `portfolio/me.json` as a real-world JSON exercise | Data Modeler | ⬜ |
| 4 | Identify BSON types for each field (String, ObjectId, Date, Number) | Data Modeler | ⬜ |

**Artifact:** `portfolio/me.json`

---

### `S3` · Feb 16–20 — Schema Design
> **Lead role:** Data Modeler &nbsp;|&nbsp; ⚠️ Feb 16 is a holiday — shift tasks to Tue–Thu

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Decide and document Embedding vs Referencing strategy | Data Modeler | ⬜ |
| 2 | Draw Entity-Relationship diagram using Mermaid.js | Data Modeler | ⬜ |
| 3 | Write `docs/schema.md` with design rationale | Data Modeler | ⬜ |
| 4 | Write `docs/dictionary.md` with all field definitions | Data Modeler | ⬜ |

**Artifact:** `docs/schema.mmd` · `docs/dictionary.md`

---

### `S4` · Feb 23–27 — MongoDB Compass & Atlas
> **Lead role:** Integration Specialist

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Create free-tier cluster on MongoDB Atlas | Integration Specialist | ⬜ |
| 2 | Set up `.env` file with `MONGO_URI` | Integration Specialist | ⬜ |
| 3 | Create collections `profiles` and `examresults` in Compass | Integration Specialist | ⬜ |
| 4 | Write and commit `scripts/01_create_collections.js` | Integration Specialist | ⬜ |

**Artifact:** `scripts/01_create_collections.js`

> 🔒 **Security reminder:** The `MONGO_URI` must NEVER be committed to GitHub.

---

### `S5` · Mar 2–6 — CRUD: Create (insertMany)
> **Lead role:** Data Seeder / QA

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Generate 50+ fictional student profiles (use AI or Mockaroo) | Data Seeder | ⬜ |
| 2 | Generate exam results covering all 3 question types | Data Seeder | ⬜ |
| 3 | Insert all documents using `insertMany` in Compass | Data Seeder | ⬜ |
| 4 | Capture screenshots as evidence and save to `/tests/screenshots` | Data Seeder / QA | ⬜ |

**Artifact:** `data/seeds.json` (50+ documents)

---

### `S6` · Mar 9–13 — Architecture Defense
> **Lead role:** All members

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Review that the repo is clean and complete | Integration Specialist | ⬜ |
| 2 | Confirm `.env` is NOT tracked by Git | Integration Specialist | ⬜ |
| 3 | Add final screenshots to `/tests/screenshots` | Data Seeder / QA | ⬜ |
| 4 | Create `RELEASE v1.0` tag on GitHub | Integration Specialist | ⬜ |
| 5 | Prepare data model presentation slides | All | ⬜ |

**Artifact:** `RELEASE v1.0` tag

---

### `S7` · Mar 17–20 — Partial Exam & Retrospective
> **Lead role:** All members

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Final project presentation in class | All | ⬜ |
| 2 | Grade submission window (Mar 18–20) | All | ⬜ |
| 3 | Team retrospective — what worked, what didn't | Scrum Master | ⬜ |

---

## ✅ Definition of Done

The First Partial is considered **complete** when ALL of the following are true:

- [ ] `README.md` contains a signed Student Pledge
- [ ] Mermaid ER diagram is committed at `docs/schema.mmd`
- [ ] Atlas cluster is live and `MONGO_URI` is in `.env` (never in GitHub)
- [ ] 50+ documents are inserted and visible in Compass
- [ ] `RELEASE v1.0` tag exists on the `main` branch
- [ ] Screenshots of evidence are saved in `/tests/screenshots`
- [ ] All code, variable names, and comments are written in **English**

---

## ⚠️ Impediments & Dependencies

| # | Impediment | Impact | Owner |
|---|------------|--------|-------|
| 1 | Atlas cluster must be ready **before S5** | Seeder cannot insert without a connection | Integration Specialist |
| 2 | Mermaid schema (S3) must be approved **before S4** | Collections should not be created before schema is final | Data Modeler |
| 3 | Feb 16 is a public holiday | S3 tasks must be redistributed across Tue–Thu | Scrum Master |
| 4 | `MONGO_URI` must **never** be pushed to GitHub | Risk of credential exposure | Integration Specialist |

---

## 🤖 AI Copilot Prompts

> Configure this system instruction at the start of every AI session:
> 
> *"Act as a Senior NoSQL Mentor. Do NOT give me the final code immediately — guide me to build it. Explain concepts in Spanish but write ALL code, variable names, and comments in English."*

| Week | Prompt |
|------|--------|
| S1 | `"Act as a Senior Developer. Explain the importance of .gitignore in a NoSQL project. Reply in Spanish, keep technical terms in English."` |
| S2 | `"Generate a complex JSON example representing a student exam result with nested objects and arrays. Explain the structure in Spanish."` |
| S3 | `"Act as a Data Architect. Compare Embedding vs Referencing for an Exam Result system where one Profile has many ExamResults. Which is better for read performance and why?"` |
| S4 | `"Guide me step-by-step to create a free cluster on MongoDB Atlas. Explain what a Connection String is and why I must keep it secret."` |
| S5 | `"Act as a QA Engineer. Generate a JSON dataset of 50 students with realistic names, @gmail.com emails, and exam results of type multiple-choice, open-ended, and matching. Output as a valid JSON array."` |

---

*Sprint plan for **Exam Manager** — NoSQL Course · First Partial · 2025*
