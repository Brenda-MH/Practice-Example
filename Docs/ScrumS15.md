# 🗂️ ScrumS15.md — Sprint 15: Advanced Pipelines

**Period:** S15 · May 25–29  
**Topic:** Advanced Aggregation Pipeline with `$project`, `$sort`, `$limit`, `$lookup`  
**Key Deliverable:** `queries/agg_02_reports.mongodb`

---

## 👥 Team

| Role | Full Name |
|------|-----------|
| Scrum Master | Gomez Coria Barbara Guadalupe |
| Data Modeler | Caballero Ortíz Nancy Denisse |
| Query Developer | Ortíz Morales Walther |
| Integration Specialist | Montalvo Hernnadez Brenda Paola |
| Data Seeder / QA | Meza Uzcanga Vladimir |

---

## 🎯 Sprint Goal

Implement advanced MongoDB aggregation pipelines applied to the `exam_results` and `profiles` collections, covering **data transformation and reporting** using `$project`, `$sort`, `$limit`, and `$lookup` — with a focus on cross-collection joins and formatted output for UI consumption.

---

## 📋 Product Backlog Items (PBIs) for This Sprint

| ID | User Story | Assignee | Points | Status |
|----|------------|----------|--------|--------|
| PBI-15-01 | As an analyst, I want to display only specific fields from exam results using `$project` to clean up the output | Caballero Ortíz Nancy Denisse | 2 | ✅ Done |
| PBI-15-02 | As a teacher, I want to sort students by score from highest to lowest using `$sort` to identify top performers | Ortíz Morales Walther | 1 | ✅ Done |
| PBI-15-03 | As a coordinator, I want to retrieve only the top 5 students per exam using `$limit` for a leaderboard view | Ortíz Morales Walther | 2 | ✅ Done |
| PBI-15-04 | As a teacher, I want to join `exam_results` with `profiles` using `$lookup` to display the student's name alongside their score | Ortíz Morales Walther | 5 | ✅ Done |
| PBI-15-05 | As a developer, I want a full formatted report pipeline combining `$lookup`, `$project`, `$sort`, and `$limit` for the UI | Montalvo Hernnadez Brenda Paola | 5 | ✅ Done |
| PBI-15-06 | As QA, I want to validate that `$lookup` correctly resolves references between collections without null results | Meza Uzcanga Vladimir | 3 | ✅ Done |
| PBI-15-07 | As a data modeler, I want to document field mappings between `profiles` and `exam_results` for team reference | Caballero Ortíz Nancy Denisse | 2 | ✅ Done |

**Sprint Velocity:** 20 points

---

## 🔄 Daily Stand-up Log

### Monday, May 25

| Member | What did I do? | What will I do today? | Blockers? |
|--------|---------------|----------------------|-----------|
| **Gomez Coria Barbara Guadalupe** | Facilitated Sprint Planning and reviewed S14 retro actions | Kick off sprint, monitor PBI assignments | None |
| **Caballero Ortíz Nancy Denisse** | Reviewed field structure of `profiles` and `exam_results` | Start PBI-15-01: `$project` to clean output fields | None |
| **Ortíz Morales Walther** | Studied `$lookup` documentation and SQL JOIN comparison | Implement PBI-15-02: sort students by score descending | None |
| **Montalvo Hernnadez Brenda Paola** | Set up Docker environment from S14 retro action | Prepare API endpoint structure for formatted report | None |
| **Meza Uzcanga Vladimir** | Added edge-case seeds (score=0, score=100) per S14 retro action | Validate seed data covers all pipeline scenarios | None |

---

### Tuesday, May 26

| Member | What did I do? | What will I do today? | Blockers? |
|--------|---------------|----------------------|-----------|
| **Gomez Coria Barbara Guadalupe** | Updated Kanban board and tracked burndown | Follow up on PBI-15-04 (lookup complexity) | None |
| **Caballero Ortíz Nancy Denisse** | Completed PBI-15-01 (`$project` with renamed fields) | Start PBI-15-07: document field mappings | None |
| **Ortíz Morales Walther** | Completed PBI-15-02 (`$sort` descending) and PBI-15-03 (`$limit` top 5) | Start PBI-15-04: `$lookup` join between collections | None |
| **Montalvo Hernnadez Brenda Paola** | Completed Docker setup — team now shares same MongoDB environment | Begin integrating formatted report pipeline into `/api/reports` endpoint | None |
| **Meza Uzcanga Vladimir** | Verified edge-case seeds produce consistent results in S14 pipelines | Begin writing test cases for PBI-15-04 `$lookup` | None |

---

### Wednesday, May 27

