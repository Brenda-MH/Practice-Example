# Advanced Aggregation Pipelines in MongoDB
## Sprint 15 — May 25–29, 2026

---

## Introduction

In this exercise we worked with the `exam_results` and `profiles` collections of the **Exam Manager** project. We implemented advanced aggregation pipelines using `$project`, `$sort`, `$limit`, and `$lookup`.

> Here are some examples of the pipelines we built.

---

## Prompt we asked the AI

> _"I need to join data from 'users' to 'orders'. Explain how `$lookup` works. Is it similar to SQL JOIN?"_

The AI explained that `$lookup` is MongoDB's way of joining two collections, similar to a SQL JOIN. The key difference is that `$lookup` returns an **array**, not a flat row. That is why we need `$unwind` right after — it flattens the array into a single object we can work with.

---

## Pipeline Examples

### Pipeline 1 — Select fields with `$project`

We used `$project` to show only the fields we needed and hide the rest. We also added a computed field `passed` that is `true` if the score is 60 or higher.

```js
db.exam_results.aggregate([
  {
    $project: {
      _id: 0,
      examName: 1,
      examType: 1,
      score: 1,
      maxScore: 1,
      passed: {
        $gte: ["$score", 60]
      }
    }
  }
])
```

**Result:** Only the selected fields appear. The `_id` is hidden and `passed` is calculated automatically.

---

### Pipeline 2 — Sort results with `$sort`

We sorted all exam results from highest score to lowest using `-1` for descending order.

```js
db.exam_results.aggregate([
  {
    $sort: { score: -1 }
  },
  {
    $project: {
      _id: 0,
      examName: 1,
      score: 1,
      maxScore: 1
    }
  }
])
```

**Result:** The student with the highest score appears first.

---

### Pipeline 3 — Limit results with `$limit`

After sorting, we kept only the top 5 results. Everything after position 5 is discarded.

```js
db.exam_results.aggregate([
  {
    $sort: { score: -1 }
  },
  {
    $limit: 5
  },
  {
    $project: {
      _id: 0,
      examName: 1,
      score: 1,
      maxScore: 1
    }
  }
])
```

**Result:** Only the top 5 students by score are returned.

---

### Pipeline 4 — Join collections with `$lookup`

This is the most important pipeline of the sprint. We used `$lookup` to join `exam_results` with `profiles` so we could display the student's name, school, and grade alongside their score.

```js
db.exam_results.aggregate([
  {
    $lookup: {
      from: "profiles",
      localField: "profileId",
      foreignField: "_id",
      as: "studentInfo"
    }
  },
  {
    $unwind: "$studentInfo"
  },
  {
    $project: {
      _id: 0,
      studentName: "$studentInfo.name",
      school: "$studentInfo.school",
      grade: "$studentInfo.grade",
      examName: 1,
      score: 1,
      maxScore: 1
    }
  }
])
```

**Result:** Each exam result now shows the student's full name, school, and grade pulled from the `profiles` collection.

**SQL equivalent:**
```sql
SELECT p.name AS studentName, p.school, p.grade,
       er.examName, er.score, er.maxScore
FROM exam_results er
JOIN profiles p ON er.profileId = p._id;
```

---

### Pipeline 5 — Full Formatted Report (for UI)

This pipeline combines all four stages into a single query. It is the one connected to the `/api/reports` endpoint.

```js
db.exam_results.aggregate([
  {
    $lookup: {
      from: "profiles",
      localField: "profileId",
      foreignField: "_id",
      as: "studentInfo"
    }
  },
  {
    $unwind: "$studentInfo"
  },
  {
    $match: {
      score: { $gte: 60 }
    }
  },
  {
    $project: {
      _id: 0,
      studentName: "$studentInfo.name",
      school: "$studentInfo.school",
      examName: 1,
      score: 1,
      maxScore: 1,
      grade: {
        $round: [
          { $multiply: [{ $divide: ["$score", "$maxScore"] }, 10] },
          1
        ]
      }
    }
  },
  {
    $sort: { grade: -1 }
  },
  {
    $limit: 10
  }
])
```

**Result:** Only passing students (score ≥ 60) appear, ranked from highest to lowest grade, showing a computed 0–10 scale score.

---

## Document Before and After `$lookup`

**Before `$lookup` — exam_results document:**

```json
{
  "_id": "69dd1617...",
  "profileId": "69dd15ce...",
  "examName": "Examen de Filosofía",
  "examType": "filosofia",
  "score": 8,
  "maxScore": 10
}
```

**After `$lookup` + `$unwind` + `$project`:**

```json
{
  "studentName": "Luis Hernandez",
  "school": "ITAM",
  "grade": "4to Semestre",
  "examName": "Examen de Filosofía",
  "score": 8,
  "maxScore": 10
}
```

---

## Complications We Had

### Empty arrays in `$lookup`
When we first ran Pipeline 4, some results came back with an empty `studentInfo` array. The cause was a type mismatch — some `profileId` values were stored as strings instead of ObjectId. We fixed the seed data and re-ran the queries.

### Forgetting `$unwind`
Without `$unwind`, the joined data comes back as an array inside the document. You cannot access `studentInfo.name` directly — you get `studentInfo[0].name` instead. Always add `$unwind` after `$lookup`.

### Stage order matters
Putting `$sort` before `$match` makes MongoDB process all documents before filtering. Always put `$match` as early as possible to reduce the number of documents going through the rest of the pipeline.

---

## How `$lookup` Compares to SQL JOIN

| | MongoDB `$lookup` | SQL `JOIN` |
|---|---|---|
| Syntax | Pipeline stage with `from`, `localField`, `foreignField` | `JOIN table ON condition` |
| Result format | Adds an **array** to the document | Adds flat columns to the row |
| Flatten result | Need `$unwind` | Not needed |
| Multiple matches | Returns all matches in the array | Returns multiple rows |
| Performance | Better with indexes on join fields | Better with indexed foreign keys |

---

## Conclusion

The Aggregation Pipeline is far more powerful than a simple `find()`. By combining `$lookup`, `$project`, `$sort`, and `$limit` in a single pipeline, we can produce clean, formatted reports ready for the UI — without any extra processing in the Node.js layer.

The key lesson from this sprint is that **`$lookup` + `$unwind` = SQL JOIN** in MongoDB, and stage order always matters for performance.

---

_Project: Exam Manager App | Subject: NoSQL Databases | S15: May 25–29_
