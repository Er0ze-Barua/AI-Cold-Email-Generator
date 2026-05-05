# AI Cold Email Generator

An intelligent Chrome extension designed to streamline the job application process by generating tailored cold emails. The tool leverages Large Language Models (LLMs) to bridge the gap between a candidate's professional profile and specific job requirements.

## 🚀 Core Features
*   **Automated Web Scraping**: Dynamically extracts job descriptions from platforms like LinkedIn and Indeed using specialized DOM selectors.
*   **LLM Integration**: Powered by the Gemini 3.1 Flash-Lite API for high-speed, context-aware content generation.
*   **Personalization Engine**: Integrates user-provided resume data and professional links (LinkedIn, GitHub, Portfolio) directly into the generated drafts.
*   **Usage Telemetry**: Persistent tracking of API token consumption to monitor usage within free-tier quotas.
*   **Productivity Workflow**: One-click "Open in Gmail" functionality with automated Subject and Body population.

## 🛠️ Technical Stack
*   **Frontend**: JavaScript (ES6+), HTML5, CSS3 (Glassmorphism & CSS Grid).
*   **API**: Google Gemini API (Generative AI).
*   **Extension Architecture**: Manifest V3, Content Scripts, Background Service Workers, and Storage API.

## 📥 Installation
1. Clone this repository: `git clone https://github.com/Er0ze-Barua/AI-Cold-Email-Generator.git`
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.

## ⚙️ Setup
1. Click the extension icon and select the **Settings (⚙️)** icon to open the Configuration page.
2. Provide your **Gemini API Key**.
3. Paste the text content of your **Resume** and click **Save & Initialize**.
4. Navigate to any LinkedIn/Indeed job post and click **Generate Mail**.

## 🛡️ Privacy & Security
All sensitive data, including your API Key and Resume text, is stored locally within the browser's `chrome.storage.local`. No personal data is transmitted to external servers other than the official Google Gemini API endpoint for text generation.

## 🌐 Supported Platforms
Currently, the extension is optimized to extract job descriptions from the following platforms:
*   **LinkedIn**: Individual job posting pages.
*   **Indeed**: Full job description views.

## 🔑 Getting Your Gemini API Key
To use this extension, you need a free API key from Google:
1.  Visit the [Google AI Studio](https://aistudio.google.com/).
2.  Sign in with your Google account.
3.  Click on **"Get API key"** in the sidebar.
4.  Click **"Create API key in new project"**.
5.  Copy your key and paste it into the Extension's **Configuration** page.
