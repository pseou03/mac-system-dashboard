# Mac System Dashboard — Complete Codex Task

## 0. Project Mission

Build a complete beginner-friendly macOS system-monitoring dashboard project from scratch.

The project starts as a **normal local folder that has NOT been initialized with Git yet**.

Local project directory:

```text
/Users/park/Documents/mac-system-dashboard
```

The project should demonstrate this complete engineering pipeline:

```text
macOS process information
        ↓
shell script
        ↓
structured CSV
        ↓
JavaScript
        ↓
HTML dashboard
        ↓
shared CSS
        ↓
filtering / metrics / charts
        ↓
local HTTP server
        ↓
daily automated collection
```

The project is also intended to demonstrate:

- Git
- GitHub
- HTML
- CSS
- shared CSS across multiple HTML files
- JavaScript
- shell scripting
- CSV
- HTTP/local web serving
- basic system monitoring
- macOS `launchd` automation
- engineering documentation

Do NOT skip directly to the final dashboard.

Build the project sequentially so Git history shows how the project evolved.

---

# 1. Important Rules

## Work Location

Work only inside:

```text
/Users/park/Documents/mac-system-dashboard
```

Do not modify unrelated files outside this project.

---

## GitHub Repository

The GitHub repository already exists online.

Repository name:

```text
mac-system-dashboard
```

https://github.com/pseou03/mac-system-dashboard.git
---

# 2. Security and Privacy Rules

The project collects real local process information.

Real process data may contain:

- username
- local filesystem paths
- running application names
- command arguments
- process names
- machine-specific information

Therefore:

```text
data/process_top20.csv
```

must NOT be committed to GitHub.

A sanitized example file will be committed instead:

```text
data/process_top20_sample.csv
```

Never commit:

```text
.env
API keys
passwords
access tokens
private credentials
real process CSV
.DS_Store
logs
```

Never:

- kill processes
- restart processes
- modify processes
- modify network configuration
- modify macOS security settings
- install unnecessary packages
- use `sudo` unless absolutely required

This project should only **read system information**.

---

# 3. Git Philosophy

Each major learning step must have its own Git commit.

The desired history should approximately be:

```text
chore: initialize project
feat: add basic HTML page
feat: add internal CSS styling
feat: add multiple pages with shared stylesheet
feat: add macOS process collection script
feat: export top process data as CSV
feat: load process CSV with JavaScript
feat: build system dashboard interface
feat: add dashboard filtering and metrics
feat: add interactive process charts
feat: add local dashboard server
feat: add daily process collection automation
docs: document complete dashboard workflow
```

Do not combine all work into one commit.

After each successful step:

```bash
git status
git diff
git add <relevant files>
git commit -m "<specified message>"
```

Push when the GitHub remote is available:

```bash
git push
```

Do not claim that a push succeeded unless Git confirms it.

---

# PHASE A — INITIALIZE THE PROJECT

# STEP 0 — Turn the Normal Folder Into a Git Repository

Start here:

```bash
cd /Users/park/Documents/mac-system-dashboard
```

Verify:

```bash
pwd
ls -la
```

The directory may contain `TASK.md` but may otherwise be empty.

Check Git:

```bash
git status
```

If Git returns:

```text
fatal: not a git repository
```

this is expected.

Initialize Git:

```bash
git init
```

Set the main branch:

```bash
git branch -M main
```

Verify:

```bash
git branch --show-current
```

Expected:

```text
main
```

---

# STEP 0.1 — Configure GitHub Remote

Check:

```bash
git remote -v
```

If there is no `origin` and the GitHub URL has been provided:

```bash
git remote add origin GITHUB_REPOSITORY_URL
```

Verify:

```bash
git remote -v
```

Do not overwrite an existing remote without inspecting it first.

If an incorrect origin already exists, report the mismatch before modifying it.

---

# STEP 0.2 — Create `.gitignore`

Create:

```text
.gitignore
```

with:

