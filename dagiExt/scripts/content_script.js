
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
        let loadingInterval = null;

        if (!document.getElementById("uniqueElementId0")) {
            const outerDiv = document.createElement('div');
            outerDiv.id = "uniqueElementId0"; // Set a unique ID for the outer div
            outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";
        
            const innerDiv = document.createElement('div');
            innerDiv.className = "group flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";
        
            const svgIcon = `
        <svg width="40" height="40" viewBox="0 0 50 50">
          <path fill="#3498db" d="M43.935,25.122c0-10.495-8.54-19.034-19.034-19.034c-10.495,0-19.034,8.54-19.034,19.034c0,10.495,8.54,19.034,19.034,19.034
            S43.935,35.617,43.935,25.122z M4.967,25.122c0-9.251,7.517-16.768,16.768-16.768c9.251,0,16.768,7.517,16.768,16.768
            c0,9.251-7.517,16.768-16.768,16.768C12.484,41.89,4.967,34.373,4.967,25.122z">
          </path>
          <path fill="#3498db" d="M26.013,4.967v10.055h4.017V4.967H26.013z" transform="rotate(180 28.022 9.995)">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"/>
          </path>
        </svg>
            `;
        
            // Create a span for the loading text
            const loadingText = document.createElement('span');
            loadingText.textContent = 'Loading';
            loadingText.style.marginLeft = '10px'; // Add some space between the SVG and the text
        
            innerDiv.innerHTML = svgIcon;
            innerDiv.appendChild(loadingText);
            outerDiv.appendChild(innerDiv);
        
            const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
            targetElement.appendChild(outerDiv);
        
            // Update the loading text with 1, 2, and 3 dots in a cycle
            let dotCount = 0;
            loadingInterval = setInterval(() => {
                dotCount = (dotCount % 3) + 1; // Cycle through 1 to 3
                loadingText.textContent = `Loading${'.'.repeat(dotCount)}`; // Update text
            }, 500); // Adjust the interval as needed
        
            // Remember to clear this interval when the loading is complete to stop the cycle
            // clearInterval(loadingInterval);
        }

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

                clearInterval(loadingInterval);
                document.getElementById('uniqueElementId0').remove();

                // Check if the element already exists
                if (!document.getElementById("uniqueElementId0")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId0"; // Set a unique ID for the outer div
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
                    innerDiv.title = globalData.topics.label + ' ' + Math.round(globalData.topics.score * 100) + '%';;
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
                    innerDiv.title = globalData.sentiment.label + ' ' + Math.round(globalData.sentiment.score * 100) + '%';;
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
                    innerDiv.title = globalData.emotion.label + ' ' + Math.round(globalData.emotion.score * 100) + '%';;
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
