# 🗂️ Sprint Plan — Second Partial
<!-- Exam Manager · NoSQL Course · Mar 23 – May 14 -->

[![Sprint](https://img.shields.io/badge/sprint-second_partial-378ADD)](.)
[![Release](https://img.shields.io/badge/target-RELEASE_v2.0-1D9E75)](.)
[![Status](https://img.shields.io/badge/status-in_progress-BA7517)](.)
[![Weeks](https://img.shields.io/badge/duration-6_weeks-534AB7)](.)

---

## 📌 Table of Contents

1. [Sprint Overview](#-sprint-overview)
2. [Sprint Goal](#-sprint-goal)
3. [Parameters](#-parameters)
4. [Team](#-team)
5. [User Stories & Acceptance Criteria](#-user-stories--acceptance-criteria)
6. [Weekly Action Plan](#-weekly-action-plan)
7. [MQL Query Catalog](#-mql-query-catalog)
8. [Definition of Done](#-definition-of-done)
9. [Impediments & Dependencies](#-impediments--dependencies)
10. [AI Copilot Prompts](#-ai-copilot-prompts)
11. [Retrospective Template](#-retrospective-template)

---

## 🧭 Sprint Overview

| Field | Value |
|-------|-------|
| **Partial** | Second Partial |
| **Period** | Mar 23 – May 14, 2025 |
| **Focus** | *"Talking to the Data"* — Queries, Logical Operators & Array Mutation |
| **Break** | Spring Break: Mar 30 – Apr 10 (no commits required) |
| **Grading window** | May 12–14 |
| **Holidays** | May 1 (Labour Day), May 5 (Battle of Puebla), May 15 (Teacher's Day) |
| **Target release** | `RELEASE v2.0` |
| **Builds on** | `RELEASE v1.0` from First Partial |

> **Shift in mindset:** The first partial was about *designing* the data. This partial is about *interrogating* it. Every query you write should answer a real business question for the Exam Manager platform.

---

## 🎯 Sprint Goal

> Implement a complete, documented set of MQL queries that answer real business questions for the Exam Manager — covering basic reads, projection, comparison operators (`$gt`, `$lt`, `$in`, `$ne`), logical operators (`$and`, `$or`, `$not`), and array mutation (`$set`, `$inc`, `$push`) — and deliver them as executable `.mongodb` scripts committed to the repository with a `RELEASE v2.0` tag.

---

## ⚙️ Parameters

| Parameter | Value |
|-----------|-------|
| Weekly hours | 2 hrs max |
| Active weeks | 6 (Spring Break excluded) |
| Total hours | ~12 hrs |
| Team size | 5 members |
| Stack | MQL · MongoDB Compass · Node.js · Mongoose |
| Final release | `RELEASE v2.0` |
| Grading window | May 12–14 |

---

## 👥 Team

| Role | Member | Second Partial Focus |
|------|--------|----------------------|
| Data Modeler | Caballero Ortíz Nancy Denisse | Reviews schema for query performance; adds indexes |
| Query Developer | Ortíz Morales Walther | **Lead this partial** — writes all MQL scripts |
| Integration Specialist | Montalvo Hernández Brenda Paola | Manages GitHub releases, indexes, and Compass connections |
| Data Seeder / QA | Meza Uzcanga Vladimir | Validates every query against real seed data; reports bugs |
| Scrum Master | Gomez Coria Barbara Guadalupe | Tracks weekly progress, removes blockers, leads retrospective |

> 💡 The **Query Developer** is the primary driver this partial. All other roles support and validate their output.

---

## 📖 User Stories & Acceptance Criteria

### US-05 — Query Developer
**As a** Query Developer,  
**I want to** write basic `find()` and `findOne()` queries with projections  
**so that** I can retrieve only the fields needed without over-fetching data.

**Acceptance criteria:**
- [ ] `queries/01_simple_find.mongodb` is committed and executable in Compass
- [ ] At least one query uses projection to exclude `_id` and return specific fields
- [ ] Each query includes an inline comment explaining the business question it answers
- [ ] QA verifies results against `data/seeds.json`

---

### US-06 — Query Developer
**As a** Query Developer,  
**I want to** filter exam results using comparison operators (`$gt`, `$lt`, `$in`, `$ne`)  
**so that** the platform can surface students with passing scores, low averages, or specific exam types.

**Acceptance criteria:**
- [ ] `queries/02_filters.mongodb` contains at least 4 distinct queries using different comparison operators
- [ ] One query uses `$in` to filter by multiple `examType` values at once
- [ ] One query uses `$gt` + `$lt` together to define a score range
- [ ] All queries return at least 1 document from the seed dataset (QA must verify)

---

### US-07 — Query Developer
**As a** Query Developer,  
**I want to** combine conditions with logical operators (`$and`, `$or`, `$not`)  
**so that** complex business rules (e.g. "failing students in a specific exam type") can be answered in a single query.

**Acceptance criteria:**
- [ ] `queries/03_logic.mongodb` contains at least 3 queries using logical operators
- [ ] One query demonstrates the difference between implicit `$and` and explicit `$and`
- [ ] One query uses `$or` to find results matching at least two different conditions
- [ ] Queries are documented with the business question they solve

---

### US-08 — Query Developer + Data Seeder
**As a** Query Developer,  
**I want to** update documents using `$set`, `$inc`, and `$push`  
**so that** exam scores can be corrected, attempt counters incremented, and new results appended without rewriting full documents.

**Acceptance criteria:**
- [ ] `scripts/update_data.js` contains at least 3 update operations using different operators
- [ ] `$push` is used to append a new result to an array field without replacing it
- [ ] `$inc` is used to increment an `attemptCount` or `totalScore` field atomically
- [ ] Before/after screenshots are saved in `/tests/screenshots/updates/`

---

### US-09 — Integration Specialist
**As an** Integration Specialist,  
**I want to** ensure all query scripts run cleanly against the Atlas cluster  
**so that** the final demo has zero connection errors or runtime failures.

**Acceptance criteria:**
- [ ] All `.mongodb` scripts in `/queries` execute without errors in Compass
- [ ] Basic indexes are created on `profileId` and `examType` fields
- [ ] `RELEASE v2.0` tag is created on `main` after all scripts are merged

---

## 📅 Weekly Action Plan

---

### `S8` · Mar 23–27 — CRUD: Read (Basic)
> **Lead role:** Query Developer &nbsp;|&nbsp; **Supporting:** Data Seeder / QA

#### Context
This week introduces the fundamental read pattern in MQL. The key mental shift: `db.collection.find({})` is not `SELECT *` — projections let you shape the response at the database level, reducing network overhead.

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Write 3+ `find()` queries answering real business questions | Query Developer | ⬜ |
| 2 | Write 1 `findOne()` query to retrieve a single student profile | Query Developer | ⬜ |
| 3 | Add projections to exclude unnecessary fields (e.g. `_id: 0`) | Query Developer | ⬜ |
| 4 | Validate all queries return expected results against seeds | Data Seeder / QA | ⬜ |
| 5 | Save screenshots of results in `/tests/screenshots/s8/` | Data Seeder / QA | ⬜ |

**Artifact:** `queries/01_simple_find.mongodb`

**Business questions to answer:**
- *"Show all exam results for a given student."*
- *"What is the name and email of the student with a specific profile ID?"*
- *"List all exams of type `multiple-choice` sorted by score descending."*

---

### `S8.5` · Mar 30 – Apr 10 — 🌴 Spring Break
> No commits required. Rest and recharge.

```
"The best queries are written by rested minds."
```

---

### `S9` · Apr 13–17 — Comparison Operators
> **Lead role:** Query Developer &nbsp;|&nbsp; **Supporting:** Data Seeder / QA

#### Context
Comparison operators transform basic reads into targeted filters. Think of them as the `WHERE` clause in SQL — but operating natively on BSON types, including arrays and nested documents.

| Operator | Meaning | Exam Manager use case |
|----------|---------|-----------------------|
| `$gt` / `$gte` | Greater than / or equal | Find students who scored above 7 |
| `$lt` / `$lte` | Less than / or equal | Find failing results (score < 6) |
| `$in` | Matches any value in array | Find results of type `multiple-choice` or `open-ended` |
| `$ne` | Not equal | Exclude results still pending grading |

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Write query: find all results with `score >= 7` (passing threshold) | Query Developer | ⬜ |
| 2 | Write query: find failing results (`score < 6`) | Query Developer | ⬜ |
| 3 | Write query: find results of type `$in: ["multiple-choice", "open-ended"]` | Query Developer | ⬜ |
| 4 | Write query: find results where `examType $ne "matching"` | Query Developer | ⬜ |
| 5 | QA validates each query returns non-empty result sets | Data Seeder / QA | ⬜ |
| 6 | Screenshots saved in `/tests/screenshots/s9/` | Data Seeder / QA | ⬜ |

**Artifact:** `queries/02_filters.mongodb`

---

### `S10` · Apr 20–24 — Logical Operators
> **Lead role:** Query Developer &nbsp;|&nbsp; **Supporting:** Data Modeler

#### Context
Logical operators allow combining multiple conditions. The key distinction from SQL: MongoDB evaluates conditions on the same document, not across joined rows. `$or` does not create a Cartesian product — it filters documents that satisfy at least one branch.

| Operator | Meaning | When to use |
|----------|---------|-------------|
| `$and` (explicit) | All conditions must match | When two fields must both be true |
| `$and` (implicit) | Comma-separated filters | Shorthand — same as explicit but cleaner |
| `$or` | At least one condition matches | Risk profiling, fallback matching |
| `$not` | Negates a condition | Exclusion logic |

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Write query using implicit `$and`: score > 5 AND examType = "open-ended" | Query Developer | ⬜ |
| 2 | Write same query using explicit `$and` — document the difference | Query Developer | ⬜ |
| 3 | Write query using `$or`: find results from students in grade "3A" OR "3B" | Query Developer | ⬜ |
| 4 | Write query using `$not`: find results where score is NOT below 6 | Query Developer | ⬜ |
| 5 | Data Modeler reviews if schema supports these queries efficiently | Data Modeler | ⬜ |
| 6 | Screenshots saved in `/tests/screenshots/s10/` | Data Seeder / QA | ⬜ |

**Artifact:** `queries/03_logic.mongodb`

---

### `S11` · Apr 27–30 — Update & Delete
> **Lead role:** Query Developer &nbsp;|&nbsp; **Supporting:** Data Seeder / QA  
> ⚠️ May 1 is Labour Day — shift tasks to Mon–Thu

#### Context
Update operators in MongoDB are surgical. Instead of rewriting an entire document, you target only the field that changed. This is especially important for the Exam Manager where scores may need correction or new attempts appended to history.

| Operator | Effect | Exam Manager use case |
|----------|--------|-----------------------|
| `$set` | Set a field to a new value | Correct a score after manual review |
| `$inc` | Increment a numeric field | Add +1 to `attemptCount` |
| `$push` | Append item to an array | Add a new result to `examHistory` array |
| `$unset` | Remove a field | Remove a deprecated field from documents |

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Write `updateOne` using `$set` to correct a student's score | Query Developer | ⬜ |
| 2 | Write `updateMany` using `$inc` to increment `attemptCount` for all results | Query Developer | ⬜ |
| 3 | Write `updateOne` using `$push` to append a new exam result to history | Query Developer | ⬜ |
| 4 | Take before/after screenshots for each update | Data Seeder / QA | ⬜ |
| 5 | Verify no unintended documents were modified (QA check) | Data Seeder / QA | ⬜ |
| 6 | Screenshots saved in `/tests/screenshots/s11/` | Data Seeder / QA | ⬜ |

**Artifact:** `scripts/update_data.js`

---

### `S12` · May 4–8 — Project Closure & Testing
> **Lead role:** All members  
> ⚠️ May 5 is Battle of Puebla — shift tasks accordingly

#### Context
This is integration week. All query scripts must be reviewed together, verified against the live Atlas dataset, and packaged as `RELEASE v2.0`. Think of this as a real-world QA gate before shipping.

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Run all `.mongodb` scripts end-to-end in Compass without errors | Query Developer | ⬜ |
| 2 | Ensure all query files have inline comments per business question | Query Developer | ⬜ |
| 3 | Create basic index on `profileId` for query performance | Integration Specialist | ⬜ |
| 4 | Create basic index on `examType` for filter performance | Integration Specialist | ⬜ |
| 5 | Final QA pass — verify all queries return correct, non-empty results | Data Seeder / QA | ⬜ |
| 6 | Compile all screenshots into `/tests/screenshots/` | Data Seeder / QA | ⬜ |
| 7 | Confirm `.env` is still NOT tracked by Git | Integration Specialist | ⬜ |
| 8 | Create `RELEASE v2.0` tag on `main` branch | Integration Specialist | ⬜ |
| 9 | Prepare final presentation | All | ⬜ |

**Artifact:** `RELEASE v2.0` tag + full query set

---

### `S13` · May 11–14 — Final Exam & Retrospective
> **Lead role:** All members  
> ⚠️ May 15 is Teacher's Day — grading window closes May 14

| # | Task | Owner | Status |
|---|------|-------|--------|
| 1 | Final project presentation in class | All | ⬜ |
| 2 | Grade submission (May 12–14) | All | ⬜ |
| 3 | Fill in [Retrospective Template](#-retrospective-template) | Scrum Master | ⬜ |
| 4 | Archive repo and ensure `main` branch is clean | Integration Specialist | ⬜ |

---

## 🗃️ MQL Query Catalog

> Reference table of all queries to be delivered by `RELEASE v2.0`.

| ID | File | Operator(s) | Business Question | Status |
|----|------|------------|-------------------|--------|
| Q-01 | `01_simple_find.mongodb` | `find()` | Show all results for a given student | ⬜ |
| Q-02 | `01_simple_find.mongodb` | `findOne()` + projection | Get student name & email by ID | ⬜ |
| Q-03 | `01_simple_find.mongodb` | `find()` + `sort()` | List all multiple-choice exams by score (desc) | ⬜ |
| Q-04 | `02_filters.mongodb` | `$gte` | Find all passing results (score ≥ 7) | ⬜ |
| Q-05 | `02_filters.mongodb` | `$lt` | Find all failing results (score < 6) | ⬜ |
| Q-06 | `02_filters.mongodb` | `$in` | Find results of type multiple-choice OR open-ended | ⬜ |
| Q-07 | `02_filters.mongodb` | `$ne` | Exclude results of type matching | ⬜ |
| Q-08 | `03_logic.mongodb` | `$and` (implicit) | Passing open-ended results | ⬜ |
| Q-09 | `03_logic.mongodb` | `$and` (explicit) | Same as Q-08, explicit syntax | ⬜ |
| Q-10 | `03_logic.mongodb` | `$or` | Results from grade 3A or 3B | ⬜ |
| Q-11 | `03_logic.mongodb` | `$not` | Results where score is not below 6 | ⬜ |
| U-01 | `scripts/update_data.js` | `$set` | Correct a student's score after review | ⬜ |
| U-02 | `scripts/update_data.js` | `$inc` | Increment attemptCount for all results | ⬜ |
| U-03 | `scripts/update_data.js` | `$push` | Append new result to examHistory array | ⬜ |

---

## ✅ Definition of Done

The Second Partial is considered **complete** when ALL of the following are true:

### Code quality
- [ ] All query files (`.mongodb`) are committed under `/queries`
- [ ] All update scripts are committed under `/scripts`
- [ ] Every query has an inline comment explaining the business question it solves
- [ ] All code, variable names, and comments are written in **English**

### Functional verification
- [ ] All 14 queries in the [MQL Query Catalog](#-mql-query-catalog) return correct results
- [ ] No query returns an empty result set (QA must verify against seed data)
- [ ] All update operations are verified with before/after screenshots

### Repository health
- [ ] `.env` is NOT committed or tracked by Git
- [ ] Basic indexes exist on `profileId` and `examType`
- [ ] `RELEASE v2.0` tag exists on the `main` branch
- [ ] All screenshots are organized in `/tests/screenshots/` by week

### Presentation
- [ ] Team can explain any query during the final presentation
- [ ] Retrospective document is filled in and committed

---

## ⚠️ Impediments & Dependencies

| # | Impediment | Risk level | Impact | Owner | Mitigation |
|---|------------|------------|--------|-------|------------|
| 1 | `RELEASE v1.0` must exist before writing queries | 🔴 High | No data to query without seed documents | Integration Specialist | Verify v1.0 tag exists on Mar 23 before S8 begins |
| 2 | Spring Break (Mar 30 – Apr 10) | 🟡 Medium | 2-week gap in momentum | Scrum Master | Assign optional reading; resume S9 on Apr 13 |
| 3 | May 1 is Labour Day | 🟢 Low | S11 loses one day | Scrum Master | Shift S11 tasks to Mon–Thu |
| 4 | May 5 is Battle of Puebla | 🟢 Low | S12 loses one day | Scrum Master | Front-load S12 tasks to Mon–Wed |
| 5 | Query returns empty result set | 🟡 Medium | Cannot demonstrate functionality | Data Seeder / QA | Cross-check queries against seeds before commit |
| 6 | Schema not optimized for S9–S10 queries | 🟡 Medium | Slow or incorrect results | Data Modeler | Review indexes in S12; add if needed |

---

## 🤖 AI Copilot Prompts

> Set this system instruction at the start of **every** AI session this partial:
>
> *"Act as a Senior NoSQL Mentor. Do NOT give me the final query immediately — guide me to build it step by step. Explain concepts in Spanish but write ALL code, variable names, and comments in English. When I make a mistake, explain WHY it failed before showing the fix."*

---

### S8 — Basic Read Queries

```
I have a MongoDB collection called 'examresults' with fields: profileId, examName, examType, score, maxScore, and date.
Explain the difference between SQL SELECT * and MongoDB db.collection.find({}).
Then show me how to use projection to return only examName, score, and examType — excluding _id.
Explain in Spanish, code in English.
```

---

### S9 — Comparison Operators

```
I need to query the 'examresults' collection to find:
1. All results where score >= 7
2. All results where examType is either 'multiple-choice' or 'open-ended'

Do NOT give me the final code yet. First explain what $gte and $in do using a JSON analogy (not SQL).
Then give me a minimal example and ask me to adapt it to my schema.
```

---

### S10 — Logical Operators

```
Explain the difference between implicit $and (comma-separated conditions) and explicit $and in MongoDB.
Use my 'examresults' collection as the example.
Then explain when I would use $or instead of $and.
Reply in Spanish, all code in English.
```

---

### S11 — Update Operators

```
I need to update a document in MongoDB without rewriting the whole thing.
Specifically: I want to add +1 to a field called 'attemptCount', and also push a new object into an array called 'examHistory'.
Do NOT give me the answer yet. First explain $inc and $push using a JSON analogy.
Ask me to write the query myself and then review it.
```

---

### S12 — Debugging & Code Review

```
Act as a Senior Code Reviewer. I will paste my MQL query scripts.
For each one, tell me:
1. Does it answer the business question correctly?
2. Could it fail on edge cases? (empty arrays, missing fields, null values)
3. Would it benefit from an index?
Reply in Spanish, keep code in English.
```

---

## 🔄 Retrospective Template

> Fill this in at the end of S13 and commit to `docs/retrospective_p2.md`.

```markdown
# Retrospective — Second Partial
**Date:** ___________  
**Scrum Master:** Gomez Coria Barbara Guadalupe  
**Present:** ___________

## ✅ What went well?
- 
- 
- 

## 🔧 What could be improved?
- 
- 
- 

## 💡 What did we learn about MQL this partial?
- 
- 
- 

## 🚀 Action items for the final project
| Action | Owner | Due |
|--------|-------|-----|
| | | |
| | | |
```

---

## 📁 Expected Repository Structure at RELEASE v2.0

```
/project-root
│
├── README.md                          ← Student Pledge visible
├── .gitignore                         ← .env, node_modules, DS_Store
│
├── /docs
│   ├── rules.md
│   ├── schema.mmd                     ← Mermaid ER diagram (from P1)
│   ├── dictionary.md                  ← Field definitions (from P1)
│   └── retrospective_p2.md            ← NEW: filled retrospective
│
├── /src
│   ├── /data
│   │   └── seeds.json                 ← 50+ documents (from P1)
│   ├── /scripts
│   │   ├── 01_create_collections.js   ← From P1
│   │   └── update_data.js             ← NEW: $set, $inc, $push examples
│   └── /queries
│       ├── 01_simple_find.mongodb     ← NEW: basic find + projections
│       ├── 02_filters.mongodb         ← NEW: comparison operators
│       └── 03_logic.mongodb           ← NEW: logical operators
│
└── /tests
    └── /screenshots
        ├── /s8                        ← find() results
        ├── /s9                        ← filter results
        ├── /s10                       ← logical query results
        └── /s11
            └── /updates              ← before/after update screenshots
```

---

<div align="center">

Sprint plan for **Exam Manager** — NoSQL Course · Second Partial · 2025  
Built on top of [`RELEASE v1.0`](../releases) · Target: [`RELEASE v2.0`](../releases)

</div>
