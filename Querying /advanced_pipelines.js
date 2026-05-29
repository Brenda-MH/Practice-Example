// ============================================================
// queries/agg_02_reports.mongodb
// Sprint 15 — Advanced Aggregation Pipelines
// Topic: $project, $sort, $limit, $lookup
// Period: May 25–29, 2026
// Team: Exam Manager — Base de Datos NoSQL
// ============================================================

// ------------------------------------------------------------
// CONTEXT: How $lookup compares to a SQL JOIN
// ------------------------------------------------------------
//
// In SQL you join two tables like this:
//
//   SELECT profiles.name, exam_results.score
//   FROM exam_results
//   JOIN profiles ON exam_results.profileId = profiles._id;
//
// In MongoDB, $lookup does the same thing inside a pipeline:
//
//   { $lookup: {
//       from: "profiles",
//       localField: "profileId",
//       foreignField: "_id",
//       as: "studentInfo"
//   }}
//
// Key difference: $lookup returns an ARRAY, not a flat row.
// You need $unwind to flatten it.
// ------------------------------------------------------------


// ============================================================
// PIPELINE 1 — $project
// ============================================================
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

// SQL equivalent:
//   SELECT examName, examType, score, maxScore,
//          CASE WHEN score >= 60 THEN true ELSE false END AS passed
//   FROM exam_results;


// ============================================================
// PIPELINE 2 — $sort
// ============================================================
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

// SQL equivalent:
//   SELECT examName, score, maxScore
//   FROM exam_results
//   ORDER BY score DESC;


// ============================================================
// PIPELINE 3 — $limit
// ============================================================
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

// SQL equivalent:
//   SELECT examName, score, maxScore
//   FROM exam_results
//   ORDER BY score DESC
//   LIMIT 5;


// ============================================================
// PIPELINE 4 — $lookup
// ============================================================
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

// SQL equivalent:
//   SELECT p.name AS studentName, p.school, p.grade,
//          er.examName, er.score, er.maxScore
//   FROM exam_results er
//   JOIN profiles p ON er.profileId = p._id;


// ============================================================
// PIPELINE 5 — Full Formatted Report (for UI)
// ============================================================
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

// SQL equivalent:
//   SELECT p.name AS studentName, p.school, er.examName,
//          er.score, er.maxScore,
//          ROUND((er.score / er.maxScore) * 10, 1) AS grade
//   FROM exam_results er
//   JOIN profiles p ON er.profileId = p._id
//   WHERE er.score >= 60
//   ORDER BY grade DESC
//   LIMIT 10;