```gitignore
.DS_Store
.env
*.log

data/process_top20.csv

__pycache__/
*.pyc
```

---

# STEP 0.3 — Create Initial README

Create:

```text
README.md
```

Initial content should explain:

```text
Mac System Dashboard
```

Purpose:

Build a macOS process-monitoring pipeline and interactive dashboard while learning system engineering, frontend development, automation, Git, and GitHub.

Include this architecture:

```text
macOS
↓
Shell Script
↓
CSV
↓
JavaScript
↓
HTML + CSS
↓
Dashboard
↓
Automation
```

---

# STEP 0.4 — Initial Commit

Stage:

```bash
git add README.md .gitignore TASK.md
```

If `TASK.md` should remain private and the user has specifically requested not to commit it, leave it unstaged.

Otherwise include it so the engineering specification is visible in Git history.

Commit:

```bash
git commit -m "chore: initialize project"
```

If the remote exists:

```bash
git push -u origin main
```

If push authentication fails, preserve the local commit and continue local work.

---

# PHASE B — HTML AND CSS FOUNDATIONS

# STEP 1 — Basic HTML Without CSS

## Goal

Learn pure HTML structure before styling.

Create:

```text
learning/step1.html
```

Create the `learning` directory if necessary.

The HTML must contain:

- `<!DOCTYPE html>`
- `<html lang="ko">`
- UTF-8 charset
- `<title>`
- `<h1>`
- `<p>`
- `<ul>`
- `<li>`
- `<a>`

Content:

```text
Mac System Dashboard
```

Description:

```text
A learning project for collecting macOS system information and displaying it in a dashboard.
```

Create links:

```text
Naver → https://www.naver.com
Google → https://www.google.co.kr
```

No CSS.

No JavaScript.

No `<style>`.

Test on macOS if graphical session is available:

```bash
open learning/step1.html
```

Verify source manually.

Commit:

```bash
git add learning/step1.html
git commit -m "feat: add basic HTML page"
git push
```

---

# STEP 2 — Add CSS Inside HTML

Create:

```text
learning/step2.html
```

Do not modify `step1.html`.

Add `<style>` inside `<head>`.

Practice:

- `background-color`
- `color`
- `font-family`
- `padding`
- `margin`
- `border`
- `border-radius`
- link styling
- simple card styling

Include:

```text
Mac System Dashboard
Overview
Processes
```

Add at least one preview card such as:

```text
Processes
20
```

Keep CSS simple and readable.

Verify:

```bash
open learning/step2.html
```

Commit:

```bash
git add learning/step2.html
git commit -m "feat: add internal CSS styling"
git push
```

---

# STEP 3 — Multiple HTML Pages Sharing One CSS File

## Goal

Practice separating HTML structure from CSS presentation.

Create:

```text
pages/
assets/css/
```

Create:

```text
pages/overview.html
pages/processes.html
pages/about.html
assets/css/style.css
```

Every page must include:

```html
<link rel="stylesheet" href="../assets/css/style.css">
```

All pages must use the SAME stylesheet.

Do not duplicate large CSS blocks in individual HTML pages.

---

## Navigation

Each page should include navigation links for:

```text
Overview
Processes
About
```

Pages must link to each other.

---

## `overview.html`

Include:

- title
- dashboard description
- navigation
- placeholder metric cards

Suggested cards:

```text
Total Processes
Highest CPU
Average Memory
Last Updated
```

Use placeholder values for now.

---

## `processes.html`

Include:

- navigation
- page heading
- placeholder table

Columns:

```text
PID
PPID
Process
CPU %
Memory %
Elapsed
User
```

---

## `about.html`

Explain the learning architecture:

```text
macOS
↓
Shell
↓
CSV
↓
JavaScript
↓
Dashboard
```

---

## Shared CSS

`assets/css/style.css` should style:

- body
- navigation
- sidebar/header
- links
- cards
- containers
- tables
- buttons
- responsive basic layout

Verify all three pages share the same visual style.

Commit:

