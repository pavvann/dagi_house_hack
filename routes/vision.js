var express = require('express');
var router = express.Router();
var axios = require('axios');
require('dotenv').config()


router.post('/chat', async function(req, res, next) {
    // const { content } = req.body;
    const apiKey = process.env.API_KEY_CORCEL;
    const apiUrl = 'https://api.corcel.io/v1/text/vision/chat';
    const content = "Give me an estimate of authenticity of this post. Don't give any explanations, just a number from 1 to 100: After using it for a few days I feel that Farcaster is a structurally superior platform to X for a few reasons: 1) Channels, 2) Ability to “tip” and seamlessly transmit economic value, 3) Greater range of functions and possible interactions. Anecdotally the culture also seems to be more harmonious and less bitterly ironic and angry than X which has a famously cantankerous user base and is a site of serious social conflict. What Farcaster lacks so far is the network effect of having a broad range of people discussing a fuller scope of subjects of interest to the public. If Farcaster gets that network effect (“gradually then suddenly”) it could really take off, not just for the benefit of its users but for the public at large which needs healthy forums for social and political discourse."
    try {
        const response = await axios.post(apiUrl, {
            model: "llama-3",
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
            }
        });

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

        res.json({ content: resultContent.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
