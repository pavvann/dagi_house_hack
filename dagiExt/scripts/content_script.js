
let debounceTimer;
function debouncedDoSomething() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(doSomething, 3000);
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
    console.log(parts.length);
    if (parts.length === 5) {
        let text = document.getElementsByClassName("flex flex-col whitespace-pre-wrap break-words text-lg leading-6 tracking-normal")[0].innerText
        console.log('text', text);

        let globalData = null;
        let loadingInterval = null;

        if (!document.getElementById("uniqueElementId0")) {
            const outerDiv = document.createElement('div');
            outerDiv.id = "uniqueElementId0"; // Set a unique ID for the outer div
            outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

            const innerDiv = document.createElement('div');
            innerDiv.className = "group flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

            const svgIcon = `<svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><filter id="spinner-gF01"><feGaussianBlur in="SourceGraphic" stdDeviation="1" result="y"/><feColorMatrix in="y" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="z"/><feBlend in="SourceGraphic" in2="z"/></filter></defs><g filter="url(#spinner-gF01)"><circle fill="#1F51FF" cx="5" cy="12" r="4"><animate attributeName="cx" calcMode="spline" dur="2s" values="5;8;5" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite"/></circle><circle fill="#1F51FF" cx="19" cy="12" r="4"><animate attributeName="cx" calcMode="spline" dur="2s" values="19;16;19" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite"/></circle><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></g></svg>`;

            // Create a span for the loading text
            const loadingText = document.createElement('span');
            loadingText.textContent = 'Loading';
            loadingText.style.marginLeft = '10px'; // Add some space between the SVG and the text

            innerDiv.innerHTML = svgIcon;
            innerDiv.appendChild(loadingText);
            outerDiv.appendChild(innerDiv);

            const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
            targetElement.appendChild(outerDiv);


            let dotCount = 0;
            loadingInterval = setInterval(() => {
                dotCount = (dotCount % 3) + 1;
                loadingText.textContent = `Loading${'.'.repeat(dotCount)}`;
            }, 500);

        }

        const newDiv = document.createElement('div');
        newDiv.id = "uniqueElementId6";
        const svgIcon = `<svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><filter id="spinner-gF01"><feGaussianBlur in="SourceGraphic" stdDeviation="1" result="y"/><feColorMatrix in="y" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="z"/><feBlend in="SourceGraphic" in2="z"/></filter></defs><g filter="url(#spinner-gF01)"><circle fill="#1F51FF" cx="5" cy="12" r="4"><animate attributeName="cx" calcMode="spline" dur="2s" values="5;8;5" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite"/></circle><circle fill="#1F51FF" cx="19" cy="12" r="4"><animate attributeName="cx" calcMode="spline" dur="2s" values="19;16;19" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite"/></circle><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></g></svg>`;

        newDiv.innerHTML = '<div class="mt-3 hidden rounded-lg px-2 py-3 pt-1.5 bg-overlay-light mdlg:block"><div class="px-2 py-1 text-lg font-semibold">insAIght Summary</div><div class="flex justify-center items-center px-2 py-4 text-sm text-muted">' + svgIcon + '</div><div class="flex flex-col items-center pt-1"><button id="copyButton" class="rounded-lg font-semibold border bg-action-tertiary border-action-tertiary hover:bg-action-tertiary-hover hover:border-action-tertiary-hover active:border-action-tertiary-active disabled:border-action-tertiary disabled:text-action-tertiary-disabled disabled:hover:bg-action-tertiary disabled:active:border-action-tertiary px-4 py-2 text-sm w-full" disabled>Copy to clipboard</button></div></div>';
        newDiv.title = 'Summary: Loading...';

        const parentElement = document.querySelector('.sticky.top-0.hidden.h-full.flex-shrink-0.flex-grow.flex-col.sm\\:flex.sm\\:max-w-\\[330px\\].pt-3');
        parentElement.insertBefore(newDiv, parentElement.children[1]);

        // URLs for the APIs
        const url1 = 'https://content-analysis.onrender.com/api/label-text';
        const url2 = 'https://content-analysis.onrender.com/vision/gpt-4o';
        const url3 = 'https://content-analysis.onrender.com/vision/mixtral-8x7b';
        const url4 = 'https://content-analysis.onrender.com/vision/llama-3';
        const url5 = 'https://content-analysis.onrender.com/onchain/send-message';
        const url6 = 'https://content-analysis.onrender.com/vision/gpt-4o';

        // Data for the POST requests
        const data1 = JSON.stringify({ text_inputs: [text] });
        sumarize = "Give me a summary of this text, just the summary in a short text form: " + "'" + text + "'"
        text = "Give me an estimate of authenticity of this post. Don't give any explanations, just a number from 1 to 100: " + "'" + text + "'"
        console.log('text', text);
        const data2 = JSON.stringify({ content: text });
        const data3 = JSON.stringify({ content: text });
        const data4 = JSON.stringify({ content: text });
        const data5 = JSON.stringify({ message: text });
        const data6 = JSON.stringify({ content: sumarize });

        // Fetch requests
        const fetch1 = fetch(url1, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data1 });
        const fetch2 = fetch(url2, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data2 });
        const fetch3 = fetch(url3, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data3 });
        const fetch4 = fetch(url4, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data4 });
        const fetch5 = fetch(url5, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data5 });
        const fetch6 = fetch(url6, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data6 });

        // Use Promise.all to wait for both fetch requests to complete
        Promise.all([fetch1, fetch2, fetch3, fetch4, fetch5, fetch6])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(([data1, data2, data3, data4, data5, data6]) => {
                clearInterval(loadingInterval);
                document.getElementById('uniqueElementId0').remove();

                console.log('Data from API 1:', data1);
                console.log('Data from API 2:', data2.content);
                console.log('Data from API 3:', data3.content);
                console.log('Data from API 4:', data4.content);
                console.log('Data from API 5:', data5.response);
                console.log('Data from API 6:', data6.content);

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

                    const svgIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="${fillColor}"/></svg>`;

                    innerDiv.innerHTML = svgIcon;
                    innerDiv.title = 'GPT-4o: ' + data2.content + '%\n' + 'Mixtral-8x7b: ' + data3.content + '%\n' + 'Llama-3: ' + data4.content + '%\n' + 'Claude 3.5 Sonnet: ' + data5.response + '%';
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

                globalData = data1;

                if (!document.getElementById("uniqueElementId1")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId1"; // Set a unique ID for the outer div
                    outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

                    const innerDiv = document.createElement('div');
                    innerDiv.className = "group text-xl flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

                    const svgIcon = getEmojiForLabel(globalData.topics.label);

                    innerDiv.innerHTML = svgIcon;
                    innerDiv.title = globalData.topics.label + ' ' + Math.round(globalData.topics.score * 100) + '%';
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

                if (!document.getElementById("uniqueElementId2")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId2"; // Set a unique ID for the outer div
                    outerDiv.className = "group text-xl flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

                    const innerDiv = document.createElement('div');
                    innerDiv.className = "group text-xl flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

                    const svgIcon = getEmojiForLabel(globalData.sentiment.label);

                    innerDiv.innerHTML = svgIcon;
                    innerDiv.title = globalData.sentiment.label + ' ' + Math.round(globalData.sentiment.score * 100) + '%';
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

                if (!document.getElementById("uniqueElementId3")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId3"; // Set a unique ID for the outer div
                    outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

                    const innerDiv = document.createElement('div');
                    innerDiv.className = "group text-xl flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

                    const svgIcon = getEmojiForLabel(globalData.emotion.label);

                    innerDiv.innerHTML = svgIcon;
                    innerDiv.title = globalData.emotion.label + ' ' + Math.round(globalData.emotion.score * 100) + '%';
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }

                if (!document.getElementById("uniqueElementId4")) {
                    const outerDiv = document.createElement('div');
                    outerDiv.id = "uniqueElementId4"; // Set a unique ID for the outer div
                    outerDiv.className = "group flex w-9 flex-row items-center text-sm text-faint cursor-pointer";

                    const innerDiv = document.createElement('div');
                    innerDiv.className = "group text-xl flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200 group-hover:bg-gray-200 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-purple text-faint";

                    //const svgIcon = getEmojiForLabel(globalData.moderation.label);
                    const svgIcon = getIcon(globalData.moderation.label, globalData.moderation.score);

                    innerDiv.innerHTML = svgIcon;
                    innerDiv.title = globalData.moderation.label + ' ' + Math.round(globalData.moderation.score * 100) + '%';
                    outerDiv.appendChild(innerDiv);

                    const targetElement = document.querySelector('.flex.flex-row.items-center.gap-3');
                    targetElement.appendChild(outerDiv);
                }
                const parentElement = document.getElementById('uniqueElementId6');
                // Modify the button element to include an ID for easy selection
                parentElement.innerHTML = '<div class="mt-3 hidden rounded-lg px-2 py-3 pt-1.5 bg-overlay-light mdlg:block"><div class="px-2 py-1 text-lg font-semibold">insAIght Summary</div><div class="px-2 py-1 text-sm text-muted">' + data6.content + '</div><div class="flex flex-col items-center pt-1"><button id="copyToClipboardButton" class="rounded-lg font-semibold border bg-action-tertiary border-action-tertiary hover:bg-action-tertiary-hover hover:border-action-tertiary-hover active:border-action-tertiary-active disabled:border-action-tertiary disabled:text-action-tertiary-disabled disabled:hover:bg-action-tertiary disabled:active:border-action-tertiary px-4 py-2 text-sm w-full">Copy to clipboard</button></div></div>';

                // Ensure the DOM has been updated before trying to attach the event listener
                document.getElementById('copyToClipboardButton').addEventListener('click', function () {
                    // Use the Clipboard API to copy text
                    navigator.clipboard.writeText(data6.content).then(function () {
                        console.log('Content copied to clipboard successfully!');
                    }).catch(function (error) {
                        console.error('Error copying text: ', error);
                    });
                });
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
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
