document.getElementById('saveBtn').addEventListener('click', async () => {
    const apiKey = document.getElementById('apiKey').value;
    const resumeText = document.getElementById('resumeText').value;
    const status = document.getElementById('status');

    if (!apiKey || !resumeText) {
        status.textContent = "CRITICAL: MISSING INPUT DATA";
        status.style.color = "#ff5f00";
        return;
    }

    status.textContent = "PROCESSING RESUME DATA...";
    status.style.color = "#ffffff";

    try {
        const prompt = `
            Extract the following into a clean JSON object:
            - Full Name
            - Top 5 Technical Skills
            - Top 3 Soft Skills
            - 2-sentence professional bio.
            - LinkedIn URL, GitHub URL, Portfolio Link, Phone Number.
            Resume: ${resumeText}
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const structuredProfile = data.candidates[0].content.parts[0].text;

        chrome.storage.local.set({
            geminiKey: apiKey,
            userProfile: structuredProfile 
        }, () => {
            status.textContent = "SUCCESS: PROFILE INITIALIZED";
            status.style.color = "#4ade80"; // Success Green
        });

    } catch (error) {
        status.textContent = "ERROR: " + error.message;
        status.style.color = "#ff5f00";
    }
});