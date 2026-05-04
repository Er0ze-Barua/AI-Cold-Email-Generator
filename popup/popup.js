// Rolling Settings Logic
document.getElementById('settingsWrapper').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
});

// Gmail Splitter & Launcher
document.getElementById('gmailBtn').addEventListener('click', () => {
    const fullText = document.getElementById('emailResult').value;
    let subject = "Job Application";
    let body = fullText;

    if (fullText.includes("Subject:")) {
        const parts = fullText.split('\n');
        subject = parts[0].replace(/Subject:/i, "").trim();
        body = parts.slice(1).join('\n').trim();
    }

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
});

// Clipboard with Telemetry Feedback
document.getElementById('copyBtn').addEventListener('click', () => {
    const emailArea = document.getElementById('emailResult');
    if (!emailArea.value) return;
    emailArea.select();
    document.execCommand('copy');
    
    const display = document.getElementById('tokenDisplay');
    const old = display.textContent;
    display.textContent = "DATA UPLOADED TO CLIPBOARD";
    setTimeout(() => { display.textContent = old; }, 2000);
});

// Generation Engine
async function runEngine() {
    const emailArea = document.getElementById('emailResult');
    const tokenDisplay = document.getElementById('tokenDisplay');
    const resultArea = document.getElementById('resultArea');
    
    const data = await chrome.storage.local.get(['geminiKey', 'userProfile', 'totalTokens']);
    let currentTotal = data.totalTokens || 0;

    if (!data.geminiKey || !data.userProfile) {
        tokenDisplay.textContent = "SYSTEM ERROR: NO API KEY";
        return;
    }

    resultArea.classList.add('show-content');
    tokenDisplay.textContent = "INITIATING SCRAPE...";

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.tabs.sendMessage(tab.id, { action: "getJobDescription" }, async (response) => {
        tokenDisplay.textContent = "GENERATING AI PAYLOAD...";
        const jobDesc = response?.data || "Software Role";

        try {
            const prompt = `Write a plain-text cold email (<150 words) using profile: ${data.userProfile}. Job: ${jobDesc}. Include contact links. No markdown. Start with 'Subject: [Title]'.`;

            const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${data.geminiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const result = await apiResponse.json();
            const emailText = result.candidates[0].content.parts[0].text;
            emailArea.value = emailText;

            if (result.usageMetadata) {
                currentTotal += result.usageMetadata.totalTokenCount;
                chrome.storage.local.set({ totalTokens: currentTotal });
            }
            tokenDisplay.textContent = `TOTAL TELEMETRY: ${currentTotal.toLocaleString()} TOKENS`;

        } catch (e) { tokenDisplay.textContent = "ENGINE CRITICAL: " + e.message; }
    });
}

document.getElementById('generateBtn').addEventListener('click', runEngine);
document.getElementById('regenBtn').addEventListener('click', runEngine);