```bash
git add pages assets/css
git commit -m "feat: add multiple pages with shared stylesheet"
git push
```

---

# PHASE C — SYSTEM DATA COLLECTION

# STEP 4 — Collect macOS Processes

Create:

```text
scripts/collect_processes_mac.sh
```

Use native macOS utilities.

Primary commands may include:

```bash
ps
date
awk
sort
head
```

The script must only inspect processes.

Collect:

```text
PID
PPID
CPU %
Memory %
Elapsed time
User
Command
```

Add current collection timestamp.

Sort by CPU usage descending.

Return only the top 20 processes.

Use comments:

```bash
# 1. Information collection
# 2. Sorting and top-20 selection
# 3. Output
```

Make executable:

```bash
chmod +x scripts/collect_processes_mac.sh
```

Check syntax:

```bash
bash -n scripts/collect_processes_mac.sh
```

Run:

```bash
./scripts/collect_processes_mac.sh
```

Verify roughly 20 results.

Commit:

```bash
git add scripts/collect_processes_mac.sh
git commit -m "feat: add macOS process collection script"
git push
```

---

# STEP 5 — Export Top 20 Processes to CSV

Create directory:

```text
data/
```

Modify:

```text
scripts/collect_processes_mac.sh
```

so it writes:

```text
data/process_top20.csv
```

Required CSV header:

```csv
collected_at,pid,ppid,cpu_percent,memory_percent,elapsed,user,command
```

Every row must contain the same timestamp for that collection run.

Maximum:

```text
1 header
+
20 process rows
=
21 lines
```

Properly CSV-escape:

- commas
- double quotes
- command strings

Example conceptual record:

```csv
2026-09-11 09:00:00,1234,1,28.4,4.2,01:12:30,user,"Example Process"
```

---

## Create Sample Data

Create:

```text
data/process_top20_sample.csv
```

Use fake/sanitized process data.

Example process names:

```text
Browser
CodeEditor
Terminal
SystemService
SampleWorker
MediaService
BackgroundAgent
```

Do NOT copy real local process records.

Verify:

```bash
./scripts/collect_processes_mac.sh
head data/process_top20.csv
wc -l data/process_top20.csv
git status
```

Ensure:

```text
data/process_top20.csv
```

does NOT appear as a file that will be committed.

Commit only:

```bash
git add scripts/collect_processes_mac.sh
git add data/process_top20_sample.csv
git add .gitignore
git commit -m "feat: export top process data as CSV"
git push
```

Never use:

```bash
git add -f data/process_top20.csv
```

---

# PHASE D — JAVASCRIPT DATA LAYER

# STEP 6 — Load CSV Using JavaScript

Create:

```text
assets/js/
```

Create:

```text
assets/js/csv.js
assets/js/app.js
```

The browser must load process information using:

```javascript
fetch(...)
```

Do not hardcode all process records directly into HTML.

Use:

```text
data/process_top20.csv
```

when available locally.

If real CSV is unavailable, provide a clear fallback mechanism to:

```text
data/process_top20_sample.csv
```

Do not silently hide loading errors.

---

## `csv.js`

Responsibility:

```text
CSV text
↓
parse
↓
JavaScript objects
```

Convert numeric fields to numbers:

```text
pid
ppid
cpu_percent
memory_percent
```

Handle quoted CSV values correctly.

---

## `app.js`

Responsibility:

- request data
- call CSV parser
- render data
- show loading state
- show errors

At this step, displaying the results in a simple table is enough.

Commit:

```bash
git add assets/js
git commit -m "feat: load process CSV with JavaScript"
git push
```

---

# PHASE E — BUILD THE REAL DASHBOARD

# STEP 7 — Dashboard Interface

Upgrade the project from learning pages to a practical dashboard.

Keep the learning files.

Create or enhance:

```text
index.html
pages/processes.html
pages/about.html
```

The root:

```text
index.html
```

will be the main dashboard.

Use shared CSS.

Recommended structure:

