# S14 — Aggregation Pipeline Introduction in MongoDB

**Course:** NoSQL Databases  
**Week:** 18–22  
**Collection used:** `profiles` (database `examapp`)  
**Operators covered:** `$match`, `$group`, `$count`

---

## 1. Operators Used

### `$match`
Filters documents based on a condition, similar to `WHERE` in SQL. It is always recommended to place it at the beginning of the pipeline to reduce the number of documents being processed in later stages.

### `$group`
Groups documents by a specific field and allows the use of accumulators such as `$sum`, `$avg`, `$min`, and `$max`. Similar to `GROUP BY` in SQL.

### `$count`
Counts the number of documents that reach that stage in the pipeline and returns a single document with the result.

---

## 2. Queries Performed

### 2.1 Total count of profiles

```js
db.profiles.aggregate([
  { $count: "total_profiles" }
]);
```

Returns the total number of documents in the collection.

---

### 2.2 Filter profiles by school (`$match`)

```js
db.profiles.aggregate([
  { $match: { school: "UNAM" } }
]);
```

Returns only the documents where `school` equals `"UNAM"`. During testing, **8 documents** were returned.

---

### 2.3 Count how many students belong to UNAM

```js
db.profiles.aggregate([
  { $match: { school: "UNAM" } },
  { $count: "total_unam" }
]);
```

First filters by school, then counts the resulting documents.

---

### 2.4 Group students by school

```js
db.profiles.aggregate([
  {
    $group: {
      _id: "$school",
      total_students: { $sum: 1 }
    }
  }
]);
```

Groups all documents by the `school` field and counts how many belong to each group.

---

### 2.5 Sum of exam attempts per school

```js
db.profiles.aggregate([
  {
    $group: {
      _id: "$school",
      total_attempts: { $sum: "$examAttempts" },
      num_students: { $sum: 1 }
    }
  }
]);
```

In addition to counting students, it sums the `examAttempts` field per institution.

---

### 2.6 Combined pipeline: attempts by grade at IPN

```js
db.profiles.aggregate([
  { $match: { school: "IPN" } },
  {
    $group: {
      _id: "$grade",
      total_attempts: { $sum: "$examAttempts" },
      num_students: { $sum: 1 }
    }
  }
]);
```

Filters by `"IPN"` first, then groups by `grade`. This is the most common and efficient pattern in real-world pipelines.

---

### 2.7 Full pipeline: distinct grades at UNAM

```js
db.profiles.aggregate([
  { $match: { school: "UNAM" } },
  { $group: { _id: "$grade" } },
  { $count: "distinct_grades" }
]);
```

Chains all three operators: filters, groups to get unique values, then counts them.

**Result obtained:** 7 distinct grade groups were found within UNAM.

---

## 3. AI Support During the Practice

Throughout this session, AI was used as a support tool with a guided approach rather than providing direct answers. The key moments are described below:

### Guidance without giving the solution directly
When the full pipeline was attempted in the wrong tab in Atlas, the AI did not immediately provide the correct command. Instead, it first **explained why it was failing** (the Documents tab only accepts `find()`-style filters), then **pointed toward the correct tab** (Aggregations), allowing the user to discover the workflow on their own.

### Syntax error correction
When the Aggregations editor displayed the default commented template (`/** query: The query in MQL */`) and the user was unsure what to keep, the AI indicated what to delete without rewriting everything, encouraging the user to understand the editor's structure.

### Error diagnosis
Upon receiving the error message `unknown top level operator: $count`, the AI quickly identified that the issue was not the query itself but the **wrong execution context**, and guided the user to the correct environment.

---

## 4. Complications Encountered

### 4.1 Confusion between the Documents and Aggregations tabs
MongoDB Atlas has two separate tabs for queries, and it is not immediately obvious for new users which one to use in each case. The Documents tab only accepts simple filter objects, while the Aggregations tab accepts full pipelines broken down by stages.

### 4.2 Aggregations editor syntax
Each stage editor in Atlas comes with a commented template that can be confusing. The user must **delete the existing content** and write only the stage object, without wrapping it in `[]` or using `db.collection.aggregate()`.

### 4.3 Case-sensitive field names
MongoDB differentiates between `examAttempts` and `examattempts`. If the field name does not exactly match the one in the document, the result will be `null` or `0` with no error shown.

---

## 5. Bugs and Errors Logged

| Error | Cause | Solution |
|-------|-------|----------|
| `unknown top level operator: $count` | Pipeline was run in the Documents tab | Switch to the Aggregations tab |
| `Sample of 0 documents` | Editor still had the default template without being cleared | Delete everything and leave only the stage object |
| Pipeline with no results | Incorrect field name or mismatched value casing (`"unam"` vs `"UNAM"`) | Verify exact values in the documents |
| Stage 2 with no output | Forgot to select the operator (`$group`) from the dropdown | Select the operator before writing the object |

---

## 6. Conclusion

MongoDB's **Aggregation Pipeline** is an essential tool for data analysis in NoSQL collections. Unlike `find()`, it allows complex operations such as groupings, sums, and counts across multiple chained stages.

Throughout this practice, the following key lessons were learned:

- `$match` should always go first whenever possible to reduce data volume in later stages.
- `$group` always requires the `_id` field as the group identifier.
- `$count` is a terminal stage: nothing useful can be chained after it.
- **MongoDB Atlas** clearly distinguishes between simple queries (Documents) and pipelines (Aggregations), and knowing which one to use is critical.

Using AI as support proved valuable not for obtaining direct answers, but for **diagnosing errors, understanding the environment**, and building knowledge progressively.

---

*Document generated as part of the S14 — Aggregation Intro activity.*
