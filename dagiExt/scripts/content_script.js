
let debounceTimer;
function debouncedDoSomething() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(doSomething, 2000); // Adjust the 100ms delay as needed
}

function getEmojiForLabel(label) {
    const emojiMap = {
        // Topics
        "arts_culture": "🎨",
        "business_entrepreneurs": "💼",
        "celebrity_pop_culture": "🌟",
        "diaries_daily_life": "📔",
        "family": "👨‍👩‍👧‍👦",
        "fashion_style": "👗",
        "film_tv_video": "🎬",
        "fitness_health": "💪",
        "food_dining": "🍽️",
        "gaming": "🎮",
        "learning_educational": "📚",
        "music": "🎵",
        "news_social_concern": "📰",
        "other_hobbies": "🎲",
        "relationships": "💞",
        "science_technology": "🔬",
        "sports": "🏅",
        "travel_adventure": "✈️",
        "youth_student_life": "🎓",
        // Sentiment
        "positive": "😊",
        "neutral": "😐",
        "negative": "😠",
        // Emotion
        "anger": "😡",
        "anticipation": "🔮",
        "disgust": "🤢",
        "fear": "😨",
        "joy": "😂",
        "love": "❤️",
        "optimism": "👍",
        "pessimism": "👎",
        "sadness": "😢",
        "surprise": "😲",
        "trust": "🤝",
        // Moderation
        "llm_generated": "🤖",
        "spam": "🚫",
        "sexual": "🔞",
        "hate": "😡",
        "violence": "⚔️",
        "harassment": "🚷",
        "self_harm": "🆘",
        "sexual_minors": "🚸",
        "hate_threatening": "🚨",
        "violence_graphic": "💥"
    };

    return emojiMap[label] || "❓"; // Default to question mark if label not found
}

function doSomething() {
    //console.log("Page loaded. Current URL:", window.location.href);
    const parts = window.location.href.split('/');
    //console.clear();
    //console.log(parts.length);
    if (parts.length === 5) {
        const text = document.getElementsByClassName("flex flex-col whitespace-pre-wrap break-words text-lg leading-6 tracking-normal")[0].innerText
        console.log('text', text);

        let globalData = null;

        fetch('https://content-analysis.onrender.com/api/label-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text_inputs: [text]
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                globalData = data;

                // Check if the element already exists
                if (!document.getElementById("uniqueElementId0")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId"; // Set a unique ID for the outer div
                    outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

                    const innerDiv = document.createElement('div');
                    innerDiv.className = "group flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

                    const svgIcon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
            </svg>
            `;

                    innerDiv.innerHTML = svgIcon;
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

                if (!document.getElementById("uniqueElementId1")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId"; // Set a unique ID for the outer div
                    outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

                    const innerDiv = document.createElement('div');
                    innerDiv.className = "group flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

                    const svgIcon = getEmojiForLabel(globalData.topics.label);

                    innerDiv.innerHTML = svgIcon;
                    innerDiv.title = globalData.topics.label;
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

                if (!document.getElementById("uniqueElementId2")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId"; // Set a unique ID for the outer div
                    outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

                    const innerDiv = document.createElement('div');
                    innerDiv.className = "group flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

                    const svgIcon = getEmojiForLabel(globalData.sentiment.label);

                    innerDiv.innerHTML = svgIcon;
                    innerDiv.title = globalData.sentiment.label;
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

                if (!document.getElementById("uniqueElementId3")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId"; // Set a unique ID for the outer div
                    outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

                    const innerDiv = document.createElement('div');
                    innerDiv.className = "group flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

                    const svgIcon = getEmojiForLabel(globalData.emotion.label);

                    innerDiv.innerHTML = svgIcon;
                    innerDiv.title = globalData.emotion.label;
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

                if (!document.getElementById("uniqueElementId4")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId"; // Set a unique ID for the outer div
                    outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

                    const innerDiv = document.createElement('div');
                    innerDiv.className = "group flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

                    const svgIcon = getEmojiForLabel(globalData.moderation.label);

                    innerDiv.innerHTML = svgIcon;
                    innerDiv.title = globalData.moderation.label;
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });


    }
    //console.info("DOM loaded");
}

function handleNewContent() {
    // Disconnect and reconnect observer to avoid infinite loops
    observer.disconnect();
    debouncedDoSomething();
    //observeDOMChanges();
}

function observeDOMChanges() {
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", debouncedDoSomething);
} else {
    debouncedDoSomething();
}


// Observe changes in the DOM
const observer = new MutationObserver(handleNewContent);
observeDOMChanges();

// Call listenCasts to initialize the listeners
//debouncedDoSomething();

function sendRefreshRequiredRequest() {
    // noinspection JSUnresolvedFunction,JSUnresolvedVariable
    chrome.runtime.sendMessage({ msg: REFRESH_REQUIRED_REQUEST });
    console.log("MSG SENT");

}
