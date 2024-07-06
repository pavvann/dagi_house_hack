
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
        "science_technology": "💻",
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

const iconsAbove50 = {
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

const iconsBelow50 = {
    "llm_generated": "👾", // Different icon or the same, depending on your preference
    "spam": "✋",
    "sexual": "🙈",
    "hate": "😠",
    "violence": "🛡️",
    "harassment": "🛑",
    "self_harm": "🚑",
    "sexual_minors": "👶",
    "hate_threatening": "⚠️",
    "violence_graphic": "🔨"
};

// Function to get the appropriate icon based on score
function getIcon(category, score) {
    if (score > 0.5) {
        return iconsAbove50[category];
    } else {
        return iconsBelow50[category];
    }
}

function doSomething() {
    //console.log("Page loaded. Current URL:", window.location.href);
    const parts = window.location.href.split('/');
    //console.clear();
    //console.log(parts.length);
    if (parts.length === 5) {
        let text = document.getElementsByClassName("flex flex-col whitespace-pre-wrap break-words text-lg leading-6 tracking-normal")[0].innerText
        //console.log('text', text);

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

        //////

        // URLs for the APIs
        const url1 = 'https://content-analysis.onrender.com/api/label-text';
        const url2 = 'https://content-analysis.onrender.com/vision/gpt-4o';
        const url3 = 'https://content-analysis.onrender.com/vision/mixtral-8x7b';
        const url4 = 'https://content-analysis.onrender.com/vision/llama-3';
        const url5 = 'https://content-analysis.onrender.com/onchain/send-message';

        // Data for the POST requests
        const data1 = JSON.stringify({ text_inputs: [text] });
        text = "Give me an estimate of authenticity of this post. Don't give any explanations, just a number from 1 to 100: " + "'" + text + "'"
        console.log('text', text);
        const data2 = JSON.stringify({ content: text });
        const data3 = JSON.stringify({ content: text });
        const data4 = JSON.stringify({ content: text });
        const data5 = JSON.stringify({ message: text });

        // Fetch requests
        const fetch1 = fetch(url1, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data1
        });

        const fetch2 = fetch(url2, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data2
        });

        const fetch3 = fetch(url3, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data3
        });

        const fetch4 = fetch(url4, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data4
        });

        const fetch5 = fetch(url5, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data5
        });


        // Use Promise.all to wait for both fetch requests to complete
        Promise.all([fetch1, fetch2, fetch3, fetch4, fetch5])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(([data1, data2, data3, data4, data5]) => {
                clearInterval(loadingInterval);
                document.getElementById('uniqueElementId0').remove();

                console.log('Data from API 1:', data1);
                console.log('Data from API 2:', data2.content);
                console.log('Data from API 3:', data3.content);
                console.log('Data from API 4:', data4.content);
                console.log('Data from API 5:', data5.response);

                // Step 1: Create an array with all values
                const values = [data2.content, data3.content, data4.content, data5.response]
                    .map(Number) // Convert all values to numbers
                    .filter(val => !isNaN(val) && val <= 100); // Filter out NaN values and values greater than 100

                // Step 3: Calculate the average of the remaining values
                const average = values.length > 0 ? values.reduce((acc, val) => acc + val, 0) / values.length : 0;
                console.log('Average:', average);

                // Check if the element already exists
                if (!document.getElementById("uniqueElementId0")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId0"; // Set a unique ID for the outer div
                    outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

                    const innerDiv = document.createElement('div');
                    innerDiv.className = "group flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

                    let fillColor;

                    if (average > 70) {
                        fillColor = "#4CAF50"; // Green
                    } else if (average < 40) {
                        fillColor = "#F44336"; // Red
                    } else {
                        fillColor = "#FFEB3B"; // Yellow
                    }

                    const svgIcon = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="${fillColor}"/>
                        </svg>
                    `;

                    innerDiv.innerHTML = svgIcon;
                    //gpt-4o, /mixtral-8x7b, /llama-3, /alphaLLM
                    innerDiv.title = 'GPT-4o: ' + data2.content + '%\n' + 'Mixtral-8x7b: ' + data3.content + '%\n' + 'Llama-3: ' + data4.content + '%\n' + 'Claude 3.5 Sonnet: ' + data5.response + '%';
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

                globalData = data1;

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

                    //const svgIcon = getEmojiForLabel(globalData.moderation.label);
                    const svgIcon = getIcon(globalData.moderation.label, globalData.moderation.score);

                    innerDiv.innerHTML = svgIcon;
                    innerDiv.title = globalData.moderation.label + ' ' + Math.round(globalData.moderation.score * 100) + '%';;
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });


        /////


        /*
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
*/

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