| Member | What did I do? | What will I do today? | Blockers? |
|--------|---------------|----------------------|-----------|
| **Gomez Coria Barbara Guadalupe** | Reviewed mid-sprint burndown — on track | Prepare Sprint Review agenda | None |
| **Caballero Ortíz Nancy Denisse** | Completed PBI-15-07 (field mapping documentation) | Code review with Walther on `$lookup` output | None |
| **Ortíz Morales Walther** | Completed PBI-15-04 (`$lookup` joining profiles to exam_results) | Assemble full report pipeline for PBI-15-05 | $lookup returned empty arrays for some docs — resolved by checking `localField` mismatch |
| **Montalvo Hernnadez Brenda Paola** | Connected pipeline output to `/api/reports` endpoint | Test endpoint response in Postman | None |
| **Meza Uzcanga Vladimir** | Identified 3 documents with mismatched `profileId` format (string vs ObjectId) — fixed in seeds | Re-run all `$lookup` queries to confirm 0 null results | None |

---

### Thursday, May 28

| Member | What did I do? | What will I do today? | Blockers? |
|--------|---------------|----------------------|-----------|
| **Gomez Coria Barbara Guadalupe** | Updated `ScrumS15.md` with all stand-up logs | Prepare Sprint Review demo | None |
| **Caballero Ortíz Nancy Denisse** | Cross-reviewed full pipeline file with Walther | Final review of PBI-15-01 and PBI-15-07 | None |
| **Ortíz Morales Walther** | Completed PBI-15-05 (full formatted report pipeline) | Document all queries in `agg_02_reports.mongodb` | None |
| **Montalvo Hernnadez Brenda Paola** | Completed PBI-15-05 integration — `/api/reports` returns full join data | Document endpoint contract in README | None |
| **Meza Uzcanga Vladimir** | Completed PBI-15-06 — all `$lookup` results verified, 0 nulls | Write QA report with coverage summary | None |

---

### Friday, May 29

| Member | What did I do? | What will I do today? | Blockers? |
|--------|---------------|----------------------|-----------|
| **Gomez Coria Barbara Guadalupe** | Facilitated Sprint Review and Sprint Retrospective | Update backlog for S16 | None |
| **Caballero Ortíz Nancy Denisse** | Final code review and merge of `feat/agg-advanced` branch | Participate in Retrospective | None |
| **Ortíz Morales Walther** | Delivered `agg_02_reports.mongodb` to main branch | Participate in Retrospective | None |
| **Montalvo Hernnadez Brenda Paola** | Validated endpoint in Postman and updated README | Participate in Retrospective | None |
| **Meza Uzcanga Vladimir** | Delivered QA report — 100% pipeline coverage | Participate in Retrospective | None |

---

## 📊 Burndown Chart (remaining points per day)

```
Day       Ideal   Actual
─────────────────────────
Mon 25     20     20
Tue 26     12     13
Wed 27      6      7
Thu 28      2      2
Fri 29      0      0
```

---

## 🔍 Sprint Review

**Date:** Friday, May 29, 2026  
**Facilitator:** Gomez Coria Barbara Guadalupe

### Demos Delivered

1. **`$project` stage** — output showing only `studentName`, `examName`, `score`, and computed `passed` field (true/false).
2. **`$sort` + `$limit`** — top 5 students per exam ranked by score descending.
3. **`$lookup` join** — exam results enriched with full profile data (name, school, grade) from `profiles` collection.
4. **Full formatted report pipeline** — combined `$lookup → $project → $sort → $limit` in a single pipeline.
5. **`/api/reports` endpoint** — Postman demo returning formatted JSON report ready for UI consumption.

### Product Owner Feedback

- ✅ `$lookup` successfully replaces manual join logic in the Node.js layer.
- ➕ For S16, consider adding `$unwind` to flatten the lookup array for simpler UI mapping.
- ➕ Explore `$facet` for running multiple report sub-pipelines in a single query.

---

## 🪞 Sprint Retrospective

### ✅ What Went Well

- The Docker shared environment from the S14 retro action eliminated all "works on my machine" issues.
- Edge-case seeds caught the `profileId` type mismatch early — great QA initiative.
- The `$lookup` vs SQL JOIN comparison documented by the team helped everyone understand the concept faster.

### 🔧 What to Improve

- `$lookup` empty arrays should be tested with a dedicated validation script from day 1 — don't wait for QA mid-sprint.
- Add `$unwind` examples to the query file so the next sprint has a reference starting point.

### 💡 Actions for S16

| Action | Assignee | Deadline |
|--------|----------|----------|
| Add `$unwind` examples to seed pipeline file | Ortíz Morales Walther | Monday S16 |
| Research `$facet` for multi-report pipelines | Caballero Ortíz Nancy Denisse | Tuesday S16 |
| Add type validation for `profileId` in seed script | Meza Uzcanga Vladimir | Monday S16 |
| Update `product_backlog.md` with S16 PBIs | Gomez Coria Barbara Guadalupe | Monday S16 |

---

## 📁 Files Delivered This Sprint

```
queries/
  └── agg_02_reports.mongodb   ← Advanced pipeline file for this sprint
Docs/
  └── ScrumS15.md              ← This document
```

---

*Generated at Sprint 15 close · 29/05/2026*