```text
mac-system-dashboard/
│
├── index.html
├── pages/
│   ├── processes.html
│   └── about.html
│
├── assets/
│   ├── css/
│   └── js/
│
├── data/
├── scripts/
└── docs/
```

---

## Dashboard Layout

Include a left sidebar with:

```text
Dashboard
Processes
About
```

Main dashboard should contain:

```text
System Engineer Dashboard

Last Updated
Total Processes
Highest CPU
Average CPU
Highest Memory
Average Memory

CPU Top Processes chart
Memory Top Processes chart

Process table
```

Use the CSV dynamically.

Do not hardcode metric values.

Commit:

```bash
git add index.html pages assets
git commit -m "feat: build system dashboard interface"
git push
```

---

# STEP 8 — Filters, Sorting, and Metrics

Create:

```text
assets/js/filters.js
assets/js/metrics.js
```

Add interactive controls.

Required:

### Search

Search by:

```text
process name
command
user
PID
```

### CPU Filter

Examples:

```text
All
> 1%
> 5%
> 10%
> 20%
```

### Memory Filter

Examples:

```text
All
> 1%
> 5%
> 10%
```

### Sorting

Allow:

```text
CPU descending
CPU ascending
Memory descending
PID
Process name
```

---

## Metrics

Calculate dynamically:

```text
Number of visible processes
Highest CPU
Average CPU
Highest memory
Average memory
Last collection timestamp
```

Whenever filters change:

```text
filters
↓
visible rows change
↓
metrics update
↓
charts update
```

Commit:

```bash
git add assets/js index.html pages
git commit -m "feat: add dashboard filtering and metrics"
git push
```

---

# STEP 9 — Interactive Charts

Create:

```text
assets/js/charts.js
```

Avoid unnecessary dependencies if possible.

Prefer native:

```text
HTML
CSS
JavaScript
SVG or Canvas
```

If an external library is used, document exactly why.

Charts required:

```text
Top 10 CPU Processes
Top 10 Memory Processes
```

Charts should respond to current filtering where practical.

Include:

- labels
- percentage values
- hover information if feasible
- accessible text alternatives or table values

Do not make the chart code dependent on Gemini.

Commit:

```bash
git add assets/js index.html assets/css
git commit -m "feat: add interactive process charts"
git push
```

---

# PHASE F — RUN AS A LOCAL WEB APPLICATION

# STEP 10 — Local HTTP Server

Because browser `fetch()` should use HTTP rather than relying on direct `file://` access, create:

```text
scripts/start_server.sh
```

The script should:

1. move to the project root
2. start a simple local HTTP server
3. use port `8000` by default

Prefer built-in Python:

```bash
python3 -m http.server 8000
```

The dashboard should then be available at:

```text
http://localhost:8000
```

Explain:

```text
localhost
=
this Mac

8000
=
local web server port
```

Make executable:

```bash
chmod +x scripts/start_server.sh
```

Check:

```bash
bash -n scripts/start_server.sh
```

Commit:

```bash
git add scripts/start_server.sh README.md
git commit -m "feat: add local dashboard server"
git push
```

---

# PHASE G — AUTOMATION

# STEP 11 — Daily Process Collection With macOS `launchd`

## Goal

Automatically regenerate:

```text
data/process_top20.csv
```

once every day.

Use macOS:

```text
launchd
```

Do NOT use Codex itself as the daily scheduler.

Codex creates the automation configuration.

macOS executes it.

Architecture:

```text
launchd
↓
collect_processes_mac.sh
↓
process_top20.csv
↓
dashboard displays latest data
```

---

## Automation Files

Create a template such as:

```text
automation/com.macsystemdashboard.collect.plist.example
```

Do not include hardcoded sensitive user data unless required.

Configure a reasonable example schedule.

Default learning schedule:

```text
09:00 every day
```

The plist should call:

```text
/Users/park/Documents/mac-system-dashboard/scripts/collect_processes_mac.sh
```

Document how to copy/install it into:

```text
~/Library/LaunchAgents/
```

