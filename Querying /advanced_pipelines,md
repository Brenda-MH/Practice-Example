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
//       from: "profiles",           -- the collection to join (like the right table)
//       localField: "profileId",    -- field in exam_results (like the FK)
//       foreignField: "_id",        -- field in profiles (like the PK)
//       as: "studentInfo"           -- name for the joined array result
//   }}
//
// Key difference: $lookup returns an ARRAY, not a flat row.
// You need $unwind (or array index) to flatten it.
// ------------------------------------------------------------


// ============================================================
// PIPELINE 1 — $project
// Show only the fields we need, rename them, and add a
// computed boolean field "passed" (score >= 60).
// ============================================================
db.exam_results.aggregate([

  // Step 1: Keep only the fields we want in the output.
  // 1 = include, 0 = exclude.
  // We can also rename fields and compute new ones here.
  {
    $project: {
      _id: 0,                        // hide the internal ID
      examName: 1,                   // keep exam name as-is
      examType: 1,                   // keep exam type as-is
      score: 1,                      // keep score
      maxScore: 1,                   // keep max score
      passed: {                      // NEW computed field
        $gte: ["$score", 60]         // true if score >= 60, false otherwise
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
// Rank exam results from highest score to lowest.
// ============================================================
db.exam_results.aggregate([

  // Step 1: Sort all documents by score descending (highest first).
  // Use 1 for ascending (A→Z, 0→9), -1 for descending (Z→A, 9→0).
  {
    $sort: { score: -1 }
  },

  // Step 2: Show only the relevant fields in the output.
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
// Get only the top 5 results (useful for leaderboards).
// ============================================================
db.exam_results.aggregate([

  // Step 1: Sort by score highest to lowest.
  {
    $sort: { score: -1 }
  },

  // Step 2: Keep only the first 5 documents that passed the sort.
  // Everything after position 5 is discarded.
  {
    $limit: 5
  },

  // Step 3: Project clean output.
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
// Join exam_results with profiles to get the student's name.
//
// This is the MongoDB answer to:
// "I need to join data from 'users' to 'orders'."
// In our case: join 'profiles' (users) to 'exam_results' (orders).
// ============================================================
db.exam_results.aggregate([

  // Step 1: Perform the join.
  // $lookup searches the "profiles" collection for documents
  // where profiles._id matches exam_results.profileId.
  // The matched profile(s) are added as an array called "studentInfo".
  {
    $lookup: {
      from: "profiles",          // collection to join
      localField: "profileId",   // field in exam_results
      foreignField: "_id",       // field in profiles
      as: "studentInfo"          // name of the output array
    }
  },

  // Step 2: $unwind flattens the "studentInfo" array into a single object.
  // Without this, studentInfo is [ { name: "...", school: "..." } ] (array).
  // After $unwind, it becomes { name: "...", school: "..." } (object).
  {
    $unwind: "$studentInfo"
  },

  // Step 3: Project only the fields we want to show.
  // We can access joined fields with "studentInfo.fieldName".
  {
    $project: {
      _id: 0,
      studentName: "$studentInfo.name",    // field from joined collection
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
// Combines all four stages: $lookup + $project + $sort + $limit
// This is the pipeline connected to the /api/reports endpoint.
// ============================================================
db.exam_results.aggregate([

  // Step 1: Join exam_results with profiles.
  {
    $lookup: {
      from: "profiles",
      localField: "profileId",
      foreignField: "_id",
      as: "studentInfo"
    }
  },

  // Step 2: Flatten the joined array into a single document.
  {
    $unwind: "$studentInfo"
  },

  // Step 3: Keep only passed exams (score >= 60).
  {
    $match: {
      score: { $gte: 60 }
    }
  },

  // Step 4: Transform and rename fields for clean UI output.
  {
    $project: {
      _id: 0,
      studentName: "$studentInfo.name",
      school: "$studentInfo.school",
      examName: 1,
      score: 1,
      maxScore: 1,
      grade: {
        // Compute a 0-10 grade from score/maxScore
        $round: [
          { $multiply: [{ $divide: ["$score", "$maxScore"] }, 10] },
          1
        ]
      }
    }
  },

  // Step 5: Sort by computed grade descending.
  {
    $sort: { grade: -1 }
  },

  // Step 6: Return only the top 10 results.
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
