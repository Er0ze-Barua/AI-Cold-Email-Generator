// This function finds the text of the job description on the page
function extractJobDescription() {
    // These are common CSS selectors for job descriptions on LinkedIn and Indeed
    const selectors = [
        '.jobs-description__container', // LinkedIn
        '.jobsearch-JobComponent-description', // Indeed
        '#jobDescriptionText', // Indeed alternative
        'main' // Fallback to the main content area
    ];

    for (let selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
            // We take the innerText to get clean text without HTML tags
            return element.innerText.substring(0, 3000); // Limit to 3k chars to save tokens
        }
    }
    return "Could not find job description automatically.";
}

// This listens for a message from the Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getJobDescription") {
        const description = extractJobDescription();
        sendResponse({ data: description });
    }
});