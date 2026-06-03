# 🛠️ Troubleshooting Guide — Exam Manager

[![Project](https://img.shields.io/badge/project-Exam_Manager-378ADD)](.)
[![Stack](https://img.shields.io/badge/stack-MongoDB_Atlas_·_Compass_·_Node.js-1D9E75)](.)
[![Status](https://img.shields.io/badge/status-living_document-BA7517)](.)

> This is a **living document**. Every time a new error is solved, it must be added here with its solution before closing the fix. Last updated by: `___________`

---

## 📌 Table of Contents

1. [How to Report a Bug](#-how-to-report-a-bug)
2. [Atlas Connection Errors](#-atlas-connection-errors)
3. [MongoDB Compass Errors](#-mongodb-compass-errors)
4. [Documentation Errors](#-documentation-errors)
5. [Git & GitHub Errors](#-git--github-errors)
6. [Bug Tracker](#-bug-tracker)

---

## 🐛 How to Report a Bug

Before adding a new entry, answer these four questions:

```
1. What were you trying to do?
2. What did you expect to happen?
3. What actually happened? (paste the exact error message)
4. What fixed it?
```

Then add it to the [Bug Tracker](#-bug-tracker) table at the bottom with status `✅ Solved` or `🔴 Open`.

---

## 🔌 Atlas Connection Errors

---

### ERR-001 — `MongoServerError: bad auth`

**Symptom**
```
MongoServerError: bad auth : Authentication failed.
```

**Cause**
The username or password in the connection string is wrong, or the database user has not been created in Atlas.

**Fix**
1. Go to **Atlas → Database Access → Database Users**
2. Confirm the user exists and note the exact username
3. Click **Edit** → set a new password (avoid special characters like `@`, `#`, `!`)
4. Update your `.env` file:
   ```env
   MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/exam_db
   ```
5. Restart the server: `npm run dev`

> 🔒 Never paste your real `MONGO_URI` in this file or any committed file.

---

### ERR-002 — `MongooseServerSelectionError: Could not connect`

**Symptom**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```
or
```
MongooseServerSelectionError: connection timed out
```

**Cause**
Atlas is blocking your IP address. Atlas only allows whitelisted IPs by default.

**Fix**
1. Go to **Atlas → Network Access → IP Access List**
2. Click **Add IP Address**
3. Choose **Allow Access from Anywhere** (`0.0.0.0/0`) for development, or add your specific IP
4. Wait ~30 seconds for the change to propagate
5. Retry the connection

> ⚠️ For production, never use `0.0.0.0/0`. Restrict to your server's IP.

---

### ERR-003 — `URI must include hostname`

**Symptom**
```
Error: URI must include hostname, domain name, and tld
```

**Cause**
The `MONGO_URI` variable in `.env` is empty, malformed, or not being loaded.

**Fix**
1. Confirm `.env` exists at the project root (not inside `/src` or `/lib`)
2. Confirm the file contains exactly:
   ```env
   MONGO_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/exam_db
   PORT=3000
   ```
3. Confirm your entry file loads dotenv **before** connecting:
   ```js
   require('dotenv').config(); // must be line 1
   const mongoose = require('mongoose');
   ```
4. Confirm `.env` is listed in `.gitignore`:
   ```
   .env
   ```

---

### ERR-004 — `querySrv ENOTFOUND`

**Symptom**
```
MongooseServerSelectionError: querySrv ENOTFOUND _mongodb._tcp.cluster0.xxxxx.mongodb.net
```

**Cause**
No internet connection, or the cluster hostname is incorrect.

**Fix**
1. Check your internet connection
2. Copy the connection string directly from Atlas:
   - **Atlas → Database → Connect → Compass / Drivers**
   - Select **Node.js** driver, version **4.1 or later**
3. Replace `<password>` with your actual password (no angle brackets)
4. Paste into `.env` and restart

---

### ERR-005 — Compass shows "Connection refused" on `localhost`

**Symptom**
MongoDB Compass tries to connect to `localhost:27017` and fails.

**Cause**
You are not running a local MongoDB instance — the project uses **Atlas (cloud)**, not a local server.

**Fix**
1. Open Compass
2. Click **New Connection**
3. Paste your Atlas connection string (from `.env` or directly from Atlas dashboard)
4. Click **Connect**

> 💡 You do not need a local MongoDB installation for this project.

---

### ERR-006 — `.env` values are `undefined` at runtime

**Symptom**
```
TypeError: Cannot read properties of undefined (reading 'split')
```
or `MONGO_URI` prints as `undefined` in console.

**Cause**
`dotenv` is not installed, or the `.env` file has extra spaces or quotes around values.

**Fix**
1. Install dotenv if missing:
   ```bash
   npm install dotenv
   ```
2. Check `.env` for formatting issues:
   ```env
   # WRONG
   MONGO_URI = "mongodb+srv://..."   <- no spaces, no quotes

   # CORRECT
   MONGO_URI=mongodb+srv://...
   ```
3. Confirm `require('dotenv').config()` is the **first line** of your entry file

---

## 🧭 MongoDB Compass Errors

---

### ERR-007 — Collection shows 0 documents after `insertMany`

**Symptom**
You ran `insertMany` but the collection appears empty in Compass.

**Cause**
You may be looking at a different database or collection name, or the insert failed silently.

**Fix**
1. In Compass, confirm you are on the correct database (`exam_db`) and collection (`profiles` or `examresults`)
2. Click the **Refresh** button (top right of the collection view)
3. Check the Compass shell output for any error after running the insert
4. Verify your JSON file is valid at [jsonlint.com](https://jsonlint.com) before inserting

---

### ERR-008 — `SyntaxError` when running `.mongodb` script in Compass

**Symptom**
```
SyntaxError: Unexpected token
```

**Cause**
The `.mongodb` script has a JSON formatting error — a missing comma, bracket, or trailing comma.

**Fix**
1. Copy the JSON portion of your query into [jsonlint.com](https://jsonlint.com)
2. Fix the highlighted error
3. Common mistakes:
   ```js
   // WRONG — trailing comma
   db.profiles.find({ email: "test@gmail.com", })

   // CORRECT
   db.profiles.find({ email: "test@gmail.com" })
   ```

---

## 📄 Documentation Errors

---

### ERR-009 — Mermaid diagram not rendering on GitHub

**Symptom**
The diagram in `docs/schema.mmd` shows as raw text on GitHub instead of a visual diagram.

**Cause**
The file must be embedded inside a Markdown code block with the `mermaid` language tag to render on GitHub.

**Fix**
In any `.md` file, wrap the diagram like this:

````markdown
```mermaid
erDiagram
    PROFILE {
        ObjectId _id
        string name
        string email
        string school
        string grade
    }
    EXAMRESULT {
        ObjectId _id
        ObjectId profileId
        string examName
        string examType
        number score
        number maxScore
        date date
    }
    PROFILE ||--o{ EXAMRESULT : "has"
```
````

> The `.mmd` file is for the Mermaid CLI. For GitHub rendering, use the code block approach inside any `.md` file.

---

### ERR-010 — `dictionary.md` fields do not match actual collection

**Symptom**
The data dictionary describes fields that do not exist in the actual documents, or vice versa.

**Cause**
The schema evolved during development without updating the documentation.

**Fix**
1. Open Compass and inspect an actual document from the collection
2. Compare each field against `docs/dictionary.md`
3. Update the dictionary to match reality — not the other way around
4. Use this format for each field:

| Field | BSON Type | Required | Description | Example |
|-------|-----------|----------|-------------|---------|
| `_id` | ObjectId | Yes | Auto-generated unique identifier | `64abc123...` |
| `profileId` | ObjectId | Yes | Reference to the student's profile | `64abc456...` |
| `examType` | String | Yes | Type: `multiple-choice`, `open-ended`, `matching` | `"multiple-choice"` |
| `score` | Number | Yes | Raw score obtained | `8` |
| `maxScore` | Number | Yes | Maximum possible score | `10` |
| `date` | Date | Yes | ISO 8601 timestamp of submission | `2025-03-15T10:30:00Z` |

---

## 🔀 Git & GitHub Errors

---

### ERR-011 — Accidentally committed `.env`

**Symptom**
`.env` appears in `git status` or is visible on GitHub.

**Cause**
`.gitignore` was not set up before the first commit, or `.env` was force-added.

**Fix**
```bash
# 1. Remove .env from Git tracking (keeps the local file)
git rm --cached .env

# 2. Confirm .gitignore contains .env
echo ".env" >> .gitignore

# 3. Commit the fix
git add .gitignore
git commit -m "fix: remove .env from tracking"
git push
```

> ⚠️ If `.env` was already pushed with real credentials, **rotate your Atlas password immediately** in Atlas → Database Access.

---

### ERR-012 — `git push` rejected: "non-fast-forward"

**Symptom**
```
! [rejected] main -> main (non-fast-forward)
error: failed to push some refs
```

**Cause**
Someone else pushed to `main` after your last `git pull`.

**Fix**
```bash
git pull origin main   # pull the latest changes first
git push origin main   # then push yours
```

---

## 📊 Bug Tracker

> Update this table every time a new bug is found or resolved.

| ID | Found by | Week | Category | Short description | Status | Fixed by | Fix commit |
|----|----------|------|----------|-------------------|--------|----------|------------|
| ERR-001 | | | Atlas Auth | Bad auth on connection | ⬜ Open | | |
| ERR-002 | | | Atlas Network | IP not whitelisted | ⬜ Open | | |
| ERR-003 | | | Atlas Config | MONGO_URI undefined | ⬜ Open | | |
| ERR-004 | | | Atlas DNS | querySrv ENOTFOUND | ⬜ Open | | |
| ERR-005 | | | Compass | Connecting to localhost instead of Atlas | ⬜ Open | | |
| ERR-006 | | | dotenv | .env values undefined at runtime | ⬜ Open | | |
| ERR-007 | | | Compass | 0 documents after insertMany | ⬜ Open | | |
| ERR-008 | | | MQL Script | SyntaxError in .mongodb file | ⬜ Open | | |
| ERR-009 | | | Docs | Mermaid not rendering on GitHub | ⬜ Open | | |
| ERR-010 | | | Docs | dictionary.md out of sync | ⬜ Open | | |
| ERR-011 | | | Git | .env accidentally committed | ⬜ Open | | |
| ERR-012 | | | Git | Push rejected non-fast-forward | ⬜ Open | | |

**Status legend:** &nbsp; ⬜ Open &nbsp;|&nbsp; 🔄 In Progress &nbsp;|&nbsp; ✅ Solved &nbsp;|&nbsp; ❌ Won't Fix

---

<div align="center">

Troubleshooting guide for **Exam Manager** — NoSQL Course · 2025
<br>
Found a new error? Add it here before closing your fix. 🔧

</div>