Do not automatically modify system-level `/Library/LaunchDaemons`.

Use the user's LaunchAgents directory only.

---

## Provide Helper Scripts

Optional but recommended:

```text
scripts/install_automation.sh
scripts/remove_automation.sh
```

They must:

- clearly explain what they do
- avoid destructive operations
- use user-level LaunchAgents
- show success/error messages

Validate plist if possible:

```bash
plutil -lint automation/com.macsystemdashboard.collect.plist.example
```

Validate shell:

```bash
bash -n scripts/install_automation.sh
bash -n scripts/remove_automation.sh
```

Commit:

```bash
git add automation scripts README.md
git commit -m "feat: add daily process collection automation"
git push
```

---

# PHASE H — DOCUMENTATION

# STEP 12 — Complete Engineering Documentation

Create:

```text
docs/ARCHITECTURE.md
docs/WORKFLOW.md
docs/LEARNING_NOTES.md
```

---

## `ARCHITECTURE.md`

Explain:

```text
macOS host
↓
process collector
↓
CSV
↓
HTTP server
↓
JavaScript
↓
HTML/CSS dashboard
```

Explain responsibilities:

```text
Shell = collection
CSV = structured interchange format
HTML = structure
CSS = presentation
JavaScript = application behavior
HTTP server = delivery
launchd = automation
Git = version control
GitHub = remote repository
```

---

## `WORKFLOW.md`

Document normal manual workflow:

```bash
./scripts/collect_processes_mac.sh
./scripts/start_server.sh
```

Then:

```text
http://localhost:8000
```

Document Git workflow:

```bash
git status
git diff
git add .
git commit -m "..."
git push
```

---

## `LEARNING_NOTES.md`

Explain beginner concepts:

```text
HTML
CSS
JavaScript
CSV
Git
GitHub
HTTP
URL
localhost
port
shell script
launchd
```

Keep explanations concise.

---

# STEP 12 Commit

```bash
git add docs README.md
git commit -m "docs: document complete dashboard workflow"
git push
```

---

# PHASE I — FINAL README

Update root:

```text
README.md
```

It should contain:

# Mac System Dashboard

## Project Goal

Describe the project as a small system-monitoring data pipeline.

## Architecture

```text
macOS
  ↓
Shell Script
  ↓
CSV
  ↓
JavaScript
  ↓
HTML/CSS Dashboard
  ↓
launchd Automation
```

## Project Structure

Show the final folder tree.

## Installation

Explain cloning.

## Running Manually

```bash
./scripts/collect_processes_mac.sh
./scripts/start_server.sh
```

Open:

```text
http://localhost:8000
```

## Automation

Explain `launchd`.

## Privacy

Explain why:

```text
data/process_top20.csv
```

is ignored.

## Git Learning History

Explain that individual commits represent individual learning milestones.

## Future Improvements

Include:

```text
historical CSV storage
CPU trend over time
memory trends
disk monitoring
network monitoring
multiple hosts
alerts
optional AI-generated operational insights
cloud deployment
```

---

# PHASE J — OPTIONAL AI EXTENSION

This is NOT required for completion of the core project.

Do not make Gemini a dependency for the dashboard.

Possible future architecture:

```text
process data
↓
backend / Apps Script / API client
↓
Gemini API
↓
operational insights
↓
dashboard
```

Potential AI output:

```text
Potentially abnormal CPU process
Possible memory pressure
Processes worth investigating
Summary for system engineer
```

Never expose API keys in client-side JavaScript.

Never commit API keys to Git.

If an AI implementation is added later, secrets must be stored separately.

---

# FINAL PROJECT STRUCTURE

The completed project should approximately look like:

