# AI Cold Email Generator

A Chrome extension that generates tailored cold emails for job applications directly from LinkedIn and Indeed job postings — powered by the Gemini API.

---

## Why Cold Email Over Easy Apply?

Easy Apply on LinkedIn can generate hundreds to thousands of applications within hours of a posting going live. A cold email sent directly to a hiring manager competes in a far smaller pool. More importantly, it bypasses ATS (Applicant Tracking Systems) entirely — your email lands in a human inbox, not a parser that rejects based on keyword mismatches before anyone reads your name.

This tool was built to make that workflow fast enough to actually use.

---

## How It Works

```
Job Posting Page
      │
      ▼
Content Script (content.js)
  └─ Scrapes job description via DOM selectors
  └─ Returns up to 3000 characters to the popup
      │
      ▼
Popup (popup.js)
  └─ Loads your structured profile from chrome.storage.local
  └─ Builds a prompt: profile + job description
  └─ Calls Gemini API → gets cold email draft
  └─ Displays in editable textarea
      │
      ▼
One-click → Open in Gmail (subject + body pre-filled)
```

---

## Features

- **Job Description Scraper** — content script targets LinkedIn (`.jobs-description__container`) and Indeed (`#jobDescriptionText`, `.jobsearch-JobComponent-description`) with a `main` fallback. Text is capped at 3000 chars to keep token usage lean.
- **AI Profile Initialization** — on first setup, your raw resume text is sent to Gemini once. It extracts your name, top skills, bio, and contact links into a structured profile stored locally. This profile is reused for every generation, no re-parsing needed.
- **Email Generation** — produces a plain-text cold email under 150 words with a subject line, tailored to the specific job description and your profile.
- **Regenerate** — one click to get a fresh draft without re-scraping.
- **Open in Gmail** — parses the `Subject:` line from the generated email and opens Gmail compose with subject and body pre-populated.
- **Copy to Clipboard** — copies the draft with a brief telemetry feedback message.
- **Token Usage Tracker** — cumulative token count stored in `chrome.storage.local` and displayed in the popup. Useful for staying within free-tier limits.

---

## Tech Stack

| Layer | Detail |
|---|---|
| Extension Architecture | Manifest V3 |
| Content Scripts | Injected on `linkedin.com` and `indeed.com` |
| Background | Service Worker (currently minimal, scaffolded for future API offloading) |
| Storage | `chrome.storage.local` — API key, structured profile, cumulative token count |
| AI Model | Google Gemini API (`gemini-3.1-flash-lite-preview`) |
| Frontend | Vanilla JS, HTML5, CSS3 (glassmorphism UI) |

---

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/Er0ze-Barua/AI-Cold-Email-Generator.git
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode** (top right toggle)
4. Click **Load unpacked** → select the project folder

---

## Setup

1. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/) → **Get API key** → **Create API key**
2. Click the extension icon → **SETUP ⚙️** → opens the Configuration page
3. Paste your **API Key** and the full text of your **Resume**
4. Click **SAVE & INITIALIZE PROFILE**
   - This calls Gemini once to extract a structured profile from your resume and stores it locally
   - Status will show `SUCCESS: PROFILE INITIALIZED` when done

---

## Usage

1. Navigate to any LinkedIn or Indeed job posting
2. Click the extension icon
3. Click **GENERATE MAIL**
4. The popup scrapes the job description, calls Gemini, and displays a draft
5. Edit if needed → click **GMAIL** to open a pre-filled compose window, or **COPY** to copy to clipboard
6. Use **REDO** to regenerate a fresh draft

---

## Privacy & Security

All sensitive data (API key, resume text, structured profile) is stored exclusively in `chrome.storage.local` on your machine. No data is sent to any external server other than the official Google Gemini API endpoint during generation and profile initialization.

---

## Supported Platforms

| Platform | Selector Used |
|---|---|
| LinkedIn | `.jobs-description__container` |
| Indeed | `#jobDescriptionText`, `.jobsearch-JobComponent-description` |
| Fallback | `main` element |

> **Note:** LinkedIn and Indeed periodically update their DOM structure. If scraping fails, the extension falls back to the `main` element. If that also fails, Gemini receives a generic `"Could not find job description automatically."` string — the generated email will be generic in that case. Unsupported sites are not currently handled.

---

## Known Limitations & Challenges

- **DOM Selector Fragility** — LinkedIn especially updates class names frequently. The selectors may need updating if the extension stops scraping correctly. This is a known trade-off with any DOM-based scraper.
- **No Recipient Finder** — the extension generates the email body but finding the hiring manager's actual email address is still manual. Planned for a future iteration.
- **Context Window Cap** — job descriptions are truncated at 3000 characters to control token usage. Extremely long postings may lose some detail.

---

## Roadmap

- [ ] Follow-up email generator using `chrome.storage.local` as a lightweight log
- [ ] Tone selector (startup vs enterprise)
- [ ] Recipient email pattern suggester based on company domain
- [ ] Support for more job platforms (Wellfound, Naukri, Internshala)

---

## Author

**Eroze Barua** — B.Tech CSE (AI/ML), UPES Dehradun  
[GitHub](https://github.com/Er0ze-Barua) · [LinkedIn](https://www.linkedin.com/in/eroze-barua)
