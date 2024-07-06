var express = require('express');
var router = express.Router();
var axios = require('axios');

const callApi = async (model, content) => {
    const apiKey = process.env.API_KEY_CORCEL;
    const apiUrl = 'https://api.corcel.io/v1/chat/completions';

    const response = await axios.post(apiUrl, {
        model: model,
        temperature: 0.1,
        max_tokens: 500,
        messages: [
            {
                role: "user",
                content: content
            }
        ]
    }, {
        headers: {
            'Authorization': apiKey,
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        responseType: 'text' // Ensure we get a text response
    });

    // Parse the response data
    const responseData = response.data;
    const lines = responseData.split('\n');
    let resultContent = '';

    lines.forEach(line => {
        if (line.startsWith('data: ')) {
            const dataPart = line.substring(6);
            if (dataPart !== '[DONE]') {
                try {
                    const parsedData = JSON.parse(dataPart);
                    if (parsedData.choices && parsedData.choices[0].delta.content) {
                        resultContent += parsedData.choices[0].delta.content;
                    }
                } catch (error) {
                    console.error('Error parsing line:', line, error);
                }
            }
        }
    });

    return resultContent.trim();
};

router.post('/gpt-4o', async function(req, res, next) {
    const { content } = req.body;
    try {
        const resultContent = await callApi('gpt-4o', content);
        res.json({ content: resultContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/mixtral-8x7b', async function(req, res, next) {
    const { content } = req.body;
    try {
        const resultContent = await callApi('mixtral-8x7b', content);
        res.json({ content: resultContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/llama-3', async function(req, res, next) {
    const { content } = req.body;
    try {
        const resultContent = await callApi('llama-3', content);
        res.json({ content: resultContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/alphaLLM', async function(req, res, next) {
    const { content } = req.body;
    try {
        const resultContent = await callApi('alphaLLM', content);
        res.json({ content: resultContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