```text
mac-system-dashboard/
│
├── .git/
├── .gitignore
├── README.md
├── TASK.md
├── index.html
│
├── learning/
│   ├── step1.html
│   └── step2.html
│
├── pages/
│   ├── overview.html
│   ├── processes.html
│   └── about.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── app.js
│       ├── csv.js
│       ├── filters.js
│       ├── metrics.js
│       └── charts.js
│
├── data/
│   ├── process_top20.csv
│   └── process_top20_sample.csv
│
├── scripts/
│   ├── collect_processes_mac.sh
│   ├── start_server.sh
│   ├── install_automation.sh
│   └── remove_automation.sh
│
├── automation/
│   └── com.macsystemdashboard.collect.plist.example
│
└── docs/
    ├── ARCHITECTURE.md
    ├── WORKFLOW.md
    └── LEARNING_NOTES.md
```

Remember:

```text
data/process_top20.csv
```

exists locally but must NOT be tracked by Git.

---

# FINAL TESTING

Run shell syntax tests:

```bash
bash -n scripts/collect_processes_mac.sh
bash -n scripts/start_server.sh
```

If automation helper scripts exist:

```bash
bash -n scripts/install_automation.sh
bash -n scripts/remove_automation.sh
```

Validate plist:

```bash
plutil -lint automation/com.macsystemdashboard.collect.plist.example
```

Run collector:

```bash
./scripts/collect_processes_mac.sh
```

Check:

```bash
head data/process_top20.csv
wc -l data/process_top20.csv
```

Expected maximum:

```text
21 lines
```

Start server:

```bash
./scripts/start_server.sh
```

Test URLs:

```text
http://localhost:8000/
http://localhost:8000/pages/processes.html
http://localhost:8000/pages/about.html
```

Verify:

- CSS loads
- navigation works
- CSV loads
- process table renders
- filtering works
- sorting works
- metrics update
- CPU chart works
- memory chart works

---

# GIT FINAL VERIFICATION

Run:

```bash
git status
git branch --show-current
git remote -v
git log --oneline --decorate
```

Confirm:

```text
branch = main
```

Confirm real CSV is ignored:

```bash
git check-ignore data/process_top20.csv
```

Expected output:

```text
data/process_top20.csv
```

Also inspect:

```bash
git ls-files
```

Verify that real:

```text
data/process_top20.csv
```

is NOT listed.

---

# FINAL CODEX REPORT

After all work is complete, provide a final report containing:

## Repository

- local path
- current branch
- GitHub origin URL

## Steps

Report PASS / FAIL for:

```text
Step 0  Git initialization
Step 1  Basic HTML
Step 2  Internal CSS
Step 3  Shared CSS and multi-page HTML
Step 4  Process collector
Step 5  CSV generation
Step 6  JavaScript CSV loading
Step 7  Dashboard
Step 8  Filtering and metrics
Step 9  Charts
Step 10 Local HTTP server
Step 11 Daily launchd automation
Step 12 Documentation
```

## Testing

List every test performed.

## Git

List commits created.

Report whether each push succeeded.

## Privacy

Confirm that:

```text
data/process_top20.csv
```

is not tracked.

## Problems

Report:

- authentication errors
- missing software
- browser limitations
- launchd errors
- failed tests

Do not hide errors.

Do not claim success for a failed test.

---

# CODING STYLE

This is a beginner learning project.

Prefer:

- readable code
- short functions
- comments
- descriptive variable names
- separation of responsibilities
- no unnecessary frameworks
- no unnecessary dependencies

Avoid clever but difficult-to-understand code.

The user should be able to study the files afterward and understand how the system works.

---

# MOST IMPORTANT PRINCIPLE

Do not treat this merely as an HTML project.

Treat it as a small system-engineering data pipeline:

```text
SYSTEM
↓
COLLECT
↓
STRUCTURE
↓
TRANSPORT
↓
PROCESS
↓
VISUALIZE
↓
AUTOMATE
```

For this project:

```text
SYSTEM
= macOS processes

COLLECT
= shell script

STRUCTURE
= CSV

TRANSPORT
= HTTP

PROCESS
= JavaScript

VISUALIZE
= HTML + CSS + charts

AUTOMATE
= launchd

VERSION CONTROL
= Git

REMOTE HISTORY
= GitHub
```