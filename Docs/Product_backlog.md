# Product Backlog – Quiz & Exam Platform

## Product Goal

Develop a platform that allows students and teachers to create, manage, and complete quizzes and exams efficiently, while providing analytics, grading tools, and performance reports to improve the learning process.

---

# Epic 1: Quiz and Exam Management

## User Story US-QEP-01-01 – Create Quizzes and Exams

**As a** teacher  
**I want** to create quizzes and exams with custom questions  
**So that** I can evaluate student knowledge effectively.

### Acceptance Criteria

#### Scenario 1: Add questions to an exam

```gherkin
Given the teacher is creating an exam
When the teacher adds questions and saves the exam
Then the system must store the questions correctly
```

#### Scenario 2: Define question types

```gherkin
Given the teacher is creating a question
When the teacher selects a question type
Then the system must allow formats such as multiple choice and true or false
```

#### Scenario 3: Save exam configuration

```gherkin
Given the exam contains questions and settings
When the teacher saves the exam
Then the system must keep all configurations available for future use
```

---

## User Story US-QEP-01-02 – Edit Existing Exams

**As a** teacher  
**I want** to edit existing quizzes and exams  
**So that** I can update their content when needed.

### Acceptance Criteria

#### Scenario 1: Modify questions

```gherkin
Given an existing exam is available
When the teacher edits a question
Then the system must save the updated information correctly
```

#### Scenario 2: Remove questions

```gherkin
Given an exam contains multiple questions
When the teacher deletes a question
Then the system must remove it without affecting the remaining questions
```

#### Scenario 3: Update exam settings

```gherkin
Given the teacher wants to change exam settings
When the teacher updates the configuration
Then the system must apply the new settings immediately
```

---

## User Story US-QEP-01-03 – Publish Exams

**As a** teacher  
**I want** to publish quizzes and exams for students  
**So that** students can complete them online.

### Acceptance Criteria

#### Scenario 1: Publish an exam

```gherkin
Given the exam is fully configured
When the teacher publishes the exam
Then the system must make it available to students
```

#### Scenario 2: Restrict unpublished exams

```gherkin
Given an exam has not been published
When students access the platform
Then the unpublished exam must not be visible
```

#### Scenario 3: Set availability dates

```gherkin
Given the teacher defines start and end dates
When the exam is published
Then the system must only allow access during the configured period
```

---

# Epic 2: Student Assessment Experience

## User Story US-QEP-02-01 – Complete Quizzes and Exams

**As a** student  
**I want** to complete quizzes and exams online  
**So that** I can submit my answers digitally.

### Acceptance Criteria

#### Scenario 1: Access assigned exams

```gherkin
Given a student has assigned exams
When the student enters the platform
Then the system must display all available exams
```

#### Scenario 2: Submit answers

```gherkin
Given the student has answered the questions
When the student submits the exam
Then the system must save all responses successfully
```

#### Scenario 3: Prevent multiple submissions

```gherkin
Given the student already submitted the exam
When the student tries to submit again
Then the system must block additional submissions
```

---

## User Story US-QEP-02-02 – View Remaining Time

**As a** student  
**I want** to see the remaining exam time  
**So that** I can manage my progress efficiently.

### Acceptance Criteria

#### Scenario 1: Display timer

```gherkin
Given the student starts an exam
When the exam page loads
Then the system must display the remaining time clearly
```

#### Scenario 2: Update time automatically

```gherkin
Given the exam is in progress
When time passes
Then the timer must update automatically in real time
```

#### Scenario 3: End exam automatically

```gherkin
Given the exam time expires
When the timer reaches zero
Then the system must submit the exam automatically
```

---

## User Story US-QEP-02-03 – Receive Exam Results

**As a** student  
**I want** to receive my exam results  
**So that** I can understand my performance.

### Acceptance Criteria

#### Scenario 1: Display final score

```gherkin
Given the exam has been graded
When the student opens the results section
Then the system must display the final score
```

#### Scenario 2: Show correct and incorrect answers

```gherkin
Given the results are available
When the student reviews the exam
Then the system must identify correct and incorrect responses
```

#### Scenario 3: Keep results available

```gherkin
Given the student completed the exam
When the student accesses the platform later
Then the results must remain accessible
```

---

# Epic 3: Reports and Analytics

## User Story US-QEP-03-01 – Generate Performance Reports

**As a** teacher  
**I want** to generate student performance reports  
**So that** I can analyze learning progress.

### Acceptance Criteria

#### Scenario 1: Generate class report

```gherkin
Given completed exams are available
When the teacher generates a report
Then the system must display student scores and averages
```

#### Scenario 2: Filter report data

```gherkin
Given multiple exams exist
When the teacher applies filters
Then the system must show only the selected information
```

#### Scenario 3: Export reports

```gherkin
Given a report is generated
When the teacher exports the report
Then the system must download the file successfully
```

---

## User Story US-QEP-03-02 – View Exam Statistics

**As a** teacher  
**I want** to view exam statistics  
**So that** I can identify strengths and weaknesses in student performance.

### Acceptance Criteria

#### Scenario 1: Show average score

```gherkin
Given students completed an exam
When the teacher opens the statistics section
Then the system must display the average score
```

#### Scenario 2: Show completion rate

```gherkin
Given students were assigned an exam
When the teacher checks the analytics
Then the system must display the completion percentage
```

#### Scenario 3: Identify difficult questions

```gherkin
Given exam results are available
When the teacher reviews question analytics
Then the system must highlight questions with low success rates
```

---

## User Story US-QEP-03-03 – Manage User Accounts

**As an** administrator  
**I want** to manage user accounts  
**So that** I can control platform access and permissions.

### Acceptance Criteria

#### Scenario 1: Create accounts

```gherkin
Given a new user requires access
When the administrator creates an account
Then the system must store the user information correctly
```

#### Scenario 2: Assign user roles

```gherkin
Given different types of users exist
When the administrator assigns a role
Then the system must apply the correct permissions
```

#### Scenario 3: Disable accounts

```gherkin
Given a user account is no longer active
When the administrator disables the account
Then the system must prevent future access
```

